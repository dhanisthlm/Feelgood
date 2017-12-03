import Path from 'path'
import Hapi from 'hapi'
import Inert from 'inert'
import base from './base'
import encounter from './api/encounter';
import staff from './api/staff';
import issue from './api/issue';
import mongoose from 'mongoose';
import config from 'config';

mongoose.connect(config.get('database.host'));
mongoose.connection.on('error', console.error.bind(console, 'db error:'));

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
  const webpack = require('webpack');
  const WebpackPlugin = require('hapi-webpack-plugin');
  const wpconfig = require('../webpack/config.dev');

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

server.register([
  {
    register: Inert
  },

  {
    register: base
  },
  {
    register: encounter
  },
  {
    register: staff
  },
  {
    register: issue
  }
], (error) => {
  if (error) throw error

  server.start(() => {
    console.info('Sample stack listening at:', server.info.uri)
  })
})
