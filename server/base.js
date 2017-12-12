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
                if (process.env.NODE_ENV === 'stage' || process.env.NODE_ENV === 'production') {
                    return reply().redirect(config.get('baseUrl') + request.params.path);
                } else {
                    return (request.path.includes('pki-validation'))
                        ? reply.file('client/.well-known/pki-validation/godaddy.html')
                        : reply.file('client/index.html');
                }
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'base'
};