import Encounter from '../models/encounter';

const saveEncounter = (request) => {
    const encounter = new Encounter(request.payload.encounter);
    encounter.save();
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'POST',
            path: '/encounter',
            config: {
                handler: saveEncounter
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'encounter'
};