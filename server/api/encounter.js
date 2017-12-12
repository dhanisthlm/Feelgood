import Encounter from '../models/encounter';
import stripe from 'stripe';
import config from 'config';

const getEncounters = (request, reply) => {
    Encounter.find({}, (error, result) => {
        if (error) return reply(error);
        return reply(result);
    });
};

const handleRating = (request, reply) => {
   Encounter.find({ '_id': request.payload.id }, (err, encounter) => {
       if (encounter.length) {
           encounter[0].rating = {
               web: request .payload.ratingObj.web,
               pay: request.payload.ratingObj.pay,
               comment: request.payload.ratingObj.comment
           };
           encounter[0].save();
           return reply().code(200);
       }
   })
};

const handleErase = (request, reply) => {
    Encounter.remove({ '_id': request.params.id }, (err, encounter) => {
        if (err) return reply(err);
        return reply().code(200);
    })
};

const handleStripeToken = (request, reply) => {
    const token = config.get('stripe.client');
    return reply(token).code(200);
};

const saveEncounter = (request, reply, charge) => {
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

    console.log(request.payload.encounter.phone)
    encounter.name = request.payload.encounter.name;
    encounter.phone = request.payload.encounter.phone;
    encounter.skype = request.payload.encounter.skypeId;
    encounter.issue = request.payload.encounter.issue;
    encounter.mail = request.payload.encounter.mail;
    encounter.comment = request.payload.encounter.comment;
    encounter.price = skypePrice + emailPrice;

    const date = new Date();
    encounter.date = date.toUTCString();

    encounter.save((err, record) => {
        charge.encounterId = record._id;
        return reply(charge);
    });
};

const handleCharge = (request, reply) => {
    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const striper = stripe(config.get('stripe.server'));
    const token = request.payload.id; //

    // Charge the user's card:
    striper.charges.create({
        amount: 1000,
        currency: "BAM",
        description: "Example charge",
        source: token,
    }, function(error, charge) {
        if (error) return reply({
            message: error.code, code: error.type
        });

        if (charge.paid) {
            saveEncounter(request, reply, charge);
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
        },
        {
            method: 'POST',
            path: '/checkout',
            config: {
                handler: handleCharge
            }
        },
        {
            method: 'POST',
            path: '/rating',
            config: {
                handler: handleRating
            }
        },
        {
            method: 'DELETE',
            path: '/encounter/{id}',
            config: {
                handler: handleErase
            }
        },
        {
            method: 'GET',
            path: '/stripe',
            config: {
                handler: handleStripeToken
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'encounter'
};