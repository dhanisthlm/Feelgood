import Encounter from '../models/encounter';
import stripe from 'stripe';

const getEncounters = (request, reply) => {
    Encounter.find({}, (error, result) => {
        if (error) return reply(error);
        return reply(result);
    });
};

const saveEncounter = (request, reply) => {
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
    encounter.skype = request.payload.encounter.skypeId;
    encounter.issue = request.payload.encounter.issue;
    encounter.mail = request.payload.encounter.mail;
    encounter.comment = request.payload.encounter.comment;
    encounter.price = skypePrice + emailPrice;

    const date = new Date();
    encounter.date = date.toUTCString();

    encounter.save();
    return reply(200);
};

const handleCharge = (request, reply) => {
    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const striper = stripe("sk_test_sa1eq6hSDY9aMKNp3jl9K4j1");
    const token = request.payload.id; //

    // Charge the user's card:
    striper.charges.create({
        amount: 1000,
        currency: "BAM",
        description: "Example charge",
        source: token,
    }, function(err, charge) {
        console.log('err', err);
        if (charge.paid) {
            saveEncounter(request, reply);
        }
    });
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
                handler: handleCharge
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'encounter'
};