import Encounter from '../models/encounter';
import Workshop from '../models/workshop';
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

const getWorkshops = (request, reply) => {
    Workshop.find({}, (error, result) => {
        if (error) return reply(error);
        return reply(result);
    });
};

const getNewsletters = (request, reply) => {
    Newsletter.find({}, (error, result) => {
        if (error) return reply(error);
        return reply(result);
    });
};

const handleRating = (request, reply) => {
    if (request.payload.ratingObj.workshop === true) {
        Workshop.find({ '_id': request.payload.id }, (err, encounter) => {
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
    } else {
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
    }
};

const handleErase = (request, reply) => {
    Encounter.remove({ '_id': request.params.id }, (err, encounter) => {
        if (err) return reply(err);
        return reply().code(200);
    })
};

const handleEraseWorkshop = (request, reply) => {
    Workshop.remove({ '_id': request.params.id }, (err, workshop) => {
        if (err) return reply(err);
        return reply().code(200);
    })
};

const handleEraseNewsletter = (request, reply) => {
    Newsletter.remove({ '_id': request.params.id }, (err, newsletter) => {
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

const handleNewsletter = (request, reply) => {
    Newsletter.find({ email: request.payload.email }, (err, result) => {
        if (result.length === 0) {
            const newsletter = new Newsletter();
            newsletter.email = request.payload.email;
            newsletter.save();
        }
    });
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
    encounter.issue = request.payload.encounter.issue;
    encounter.mail = request.payload.encounter.mail;
    encounter.comment = request.payload.encounter.comment;
    encounter.currency = request.payload.encounter.currency;
    encounter.price = skypePrice + emailPrice;
    encounter.fb = false;

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

const saveLinkEncounter = (request, reply, charge) => {
    const encounter = new Encounter();

    if (request.payload.encounter.newsletter === true) {
        Newsletter.find({ email: request.payload.encounter.mail }, (err, result) => {
            if (result.length === 0) {
                const newsletter = new Newsletter();
                newsletter.email = request.payload.encounter.mail;
                newsletter.save();
            }
        });
    }

    let order = {};

    if (request.payload.encounter.skype) {
        order.skype = {};
        order.skype.week = request.payload.encounter.skype;
        order.skype.cost = request.payload.encounter.skypeCost;
        order.skype.duration = request.payload.encounter.skypeDuration;
    }

    if (request.payload.encounter.email) {
        order.email = {};
        order.email.week = request.payload.encounter.email;
        order.email.cost = request.payload.encounter.emailCost;
    }

    encounter.name = request.payload.encounter.name;
    encounter.street = request.payload.encounter.street;
    encounter.postalCode = request.payload.encounter.postal;
    encounter.city = request.payload.encounter.city;
    encounter.country = request.payload.encounter.country;
    encounter.phone = request.payload.encounter.phone;
    encounter.mail = request.payload.encounter.mail;
    encounter.timeframe = request.payload.encounter.timeframe;
    encounter.paymentType = request.payload.encounter.paymentType;
    encounter.comment = request.payload.encounter.comment;
    encounter.currency = request.payload.encounter.currency;
    encounter.price = request.payload.encounter.cost.total;
    encounter.location = request.payload.encounter.location;
    encounter.order = order;
    encounter.fb = true;

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

const saveWorkshop = (request, reply, charge) => {
    const workshop = new Workshop();

    if (request.payload.encounter.newsletter === true) {
        Newsletter.find({ email: request.payload.encounter.mail }, (err, result) => {
            if (result.length === 0) {
                const newsletter = new Newsletter();
                newsletter.email = request.payload.encounter.mail;
                newsletter.save();
            }
        });
    }

    workshop.name = request.payload.encounter.name;
    workshop.street = request.payload.encounter.street;
    workshop.postalCode = request.payload.encounter.postal;
    workshop.city = request.payload.encounter.city;
    workshop.country = request.payload.encounter.country;
    workshop.phone = request.payload.encounter.phone;
    workshop.paymentType = request.payload.encounter.paymentType;
    workshop.mail = request.payload.encounter.mail;
    workshop.comment = request.payload.encounter.comment;
    workshop.currency = request.payload.encounter.currency;
    workshop.price = request.payload.encounter.cost.total;
    workshop.location = request.payload.encounter.location;
    workshop.day = request.payload.encounter.day;
    workshop.month = request.payload.encounter.month;
    workshop.workshopName = request.payload.encounter.workshopName;

    const date = new Date();
    workshop.date = date.toUTCString();

    workshop.save((err, record) => {
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
                if (request.payload.encounter.workshop === false &&
                    request.payload.encounter.skype === false &&
                    request.payload.encounter.email === false) {
                    saveEncounter(request, reply, charge);
                } else if (request.payload.encounter.workshop) {
                    saveWorkshop(request, reply, charge);
                } else if (request.payload.encounter.skype || request.payload.encounter.email) {
                    saveLinkEncounter(request, reply, charge);
                }
            }
        });
    } else {
        if (request.payload.encounter.data) {
            saveEncounter(request, reply, null);
        } else if (request.payload.encounter.workshop && !request.payload.encounter.data) {
            saveWorkshop(request, reply, null);
        } else if (request.payload.encounter.skype || request.payload.encounter.email && !request.payload.encounter.data) {
            saveLinkEncounter(request, reply, null);
        }
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
            method: 'DELETE',
            path: '/workshop/{id}',
            config: {
                handler: handleEraseWorkshop
            }
        },
        {
            method: 'GET',
            path: '/workshops',
            config: {
                handler: getWorkshops
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
        },
        {
            method: 'POST',
            path: '/newsletter',
            config: {
                handler: handleNewsletter
            }
        },
        {
            method: 'GET',
            path: '/newsletter',
            config: {
                handler: getNewsletters
            }
        },
        {
            method: 'DELETE',
            path: '/newsletter/{id}',
            config: {
                handler: handleEraseNewsletter
            }
        },
    ]);

    next()
};

exports.register.attributes = {
    name: 'encounter'
};