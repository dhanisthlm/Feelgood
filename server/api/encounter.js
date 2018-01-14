import Encounter from '../models/encounter';
import Newsletter from '../models/newsletter';
import request from 'request';
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

const handlePaypalEnv = (request, reply) => {
    const env = config.get('paypal');
    return reply(env).code(200);
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

    if (request.payload.encounter.newsletter === true) {
        Newsletter.find({ email: request.payload.encounter.mail }, (err, result) => {
            if (result.length === 0) {
                const newsletter = new Newsletter();
                newsletter.email = request.payload.encounter.mail;
                newsletter.save();
            }
        });
    }

    encounter.name = request.payload.encounter.name;
    encounter.street = request.payload.encounter.street;
    encounter.postalCode = request.payload.encounter.postal;
    encounter.city = request.payload.encounter.city;
    encounter.country = request.payload.encounter.country;
    encounter.phone = request.payload.encounter.phone;
    encounter.paymentType = request.payload.encounter.paymentType;
    encounter.timeframe = request.payload.encounter.timeframe;
    encounter.skype = request.payload.encounter.skypeId;
    encounter.issue = request.payload.encounter.issue;
    encounter.mail = request.payload.encounter.mail;
    encounter.comment = request.payload.encounter.comment;
    encounter.currency = request.payload.encounter.currency;
    encounter.price = skypePrice + emailPrice;

    const date = new Date();
    encounter.date = date.toUTCString();

    encounter.save((err, record) => {
        if (charge) {
            charge.encounterId = record._id;
            return reply(charge);
        } else {
            return reply(record);
        }
    });
};

const handleCharge = (request, reply) => {
    if (request.payload.id !== null) {
        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const striper = stripe(config.get('stripe.server'));
        const token = request.payload.id;

        // Charge the user's card:
        // request.payload.cost
        // amount: 3 * 100,
        // currency: request.payload.encounter.currency,
        striper.charges.create({
            amount: request.payload.encounter.cost.total * 100,
            currency: request.payload.encounter.currency,
            description: "zdravlje.nu",
            source: token,
        }, function (error, charge) {
            if (error) return reply({
                message: error.code, code: error.type
            });

            if (charge.paid) {
                saveEncounter(request, reply, charge);
            }
        });
    } else {
        saveEncounter(request, reply, null);
    }
};

const handlePaypal = (req, reply) => {
    let oauth = new Promise((resolve, reject) => {
        request.post({
            uri:  'https://api.paypal.com/v1/oauth2/token',
            body: 'grant_type=client_credentials',
            auth: {
                user: config.get('paypal.production'),
                pass: config.get('paypal.secret')
            },
        },
        function (error, response, body) {
            resolve(response)
        });
    });

    oauth.then((response) => {
        let payment = request.post({
            uri: 'https://api.paypal.com/v1/payments/payment',
            auth: { bearer: JSON.parse(response.body).access_token },
            json: true,
            body: {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                transactions: [{
                    amount: { total: '0.01', currency: 'EUR' }
                }],
                redirect_urls: {
                    return_url: 'https://www.zdravlje.nu/checkout',
                    cancel_url: 'https://www.zdravlje.nu/checkout'
                }
            }
        }, function (error, response) {
            //console.log(response.body);
            return reply({ id: response.body.id });
        });
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
        },
        {
            method: 'GET',
            path: '/paypal',
            config: {
                handler: handlePaypalEnv
            }
        },
        {
            method: 'POST',
            path: '/paypal',
            config: {
                handler: handlePaypal
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'encounter'
};