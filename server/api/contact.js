import Contact from '../models/contact';

const createContact = (request, reply) => {
    const contact = new Contact();

    contact.name = request.payload.message.name;
    contact.mail = request.payload.message.mail;
    contact.comment = request.payload.message.comment;

    contact.save();

    return reply('success');
};

const getContacts = (request, reply) => {

};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/contact',
            config: {
                handler: getContacts
            }
        },
        {
            method: 'POST',
            path: '/contact',
            config: {
                handler: createContact
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'contact'
};