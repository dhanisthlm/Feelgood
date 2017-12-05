import Blog from '../models/blog';

const getBlogs = (request, reply) => {
    Blog.find({}, (error, result) => {
        if (error) return reply(error);
        return reply(result).code(200);
    });
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/blog',
            config: {
                handler: getBlogs
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'blog'
};