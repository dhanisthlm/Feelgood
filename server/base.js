import config from 'config';

exports.register = function (server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/static/{param*}',
            handler: {
                directory: {
                    path: 'client/static'
                }
            }
        },
        {
            method: 'GET',
            path: '/vendor/{param*}',
            handler: {
                directory: {
                    path: 'client/vendor'
                }
            }
        },
        {
            method: 'GET',
            path: '/css/{param*}',
            handler: {
                directory: {
                    path: 'client/css'
                }
            }
        },
        {
            method: 'GET',
            path: '/images/{param*}',
            handler: {
                directory: {
                    path: 'client/images'
                }
            }
        },
        {
            method: 'GET',
            path: '/fonts/{param*}',
            handler: {
                directory: {
                    path: 'client/fonts'
                }
            }
        },
        {
            method: 'GET',
            path: '/{path*}',
            handler: (request, reply) => {
                if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage') &&
                    request.headers['x-forwarded-proto'] && request.headers['referer'].indexOf("http") > -1) {
                        if (request.path.includes('google43bf8a2e6701fef2')) {
                            return reply.file('client/google43bf8a2e6701fef2.html');
                        } else {
                            return reply().redirect(config.get('baseUrl'));
                        }
                } else {
                    if (request.path.includes('pki-validation')) {
                        return reply.file('client/.well-known/pki-validation/godaddy.html');
                    } else if (request.path.includes('BingSiteAuth')) {
                        return reply.file('client/BingSiteAuth.xml');
                    } else {
                        return reply.file('client/index.html');
                    }
                }
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'base'
};