import Issue from '../models/Issue';

const getIssues = (request, reply) => {
    Issue.find({}, (error, result) => {
        if (error) return reply(error);
        return reply(result);
    });
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/issues',
            config: {
                handler: getIssues
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'issue'
};