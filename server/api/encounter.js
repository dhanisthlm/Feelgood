import Encounter from '../models/encounter';

const getEncounters = (request, reply) => {
    Encounter.find({}, (error, result) => {
        if (error) return reply(error);

        if (result.length) {
            return reply(result);
        }
    });
};

const createEncounter = (request, reply) => {
    const encounter = new Encounter();
    let skypePrice = 0;
    let emailPrice = 0;

    if (request.payload.encounter.data.skype) {
        encounter.order.skype.week = request.payload.encounter.data.skype.week;
        encounter.order.skype.cost = request.payload.encounter.data.skype.cost;
        encounter.order.skype.duration = request.payload.encounter.data.skypeDuration.length;
        skypePrice = request.payload.encounter.data.skype.cost;
    }

    if (request.payload.encounter.data.email) {
        encounter.order.email.cost = request.payload.encounter.data.email.cost;
        encounter.order.email.week = request.payload.encounter.data.email.week;
        emailPrice = request.payload.encounter.data.email.cost;
    }

    encounter.name = request.payload.encounter.name;
    encounter.mail = request.payload.encounter.mail;
    encounter.comment = request.payload.encounter.comment;
    encounter.price = skypePrice + emailPrice;

    const date = new Date();
    encounter.date = date.toUTCString();

    encounter.save();
    return reply(200);
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/encounters',
            config: {
                handler: getEncounters
            }
        },
        {
            method: 'POST',
            path: '/encounter',
            config: {
                handler: createEncounter
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'encounter'
};