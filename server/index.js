import Path from 'path'
import Hapi from 'hapi'
import Inert from 'inert'
import base from './base'
import encounter from './api/encounter';
import staff from './api/staff';
import issue from './api/issue';
import auth from './api/auth';
import blog from './api/blog';
import contact from './api/contact';
import mongoose from 'mongoose';
import config from 'config';
import path from 'path';
import 'ignore-styles';
import requireFromString from 'require-from-string';
import MemoryFS from 'memory-fs';
import serverConfig from '../webpack/server.config.dev.js';

const webpack = require('webpack');
const WebpackPlugin = require('hapi-webpack-plugin');
const wpconfig = require('../webpack/config.dev');
const fs = new MemoryFS();

var global = require("global")
var document = require("global/document")
var window = require("global/window")

mongoose.connect(config.get('database.host'));
mongoose.connection.on('error', console.error.bind(console, 'db error:'));

const outputErrors = (err, stats) => {
    if (err) {
         console.error(err.stack || err);
         if (err.details) {
              console.error(err.details);
         }
         return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
};

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(Path.dirname(__dirname), 'dist')
            }
        }
    }
});

server.connection({
    host: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage' ? '0.0.0.0' : 'localhost',
    port: +process.env.PORT || 8000,
    routes: {
        cors: true
    }
});


if (process.env.NODE_ENV === 'development') {
  server.register({
    register: WebpackPlugin,
    options: {
      compiler: webpack(wpconfig),
      assets: {
        noInfo: true,
        publicPath: wpconfig.output.publicPath,
        quiet: true
      }
    }
  }, (error) => {
    if (error) throw error;
  })
}


  const serverCompiler = webpack(serverConfig);

  serverCompiler.outputFileSystem = fs;

  serverCompiler.run((err, stats) => {
      outputErrors(err, stats);
      const contents = fs.readFileSync(path.resolve(serverConfig.output.path, serverConfig.output.filename), 'utf8');
      const app = requireFromString(contents, serverConfig.output.filename);

      server.route({
          method: 'GET',
          path: '/{param*}',
          handler: (request, reply) => {
                console.log('x', request.headers['x-forwarded-proto']);

                if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage') &&
                    request.headers['x-forwarded-proto'] && request.headers['x-forwarded-proto'] === 'http') {
                        if (request.path.includes('google43bf8a2e6701fef2')) {
                            return reply.file('client/google43bf8a2e6701fef2.html');
                        } else {
                            return reply(app.default(request, reply));
                            //return reply().redirect(config.get('baseUrl'));
                        }
                } else {
                    if (request.path.includes('pki-validation')) {
                        return reply.file('client/.well-known/pki-validation/godaddy.html');
                    } else if (request.path.includes('BingSiteAuth')) {
                        return reply.file('client/BingSiteAuth.xml');
                    } else if (request.path.includes('icon')) {
                        return reply.file('client/icon/' + request.path.split('/').pop());
                    } else {
                        return reply(app.default(request, reply));
                    }
                }
            }
      });
  });

server.register([
  { register: Inert },
  { register: base },
  { register: encounter },
  { register: staff },
  { register: issue },
  { register: auth },
  { register: blog },
  { register: contact }

], (error) => {
  if (error) throw error

  server.start(() => {
    console.info('Sample stack listening at:', server.info.uri)
  })
})
