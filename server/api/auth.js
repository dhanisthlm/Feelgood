import config from 'config';
import CookieAuth from 'hapi-auth-cookie';
import shortid from 'shortid';
import { authValidator } from '../../validators/auth';
import User from '../models/user';

const login = function (request, reply) {
    const validation = authValidator.validate({
        userName: request.payload.username,
        password: request.payload.password
    });

    User.find({ userName: validation.value.userName, password: validation.value.password }, function(error, user) {
        if (error || user.length === 0) {
            return reply().code(401);
        }

        const cookie = {
            fullname: user[0].firstName + ' ' + user[0].lastName,
            firstname: user[0].firstName,
            username: user[0].username,
            scope: user[0].scope,
            sessionId: shortid.generate()
        };

        request.cookieAuth.set(cookie);

        return reply.redirect('/dashboard');
    });
};

const signup = function (request, reply) {
    const validation = authValidator.validate({
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        username: request.payload.username,
        password: request.payload.password,
        scope: request.payload.scope
    });

    const user = new User();
    user.firstName = validation.value.firstName;
    user.lastName = validation.value.lastName;
    user.username = validation.value.username;
    user.password = validation.value.password;
    user.scope = validation.value.scope;

    //if (validation.value.username === 'janzon.daniel@gmail.com' || validation.value.username === 'mina.dusegard@hotmail.com' || validation.value.username === 'alem_d@hotmail.com') {
    user.save();
    //}

    return reply().code(200);
};

const logout = function (request, reply) {
    request.cookieAuth.clear();
    return reply.redirect('/anka');
};

const ping = (request, reply) => {
    return reply(request.auth);
};

exports.register = (server, options, next) => {
    server.register(CookieAuth, (error) => {
        if (error) throw error;

        server.auth.strategy('session', 'cookie', {
            password: config.get('auth.key'),
            isSecure: false,
            isHttpOnly: true,
            ttl: config.get('auth.ttl')
        });

        server.route([
            {
                method: 'POST',
                path: '/auth/login',
                config: {
                    auth: {
                        strategy: 'session',
                        mode: 'try'
                    },
                    plugins: {
                        'hapi-auth-cookie': {
                            redirectTo: false
                        }
                    },
                    handler: login
                }
            },
            {
                method: 'GET',
                path: '/auth/logout',
                config: {
                    auth: false,
                    handler: logout
                }
            },
            {
                method: 'POST',
                path: '/auth/signup',
                config: {
                    auth: false,
                    handler: signup
                }
            },
            {
                method: 'GET',
                path: '/auth/ping',
                config: {
                    auth: {
                        strategy: 'session',
                        mode: 'try'
                    },
                    plugins: {
                        'hapi-auth-cookie': {
                            redirectTo: false
                        }
                    },
                    handler: ping
                }
            }
        ]);

        next();
    });
};

exports.register.attributes = {
    name: 'auth'
};
