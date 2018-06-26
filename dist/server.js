module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-i18next");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux-actions");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.supportedLocales = exports.defaultLocale = undefined;

var _i18next = __webpack_require__(11);

var _i18next2 = _interopRequireDefault(_i18next);

var _translations = __webpack_require__(12);

var resources = _interopRequireWildcard(_translations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLocale = exports.defaultLocale = 'ba-BA';

var supportedLocales = exports.supportedLocales = ['en-US', 'ba-BA'];

_i18next2.default.init({
    lng: defaultLocale,
    resources: resources,
    debug: false,
    fallbackNS: 'common',
    interpolation: {
        escapeValue: false
    }
});

exports.default = _i18next2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redux-simple-router");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addUserToNewsletter = exports.resetRating = exports.resetEncounter = exports.setEncounterData = exports.saveEncounter = exports.saveRating = exports.eraseEncounter = exports.payPaypal = exports.eraseNewsletter = exports.eraseWorkshop = exports.getEncounters = exports.getNewsletters = exports.getWorkshops = undefined;

var _axios = __webpack_require__(4);

var request = _interopRequireWildcard(_axios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getWorkshops = exports.getWorkshops = function getWorkshops() {
    return function (dispatch) {
        return request.get('/workshops').then(function (data) {
            dispatch({ type: 'WORKSHOPS', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var getNewsletters = exports.getNewsletters = function getNewsletters() {
    return function (dispatch) {
        return request.get('/newsletter').then(function (data) {
            console.log(data);
            dispatch({ type: 'NEWSLETTERS', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var getEncounters = exports.getEncounters = function getEncounters() {
    return function (dispatch) {
        return request.get('/encounters').then(function (data) {
            dispatch({ type: 'ENCOUNTERS', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var eraseWorkshop = exports.eraseWorkshop = function eraseWorkshop(id) {
    return function (dispatch) {
        return request.delete('/workshop/' + id).then(function () {
            dispatch({ type: 'WORKSHOP_DELETED' });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var eraseNewsletter = exports.eraseNewsletter = function eraseNewsletter(id) {
    return function (dispatch) {
        return request.delete('/newsletter/' + id).then(function () {
            dispatch({ type: 'NEWSLETTER_DELETED' });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var payPaypal = exports.payPaypal = function payPaypal() {
    return function (dispatch) {
        return request.post('/paypal').then(function (data) {
            var id = data.data.id;
            dispatch({ type: 'PAYPAL', payload: id });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var eraseEncounter = exports.eraseEncounter = function eraseEncounter(id) {
    return function (dispatch) {
        return request.delete('/encounter/' + id).then(function () {
            dispatch({ type: 'ENCOUNTER_DELETED' });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var saveRating = exports.saveRating = function saveRating(encounterId, ratingObj) {
    return function (dispatch) {
        var payload = { id: encounterId, ratingObj: ratingObj };
        return request.post('/rating', payload).then(function () {
            console.log('save rating');
            dispatch({ type: 'RATING_SAVED' });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var saveEncounter = exports.saveEncounter = function saveEncounter(encounter, id) {
    return function (dispatch) {
        console.log(encounter, id);

        return request.post('/encounter', { encounter: encounter, id: id }).then(function (data) {
            if (data.data.code === 'StripeCardError') {
                dispatch({ type: 'CHECKOUT_ERROR', payload: data.data.message });
            } else {
                dispatch({ type: 'ENCOUNTER_SAVED', payload: data });
            }
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var setEncounterData = exports.setEncounterData = function setEncounterData(data, cost, emailDiscount, promoDiscount) {
    return function (dispatch) {
        dispatch({
            type: 'ENCOUNTER_DATA',
            payload: {
                data: data,
                cost: cost,
                emailDiscount: emailDiscount,
                promoDiscount: promoDiscount
            }
        });
    };
};

var resetEncounter = exports.resetEncounter = function resetEncounter() {
    return function (dispatch) {
        dispatch({ type: 'RESET_ENCOUNTER' });
    };
};

var resetRating = exports.resetRating = function resetRating() {
    return function (dispatch) {
        dispatch({ type: 'RESET_RATING' });
    };
};

var addUserToNewsletter = exports.addUserToNewsletter = function addUserToNewsletter(email) {
    return function (dispatch) {
        return request.post('/newsletter', { email: email }).then(function (data) {}).catch(function (error) {
            console.log('error', error);
        });
    };
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

var _redux = __webpack_require__(9);

var _server = __webpack_require__(13);

var _server2 = _interopRequireDefault(_server);

var _template = __webpack_require__(14);

var _template2 = _interopRequireDefault(_template);

var _App = __webpack_require__(15);

var _App2 = _interopRequireDefault(_App);

var _reducers = __webpack_require__(54);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);
var url = __webpack_require__(60);

exports.default = function (request, reply) {
  var html = _server2.default.renderToString(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactI18next.I18nextProvider,
      { i18n: _i18n2.default },
      _react2.default.createElement(_App2.default, { location: request.url })
    )
  ));
  var template = (0, _template2.default)(html);
  return template;
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("i18next");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"en-US":{"common":{"email":"E-mail","english":"English","bosnian":"Bosnian","here":"here","skypeWeek":"online video week","skypeWeeks":"online video weeks","emailResponse":"answer within","hours":"hours","Jutro":"Morning","validation":{"\"name\" is required":"Name is required","\"name\" is not allowed to be empty":"Name is not allowed to be empty","\"phone\" is required":"Phone is required","\"phone\" is not allowed to be empty":"Phone is not allowed to be empty","\"street\" is required":"Street is required","\"street\" is not allowed to be empty":"Street is not allowed to be empty","\"postal\" is required":"Postal code is required","\"postal\" is not allowed to be empty":"Postal code is not allowed to be empty","\"city\" is required":"City is required","\"city\" is not allowed to be empty":"City is not allowed to be empty","\"mail\" is required":"E-mail is required","\"mail\" is not allowed to be empty":"E-mail is not allowed to be empty","\"mail\" must be a valid email":"E-mail must be valid","wrongRegexFormat":"Not correct format"},"issues":{"stress":{"name":"Stress","description":"Are you constantly stressed?"},"anxiety":{"name":"Anxiety","description":"Do you get anxiety attacks?"},"exhaustion":{"name":"Fatigue","description":"Have trouble sleeping?"},"backPain":{"name":"Pain","description":"Do you need help with pain relief?"},"depression":{"name":"Greef","description":"Need help coping with grief? "},"kids":{"name":"Child","description":"Help to manage outbursts and conflicts."},"weight":{"name":"Weight","description":"Need help reaching your weight goal?"},"panic":{"name":"Panic","description":"Do you get panic attacks?"},"fobia":{"name":"Fobia","description":"Have phobia that causes problems?"},"violence":{"name":"Conflict","description":"Frustrated and easily into conflict?"},"stuck":{"name":"Life crisis","description":"Stuck personally or professionally?"}}},"headerView":{"contactUs":"Contact us","emergency":"Emergency","callUs":"Call us","phone":"Phone","services":"Services","prices":"Prices","howWork":"How it works","whoAreWe":"Our team","blog":"Blog","menu":"Menu"},"introView":{"heading":"Online counseling and life coaching","preamble":"We are there for you if you need to talk to someone, no matter your location. Feeling well offers you counseling and life coaching online, confidentially and to a reasonable price. In a creative process, we identify what thoughts and emotions prevent you from feeling well and being successful, and together we work on change to reach your full potential.","start":"Get started","cookieText":"We use cookies for the proper functioning of certain services. They are temporary and disappear when you turn off the browser. By using this site, you accept the use of cookies."},"issueView":{"heading":"Let us help you reach your full potential","preamble":"Our counselors have experience in helping our clients living a more fulfilling life. Contact us, we can help you find solutions to your goals and problems.","contactUs":"Contact us","issues":{"stress":{"name":"Stress","description":"Are you constantly stressed?"},"anxiety":{"name":"Anxiety","description":"Do you get anxiety attacks?"},"exhaustion":{"name":"Fatigue","description":"Have trouble sleeping?"},"backPain":{"name":"Pain","description":"Do you need help with pain relief?"},"depression":{"name":"Greef","description":"Need help coping with grief? "},"kids":{"name":"Kids","description":"Help to manage outbursts and conflicts."},"weight":{"name":"Weight","description":"Need help reaching your weight goal?"},"panic":{"name":"Panic","description":"Do you get panic attacks?"},"fobia":{"name":"Fobia","description":"Have phobia that causes problems?"},"violence":{"name":"Conflict","description":"Frustrated and easily into conflict?"},"stuck":{"name":"Life crisis","description":"Stuck personally or professionally?"}}},"quoteView":{"quote1":"\"Happiness is when what you think what you say,","quote2":"and what you do are in harmony.\"","signature":"Mahatma Ghandi"},"quoteImageView":{"quote1":"\"The secret of change is to focus all your energy, not to fight the old, but to build a new one.\"","quote2":"","signature":"Sokrates"},"staffView":{"heading":"Who are we?","preamble":"Our psychologists are involved in the Society of Psychologists of the Federation of BiH"},"howItWorksView":{"heading":"How it works","intro":"We are here for you, if you are willing to explore the way you think and feel. To feel well or to reach your goals. The steps to get life coaching and counseling are described here. Frequently asked questions can be found","step1":{"heading":"1. Estimation","text":"Talk at no cost, ten to fifteen minutes with our psychologists over the phone (+387 603 21 22 90 or +387 66 23 60 83) or via online video to determine your advisory needs."},"step2":{"heading":"2. Choose a plan for you","text":"Select a payment plan that suits your needs and budget. Select online video conversations, emails or a combination of these two services. You can pay with a card, paypal or invoice."},"step3":{"heading":"3. Appointment","text1":"Contact us to schedule an appointment:","text2":"Alternatively, you can pay in advance for psychological counseling. Once we have received your payment, we will contact you for the initial free assessment and for scheduling appointments"},"step4":{"heading":"4. Psychological counseling","text1":"You can talk to our psychologists from the benefits of your home, without the knowledge of your family or friends.","text2":"For online video calls, you will need a stable and relatively fast Internet connection, computer or mobile phone with built-in camera and sound transmission, quiet and private room, as well as online video application.","text3":"For email counseling services, you will need a private e-mail address."}},"customerCareView":{"heading":"Customer Service","skypeChat":"Free online video chat:","preamble1":"Our customer service is available to you every working day from 08:00 to 17:00 for all information and advice.","preamble2":"We are committed to providing the best possible psychological counseling services for all our clients. In order to achieve this, we always strive to improve the services we offer and therefore we value all feedback, both good and bad.","contactText":"You can contact our customer service by email, online video or by calling the following phone numbers:"},"emergencyView":{"heading":"Emergency","text1":"Please understand that our services are not for emergency purposes.","text2":"If you are thinking about suicide or taking measures and actions that can cause serious harm to yourself or others, if you feel that you or someone else is in danger or if you have a medical emergency, you must contact the emergency department and inform the relevant authorities.","text3":"Our advisory services are open to anyone who wants to live a more fulfilling life by working in everyday situations and problems he faces. If you have serious mental problems, e.g. a diagnosis of schizophrenia, a bipolar personality disorder, or you are addicted to alcohol or drugs, and if you have any other diagnosis of a mental disorder - you must not use our services."},"paymentView":{"heading":"Order online life coaching and counseling ","intro":"You can order life coaching and counseling here. See the total price for your choices at the bottom of the page. Select online calls, email, or a combination - in that case, click on both buttons. The more services you choose, the lower the price for each individual service.","skypeWeek":"online call","skypeWeeks":"online calls","packageWith":"Package for","selectPackageText":"Select one online video call or a packet with multiple online video calls. You can combine it with email.","call":"call","email":"E-mail","answerWithin":"Reply within","emailSmallText":"Unlimited number of emails, response within 24h. You can combine with online calls. ","emailLargeText":"Unlimited number of e-mails, reply within 4 h between 7am and 10pm weekdays and 9am to 6pm on weekends and holidays.","number":"Number","week":"week","discount":"discount","forCelecrationLaunch":"for celebration launch","starts":"I open it","enterCode":"Use the code:","weOpen":"We're opening 8. january 2018!","until":"It's valid until 31/1-2018.","year":"year","price":"Price","writeCode":"Voucher","purchase":"Order"},"footerView":{"aboutWord":"About","about":"We are focused on the everyday problems that most of us face during our lifetime. We strive to make our advisory services accessible to everyone, discreetly and at a reasonable price. By using theoretical knowledge and scientifically proven interventions, we can help people overcome their problems and learn to live a life that they want, comfortable and confident.","blog":"Blog","conditions":"Conditions","privacyPolicy":"Privacy policy","tac":"Terms and conditions","cookiePolicy":"Cookie policy","questions":"Questions","customerService":"Customer Service","address":"Address"},"faqView":{"heading":"Frequently Asked Questions","preamble":"You will be asked to complete an evaluation form once your sessions come to an end, this will enable us to better our service.","individualCouncelling":{"heading":"What is individual counseling?","text1":"Counseling is a form of therapy with a conversation that allows the individual to verbalize and express his / her problems, feelings and negative thoughts in a safe and confidential environment. The counselors are there to listen to you and help you identify the problem, as well as to enable you to find the right steps to handle the problem you are facing.","text2":"Counseling provides a safe and confidential space that encourages clients to explore ways in which they can face life situations or crises in which they find themselves. It is a place where you will be heard and through which you can get the support, the space to work with fears and concerns and see the ways in which they can affect your life and interpersonal relationships.","text3":"Most importantly, this is the space in which we receive help that leads us to understand that we have choices and that we can shape our lives in a way that suits us, and that we can open up opportunities to live a more fulfilling life."},"forMe":{"heading":"How can I be sure that counseling is a good choice for me?","text1":"You have the opportunity to get an introduction to counseling for free, through a 10 to 15-minute telephone conversation. You can call us at +387 603 21 22 90 or +387 66 23 60 83, or via online video and talk to one of our psychologists. He or she will discuss your needs, the current situation and the therapeutic goal, and will explain how online counseling works in health.","text2":"If you feel that we could be at your service and help, you have the opportunity to book and report the appointment of counsel during that call. Please understand that such a reservation is temporary and will be canceled if we do not receive payment until the agreed date of the session."},"discretion":{"heading":"Will somebody know how to talk to a psychologist?","text1":"You can talk to our psychologists from the benefits of your home, without the knowledge of your family or friends.","text2":"Confidentiality by psychologists will be maintained all the time and we will protect your personal information. All information we collect through our website and advisory sessions will be strictly confidential and protected, and will not be sold, rented or otherwise disclosed to third parties not actively involved in the provision of services to our clients.","text3":"In order to protect you, our psychologists during the sessions will not write notes on our computer system, but only in their notebooks. These notebooks will only have your identification codes, and they will be under the key when they are not used by the psychologist for preparation or during the session. We never make video or audio recordings of sessions in order to protect your identity.","text4":"In order to offer you a better service, your psychologist can discuss your case within health, but without revealing your identity. In this way you can benefit from the skills and experience of more psychologists than just the one you are currently working with."},"rebook":{"heading":"Can I move or cancel an agreed advisory term?","text":"Of course, it is possible to move and cancel the agreed term, we are guided by the rule of free movement and cancellation at least 24 hours before the term itself."},"book":{"heading":"How do I book an appointment?","text1":"You can reserve the term by contacting us at:","text2":"The second method of booking is the payment of one of the advisory packages or individual counseling as they are offered on the health.nu website, after which you will be contacted as soon as we receive your payment. During such a reservation, you can select the time intervals that would best suit you for the terms of the consultation."},"safe":{"heading":"Is online payment safe?","text1":"We use Stripe and Paypal for online payment services. Both of these sites take security very seriously and are used by many organizations and individuals around the world.","text2":"The data of your credit or debit cards that you enter on health. Are never sent to our servers, but directly to Stripe. This is important because in this way we do not come into contact with sensitive data of your credit and debit cards through our servers.","text3":"You can learn more about how Stripe manages your data via a link:","text4":"If you choose to pay via Paypal, you will be redirected to a secure Paypal payment page. Again, no sensitive information on your cards will be handled by our server.","text5":"The website feelingwell.net uses an SSL certificate. SSL is a standard security technology that establishes a secure connection (encrypted channel) between your Internet browser and our health.nu web site. All communications transmitted by this channel are transmitted encrypted, making the information inside it safer and private. You will know that SSL is turned on and running if you see a small green pad icon in the right corner of the bar area with the address bar of feelingwell.net."},"eligible":{"heading":"Who can use feelingwell.net services?","text1":"Our advisory services are open to anyone who wants to live a more fulfilling life by working in everyday situations and problems he faces. If you have serious mental problems, e.g. a diagnosis of schizophrenia, a bipolar personality disorder, or you are addicted to alcohol or drugs, and if you have any other diagnosis of a mental disorder - you must not use our services.","text2":"Please understand that our services are not for emergency purposes.","text3":"If you are thinking about suicide or taking measures and actions that can cause serious harm to yourself or others, if you feel that you or someone else is in danger or if you have a medical emergency, you must contact the emergency department and inform the relevant authorities.","text4":"You must have 18 years or more to be able to use our services, as well as visit and use the website health.nu in any way."},"getStarted":{"heading":"What do I need to start?","text1":"For online video calls, you will need a stable and relatively fast internet connection, a computer or mobile phone with built-in camera and sound transmission, a quiet and private room, as well as a online video application.","text2":"To install Skype, visit","text3":"For email counseling services, you will need a private e-mail address."},"session":{"heading":"How long does a session last?","text1":"Feelingwell.net offers you 20-minute and 45-minute sessions.","text2":"If you do not have time for a standard session length of 45 minutes, e.g. During working hours, we offer you a shorter, 20-minute option."},"satisfied":{"heading":"What if I'm not satisfied with my psychologist?","text1":"A good relationship between a client and a psychologist is very important, so it will be a pleasure for you to change your psychologist for no special reason on your part. It is important that you have a sense of connection and trust with your psychologist.","text2":"If you want to change your psychologist, you can contact us at:","text3":"Upon completion of the last agreed session, you will be asked to complete the evaluation form, which will enable us to improve our services."},"pay":{"heading":"How to pay?","text1":"We have three payment options, credit / debit card, PayPal or through a bank account.","text2":"With Credit / Debit and PayPal payment options, you pay online on our website, feelingwell.net. We use the SSL certificate, which creates an encrypted channel between the web browser and our server, making the information you give us private and secure.","text3":"Credit / debit card numbers are never recorded on our servers at feelingwell.net."},"payAfter":{"heading":"Can I pay after the session?","text1":"Payment for sessions is always done before the scheduled appointment. If we do not receive a payment before the scheduled date, with the information that the funds are paid into our account, the scheduled term will be canceled or moved.","text2":"If your scheduled term lasts longer than planned, you are required to pay 2KM for each additional minute. If your appointment is shorter than foreseen, and the reason for this is on your part, we are not responsible for refunding your paid amount or compensating otherwise. However, if your appointment is shortened by two (2) minutes and more than the foreseen time, and the reason for this is from our side, you will be compensated with a new session."},"missSession":{"heading":"What if I miss my session?","text":"If you miss the scheduled session, without a 24-hour notice, although we will respect any reason you did not appear, you will be charged a full price of the scheduled term. Any decision to refund you a portion of the money or the cost of the entire session will be the result of our own assessment."},"prescriptions":{"heading":"Do you offer prescription medication as part of counseling?","text1":"No, a psychologist is not a doctor and can not prescribe drugs.","text2":"Counseling is a form of speech therapy that enables an individual to present her problems, feelings and negative thoughts in a trusted and confidential environment."},"troubles":{"heading":"Will I be able to solve my problems?","text":"There is no method or treatment, either medically or psychologically, which provides guaranteed assistance to all people. This is independent of whether counseling takes place via the Internet or live. No one can guarantee you to solve your problems. However, we can guarantee that we will always try to provide you with a service that is based on research and the results of effort and knowledge of psychological science and its theories and practices."}},"tacView":{"heading":"Terms and conditions","preamble":{"text1":"Baunad doo Tuzla is the author and publisher of the internet resource feelingwell.net, a portal providing counselling services through web, mobile, audio and video. Baunad is a limited company with its registered office at Marsala Tita 109, 75000 Tuzla, Bosna and Herzegovina.","text2":"The terms “Baunad”, “we” and “our” refer to Baunad doo Tuzla. The terms “you,” “your,” and “yourself” refer to the individual user of the services.","text3":"If you have any questions about any part of the terms and conditions, or if you have ideas as to how we can improve our services, feel free to contact us at info@feelingwell.net or +387 603 21 22 90; +387 66 23 60 83.","text4":"These terms and conditions were last updated on December 15 th 2017."},"services":{"heading":"Services offered","text1":"Our objective is to make access to counselling services easier and more cost effective. We want to ensure that you experience the best in ethical, legal and professional standards and that you have the service that is right for you.","text2":"Our counselling services are conducted by psychologists who are registered by xxx in Bosnia and Hercegovina. You can be informed about the diplomas and certifications of our psychologists by browsing their profiles.","text3":"You can avail of online counselling services from our panel of psychologists through texting, email, audio and/or video conferencing after online payment. Apart from electronic audio-video consultations, online sessions, texts and email, you may use resources such as blogs on topics of general interest and awareness about mental health, and read questions and answers in the “Q&amp;A” section.","text4":"Baunad cannot and does not assume any responsibility for any loss, damages or liabilities arising from your misuse of any advise, ideas, information, instructions or guidelines accessed through the service.","text5":"Our services are primarily provided in Bosnian and English. We will always try to help you to see a psychologist who suits your particular needs, however, we can only provide a closest match and cannot promise that you will be able to see a psychologist who can speak your native language or who has direct experience of the culture or country in which you live or have grown up.","text6":"If you believe that our services have not met the standard of reasonable skilled and qualified professionals, then please contact us to let us know. We will treat your concerns seriously. Should we agree that standards are not being met, we will be happy to fix, refund or re-perform the service we have provided.","text7":"Psychologist cannot prescribe medicines, as it is not within their authority to do so.","text8":"The services may change from time to time, at the sole discretion of Baunad, and the agreement will apply to your visit to and your use of the feelingwell website to avail the services, as well as to all information provided by you on the website at any given point in time."},"terms":{"heading":"Client terms of use","preamble":{"text1":"THE USE OF OUR ONLINE SERVICES IS NOT MEANT FOR EMERGENCIES.","text2":"IF YOU ARE THINKING ABOUT SUICIDE OR IF YOU ARE CONSIDERING TAKING ACTIONS THAT MAY CAUSE HARM TO YOU OR TO OTHERS OR IF YOU FEEL THAT YOU OR ANY OTHER PERSON MAY BE IN ANY DANGER OR IF YOU HAVE ANY MEDICAL EMERGENCY, YOU MUST IMMEDIATELY CALL THE EMERGENCY SERVICE NUMBER AND NOTIFY THE RELEVANT AUTHORITIES."},"text1":"In order to be eligible to use our services, you must not have a serious mental health issue, e.g. diagnosed with schizophrenia, bipolar disorder, or drug or alcohol dependence.","text2":"The terms and conditions are applicable to your using (including browsing) of the feelingwell.net website and/or availing of any of our services through the website or otherwise. By accessing or using our services, you irrevocably accept all the terms and conditions stipulated in this document and agree to abide by them. If you do not agree to all of these terms and conditions, you are not authorized to use our services. So, please read the terms and conditions carefully.","text3":"You must be 18 years of age or older to register, use the services, or visit or use the website feelingwell.net in any manner. By registering, visiting and using the website feelingwell.net or accepting this agreement, you represent and warrant to Baunad that you are 18 years of age or older, and that you have the right, authority and capacity to use the website feelingwell.net and the services available through the website, and agree to and abide by this agreement.","text4":"You hereby certify that you are over the age of eighteen (18). In the event that your certification is inaccurate, you agree to indemnify Baunad from any resulting damages, costs, or claims.","text5":"Baunad reserves the right to suspend access to the website and our services, and terminate association with any user/client who violates the terms and conditions of the feelingwell.net website or disturbs the smooth functioning of the website and the dissemination of its services or disturbs other users or professionals in their activities, at its sole discretion.","text6":"We do not tolerate abuse or offensive behaviour towards our psychologists.","text7":"Baunad reserves the right to stop access to the feelingwell.net website and services, and terminate association with any user/client who is suspected to be illegal and/or fraudulent and/or abusive and/or competitive and may be referred to appropriate law enforcement authorities. You shall be liable to indemnify Baunad for any losses incurred as a result of any action that has adversely affected Baunad or its users/clients."},"changes":{"heading":"Changes to terms and conditions","text1":"Baunad reserves the right to modify or totally change this “Terms and Conditions” anytime and as many times without giving any prior notice.","text2":"You have to review the “Terms and Conditions” from time to time to find out about the changes in it.","text3":"Visiting, using the resources, and/or availing the service/s from feelingwell.net after any change in “Terms and Conditions” has been made, means you have acknowledged and agreed to the changes made in it."},"payment":{"heading":"Payment","text1":"The payment for any session is always payable prior to the appointment. If we do not receive payment before the time of the appointment, with funds cleared into our bank, the appointment will be cancelled or postponed.","text2":"If your appointment lasts longer than the allotted time, you will be liable for a charge of 2 BAM per minute for the extra time taken.","text3":"If your appointment lasts shorter than the allotted time, and the reason is on your side, then we are not responsible to refund charges or compensate you. If, however, the appointment lasts shorter with two (2) minutes or more and the reason is on our side, then you will be compensated with another, equal session.","text4":"Baunad offers three ways to pay for our services:","text5":"The invoice has information on how to make payment to a bank in Bosnia and Herzegovina. In case wrong bank account details are entered on a payment slip, we will not be responsible for loss of money, if any.","text6":"In case of there being any technical failure, at the time of transaction and there is a problem in making payment, you could contact info@feelingwell.net.","creditcard":"credit / debit card","invoice":"invoice"},"failure":{"heading":"Failure to attend a consultation","text":"Should you fail to attend a consultation without giving at least 24 hours notice, though we will listen sympathetically to any reasons that you may give for not attending, the full cost of the appointment will be chargeable. Any decision to refund any or all of the cost of the consultation will be at our discretion."},"cancel":{"heading":"Cancellations","text1":"A full 24 hours notice is required for cancelling appointments without cost.","text2":"Appointments cancelled with at least 24 hours notice can be rescheduled or refunded. Any refunds will be deducted an administrative cost of 20 KM and any nonrefundable payment costs.","text3":"If you cancel with less than 24 hours before your appointment time, you will be billed for the full cost of your scheduled session."},"disclaimer":{"heading":"Disclaimers","text1":"You should never rely on or make health or well-being decisions purely on the use of feelingwell.net. Never disregard, avoid, or delay in obtaining medical advice from your doctor because of information or advice you received through feelingwell.net.","text2":"None of the service content represents or warrants that any particular treatment is safe, appropriate, or effective for you. You should always talk to an appropriately qualified health care professional for diagnosis and treatment, including information regarding which medications or treatment may be appropriate for you.","text3":"We do not warrant that our services will meet your specific needs or requirements, nor do we warrant that the quality of our services will meet your expectations."},"access":{"heading":"Accessing our services","text1":"Access to our services and the information contained therein is provided “as-is” and “as available” without any warranty of any kind, express or implied. Baunad does not warrant that access to the service will be uninterrupted or error-free, or that defects, if any, will be corrected. You expressly agree that your use of the service and your reliance upon any of its content is at your sole risk.","text2":"Baunad has no responsibility for technical failures or faults arising out of causes over which we have no control and we are not responsible to refund charges or compensate you if they occur. You shall be solely and fully responsible for any damage to the service or any computer system, any loss of data, or any improper use or disclosure of information on the service caused by you or any person using your username or password. Baunad cannot and does not assume any responsibility for any loss, damages or liabilities arising from the failure of any telecommunications infrastructure, or the internet or for your misuse of any protected health information, advise, ideas, information, instructions or guidelines accessed through the service. If you are dissatisfied with the feelingwell.net website, your sole remedy is to discontinue using the website.","text3":"Technical or security threats or issues affecting the infrastructure may require us to suspend our services and postpone consultations in order to ensure they are secure and/or operating optimally. We will minimise these suspensions, but are not responsible to refund charges or compensate you if they occur, unless they exceed 30 days in length, in which event you may cancel your agreement to take a consultation with us and receive a full refund.","text4":"Anti-virus and anti-malware software is in use on the website, but we cannot guarantee that the website will be free from viruses or malicious software so please ensure anti-virus and anti-malware software are in operation on any device with which you use to access our website.","text5":"You are responsible for any data usage fees and other third party charges you incur in connection with your access to our services, including the fees that may be charged by your internet service provider and/or other service providers.","text6":"Members of our psychologist team may not always be available to provide services to you and in the unlikely event that there is a possible delay of more than 30 days to service performance, you may cancel your agreement with us (and we may do the same) and receive a full refund.","text7":"Our services are personalised and so you may only transfer your rights or obligations to another person if we agree to it."},"parties":{"heading":"Third parties","text":"The feelingwell.net website may be linked to the website of third parties, affiliates and business partners. Baunad has no control over, and not liable or responsible for content, accuracy, validity, reliability, quality of such websites or made available by/through our website. Inclusion of any link on the feelingwell.net website does not imply that Baunad endorses the linked site. You may use the links and these services at your own risk."},"recordings":{"heading":"Recordings","text1":"We never record video sessions to protect your identity.","text2":"If it would come to Baunad’s knowledge that you have recorded online session(s) and published on social media or any other media sharing platforms, then we reserve the right to suspend services, terminate your account and possibly take legal action against you."},"limitation":{"heading":"Limitation of liability","text1":"Where we are permitted by Bosnian and Hercegovina’s law, we exclude all conditions, warranties, representations or other terms which may apply whether expressed or implied. Even though we accept clients from outside of Bosnia and Hercegovina, we can’t take responsibility for any laws outside Bosnia and Hercegovina regarding access to and use of our services.","text2":"In no event, including but not limited to negligence, shall Baunad, or any of its directors and employees, or content or service providers, be liable for any direct, indirect, special, incidental or consequential matter relating to the feelingwell.net website or our services.","text3":"The services supplied are for personal use and we are not responsible for any business-related losses arising out of the use of our services.","text4":"If you have failed to adhere to our instructions or advice on use and your device suffers any damage from defective digital content, we are not responsible for compensation.","text5":"Our total liability to you in respect of all losses arising under or in connection with these terms shall in no circumstances exceed the price you have paid to us for the services."},"property":{"heading":"Intellectual property rights","text1":"We own copyright and other intellectual property rights on the feelingwell.net website, for our services and their content.","text2":"You are permitted to use our website and consultation system in order to receive our services. You are not permitted to copy, distribute or make any business use of feelingwell.net."},"complaints":{"heading":"Complaints and Disputes","text1":"What to do if you have a complaint with regards to our services:","text2":"These terms and conditions are governed by Bosnian and Herzegovina’s law. This means that any dispute or claim arising out of it will be governed by Bosnian and Herzegovina’s law and the court in Tuzla will have exclusive jurisdiction over","list1":"Give us feedback on our services by contacting us at info@feelingwell.net.","list2":"Please tell us about any complaints you might have as soon as possible, so we are able to resolve it as soon as possible.","list3":"If you have a complaint, we may ask you for certain details about you and your complaint in order to address it. Please provide these as soon as possible so that we can handle your complaint quickly.","list4":"We will investigate any complaint and keep you updated on the results of the investigation.","list5":"We shall also discuss the investigation with you. If we are in the wrong, we shall apologise to you.","list6":"If the subject of your complaint is to do with the professional standards or behaviour of one of our psychologists, we will treat your concern seriously. Should we agree that standards are not being met, we will be happy to fix, refund or re-perform the service we have provided."}},"privacyPolicyView":{"heading":"Privacy Policy","preamble1":"Your privacy is important to us. We have designed our Privacy Policy so that we can share information on how to use Health and how we collect and use your content and information. We encourage you to read the Privacy Policy in full.","preamble2":"Feelingwell.net is a subsidiary of Baunad doo Tuzla.","disclosure":{"heading":"Data storage","text1":"All information we collect through our website and client sessions is strictly confidential and will not be sold, leased or otherwise available to third parties not actively involved in the provision of services to our clients.","text2":"We will always protect your private information. Baunad doo Tuzla will disclose personal information only if the user shows a serious intention to list himself or herself, in the event of being suspected of being a victim of a child / child, and if the person's information is requested by a court order and is required by a legal procedure leads against a person.","text3":"Baunad doo Tuzla is not responsible for your disclosure of information about yourself when using our services and / or public forums, or because of the unreliability of protecting your password while accessing the site."},"security":{"heading":"Data security","text1":"Our policy is to protect your information from unauthorized access and abuse. Therefore, we take care to protect this information through a number of technologically available security measures.","text2":"We never make sound or video clips of your online sessions to protect your privacy.","text3":"The employees of Baunad doo Tuzla are familiar with and have experience with regulations and security measures. They fully understand that any failure in keeping your information on their behalf results in strong disciplinary measures as well as the possible termination of business within Baunad doo Tuzla."},"payment":{"heading":"Payment Information","text1":"The credit card number and / or other financial information will be collected for the purpose of the payment and charging process, including but not limited to the use and disclosure of such information to third parties necessary for the performance of collection operations. Credit and debit card details will be transferred to secure pages with a proven secure authorization system and payment gateway systems that are digitally encrypted, and thus provide the highest possible degree of protection available through current technology.","text2":"Baunad doo Tuzla will not store information about your credit and debit cards."},"information":{"heading":"Delete and edit data","text1":"We never record video sessions to protect client's identity.","text2":"We will delete any private information from our system if we receive a written request from you to do so. In that case, all your personal information will be deleted from our system without delay, unless we have been disabled by law. Please keep in mind that we need to keep some of the information for keeping a record of business. Some of these residual information will always remain in our records even though we delete all that can be deleted."},"browser":{"heading":"Internet browser and usage information","text1":"We collect information about internet browsers such as IP addresses, browser type, geographic location, time spent on individual pages, hardware information (in case of using mobile devices when accessing a page) and information about the operating system, in order to analyze the profiles of our users and their users online behavior; especially the choice of content and services. Analyzing this data allows us to better understand our visitors as well as to improve our content and service.","text2":"The information we have about user behavior helps us in finding technological problems and solving potential mistakes in the process of payment and charging.","text3":"Your personal information and identification data will not be matched with the information collected and the results of anonymous and merged data.","text4":"We are not bound by the Privacy Policy of other sites and external service providers that you use while using our services."},"consent":{"heading":"Consistency with this privacy policy","text1":"By using our services and providing your information, we will consider that you have read, understood and agreed with our policies and the manner of work set out in this Privacy Policy, and that it applies to you as a user of our services. You hereby consent to the collection, use and sharing, as well as the transmission of your information in the manner described by this policy. We reserve the right to modify, supplement or delete certain parts of the Privacy Policy at our sole discretion at any time. If you do not agree with this Privacy Policy, your choice is not to use our services and not give us your information.","text2":"If you use our services on behalf of someone else, e.g. Your child or another entity, such as an employer, we consider that you are authorized by such an entity to do so, (i) accept this Privacy Policy on their behalf, (ii) consent to the collection, use and sharing, and the transmission of information by persons you represent in the manner described in this Privacy Policy."},"contact":{"heading":"Contact us","text":"For inquiries and information on privacy issues, you can contact us at:"},"address":"The address of our office is:","updated":"This document was last amended on December 11, 2017, when it enters into force."},"cookieView":{"heading":"Cookie policy","text":"Cookies are used for the proper functioning of certain ulcers. They are temporary and disappear when you turn off the browser. By using this site, you accept the use of cookies."},"blogView":{"heading":"Blog","author":"Author","title":"Title"},"issues":{"stress":{"name":"Stress","description":"Are you constantly stressed?"},"anxiety":{"name":"Anxiety","description":"Do you get anxiety attacks?"},"exhaustion":{"name":"Fatigue","description":"Have trouble sleeping?"},"backPain":{"name":"Pain","description":"Do you need help with pain relief?"},"depression":{"name":"Greef","description":"Need help coping with grief? "},"kids":{"name":"Child","description":"Help to manage outbursts and conflicts."},"weight":{"name":"Weight","description":"Need help reaching your weight goal?"},"panic":{"name":"Panic","description":"Do you get panic attacks?"},"fobia":{"name":"Fobia","description":"Have phobia that causes problems?"},"violence":{"name":"Conflict","description":"Frustrated and easily into conflict?"},"stuck":{"name":"Life crisis","description":"Stuck personally or professionally?"}},"checkoutView":{"heading":"Confirm Order","pleasePay":"Please pay xxx on your bank account:","includeIdData":"Write your name, phone number / e-mail and the code below on the payment slip:","callbackAffirmation":"We can call you to reserve a date for a conversation with our psychologists when we receive the money.","invoiceAffirmation":"You will receive an invoice to your email within 24 hours with payment details.","item":"Item","weeks":"Pieces","price":"Price","sum":"Sum","packageDiscount":"Discount","sumWithPackageDiscount":"Sum with discount","voucherDiscount":"Voucher discount","total":"Total","name":"First-/lastname","street":"Street","postal":"Postal code","city":"City","country":"Country","phone":"Phone","email":"E-mail","comment":"Comment","chooseTheme":"Choose theme","chooseTime":"Choose time","newsletter":"Yes, thanks, I want to get information on discounts and other offers from feelingwell.net.","agree":"I agree with","rules":"Rules and conditions","privacyPolicy":"Privacy policy","understand":"I understand that I have a free term change no later than 24 hours until the beginning of the term itself","feedback":"Please take a moment to give us feedback","impressionWeb":"What is your impression of the website?","impressionPayment":"What is your impression of the payment process?","successfulOrder":"Your purchase is successful and we got your order. Soon we will contact you for an initial free assessment and for scheduling appointments.","otherComments":"Other comments","redirected":"You will be returned to the home page when you press ok","creditCard":"Credit card","invoice":"Invoice","paymentType":"Payment type","i":"and","back":"Cancel","placeOrder":"Place order","thankYou":"Thank you for your order","close":"Close","issue":"Issue","invoiceText":"You will receive an invoice sent to your email with instructions for payment. When you make a payment to our bank account, we will contact you for your psychological counseling.","stripe":{"invalid_number":"The card number is not a valid credit card number.","incomplete_number":"The card number is not a valid credit card number.","invalid_expiry_month":"The card expiration month is invalid.","invalid_expiry_year":"The card expiration date is not valid.","invalid_cvc":"The security code of the card is invalid.","incomplete_cvc":"Incomplete cvc.","incomplete_zip":"Incomplete zip","invalid_swipe_data":"Swipe data cards are invalid.","incorrect_number":"Card number is incorrect.","expired_card":"The card has expired.","incorrect_cvc":"The security code of the card is incorrect.","incorrect_zip":"Checking the zip code card failed.","card_declined":"Card denied.","missing":"No customer charge card is charged.","processing_error":"An error occurred while processing the card.","incomplete_expiry":"Incomplete flow.","invalid_expiry_year_past":"The invalid year expires."}},"validation":{"\"name\" is required":"Name is required","\"name\" is not allowed to be empty":"Name is not allowed to be empty","\"phone\" is required":"Phone is required","\"phone\" is not allowed to be empty":"Phone is not allowed to be empty","\"street\" is required":"Street is required","\"street\" is not allowed to be empty":"Street is not allowed to be empty","\"postal\" is required":"Postal code is required","\"postal\" is not allowed to be empty":"Postal code is not allowed to be empty","\"city\" is required":"City is required","\"city\" is not allowed to be empty":"City is not allowed to be empty","\"mail\" is required":"E-mail is required","\"mail\" is not allowed to be empty":"E-mail is not allowed to be empty","\"mail\" must be a valid email":"E-mail must be valid","wrongRegexFormat":"Not correct format"}},"ba-BA":{"common":{"email":"E-pošta","english":"Engleski","bosnian":"Bosanski","here":"ovdje","skypeWeek":"online video poziv","skypeWeeks":"online video poziva","and":"i","emailResponse":"odgovor u toku","hours":"sata","validation":{"\"comment\" is required":"Komentar je potreban","\"comment\" is not allowed to be empty":"Komentar nije dozvoljen da bude prazan","\"name\" is required":"Ime i prezime je obavezno","\"name\" is not allowed to be empty":"Ime / prezime je obavezno","\"phone\" is required":"Telefon je potreban","\"phone\" is not allowed to be empty":"Telefon je potreban","\"street\" is required":"Ulica je potrebna","\"street\" is not allowed to be empty":"Ulica je potrebna","\"postal\" is required":"Poštanski broj je potreban","\"postal\" is not allowed to be empty":"Poštanski broj je potreban","\"city\" is required":"Grad je potreban","\"city\" is not allowed to be empty":"Grad je potreban","\"mail\" is required":"E-pošta je potrebna","\"mail\" is not allowed to be empty":"E-pošta je potrebna","\"mail\" must be a valid email":"E-pošta mora biti važeća","wrongRegexFormat":"Greška, pogrešan format"}},"headerView":{"contactUs":"Kontaktirajte nas","emergency":"Hitna pomoć","callUs":"Pozovite od","phone":"Telefon","services":"Usluge","prices":"Cijene","howWork":"Kako radi","whoAreWe":"Ko smo mi","blog":"Blogovi","menu":"Meni"},"introView":{"heading":"Psihološko savjetovanje za svakodnevne probleme","preamble":"Tu smo za Vas, ako trebate s nekim razgovarati. Zdravlje.nu Vam nudi psihološko savjetovanje, povjerljivo i po razumnoj cijeni. U razgovoru prepoznajemo koje misli i emocije Vas sprječavaju da se osjećate dobro i budete uspješni u životu, te radimo na promjeni.","start":"Započnite","cookieText":"Kolačiće koristimo radi pravilnog funkcionisanja određenih ulsuga. Oni su privremeni i nestaju kada isključite browser. Korištenjem ove web stranice prihvaćate korištenje kolačića."},"issueView":{"heading":"Napravite prvi korak za bolje sutra","preamble":"Da biste pronašli rješenja za svoju situaciju, može vam biti korisno potražiti stručnu podršku i pomoć. Kontaktirajte nas, mi možemo pomoći.","contactUs":"Kontaktirajte nas","issues":{"stress":{"name":"Stres","description":"Jeste li pod stresom i imate li poteškoće u smanjenjem istog?"},"anxiety":{"name":"Sikiracija","description":"Osjećate li da se sikirate i da ne možete podnijeti brigu?"},"exhaustion":{"name":"Iscrpljenost","description":"Imate li poteškoća sa spavanjem, umorom i iscrpljenjošću?"},"backPain":{"name":"Bol","description":"Trebate li pomoć o olakšavanju bola?"},"depression":{"name":"Tuga","description":"Osjećate li se tužno ili sumorno?"},"kids":{"name":"Dijete","description":"Da li vaše dijete ima izlive bijesa?"},"weight":{"name":"Težina","description":"Imate li problema sa tjelesnom težinom?"},"panic":{"name":"Panika","description":"Osjećate li anksioznost ili napad panike?"},"fobia":{"name":"Fobija","description":"Imate li fobije koje vas sprječavaju u životu?"},"violence":{"name":"Konflikt","description":"Ulazite li lako u konflikte i jeste li frustrirani?"},"stuck":{"name":"Životna kriza","description":"Jeste li zaglavili osobno ili profesionalno?"}}},"quoteView":{"quote1":"\"Sreća je kad je usklađeno ono što misliš,","quote2":"ono što govoriš i ono što radiš.\"","signature":"Mahatma Ghandi"},"quoteImageView":{"quote1":"\"Tajna promjene je fokusirati svu svoju energiju,","quote2":"ne na borbu protiv starog, već na gradnju novog.\"","signature":"Sokrat"},"staffView":{"heading":"Ko smo mi","preamble":"Naši psiholozi su uključeni u Društvo psihologa Federacije BiH"},"howItWorksView":{"heading":"Kako radi","intro":"Ako ste spremni da istražite način na koji razmišljate i osjećate, ovdje smo opisali korake koji će omogućiti da dobijete psihološko savjetovanje u zdravlje.nu. Ako ste spremni da istražite način na koji razmišljate i osjećate, ovdje smo opisali korake koji će omogućiti da dobijete psihološko savjetovanje u zdravlje.nu. Često postavljana pitanja možete naći","step1":{"heading":"1. Procjena","text":"Razgovarajte bez troška, deset do petnaest minuta sa našim psiholozima preko telefona (+387 603 21 22 90 ili +387 66 23 60 83) ili preko online video, kako biste utvrdili vaše savjetodavne potrebe."},"step2":{"heading":"2. Izaberite plan za vas","text":"Izaberite plan plaćanja koji odgovara vašim potrebama i budžetu. Izaberite online video razgovore, e-poštu ili kombinaciju ove dvije usluge. Možete platiti karticom, paypal-om ili fakturom."},"step3":{"heading":"3. Termin","text1":"Kontaktirajte nas da zakažete termin:","text2":"Alternativno možete unaprijed platiti za psihološko savjetovanje. Nakon što smo primili vašu uplatu, mi ćemo vas kontaktirat za inicijalnu besplatnu procjenu i za zakazivanje termina"},"step4":{"heading":"4. Psihološko savjetovanje","text1":"Možete razgovarati sa našim psiholozima iz ugodnosti Vaše kuće, bez znanja Vaše porodice ili prijatelja.","text2":"Za online video pozive trebat ćete stabilnu i relativno brzu internet vezu, kompjuter ili mobitel sa ugrađenom kamerom i mogućnošću prenošenja zvuka, tihu i privatnu sobu, kao i Skype aplikaciju. ","text3":"Za usluge savjetovanja putem e-maila, trebat ćete privatnu e-mail adresu."}},"customerCareView":{"skypeChat":"Besplatan razgovor preko online video:","heading":"Služba za korisnike","preamble1":"Naša služba za korisnike stoji Vam na raspolaganju svakim radnim danom od 08.00 do 17.00 za sve informacije i savjete.","preamble2":"Mi u zdravlje.nu smo posvećeni pružanju najbolje moguće usluge psihološkog savjetovanja za sve naše klijente. Da bismo to postigli, uvijek se trudimo poboljšati usluge koje nudimo te stoga cjenimo sve povratne informacije, i dobre i loše.","contactText":"Našu službu za korisnike možete kontaktirati putem e-pošta, online video ili pozivom na sljedeće telefonske brojeve:"},"emergencyView":{"heading":"Hitna pomoć","text1":"Molimo Vas da razumijete da naše usluge nisu namjenjene hitnim slučajevima.","text2":"Ukoliko razmišljate o samoubistvu ili poduzimanju mjera i akcija koje mogu uzrokovati ozbiljnu štetu Vama ili drugima, ukoliko osjećate da ste Vi ili neka druga osoba u opasnosti ili ako imate zdravstveno hitan slučaj, morate se obratiti službi za tu vrstu hitnih slučajeva i obavijestiti relevantne autoritete. ","text3":"Naše savjetodavne usluge su otvorene za svakoga ko želi živjeti ispunjenijim životom radeći na svakodnevnim situacijama i problemima s kojiima se suočava. Ukoliko imate ozbiljne mentalne probleme, npr. dijagnozu shizofrenije, bipolarnog poremećaja ličnosti ili ste ovisni o alkoholu ili drogama, te ukoliko imate bilo koju drugu dijagnozu mentalnog poremećaja – ne smijete korisiti naše usluge."},"blogView":{"heading":"Blogovi","author":"Pisac","title":"Zvanje"},"paymentView":{"heading":"Zakažite psihološko savjetovanje","intro":"Ovdje možete zakazati psihološko savjetovanje. Cijenu za Vaše izbore možete naći na donjem dijelu stranice. Kliknite na označenu tipku da izaberete online video poziv, e-poštu ili kombinaciju online video poziva i e-pošte (u tom slučaju kliknite na obje tipke). Ukoliko odlučite da kupite više online video ili sedmica u kojima biste koristili uslugu e-poštom, to je pojedinačna cijena tih usluga jeftinija. Tokom biranja možete pratiti jasno naznačenu ukupnu i pojedinačnu cijenu svih usluga koje odaberete.","skypeWeek":"online video poziv","skypeWeeks":"online video poziva","packageWith":"","selectPackageText":"Izaberite jedan online video poziv ili paket sa više online video poziva. Možete kombinovati sa e-poštom.","call":"poziv","email":"E-pošta","answerWithin":"Odgovor u toku","emailSmallText":"Neograničen broj e-pošte, odgovor u toku 24h. Možete kombinovati sa online video pozivom.","emailLargeText":"Neograničen broj e-pošte, odgovor u toku 4h radnim danima: 07.00-22.00, vikendom i praznikom: 09.00-18.00.","number":"Broj","week":"sedmica","discount":"popust","forCelecrationLaunch":"za slavlje lansiranja","starts":"Otvaram","enterCode":"Koristite kod:","weOpen":"Otvaramo 8. januara 2018!","until":"Važi do 31/1-2018 god.","year":"god","price":"Cijena","writeCode":"Unesite kod","purchase":"Zakažite"},"newsletterView":{"validation":{"\"mail\" is required":"E-mail is required"}},"footerView":{"aboutWord":"O","about":"Mi smo usmjereni na svakodnevne probleme sa kojima se većina nas susreće tokom života. Mi težimo da naše savjetodavne usluge budu pristupačne za sve, povjerljivo i po razumnoj cijeni. Korištenjem teorijskih znanja i naučno dokazanih intervencija, možemo pomoći ljudima da prevaziđu svoje probleme i da nauče da žive život koji žele, udobno i samopouzdano.","blog":"Blogovi","conditions":"Uslovi","privacyPolicy":"Politika privatnosti","tac":"Pravila i uslovi","cookiePolicy":"Politika kolačića","questions":"Pitanja","customerService":"Služba za korisnike","address":"Adresa"},"cookieView":{"heading":"Politika kolačića","text":"Kolačiće koristimo radi pravilnog funkcionisanja određenih ulsuga. Oni su privremeni i nestaju kada isključite browser. Korištenjem ove web stranice prihvaćate korištenje kolačića."},"tacView":{"heading":"Pravila i uslovi","preamble":{"text1":"Baunad doo Tuzla je autor i osnivač internet stranice zdravlje.nu, portala koji pruža usluge savjetovanja putem weba, mobitela, audia i videa. Baunad je kompanija sa ograničenom odgovornošću, sa uredom registrovanim u ulici Maršala Tita 109, 75000 Tuzla, Bosna i Hercegovina.","text2":"Termini “Baunad”, “mi” i “naš” odnose se na Baunad doo Tuzla. Termini “Vi”, “Vaš” i “Vama” odnose se na korisnika usluga.","text3":"Ako imate pitanja o bilo kojem dijelu pravila i uslova, ili imate ideje kako možemo unaprijediti naše usluge, budite slobodni kontaktirati na info@zdravlje.nu ili na brojeve telefona: +387 603 21 22 90; +387 66 23 60 83.","text4":"Ova pravila i uslovi zadnji put su izmijenjeni 15. decembra 2017."},"services":{"heading":"Naše usluge","text1":"Naš cilj je da savjetodavne usluge učinimo pristupačnijim i jeftinijim. Želimo Vam omogućiti da osjetite najbolje moguće etičke, pravne i profesionalne standarde i da imate uslugu koja je prava za Vas.","text2":"Naše savjetodavne usluge pružaju psiholozi koji su članovi društva psihologa u Federaciji Bosne i Hercegovine. O diplomama i certifikatima naših psihologa možete se upoznati pregledajući njihove profile.","text3":"Možete koristiti online usluge savjetovanja odabirući bilo kojeg psihologa na našoj listi putem chat-a, e-maila, audio i/ill video poziva nakon izvršenog online plaćanja. Pored elektronskog audio-video savjetovanja, online sesija, chat-a, možete koristiti druge izvore, poput našeg bloga koji pokriva teme od generalnog interesa i značaja za mentalno zdravlje, kao i pročitati pitanja i odgovore u &#39;&#39;FAQ&#39;&#39;- sekciji naše stranice.","text4":"Baunad ne može i ne preuzima odgovornost za bilo koji gubitak, oštećenja ili prepreke proistekle iz pogrešne primjene bilo kojeg savjeta, ideje, informacije, uputstva ili smjernice kojoj pristupite putem naše usluge.","text5":"Naše usluge primarno se pružaju na bosanskom i engleskom jeziku. Uvijek ćemo se truditi da Vam pomognemo naći psihologa koji odgovara Vaši potrebama, ali možemo Vam omogućiti samo najbliži odabir i ne možemo Vam obećati da ćete razgovarati sa psihologom koji priča Vaš maternji jezik ili ima direktno iskustvo sa kulturom zemlje u kojoj živite ili u kojoj ste odrasli.","text6":"Ako mislite da naše usluge ne ispunjavaju prihvatljive standarde očekivane od strane obučenih i kvalificiranih profesionalaca, molimo Vas da nas kontaktirate i obavijestite nas o tome. Vaše primjedbe ćemo uvažiti. Ako uvidimo da standardi nisu ispunjeni, bit će nam drago da to popravimo, da Vam refundiramo novac ili ponovo ponudimo uslugu koju ste platili.","text7":"Psiholozi ne mogu prepisivati lijekove, jer to nije u njihovoj nadležnosti.","text8":"Usluge se s vremena na vrijeme mogu mijenjati, prema nahođenju Baunad-a, i ugovor će se odnositi na Vašu posjetu i vaše upotrebu stranice zdravlje.nu i korištenje usluga, kao i na sve informacije koje ste nam dali na stranici u bilo koje vrijeme."},"terms":{"heading":"Uslovi korištenja za klijente","preamble":{"text1":"KORIŠTENJE NAŠIH ONLINE USLUGA NIJE NAMIJENJENO ZA HITNE SLUČAJEVE.","text2":"AKO RAZMIŠLJATE O SAMOUBISTVU ILI PLANIRATE PODUZETI AKCIJE KOJE ĆE OZLIJEDITI VAS ILI DRUGE ILI AKO OSJEĆATE DA VI ILI BILO KOJA DRUGA OSOBA MOŽE BITI U OPASNOSTI ILI AKO IMATE HITNU POTREBU ZA MEDICINSKOM POMOĆI, ODMAH NAZOVITE CENTAR HITNE POMOĆI ILI OBAVIJESTITE NADLEŽNE ZA TAJ SLUČAJ."},"text1":"Da biste bili u mogućnosti koristiti naše usluge, ne smijete imati ozbiljne mentalne problem, npr. biti dijagnosticirani sa šizofrenijom, bipolarnim poremećajem ili ovisni o drogama ili alkoholu ili imati bilo koju drugu dijagnozu mentalnog poremećaja.","text2":"Pravila i uslovi odnose se na Vaše korištenje (uključujući browsing) stranice zdravlje.nu i/ili korištenje bilo koje od naših usluga putem naše stranice ili na neki drugi način. Pristupanjem i korištenjem naših usluga, neopozivo prihvatate sva pravila i uslove prediviđene ovim dokumentom I potvrđujete da ćete ih se pridržavati. Ako se ne slažete sa svim pravilima i uslovima, niste u mogućnosti koristiti naše usluge. Zato Vas molimo da pažljivo pročitate pravila i uslove korištenja naših usluga.","text3":"Morate imati najmanje 18 godina ili više da biste se mogli registrovati, koristiti usluge, i/ili posjetiti ili koristiti stranicu zdravlje.nu na bilo koji način. Registracijom, posjetom i korištenjem stranice zdravlje.nu ili prihvatanjem ovog ugovora vi garantujete kompaniji Baunad da imate 18 ili više godina, i da imate pravo, sposobnost i ovlašteni ste koristiti stranicu zdravlje.nu i usluge omogućene putem web stranice, i slažete se da ćete se pridržavati ovog ugovora.","text4":"Ovim potvrđujete da ste stariji od osamnaest godina (18). U slučaju da Vaši navodi nisu tačni, slažete se da ćete kompaniji Baunad novčano nadoknaditi bilo koju nastalu štetu, kao i pokriti bilo koje troškove, uključujući i troškove sudskog procesa.","text5":"Baunad zadržava pravo da prema vlastitoj procjeni suspendira pristup prema web stranici i našim uslugama, i prekine vezu sa bilo kojim korisnikom/klijentom koji krši pravila i uslove web stranice zdravlje.nu ili narušava neometano funkcioniranje web stranice i njenih usluga ili uznemirava druge korisnike i profesionalce u njihovim aktivnostima.","text6":"Nećemo tolerisati vrijeđanje i agresivno ponašanje prema našim psiholozima.","text7":"Baunad zadržava pravo da onemogući pristup prema web stranici zdravlje.nu i njenim uslugama, i prekine vezu sa bilo kojim korisnikom/klijentom na kojeg se sumnja da svojim djelovanjem nastupa nezakonito i/ili neovlašteno, i/ili uvredljivo i prijavi ga nadležnim vlastima. Bit ćete odgovorni za novčanu naknadu kompaniji Baunad za bilo koje gubitke nastale kao rezultat bilo koje akcije koja je štetno uticala na Baunad ili njene korisnike/klijente."},"changes":{"heading":"Promjene pravila i uslova","text1":"Baunad zadržava pravo da izmjeni ili u potpunosti promjeni svoja “Pravila i uslove” u bilo koje vrijeme i koliko god puta želi, bez prethodnog obavještavanja.","text2":"Vaša je dužnost da pregledate “Pravila i uslove” s vremena na vrijeme i da se informirate o učinjenim promjenama.","text3":"Posjetom, korištenjem resursa i/ili korištenjem usluge/a web stranice zdravlje.nu, nakon što je donešena bilo koja promjena “Pravila i uslova”, potvrđujete da ste upoznati i saglasni sa donesenim promjenama."},"payment":{"heading":"Plaćanje","text1":"Plaćanje savjetovanja se vrši prije termina kojeg dogovorite za savjetovanje. Ukoliko ne primimo potvrdu o plaćanju prije termina savjetovanja, sa iznosom na našem bankovnom računu, termin će biti otkazan ili pomjeren za neki drugi termin.","text2":"Ukoliko Vaš termin savjetovanja bude trajao duže od predviđenog vremena, smatraćemo Vas odgovornim za doplatu u iznosu od 2KM po minuti za dodatno vrijeme.","text3":"Ukoliko Vaš termin savjetovanja bude trajao kraće od predviđenog vremena, a razlog tome je sa Vaše strane, nismo odgovorni da Vam refundiramo uplaćeni iznos ili da kompenziramo na drugi način. Međutim, ukoliko Vaš termin savjetovanja bude trajao dvije (2) minute i više - kraće od predviđenog vremena, a razlog tome je sa naše strane, bićete kompenzirani sa novom, jednakom sesijom.","text4":"Baunad nudi tri načina plaćanja naših usluga:","text5":"Faktura sadrži informacije o tome kako napraviti uplatu u banci u Bosni i Hercegovini. U slučaju da na uplatnici budu unešeni pogrešni podaci, nismo odgovorni za mogući gubitak novca.","text6":"U slučaju da se desi neki tehnološka greška prilikom uplate za vrijeme transakcije, kontaktirajte nas na info@zdravlje.nu.","creditcard":"Kreditne / debitne kartice","invoice":"Faktura"},"failure":{"heading":"Ne prisustvovanje sesiji","text":"Ukoliko se desi da ne prisustvujete sesiji u dogovorenom terminu, bez prethodne obavijesti (barem 24 sata prije termina) o tome, iako ćemo suosjećajno saslušati razloge koje navedete, puni iznos termina ćemo i dalje smatrati naplativim. Zadržavamo pravo na vlastito nahođenje u odluci da Vam refundiramo dio iznosa ili cijeli uplaćeni iznos za sesiju."},"cancel":{"heading":"Otkazivanje","text1":"Za otkazivanje termina sesija bez troška po Vas potrebno je dostaviti nam obavijest o tome barem 24 sata prije dogovorenog termina.","text2":"Sesije otkazane uz takvu obavijest mogu biti odgođene za neki drugi termin ili refundirane. Od svih refundacija koje radimo bit će oduzet iznos od 10KM za administrativni trošak, kao i nepovratne troškove plaćanja.","text3":"Ukoliko otkažete termin sesije unutar 24 sata do dogovorenog termina, bit će Vam naplaćena puna cijena dogovorene sesije."},"disclaimer":{"heading":"Odricanje","text1":"Ne trebate se oslanjati na donošenje zdravstvenih i odluka o općem blagostanju samo kroz upotrebu zdravlje.nu. Ne zanemarujte, ne izbjegavajte i ne odlažite dobivanje zdravstvenih savjeta od Vašeg liječnika zbog informacija primljenih kroz zdravlje.nu.","text2":"Ni jedan sadržaj naših usluga ne predstavlja, niti nudi garanciju da je pojedinačni tretman siguran, prikladan ili efektivan za Vas. Trebali biste uvijek razgovarati sa kvalificiranim zdravstvenim radnikom za dijagnozu i tretman, uključujući traženje informacija o tome koji lijekovi ili tretman mogu biti prikladni za Vas.","text3":"Ne garantujemo da će naše usluge moći pokriti Vaše specifične potrebe, niti garantujemo da će kvalitet naših usluga zadovoljiti Vaša očekivanja."},"access":{"heading":"Pristup našim uslugama","text1":"Pristup našim uslugama i informacijama sadržanim unutar njih je pružen “onakav kakav jeste” i “onakav kakav je dostupan” bez bilo koje vrste eksplicitne ili implicitne garancije. Baunad ne nudi garanciju da će pristup našim uslugama biti bez prekida ili greški, ili da će takvi nedostaci, ukoliko ih bude, biti korigovani. Eksplicitno se slažete da će Vaša upotreba i oslanjanje na naše usluge i sadržaj biti na vlastiti rizik.","text2":"Baunad ne snosi odgovornost za potencijalne tehničke greške i nedostatke iz razloga nad kojima nemamo kontrolu, te nismo odgovorni da Vam refundiramo trošak ili kompenziramo na drugi način ukoliko se one dese. Preuzimate ličnu i punu odgovornost za bilo koju moguću štetu servisa ili računarskog sistema, gubitak podataka, ili neprimjerenu upotrebu i otkrivanje informacija putem servisa uzrokovanu i nastalu pod Vašim korisničkim računom i šifrom. Baunad ne može i ne preuzima odgovornost za gubitak i štetu nastalu uslijed pada telekomunikacijske infrastrukture ili interneta, kao ni za moguću zloupotrebu zaštićenih zdravstvenih informacija, savjeta, ideja, instrukcija ili smjernica dostupnih preko naših usluga. Ukoliko niste zadovoljni sa web stranicom zdravlje.nu, Vaš izbor je ne koristiti web stranicu.","text3":"Tehničke i sigurnosne prijetnje i problemi koji utiču na našu infrastrukturu mogu dovesti do suspenzije u pružanju usluga i odlaganja termina sesija da bismo mogli omogućiti njihovo sigurno i optimalno funkcionisanje. Mi ćemo minimizirati takve suspenzije, ali nismo odgovorni za refundaciju ili kompenzaciju ukoliko se dese, osim u slučaju da traju duže od 30 dana - kada možete okazati termin savjetovanja i primiti punu refundaciju uplaćenog iznosa.","text4":"Naša web stranica koristi Anti-virus i softver za odbijanje zlonamjernih napada (anti-malware) tehnologiju, ali ne možemo garantirati da će stranica biti slobodna od takvih softvera te Vam preporučujemo da osigurate korištenje anti-virus i anti-malware softvera na svim uređajim kojima pristupate našoj stranici.","text5":"Preuzimate odgovornost za bilo koju vrsta provizije korištenja podataka i drugih naplata trećim strankama koje koristite u vezi sa pristupom našim uslugama, uključujući provizije koje mogu biti naplaćene od strane Vašeg internet dobavljača i/ ili drugih internet dobavljača.","text6":"Članovi našeg psihološkog tima možda neće uvijek biti na raspolaganju za pružanje usluga, i u malo vjerovatnom slučaju da se desi odgoda duža od 30 dana zbog njihove nedostupnosti, možete otkazati Vaš dogovoreni termin/ termine (što možemo učiniti i mi) i primiti punu refundaciju.","text7":"Naše usluge su individualizirane, te možete prenijeti Vaša prava i odgovornosti na drugu osobu jedino ukoliko se mi složimo na to."},"parties":{"heading":"Treća lica (stranke)","text":"Web stranica Zdravlje.nu može biti povezana sa trećim licima, suradnicima ili poslovnim partnerima. Baunad nema nikakvu kontrolu nad istima, niti je odgovoran za njihov sadrzaj, tačnost, validnost, pouzdanost i kvalitetu. Uključenje bilo kakvih linkova na stranici Zdravlje.nu ne implicira da Baunad podrzava linkovanu stranicu. Možete koristiti te linkove i usluge isključivo na svoju odgovornost."},"recordings":{"heading":"Snimanja","text1":"U cilju zaštite vašeg identiteta, mi nikada ne snimamo naše video seanse.","text2":"Ukoliko Baunad dodje do saznanja da ste snimali neku od naših video seansi, te istu/e objavili na nekoj od društvenih mreža ili platformi za razmjenu medijskog sadržaja, zadržavamo pravo da ukinemo naše usluge prema vama, ugasimo vaš račun i moguće poduzmemo i pravne mjere protiv vas."},"limitation":{"heading":"Ograničavanje odgovornosti","text1":"Gdje nam je dozvoljeno od strane zakona države Bosne i Hercegovine, isključujemo sve uslove, granacije, izjave ili druge uslove koji se mogu primjeniti, bilo to izraženo ili implicirano. Iako prihvatamo i radimo sa klijentima van teritorije Bosne i Hercegovine, ne možemo preuzeti odgovornost za bilo koje druge zakone van Bosne i Hercegovine, a da se odnose na pristup i korištenje naših usluga.","text2":"Ni u kom slučaju, uključujući ali ne ograničavajući nemar, firma Baunad, niti bilo ko od direktora, zaposlenika i servisa za pruzanje usluga, neće biti odgovoran za bilo koji direktni, indirektni, specijalni, incidentni ili posljedični ishod, a koji se tiče korištenja web stranice Zdravlje.nu i naših usluga.","text3":"Usluge koje pružamo su za ličnu upotrebu i mi nismo odgovorni za bilo kakve poslovne gubitke, koji bi mogli proizaći iz korištenja naših usluga.","text4":"Ukoliko ne uspijete primjeniti naše instrukcije ili savjete o upotrebi, ili ukoliko vaš uređaj pretrpi neku štetu digitalnog sadržaja, mi nismo odgovorni za bilo koju kompenzaciju.","text5":"Naša ukupna obaveza (odgovornost) prema vama u vezi sa svim gubicima koji nastaju pod ili u vezi sa ovim uslovima, neće nikako premašiti cijenu koju ste vi nama platili za naše usluge."},"property":{"heading":"Prava na intelektualno vlasništvo","text1":"Posjedujemo autorsko pravo i druga prava koja se tiču intelektualne svojine na našoj web stranici Zdravlje.nu, za naše usluge i njihov sadrzaj.","text2":"Dozvoljeno vam je da koristite našu web stranicu i sistem konsultacija kako biste primili naše usluge. Nije vam dozvoljeno kopirati,distribuirati ili koristiti Zdravlje.nu u bilo koje poslovne svrhe."},"complaints":{"heading":"Žalbe i sporovi","text1":"Šta uraditi ako imate žalbu u vezi sa našim uslugama:","text2":"Ovi pravila i uslovi su regulisani zakonom Bosne i Hercegovine. To znači da će svaki spor ili tužbeni zahtjev koji proizilazi iz njega biti regulisan bosanskohercegovačkim zakonima, a sud u Tuzli imaće isključivu nadležnost nad tim.","list1":"Pošaljite nam povratnu informaciju o našim uslugama na e-mail info@zdravlje.nu.","list2":"Molimo vas da nas obavjestite što prije o bilo kojim žalbama koje biste mogli imati, kako bismo mogli riješiti taj problem u što kraćem vremenskom roku.","list3":"Ako imate pritužbu, kontaktirati ćemo vas i pitati za određene detalje o vama i vašoj žalbi kako bismo to adresirali. Molimo vas da ih date što prije, kako bismo brzo mogli riješiti vašu žalbu.","list4":"Istražit ćemo svaku žalbu i nastaviti sa ažuriranjem vas sa rezultata istraživanja.","list5":"Također ćemo razgovarati i o procesu riješavanja sa vama. Ako smo u krivu, uputiti ćemo vam izvinjenje.","list6":"Ako je predmet vaše žalbe povezan sa profesionalnim standardima ili ponašanjem jednog od naših psihologa, ozbiljno ćemo tretirati vašu zabrinutost. Ukoliko smo suglasni da standardi nisu ispunjeni, potruditi ćemo se da popravimo, refundirat ili ponovo izvršimo uslugu koju smo pružili."}},"faqView":{"heading":"Često postavljena pitanja","preamble":"Od vas će biti zatraženo da popunite formular za evaluaciju kada se vaše sesije završe, što će nam omogućiti da poboljšamo našu uslugu.","individualCouncelling":{"heading":"Šta je individualno savjetovanje?","text1":"Savjetovanje je forma terapije razgovorom koja omogućava pojedincu da verbalizira i izrazi svoje probleme, osjećanja i negativne misli u sigurnom i povjerljivom okruženju. Savjetodavatelji su tu da Vas saslušaju i pomognu Vam identificirati problem, kao i da omoguće pronalaženje pravih koraka u nošenju sa problemom s kojim se suočavate.","text2":"Savjetovanje pruža siguran i povjerljiv prostor koji podstiče klijente da istraže načine pomoću kojih se mogu suočiti sa životnim situacijama ili krizama u kojima se zateknu. To je prostor u kojem ćete biti saslušani i kroz koji možete dobiti podršku, prostor da radite na strahovima i brigama i uvidite načine na koji oni mogu uticati na Vaš život i međuljudske veze.","text3":"Najvažnije, to je prostor u kojem dobijamo pomoć koja nas vodi ka razumjevanju toga da imamo izbore i da možemo oblikovati naše živote na način koji odgovara nama, te da možemo otvoriti mogućnosti da živimo ispunjenjiji život."},"forMe":{"heading":"Kako da budem siguran/na da je savjetovanje dobar izbor za mene?","text1":"Imate priliku da dobijete uvod u savjetovanje besplatno, putem 10 do 15-minutnog telefonskog razgovora. Možete nas pozvati na +387 603 21 22 90 ili +387 66 23 60 83, ili putem online video i razgovarati sa nekim od naših psihologa. On ili ona će razgovarati o Vašim potrebama, trenutnoj situaciji i terapijskom cilju, te će Vam objasniti kako funkcioniše online savjetovanje u zdravlje.nu.","text2":"Ukoliko osjetite da bismo Vam mogli biti na usluzi i pomoći, otvorena Vam je mogućnost da rezervišete i prijavite termin savjetovanja tokom tog poziva. Molimo Vas da imate razumjevanja da je takva rezervacija privremena, te da će biti otkazana ukoliko ne primimo uplatu do dogovorenog termina sesije."},"discretion":{"heading":"Da li će neko znati da razgovaram sa psihologom?","text1":"Možete razgovarati sa našim psiholozima iz ugodnosti Vaše kuće, bez znanja Vaše porodice ili prijatelja.","text2":"Povjerljivost od strane psihologa će biti održavana sve vrijeme i mi ćemo štititi Vaše lične informacije. Sve informacije koje prikupimo putem naše internet stranice i savjetodavateljskih sesija će biti strogo povjerljive i zaštićene, te neće biti prodavane, iznajmljivane ili na neki drugi način otkrivane trećim licima koja nisu aktivno uključena u pružanje usluga našim klijentima.","text3":"Da bismo Vas zaštitili, naši psiholozi tokom sesija neće pisati bilješke na našem računarskom sistemu nego jedino u njihove bilježnike. U ovim bilježnicima će stojati samo Vaše identifikacijske šifre, te će oni biti pod ključem kada ih psiholog ne koristi za pripremu ili tokom sesije. Nikada ne snimamo video niti audio snimke sesija, da bismo zaštitili Vaš identitet.","text4":"Da bi Vam ponudio što bolju uslugu, Vaš psiholog može raspravljati o Vašem slučaju unutar zdravlje.nu, ali bez otkrivanja Vašeg identiteta. Na ovaj način možete imati koristi od vještina i iskustava više psihologa nego samo onog s kojim trenutno radite."},"rebook":{"heading":"Mogu li pomjeriti ili otkazati dogovoreni savjetodavni termin?","text":"Naravno, moguće je pomjeriti i otkazati dogovoreni termin, vodimo se pravilom besplatnog pomjeranja i otkazivanja barem 24 sata prije samog termina."},"book":{"heading":"Kako da rezervišem termin?","text1":"Termin možete rezervisati tako što ćete nas kontaktirati na:","text2":"Drugi način rezervacije je uplata jednog od savjetodavnih paketa ili pojedinačnog savjetovanja kako su ponuđeni na web stranici zdravlje.nu, nakon čega ćete biti kontaktirani čim primimo Vašu uplatu. Tokom takve rezervacije možete odabrati vremenske intervale koji bi Vam najviše odgovarali za termine savjetovanja."},"safe":{"heading":"Da li je online plaćanje sigurno?","text1":"Mi koristimo Stripe i Paypal za online usluge plaćanja. Obje ove stranice uzimaju sigurnost jako ozbiljno, te se njima koriste mnoge organizacije i pojednici širom svijeta.","text2":"Podaci Vaših kreditnih ili debitnih kartica koje unesete na zdravlje.nu se nikada ne šalju našim serverima, nego direktno Stripe-u. Ovo je bitno jer na taj način mi ne dolazimo u dodir sa osjetljivim podacima Vaših kreditnih i debitnih kartica putem naših servera.","text3":"Možete saznati više o tome kako Stripe rukovodi Vašim podacima preko linka:","text4":"Ukoliko se odlučite platiti putem Paypal-a, bićete preusmjereni na sigurnu Paypal stranicu za uplatu. Ponovo, nikakvi osjetljivi podaci Vaših kartica neće biti rukovođeni putem naših servera.","text5":"Web stranica zdravlje.nu koristi SSL certifikat. SSL je standardna sigurnosna tehnologija koja uspostavlja sigurnu vezu (šifrirani kanal) između Vašeg internet pretraživača i naše stranice zdravlje.nu. Sva komunikacija prenešena ovim kanalom se prenosi šifrirano, što informacije unutar nje čini sigurnim i privatnim. Znaćete da je SSL uključen i radi ako vidite ikonu malog zelenog katanca u desnom uglu područja trake sa adresom stranice (address bar) zdravlje.nu."},"eligible":{"heading":"Ko može koristiti usluge zdravlje.nu?","text1":"Naše savjetodavne usluge su otvorene za svakoga ko želi živjeti ispunjenijim životom radeći na svakodnevnim situacijama i problemima s kojiima se suočava. Ukoliko imate ozbiljne mentalne probleme, npr. dijagnozu shizofrenije, bipolarnog poremećaja ličnosti ili ste ovisni o alkoholu ili drogama, te ukoliko imate bilo koju drugu dijagnozu mentalnog poremećaja – ne smijete korisiti naše usluge.","text2":"Molimo Vas da razumijete da naše usluge nisu namjenjene hitnim slučajevima.","text3":"Ukoliko razmišljate o samoubistvu ili poduzimanju mjera i akcija koje mogu uzrokovati ozbiljnu štetu Vama ili drugima, ukoliko osjećate da ste Vi ili neka druga osoba u opasnosti ili ako imate zdravstveno hitan slučaj, morate se obratiti službi za tu vrstu hitnih slučajeva i obavijestiti relevantne autoritete.","text4":"Morate imati 18 ili više godina da biste mogli koristiti naše usluge, kao i posjećivati i koristiti web stranicu zdravlje.nu na bilo koji način."},"getStarted":{"heading":"Šta mi treba da započnem?","text1":"Za online video pozive trebat ćete stabilnu i relativno brzu internet vezu, kompjuter ili mobitel sa ugrađenom kamerom i mogućnošću prenošenja zvuka, tihu i privatnu sobu, kao i Skype aplikaciju.","text2":"Da instalirate Skype, posjetite","text3":"Za usluge savjetovanja putem e-maila, trebat ćete privatnu e-mail adresu."},"session":{"heading":"Koliko dugo traje jedna sesija?","text1":"Zdravlje.nu. Vam nudi 20-minutne i 45-minutne sesije.","text2":"Ukoliko nekada ne budete imali vremena za standardnu dužinu sesije od 45 minuta, npr. tokom radnih sati, nudimo Vam kraću, 20-minutnu opciju."},"satisfied":{"heading":"Šta ako nisam zadovoljan/na svojim psihologom?","text1":"Dobar odnos između klijenta i psihologa jako je važan, zato će nam biti drago promijeniti Vam psihologa bez nekog posebnog razloga sa Vaše strane. Od važnosti je da imate osjećaj povezanosti i povjerenja sa Vašim psihologom.","text2":"Ukoliko budete željeli mjenjati Vašeg psihologa možete nas kontaktirati na:","text3":"Nakon završetka zadnje dogovorene sesije od Vas će biti traženo da popunite evaluacijski formular, što će nam omogućiti da poboljšamo svoje usluge."},"pay":{"heading":"Kako platiti?","text1":"Imamo tri opcije plaćanja, kreditnom/debitnom karticom, PayPal-om ili preko računa u banci.","text2":"Sa opcijama plaćanja kreditnom/debitnom karticom i PayPal-om, plaćate online na našoj web stranici, zdravlje.nu. Koristimo SSL certifikat, koji kreira šifrirani kanal između web browsera i našeg servera, čineći informacije koje nam dajete privatnim i sigurnim.","text3":"Brojevi kreditnih/debitnih kartica nikada se ne zapisuju na našim serverima u zdravlje.nu."},"payAfter":{"heading":"Mogu li platiti poslije sesije?","text1":"Plaćanje za sesije uvijek se obavlja prije zakazanog termina. Ako ne primimo uplatu prije zakazanog termina, sa informacijom da su sredstva uplaćena na naš račun, zakazani termin bit će otkazan ili pomjeren.","text2":"Ako Vaš zakazani termin traje duže od planiranog, obavezni ste platiti 2KM za svaku dodatnu minutu. Ukoliko Vaš termin savjetovanja bude trajao kraće od predviđenog vremena, a razlog tome je sa Vaše strane, nismo odgovorni da Vam refundiramo uplaćeni iznos ili da kompenziramo na drugi način. Međutim, ukoliko Vaš termin savjetovanja bude skraćen za dvije (2) minute i više od predviđenog vremena, a razlog tome je sa naše strane, bićete kompenzirani sa novom sesijom."},"missSession":{"heading":"Šta ako propustim svoju sesiju?","text":"Ako propustite zakazanu sesiju, bez 24-satnog obavještenja, iako ćemo uvažiti svaki razlog zbog kojeg se niste pojavili, bit će Vam naplaćena puna cijena zakazanog termina. Bilo koja odluka da Vam refundiramo dio novca ili cijenu cijele sesije bit će rezultat naše vlastite procjene."},"prescriptions":{"heading":"Da li nudite recepte za lijekove kao dio savjetovanja?","text1":"Ne, psiholog nije ljekar i ne može propisivati lijekove.","text2":"Savjetovanje je forma govorne terapije koja omogućuje pojedincu da iznese svoje probleme, osjećaje i negativne misli u pouzdanom i povjerljivom okruženju."},"troubles":{"heading":"Da li ću se riješiti svojih poteškoća?","text":"Ne postoji metod ili tretman, bilo medicinski ili psihološki, koji omogućuje zagarantovanu pomoć za sve ljude. Ovo je neovisno o tome da li se savjetovanje odvija putem interneta ili uživo. Niko Vam ne može garantovati da ćete se riješiti svojih problema. Međutim, možemo Vam garantirati da ćemo se uvijek truditi pružiti Vam uslugu koja je zasnovana na istraživanjima i rezultatima truda i saznanja psihološke nauke i njenih teorija i praksi."}},"privacyPolicyView":{"heading":"Politika privatnosti","preamble1":"Vaša privatnost nam je jako bitna. Osmislili smo našu Politiku privatnosti da bismo Vam mogli prenijeti informacije o tome kako koristiti Zdravlje.nu i o načinu na koji prikupljamo i koristimo Vaš sadržaj i informacije. Podstičemo Vas da pročitate Politiku privatnosti u potpunosti.","preamble2":"Zdravlje.nu je podružnica firme Baunad doo Tuzla.","disclosure":{"heading":"Čuvanje podataka","text1":"Sve informacije koje prikupimo putem naše internet stranice i sesija sa klijentima su strogo povjerljive, te neće biti prodavane, iznajmljivane ili na neki drugi način dostupne trećim licima koja nisu aktivno uključena u pružanje usluga našim klijentima.","text2":"Mi ćemo uvijek štititi Vaše privatne informacije. Baunad doo Tuzla će otkriti lične informacije samo u slučaju da korisnik pokaže ozbiljnu namjeru da našteti sebi ili drugima, u slučaju da je pod sumnjom za nasilje nad djetetom/djecom, te ukoliko su podaci o osobi zatraženi sudskim nalogom i potrebni u pravnoj proceduri koja se vodi protiv osobe.","text3":"Firma Baunad doo Tuzla nije odgovorna za Vaše otkrivanje informacija o sebi tokom korištenja naših usluga i/ili na javnim forumima, kao ni zbog neopreznosti u zaštiti Vaše šifre prilikom pristupa stranici."},"security":{"heading":"Sigurnost podataka","text1":"Naša politika je usmjerena na zaštitu Vaših informacija od neovlaštenog pristupa i zloupotrebe. Zbog toga vodimo računa da zaštitimo te informacije kroz niz tehnološki dostupnih sigurnosnih mjera.","text2":"Nikada ne pravimo zvučne ili video snimke Vaših online sesija s ciljm zaštite Vaše privatnosti.","text3":"Uposlenici firme Baunad doo Tuzla su upoznati i imaju iskustva sa pravilnicima i mjerama sigurnosti. U potpunosti shvataju da bilo koji propust u čuvanju Vaših informacija sa njihove strane rezultira jakim disciplinarnim mjerama kao i mogućim završetkom poslovanja unutar Baunad doo Tuzla."},"payment":{"heading":"Informacije o plaćanju","text1":"Broj kreditne kartice i/ili druge finansijske informacije će biti prikupljane u svrhu procesa plaćanja i naplaćivanja, uključujući ali ne i ograničeno na upotrebu i otkrivanje tih informacija trećim licima neophodnim za izvršavanje operacija naplaćivanja. Detalji kreditnih i debitnih kartica će biti prenošeni sigurnim stranicama sa provjerenim sistemom sigurne autorizacije i naplate kartica putem interneta (payment gateway systems) koji su digitalno šifrirani, i time pružaju najveći mogući stepen zaštite dostupan putem trenutne tehnologije.","text2":"Baunad doo Tuzla neće čuvati podatke o Vašim kreditnim i debitnim karticama."},"information":{"heading":"Brisanje I uređivanje podataka","text1":"Nikada ne snimamo video sesije sa ciljem zaštite identiteta klijenata.","text2":"Obrisaćemo sve privatne informacije iz naših sistema ukoliko dobijemo pisani zahtjev od Vas da to učinimo. U tom slučaju sve Vaše private informacije će biti obrisane iz naših sistema bez odgode, osim u slučaju da nam je to zakonom onemogućeno. Molimo Vas da imate na umu da nam je potrebno zadržati neke od informacija zbog održavanja evidencije o poslovanju. Neke od tih rezidualnih informacija će uvijek ostati u našoj evidenciji iako brišemo sve što je moguće izbrisati."},"browser":{"heading":"Internet pretraživač I informacije o upotrebi","text1":"Skupljamo informacije o internet pretraživačima poput: IP adrese, tipa pretraživača, geografske lokacije, vremena provedenog na pojedinim stranicama, informacije o hardveru (u slučaju korištenja mobilnih uređaja prilikom pristupanja stranici) i informacije o operativnom sistemu, u svrhu analiziranja profila korisnika naše stranice i njihovog online ponašanja; posebno izbora sadržaja i usluga. Analiza ovih podataka nam omogućava da bolje razumijemo naše posjetioce kao i da poboljšavamo naš sadržaj i uslugu.","text2":"Informacije koje imamo o ponašanju korisnika nam pomažu i u pronalaženju tehnoloških problema i rješavanju potencijalnih grešaka u procesu plaćanja i naplaćivanja.","text3":"Vaše lične informacije i identifikacioni podaci neće biti uparivani sa ovako prikupljenim informacijama i rezultatima anonimnih i spojenih podataka.","text4":"Nismo vezani Politikom privatnosti ostalih stranica i vanjskih pružatelja usluga koje koristite tokom korištenja naših usluga."},"consent":{"heading":"Suglasnost sa ovom politikom privatnosti","text1":"Korištenjem naših usluga i davanjem Vaših informacija, smatraćemo da ste pročitali, razumjeli i složili se sa našim pravilnikom i načinom rada izloženim u ovoj Politici privatnosti, te da se ona primjenjuje na Vas kao korisnika naših usluga. Time pristajete na prikupljanje, upotrebu i dijeljenje, kao i prenošenje Vaših informacija na način na koji je to opisano ovim pravilnikom. Zadržavamo pravo izmjena, dopuna ili brisanja pojedinih dijelova Politike privatnosti po našem vlastitom nahođenju, u bilo kojem trenutku. Ukoliko se ne slažete sa ovom Politikom privatnosti, Vaš izbor je ne korisiti naše usluge i ne davati nam Vaše informacije.","text2":"Ukoliko korisitite naše usluge u ime nekog drugog, npr. Vašeg djeteta ili drugog entiteta poput poslodavca, smatraćemo da ste ovlašteni od strane takvog entiteta da to činite, (i) da prihvatate ovu Politiku privatnosti u njihovo ime, (ii) da pristajete na prikupljanje, upotrebu i dijeljenje, kao i prenošenje informacija osoba koje zastupate na način na koji je to opisano ovom Politikom privatnosti."},"contact":{"heading":"Kontaktirajte nas","text":"Za upite i informacije o pitanjima zaštite privatnosti možete nas kontaktirati na:"},"address":"Adresa našeg ureda je:","updated":"Ovaj dokument je zadnji put izmjenjen 11. decembra 2017. od kada stupa na snagu."},"checkoutView":{"heading":"Potvrda narudžbe","pleasePay":"Molimo uplatite xxx na bankovni računu:","includeIdData":"Napišite vaše ime, telefon broj / e-poštu i šifru ispod na uplatnicu:","callbackAffirmation":"Mi će mo vas zovnuti da rezerviramo termin za razgovor sa našim psiholozima kada smo primili novac.","invoiceAffirmation":"Dobićete fakturu na vašu e-poštu u roku od 24 sata sa detaljima plaćanja.","item":"Stavka","weeks":"Komada","price":"Cijena","sum":"Suma","packageDiscount":"Popust","sumWithPackageDiscount":"Suma iza popusta","voucherDiscount":"Voucher popust","total":"Ukupno","name":"Ime i prezime","street":"Ulica","postal":"Poštanski broj","city":"Grad","country":"Zemlju","phone":"Telefon","email":"E-pošta","chooseTheme":"Izaberite temu","chooseTime":"Odaberite vrijeme","newsletter":"Da, hvala, želim da dobijam informacije o popustima i drugim ponudama od zdravlje.nu.","agree":"Slažem se sa","i":"i","privacyPolicy":"Politika privatnosti","privacyPolicyLink":"politika privatnosti","thankYou":"Hvala vam na nalogu","rules":"Pravilima i uslovima","rulesLink":"pravilima i uslovima","understand":"Razumijem da imam besplatnu promjenu termina najkasnije 24 sata do početka samog termina","successfulOrder":"Vaša kupovina je uspješna i dobili smo Vašu narudžbu. Uskoro ćemo Vas kontaktirat za inicijalnu besplatnu procjenu i za zakazivanje termina.","feedback":"Molim vas, uzmite trenutak da nam date povratne informacije","impressionWeb":"Kakav je vaš utisak o web stranici","impressionPayment":"Kakav je vaš utisak o procesu plaćanja","otherComments":"Ostali komentari","redirected":"Vratit ćete se natrag na početnu stranicu kada pritisnete ok","comment":"Komentar","creditCard":"Kreditna kartica","invoice":"Faktura","paymentType":"Tip plaćanja","back":"Nazad","placeOrder":"Zakažite","close":"Blizu","issue":"Tema","invoiceText":"Dobićete fakturu poslanu na Vašu e-poštu sa uputama za plaćanje. Kada izvršite uplatu na naš bankovni račun, kontaktirat ćemo Vas za Vaše psihološko savjetovanje.","stripe":{"invalid_number":"Broj kartice nije važeći.","incomplete_number":"Broj kartice nije važeći.","invalid_expiry_month":"Mjesec isteka kartice nije važeći.","invalid_expiry_year":"Godina isteka kartice nije važeći.","invalid_cvc":"Sigurnosni kod kartice je nevažeći.","incomplete_cvc":"Nepotpun cvc.","incomplete_zip":"Nepotpun zip","invalid_swipe_data":"Swipe-podaci kartice su nevažeći.","incorrect_number":"Broj kartice je netačan.","expired_card":"Kartica je istekla.","incorrect_cvc":"Sigurnosni kod kartice je netačan.","incorrect_zip":"Provjera zip-kod kartice nije uspjela.","card_declined":"Kartica je odbijena.","missing":"Nema kartice za kupca koji se naplaćuje.","processing_error":"Došlo je do greške u toku obradu kartice.","incomplete_expiry":"Nepotpun protek.","invalid_expiry_year_past":"Neispravna godina isteka."},"validation":{"\"name\" is required":"Ime i prezime je obavezno","\"name\" is not allowed to be empty":"Ime / prezime je obavezno","\"phone\" is required":"Telefon je potreban","\"phone\" is not allowed to be empty":"Telefon je potreban","\"street\" is required":"Ulica je potrebna","\"street\" is not allowed to be empty":"Ulica je potreban","\"postal\" is required":"Poštanski broj je potreban","\"postal\" is not allowed to be empty":"Poštanski broj je potreban","\"city\" is required":"Grad je potreban","\"city\" is not allowed to be empty":"Grad je potreban","\"mail\" is required":"E-pošta je potrebna","\"mail\" is not allowed to be empty":"E-pošta je potreban","\"mail\" must be a valid email":"E-pošta mora biti važeća adresa e-pošte","wrongRegexFormat":"Greška, pogrešan format"},"issues":{"stress":{"name":"Stres","description":"Jeste li pod stresom i imate li poteškoće u smanjenjem istog?"},"anxiety":{"name":"Sikiracija","description":"Osjećate li da se sikirate i da ne možete podnijeti brigu?"},"exhaustion":{"name":"Iscrpljenost","description":"Imate li poteškoća sa spavanjem, umorom i iscrpljenjošću?"},"backPain":{"name":"Bol","description":"Trebate li pomoć o olakšavanju bola?"},"depression":{"name":"Tuga","description":"Osjećate li se tužno ili sumorno?"},"kids":{"name":"Dijete","description":"Da li vaše dijete ima izlive bijesa?"},"weight":{"name":"Težina","description":"Imate li problema sa tjelesnom težinom?"},"panic":{"name":"Panika","description":"Osjećate li anksioznost ili napad panike?"},"fobia":{"name":"Fobija","description":"Imate li fobije koje vas sprječavaju u životu?"},"violence":{"name":"Konflikt","description":"Ulazite li lako u konflikte i jeste li frustrirani?"},"stuck":{"name":"Zaglavili","description":"Jeste li zaglavili osobno ili profesionalno?"}}}}}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (html) {
  return "\n<!doctype html>\n<html lang=\"bs\">\n  <head>\n    <title>zdravlje.nu</title>\n    <meta charset=\"UTF-8\">\n    <meta name=\"description\" content=\"Privatno savjetovanje za zdrav \u017Eivot\" />\n    <meta name=\"keywords\" content=\"sre\u0107a, zdravlje, uspje\u0161an, uspje\u0161na, stretna, sretan, osje\u0107am, ose\u0107am, nasikiran, nezaposlen, nestretna, nestretan, meditacija, psiholo\u0161ko savjetovanje, nesanica, nervozan, nervozna, mirna, miran online\">\n    <meta name=\"google\" content=\"notranslate\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/icon/favicon-16x16.png\">\n    <link rel=\"shortcut icon\" href=\"favicon2.ico\" />\n    <link rel=\"stylesheet\" href=\"/css/styles.css\" />\n  </head>\n  <body>\n    <div id=\"root\"><div>" + html + "</div></div>\n    <link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=cyrillic,cyrillic-ext,latin-ext\" rel=\"stylesheet\">\n    <script type=\"text/javascript\">\n        var image= new Image(150,20);\n        image.src = '/images/flowers.jpg';\n        var image2= new Image(150,20);\n        image2.src = '/images/reader.jpg';\n    </script>\n    <script async src=\"/static/bundle.js\"></script>\n    <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-111896615-1\"></script>\n    <script>\n        window.dataLayer = window.dataLayer || [];\n        function gtag(){dataLayer.push(arguments);}\n        gtag('js', new Date());\n        gtag('config', 'UA-111896615-1');\n    </script>\n  </body>\n</html>\n";
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _Public = __webpack_require__(16);

var _Public2 = _interopRequireDefault(_Public);

var _styles = __webpack_require__(53);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = exports.App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'app' },
        function () {
          return _this2.props.location.pathname === '/' ? _react2.default.createElement(_Public2.default, { location: _this2.props.location }) : _this2.props.children;
        }()
      );
    }
  }]);

  return App;
}(_react.Component);

App.propTypes = { children: _react.PropTypes.object };

exports.default = (0, _reactRedux.connect)()(App);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _Header = __webpack_require__(17);

var _Header2 = _interopRequireDefault(_Header);

var _Intro = __webpack_require__(23);

var _Intro2 = _interopRequireDefault(_Intro);

var _Payment = __webpack_require__(25);

var _Payment2 = _interopRequireDefault(_Payment);

var _Quote = __webpack_require__(29);

var _Quote2 = _interopRequireDefault(_Quote);

var _Issues = __webpack_require__(31);

var _Issues2 = _interopRequireDefault(_Issues);

var _Quoteimage = __webpack_require__(33);

var _Quoteimage2 = _interopRequireDefault(_Quoteimage);

var _Staff = __webpack_require__(35);

var _Staff2 = _interopRequireDefault(_Staff);

var _HowItWorks = __webpack_require__(38);

var _HowItWorks2 = _interopRequireDefault(_HowItWorks);

var _Newsletter = __webpack_require__(40);

var _Newsletter2 = _interopRequireDefault(_Newsletter);

var _Share = __webpack_require__(47);

var _Share2 = _interopRequireDefault(_Share);

var _Footer = __webpack_require__(49);

var _Footer2 = _interopRequireDefault(_Footer);

var _styles = __webpack_require__(52);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = exports.Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'page' },
                _react2.default.createElement(_Header2.default, { location: this.props.location }),
                _react2.default.createElement(_Intro2.default, { location: this.props.location }),
                _react2.default.createElement(_Quote2.default, null),
                _react2.default.createElement(_Issues2.default, null),
                _react2.default.createElement(_Payment2.default, null),
                _react2.default.createElement(_Quoteimage2.default, null),
                _react2.default.createElement(_Staff2.default, null),
                _react2.default.createElement(_HowItWorks2.default, null),
                _react2.default.createElement(_Share2.default, null),
                _react2.default.createElement(_Newsletter2.default, null),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return Main;
}(_react.Component);

_Header2.default.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Main);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Header = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _reactRouter = __webpack_require__(3);

var _auth = __webpack_require__(18);

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = __webpack_require__(19);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window === undefined) {
    var global = __webpack_require__(20);
    var document = __webpack_require__(21);
    var window = __webpack_require__(22);
}

var Header = exports.Header = function (_Component) {
    _inherits(Header, _Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.state = {
            adminActive: 'sessions',
            logoutIsVisible: false,
            menu: 'close',
            languages: [{
                code: "ba-BA",
                name: "bosnian",
                flag: "https://lipis.github.io/flag-icon-css/flags/4x3/ba.svg"
            }, {
                code: "en-US",
                name: "english",
                flag: "https://lipis.github.io/flag-icon-css/flags/4x3/um.svg"
            }]
        };

        _this.handleLogout = _this.handleLogout.bind(_this);
        _this.navToggle = _this.navToggle.bind(_this);
        _this.closeMobileMenu = _this.closeMobileMenu.bind(_this);
        _this.renderFlags = _this.renderFlags.bind(_this);
        _this.updateLanguage = _this.updateLanguage.bind(_this);
        _this.openLanguage = _this.openLanguage.bind(_this);
        _this.activateAdminMenu = _this.activateAdminMenu.bind(_this);
        return _this;
    }

    _createClass(Header, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.dispatch((0, _auth.ping)());

            if (window.localStorage.getItem('lang')) {
                this.updateLanguage(JSON.parse(window.localStorage.getItem('lang')));
            }

            this.setState({ adminActive: this.props.location.pathname.replace('/', '') });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ logoutIsVisible: nextProps.isAuthenticated });
        }
    }, {
        key: 'openLanguage',
        value: function openLanguage() {
            var picker = document.querySelector('.languagepicker');
            picker.classList.toggle('open');
        }
    }, {
        key: 'updateLanguage',
        value: function updateLanguage(event) {
            var id = event.currentTarget.id;
            var languages = this.state.languages;
            var i = this.state.languages.map(function (lang) {
                return lang.code;
            }).indexOf(id);
            var storage = { currentTarget: { id: id } };
            var stringified = JSON.stringify(storage);
            var objectFound = languages[i];

            if (i === 0) return;

            if (i > 0) {
                languages.splice(i, 1);
            }

            languages.unshift(objectFound);
            languages.length = Math.min(languages.length, 2);

            this.setState({ languages: languages }, function () {
                window.localStorage.setItem('lang', stringified);
                _i18n2.default.changeLanguage(id);
            });
        }
    }, {
        key: 'renderFlags',
        value: function renderFlags() {
            var _this2 = this;

            var t = this.props.t;


            return this.state.languages.map(function (item, i) {
                return _react2.default.createElement(
                    'span',
                    { key: i, onClick: _this2.updateLanguage, id: item.code },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'flag-wrapper' },
                            _react2.default.createElement('img', { src: item.flag })
                        ),
                        t('' + item.name)
                    )
                );
            });
        }
    }, {
        key: 'closeMobileMenu',
        value: function closeMobileMenu() {
            var nav = document.getElementById("topNav");
            var close = document.getElementById("closebtn");
            var header = document.querySelector('.header');
            var menuText = document.querySelector('.menu-text');
            var menuIcon = close.children;

            if (this.props.location.pathname !== '/') return;

            for (var i = 0; i < menuIcon.length; i++) {
                menuIcon[i].classList.remove("active");
            }

            this.setState({ menu: 'close' });
            header.classList.remove('show');
            nav.classList.remove('show');
            nav.classList.add('close');
            header.classList.add('close');
            menuText.style.opacity = 1;
        }
    }, {
        key: 'navToggle',
        value: function navToggle() {
            var nav = document.getElementById("topNav");
            var close = document.getElementById("closebtn");
            var header = document.querySelector('.header');
            var menuText = document.querySelector('.menu-text');
            var menuIcon = close.children;

            for (var i = 0; i < menuIcon.length; i++) {
                menuIcon[i].classList.toggle("active");
            }

            if (this.state.menu === 'close') {
                this.setState({ menu: 'show' });
                header.classList.remove('close');
                nav.classList.remove('close');
                header.classList.add('show');
                nav.classList.add('show');
                menuText.style.opacity = 0;
            } else if (this.state.menu === 'show') {
                this.setState({ menu: 'close' });
                header.classList.remove('show');
                nav.classList.remove('show');
                nav.classList.add('close');
                header.classList.add('close');
                menuText.style.opacity = 1;
            }
        }
    }, {
        key: 'handleLogout',
        value: function handleLogout(event) {
            event.preventDefault();
            this.props.dispatch((0, _auth.logout)());
        }
    }, {
        key: 'renderMenu',
        value: function renderMenu() {
            var t = this.props.t;


            var issueHref = typeof window.orientation !== 'undefined' ? '/#usluge-mobile' : '/#usluge';

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'nav',
                    { className: 'main-menu' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: issueHref },
                        t('services')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/#cijene' },
                        t('prices')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/#kakoradi' },
                        t('howWork')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/#kosmomi' },
                        t('whoAreWe')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/kontakt' },
                        'Kontakt'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'topNav', className: 'navigation' },
                    _react2.default.createElement(
                        'span',
                        { id: 'closebtn', onClick: this.navToggle },
                        _react2.default.createElement('span', { className: 'line1' }),
                        _react2.default.createElement('span', { className: 'line2' }),
                        _react2.default.createElement('span', { className: 'line3' }),
                        _react2.default.createElement(
                            'span',
                            { className: 'menu-text' },
                            t('menu')
                        )
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'menulist' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: issueHref },
                                t('services')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { onClick: this.closeMobileMenu, className: 'menuitems', to: '/#kosmomi' },
                                t('whoAreWe')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/#cijene' },
                                t('prices')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/#kakoradi' },
                                t('howWork')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/#kosmomi' },
                                t('whoAreWe')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/kontakt' },
                                'Kontakt'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'activateAdminMenu',
        value: function activateAdminMenu(event) {
            this.setState({ adminActive: event.target.id });
        }
    }, {
        key: 'renderAdminMenu',
        value: function renderAdminMenu() {
            var t = this.props.t;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'nav',
                    { className: 'main-menu' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'menuitem' + (this.state.adminActive === 'admin' ? '-active' : ''), id: 'sessions', onClick: this.activateAdminMenu, to: '/admin' },
                        'Sesija'
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'menuitem' + (this.state.adminActive === 'workshop' ? '-active' : ''), id: 'workshop', onClick: this.activateAdminMenu, to: '/workshop' },
                        'Radionica'
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'menuitem' + (this.state.adminActive === 'newsletters' ? '-active' : ''), id: 'newsletters', onClick: this.activateAdminMenu, to: '/newsletters' },
                        'E-po\u0161ta lista'
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'menuitem' + (this.state.adminActive === 'messages' ? '-active' : ''), id: 'messages', onClick: this.activateAdminMenu, to: '/messages' },
                        'Poruke'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'topNav', className: 'navigation' },
                    _react2.default.createElement(
                        'span',
                        { id: 'closebtn', onClick: this.navToggle },
                        _react2.default.createElement('span', { className: 'line1' }),
                        _react2.default.createElement('span', { className: 'line2' }),
                        _react2.default.createElement('span', { className: 'line3' }),
                        _react2.default.createElement(
                            'span',
                            { className: 'menu-text' },
                            t('menu')
                        )
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'menulist' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/admin' },
                                'Sesija'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/workshop' },
                                'Radionica'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/newsletters' },
                                'E-po\u0161ta lista'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'menuitems', to: '/messages' },
                                'Poruke'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var t = this.props.t;

            var headerClass = this.props.location.pathname === '/admin' ? 'header admin-header' : 'header';

            var logoutBtn = this.props.location.pathname === '/admin' || this.props.location.pathname === '/newsletters' || this.props.location.pathname === '/workshop' ? 'auth-controls is-visible' : 'auth-controls is-hidden';

            return _react2.default.createElement(
                'header',
                { className: headerClass },
                _react2.default.createElement(
                    'div',
                    { className: logoutBtn },
                    _react2.default.createElement(
                        'a',
                        { className: 'auth', onClick: this.handleLogout },
                        'Odjaviti se'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'logo-text' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/kontakt' },
                        t('contactUs')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/hitna-pomoc' },
                        t('emergency')
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'contact' },
                    _react2.default.createElement(
                        'span',
                        null,
                        t('callUs'),
                        ' 08.00 - 17.00'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '+387 603 21 22 90 \xA0|\xA0 +387 66 23 60 83'
                    )
                ),
                _react2.default.createElement(
                    'h1',
                    { className: 'logo' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/' },
                        _react2.default.createElement(
                            'svg',
                            { xmlns: 'http://www.w3.org/2000/svg', width: '411.445', height: '101.206', viewBox: '0 0 411.445 101.206' },
                            _react2.default.createElement(
                                'g',
                                { fill: '#BF4D9C' },
                                _react2.default.createElement('path', { d: 'M353.906 70.17c0 .52-.182.962-.547 1.327-.366.363-.808.547-1.325.547-.52 0-.96-.184-1.326-.547-.366-.365-.548-.807-.548-1.326 0-.517.182-.958.547-1.323s.806-.547 1.325-.547c.518 0 .96.182 1.324.547s.546.806.546 1.324zM358.455 58.636c1.168-.904 2.545-1.357 4.127-1.357.922 0 1.8.18 2.63.54.83.36 1.56.85 2.194 1.47s1.135 1.35 1.504 2.188c.37.838.553 1.732.553 2.682v6.5c0 .387-.135.715-.402.982s-.59.402-.968.402c-.387 0-.715-.135-.982-.402s-.402-.596-.402-.982v-6.5c0-.562-.11-1.094-.328-1.594-.22-.502-.518-.94-.89-1.312s-.812-.67-1.313-.89c-.5-.22-1.033-.33-1.594-.33-.572 0-1.105.108-1.604.323-.497.215-.935.512-1.312.89-.38.378-.676.817-.89 1.32-.216.5-.323 1.03-.323 1.593v6.5c0 .387-.135.715-.402.982s-.592.402-.97.402c-.386 0-.714-.135-.98-.402s-.403-.596-.403-.982V58.663c0-.38.135-.703.402-.977.268-.27.596-.408.982-.408.377 0 .7.137.97.408.266.274.4.59.4.95zM383.898 72.044c-.395 0-.72-.133-.975-.396-.256-.264-.387-.584-.396-.96-.605.474-1.248.817-1.924 1.032-.678.217-1.41.324-2.2.324-.942 0-1.83-.184-2.665-.547-.836-.365-1.564-.86-2.188-1.484-.625-.623-1.12-1.354-1.484-2.188-.365-.836-.547-1.723-.547-2.664v-6.51c0-.38.134-.702.4-.97.27-.27.597-.402.983-.402.377 0 .7.133.97.402.267.268.4.59.4.97v6.51c0 .573.108 1.108.323 1.61.215.5.51.938.883 1.31.374.376.81.67 1.31.886.503.215 1.038.322 1.61.322.56 0 1.094-.107 1.594-.322.502-.217.94-.512 1.318-.89.38-.378.676-.815.89-1.313.216-.496.323-1.03.323-1.602v-6.51c0-.38.135-.702.402-.97.268-.27.596-.402.982-.402.376 0 .7.133.968.402.268.268.402.59.402.97V70.67c0 .377-.135.7-.402.97s-.593.402-.98.402z' })
                            ),
                            _react2.default.createElement(
                                'g',
                                { stroke: '#FFF', strokeMiterlimit: '10' },
                                _react2.default.createElement('path', { fill: '#AEDDF7', strokeWidth: '.5', d: 'M63.257 30.648s67.386-15.35 128.417 18.68C283.01 100.26 386.407 78.672 404.987 76.1c0 0-105.277 4.627-185.787-31.324C138.69 8.83 70.068 28.596 63.257 30.648z' }),
                                _react2.default.createElement('path', { fill: '#036096', d: 'M-4.595 40.04S119.668-7.594 206.45 48.932c74.793 48.71 210.104 33.017 210.104 33.017s-58.002 2.592-119.79-11.527c-18.687-4.27-51.4-11.566-83.895-32.835-90.504-59.25-217.465 2.45-217.465 2.45z' }),
                                _react2.default.createElement('path', { fill: '#40A5DC', d: 'M6.31 42.442s123.614-49.11 210.335 5.41c74.946 47.117 211 39.29 211 39.29s-127.106.515-203.87-45.84C132.045-14.08 6.31 42.443 6.31 42.443z' })
                            ),
                            _react2.default.createElement(
                                'g',
                                { fill: '#C14D9C', stroke: '#FFF', strokeWidth: '3', strokeMiterlimit: '10' },
                                _react2.default.createElement('path', { d: 'M78.632 74.06h-30.02c-.58 0-1.12-.105-1.62-.316-.502-.21-.937-.508-1.306-.89-.37-.382-.66-.825-.87-1.325-.21-.503-.316-1.03-.316-1.583 0-.977.277-1.832.83-2.57L69.814 38.03h-21.2c-1.107 0-2.063-.402-2.867-1.207-.805-.804-1.207-1.786-1.207-2.946 0-1.134.4-2.103 1.206-2.907.804-.804 1.76-1.206 2.867-1.206h30.02c.58 0 1.12.105 1.62.316.5.21.937.508 1.306.89.368.383.665.824.89 1.325.223.5.335 1.028.335 1.582 0 1.08-.33 1.99-.99 2.73l-24.44 29.19H78.63c1.133 0 2.096.4 2.887 1.204s1.186 1.774 1.186 2.91c0 1.16-.396 2.14-1.187 2.944s-1.755 1.206-2.888 1.206zM108.532 29.762c5.247 0 9.874 1.62 13.882 4.865V14.89c0-1.186.39-2.168 1.167-2.945s1.76-1.167 2.948-1.167c1.16 0 2.142.39 2.947 1.167.804.777 1.206 1.76 1.206 2.946v37.02c0 6.17-2.16 11.392-6.485 15.663-4.377 4.324-9.598 6.486-15.662 6.486-6.117 0-11.338-2.163-15.662-6.487-4.324-4.324-6.485-9.545-6.485-15.662s2.162-11.337 6.486-15.662c4.324-4.324 9.545-6.486 15.662-6.486zm13.883 22.15c0-1.9-.363-3.687-1.087-5.36-.726-1.674-1.714-3.145-2.967-4.41s-2.722-2.267-4.41-3.006c-1.687-.737-3.493-1.107-5.417-1.107-1.952 0-3.77.37-5.458 1.106-1.688.74-3.15 1.735-4.39 2.987-1.24 1.252-2.222 2.723-2.947 4.41s-1.087 3.48-1.087 5.38.363 3.69 1.088 5.378 1.707 3.16 2.947 4.41c1.24 1.253 2.703 2.25 4.39 2.987 1.687.738 3.506 1.107 5.458 1.107 1.924 0 3.73-.37 5.418-1.107 1.688-.738 3.158-1.74 4.41-3.006s2.242-2.735 2.968-4.41c.724-1.675 1.087-3.46 1.087-5.36zM145.117 33.875v.79c1.978-1.58 4.126-2.794 6.447-3.638 2.32-.844 4.8-1.266 7.436-1.266 1.16 0 2.406.08 3.737.238s2.558.44 3.68.85c1.12.41 2.05.97 2.787 1.682.738.712 1.107 1.635 1.107 2.77 0 .58-.11 1.12-.335 1.62-.225.502-.52.943-.89 1.325-.37.383-.805.68-1.305.89-.5.212-1.042.316-1.622.316-.5 0-1.082-.144-1.74-.434-1.66-.66-3.467-.99-5.418-.99-1.925 0-3.73.364-5.418 1.09-1.688.725-3.158 1.714-4.41 2.966-1.253 1.252-2.242 2.723-2.967 4.41s-1.087 3.492-1.087 5.418v18.035c0 1.133-.402 2.102-1.207 2.906s-1.772 1.208-2.906 1.208c-1.16 0-2.143-.402-2.947-1.207s-1.206-1.772-1.206-2.905v-36.07c0-1.134.403-2.103 1.207-2.907.804-.804 1.786-1.206 2.947-1.206 1.133 0 2.103.402 2.907 1.206.804.805 1.207 1.774 1.207 2.907zM211.008 69.946v-.79c-1.978 1.58-4.127 2.794-6.447 3.638-2.32.844-4.798 1.266-7.435 1.266-6.117 0-11.338-2.162-15.662-6.486-4.325-4.324-6.486-9.545-6.486-15.662s2.162-11.338 6.486-15.663c4.324-4.325 9.545-6.487 15.662-6.487 6.064 0 11.285 2.162 15.662 6.486 4.324 4.323 6.486 9.544 6.486 15.662v18.035c0 1.133-.402 2.102-1.206 2.906-.805.805-1.773 1.207-2.907 1.207-1.16 0-2.143-.402-2.946-1.207-.804-.805-1.206-1.774-1.206-2.907zm-13.882-31.918c-1.952 0-3.77.37-5.458 1.107-1.688.74-3.15 1.735-4.39 2.987-1.24 1.252-2.222 2.723-2.947 4.41s-1.086 3.48-1.086 5.38.362 3.69 1.087 5.378 1.708 3.158 2.948 4.41c1.24 1.252 2.703 2.248 4.39 2.986 1.687.738 3.506 1.107 5.458 1.107 1.924 0 3.73-.37 5.418-1.107 1.687-.738 3.157-1.74 4.41-3.006s2.24-2.736 2.967-4.41c.726-1.676 1.088-3.46 1.088-5.36s-.363-3.685-1.087-5.358c-.725-1.674-1.713-3.145-2.966-4.41s-2.723-2.267-4.41-3.006c-1.687-.738-3.494-1.108-5.418-1.108zM243.756 74.06c-1.74 0-2.953-.738-3.64-2.215L223.43 35.537c-.212-.554-.316-1.107-.316-1.66s.104-1.082.316-1.583c.21-.5.5-.942.87-1.325.368-.383.804-.68 1.305-.89s1.042-.317 1.622-.317c.71 0 1.396.178 2.057.534.658.355 1.172.863 1.542 1.522l12.933 28.2 12.895-28.162c.764-1.396 1.965-2.096 3.6-2.096.58 0 1.12.105 1.62.316.5.21.937.508 1.306.89.37.383.666.824.89 1.325.224.5.337 1.028.337 1.582 0 .606-.12 1.16-.355 1.66l-16.652 36.31c-.742 1.476-1.955 2.215-3.642 2.215zM270.215 69.946V14.93c0-1.16.39-2.142 1.168-2.946.777-.804 1.76-1.206 2.945-1.206 1.188 0 2.17.402 2.947 1.206.777.805 1.166 1.787 1.166 2.946v50.864h1.9c1.134 0 2.103.4 2.907 1.205.803.804 1.205 1.786 1.205 2.946 0 1.133-.402 2.102-1.205 2.906-.805.805-1.773 1.207-2.908 1.207h-6.052c-1.135 0-2.096-.403-2.887-1.208s-1.185-1.773-1.185-2.906zM303.44 33.915v39.948c0 2.61-.51 5.074-1.524 7.395-1.016 2.32-2.393 4.352-4.133 6.092s-3.77 3.117-6.092 4.133c-2.32 1.014-4.784 1.523-7.394 1.523-1.188 0-2.17-.396-2.947-1.188s-1.167-1.78-1.167-2.967c0-1.185.39-2.167 1.166-2.944.776-.78 1.76-1.168 2.946-1.168 1.502 0 2.912-.283 4.23-.85 1.318-.568 2.473-1.346 3.46-2.334s1.774-2.143 2.355-3.46.872-2.73.872-4.23v-39.95c0-1.158.4-2.14 1.205-2.945.805-.805 1.773-1.207 2.908-1.207 1.133 0 2.102.402 2.906 1.206.807.803 1.21 1.785 1.21 2.945zm.75-12.024c0 1.347-.476 2.493-1.425 3.442s-2.096 1.424-3.44 1.424c-1.345 0-2.49-.475-3.44-1.424s-1.424-2.096-1.424-3.44c0-1.345.476-2.492 1.425-3.44s2.096-1.425 3.44-1.425c1.345 0 2.49.475 3.44 1.424s1.424 2.097 1.424 3.44zM343.188 61.6c1.186 0 2.168.39 2.945 1.167.777.78 1.168 1.762 1.168 2.947 0 1.16-.395 2.148-1.187 2.967-4.086 3.587-8.912 5.38-14.475 5.38-6.117 0-11.338-2.162-15.662-6.486s-6.486-9.545-6.486-15.662 2.162-11.338 6.486-15.663 9.545-6.487 15.662-6.487c6.064 0 11.285 2.162 15.662 6.486 2.162 2.135 3.783 4.515 4.865 7.138 1.08 2.623 1.62 5.465 1.62 8.523 0 1.187-.4 2.17-1.206 2.946-.806.78-1.788 1.168-2.946 1.168H318.31c.447 1.45 1.107 2.775 1.977 3.975.87 1.198 1.893 2.228 3.064 3.083 1.175.857 2.468 1.523 3.878 1.998s2.88.714 4.41.714c1.74 0 3.334-.264 4.785-.79 1.45-.528 2.795-1.32 4.035-2.374.792-.66 1.7-1.002 2.73-1.03zm1.78-13.802c-.45-1.45-1.114-2.775-2-3.975-.882-1.2-1.91-2.23-3.083-3.086-1.174-.856-2.467-1.522-3.877-1.997s-2.867-.713-4.37-.713c-1.503 0-2.966.238-4.39.713s-2.73 1.14-3.916 1.997c-1.186.857-2.215 1.885-3.084 3.086-.87 1.2-1.518 2.523-1.938 3.975h26.657z' })
                            )
                        )
                    )
                ),
                function () {
                    if (_this3.props.location.pathname !== '/' && _this3.props.location.pathname !== '/checkout' && location.pathname !== '/blogovi' && location.pathname !== '/kontakt' && location.pathname !== '/login' && location.pathname !== '/cookies' && location.pathname !== '/politika-privatnosti' && location.pathname !== '/tac' && location.pathname !== '/faq' && location.pathname !== '/hitna-pomoc') {
                        return _this3.renderAdminMenu();
                    } else {
                        return _this3.renderMenu();
                    }
                }(),
                _react2.default.createElement(
                    'div',
                    { className: 'language' },
                    _react2.default.createElement(
                        'ul',
                        { onClick: this.openLanguage, className: 'languagepicker roundborders large' },
                        this.renderFlags()
                    )
                )
            );
        }
    }]);

    return Header;
}(_react.Component);

Header.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {
        credentials: state.auth.credentials,
        isAuthenticated: state.auth.isAuthenticated
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('headerView')(Header));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ping = exports.gotoLogout = exports.logout = exports.register = exports.login = undefined;

var _axios = __webpack_require__(4);

var request = _interopRequireWildcard(_axios);

var _reduxSimpleRouter = __webpack_require__(7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var login = exports.login = function login(credentials) {
    return function (dispatch) {
        return request.post('/auth/login', credentials).then(function (_ref) {
            var data = _ref.data;

            dispatch(_reduxSimpleRouter.routeActions.replace('/admin'));
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var register = exports.register = function register(credentials) {
    return function (dispatch) {
        return request.post('/auth/signup', credentials).then(function (_ref2) {
            var data = _ref2.data;

            dispatch(_reduxSimpleRouter.routeActions.replace('/login'));
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var logout = exports.logout = function logout(auth) {
    return function (dispatch) {
        return request.get('auth/logout').then(function (_ref3) {
            var data = _ref3.data;

            dispatch(_reduxSimpleRouter.routeActions.replace('/'));
            dispatch({
                type: 'AUTH_LOGOUT',
                payload: data
            });

            dispatch(gotoLogout());
        }).catch(function (error) {
            console.log(error);
        });
    };
};

var gotoLogout = exports.gotoLogout = function gotoLogout() {
    return function (dispatch) {
        dispatch(_reduxSimpleRouter.routeActions.replace('/'));
    };
};

var ping = exports.ping = function ping() {
    return function (dispatch) {
        return request.get('/auth/ping').then(function (data) {
            dispatch({
                type: 'AUTH_INFO',
                payload: data.data
            });
        });
    };
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("global");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("global/document");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("global/window");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hero = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(3);

var _reactI18next = __webpack_require__(2);

var _encounter = __webpack_require__(8);

var _styles = __webpack_require__(24);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = exports.Hero = function (_Component) {
    _inherits(Hero, _Component);

    function Hero(props) {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props));

        _this.state = {};

        _this.handleCookie = _this.handleCookie.bind(_this);
        return _this;
    }

    _createClass(Hero, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                var hasCookie = window.localStorage.getItem('cookie');
                var cookieWrapper = _this2.refs['cookie-wrapper'];

                if (!hasCookie) {
                    cookieWrapper.classList.add('visible');
                }
            }, 2000);
        }
    }, {
        key: 'handleCookie',
        value: function handleCookie() {
            var cookieWrapper = this.refs['cookie-wrapper'];
            cookieWrapper.classList.remove('visible');
            window.localStorage.setItem('cookie', true);
        }
    }, {
        key: 'render',
        value: function render() {
            var t = this.props.t;


            return _react2.default.createElement(
                'div',
                { className: 'introduction' },
                _react2.default.createElement(
                    'div',
                    { ref: 'cookie-wrapper', className: 'cookie-wrapper' },
                    _react2.default.createElement(
                        'p',
                        null,
                        t('cookieText')
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.handleCookie },
                        'OK'
                    )
                ),
                _react2.default.createElement('img', { src: '/images/flowers.jpg', alt: 'hero-image' }),
                _react2.default.createElement(
                    'div',
                    { className: 'text-wrapper' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'heading' },
                        t('heading')
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'preamble' },
                        t('preamble')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '#cijene', className: 'intro-button' },
                        t('start')
                    )
                )
            );
        }
    }]);

    return Hero;
}(_react.Component);

Hero.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('introView')(Hero));

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Payment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _reactRouter = __webpack_require__(3);

var _reduxSimpleRouter = __webpack_require__(7);

var _encounter = __webpack_require__(8);

var _config = __webpack_require__(26);

var _payment = __webpack_require__(27);

var _styles = __webpack_require__(28);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Payment = exports.Payment = function (_Component) {
    _inherits(Payment, _Component);

    function Payment(props) {
        _classCallCheck(this, Payment);

        var _this = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this, props));

        _this.state = {
            language: 'KM',
            packageFactor: 0.05,
            paypalFactor: 1,
            durationSkype: 's',
            isDirty: false,
            cost: {
                email: 0,
                skype: 40,
                total: 114
            },
            languages: [{
                code: 'bam',
                currency: 'KM',
                rate: 1
            }, {
                code: 'eur',
                currency: '€',
                rate: 2
            }, {
                code: 'hrk',
                currency: 'kn',
                rate: 1 / 4
            }, {
                code: 'rsd',
                currency: 'RSD',
                rate: 1 / 60
            }, {
                code: 'sek',
                currency: 'kr',
                rate: 1 / 5
            }, {
                code: 'usd',
                currency: '$',
                rate: 1.6
            }]
        };

        _this.handlePackage = _this.handlePackage.bind(_this);
        _this.handleWeeks = _this.handleWeeks.bind(_this);
        _this.handleSkypeDuration = _this.handleSkypeDuration.bind(_this);
        _this.handleCheckout = _this.handleCheckout.bind(_this);
        _this.resetCheckout = _this.resetCheckout.bind(_this);
        _this.getData = _this.getData.bind(_this);
        _this.handlePromoCode = _this.handlePromoCode.bind(_this);
        _this.renderCurrencies = _this.renderCurrencies.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }

    _createClass(Payment, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.setState(this.createInitialState(), function () {
                var skype = _this2.state.skype;
                skype.s.active = true;
                _this2.setState({ skype: skype });
                _this2.setState({ data: _this2.getData() });
                _this2.props.dispatch((0, _config.getStripeToken)());
                _this2.props.dispatch((0, _config.getPaypalEnv)());
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            window.localStorage.setItem('st', nextProps.stripeToken);
            window.localStorage.setItem('pe', nextProps.paypalEnv);
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'handlePromoCode',
        value: function handlePromoCode(e) {
            var _this3 = this;

            this.setState({ enteredCode: e.target.value }, function () {
                _this3.updateEncounter();
            });
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'resetCheckout',
        value: function resetCheckout() {
            this.setState(this.createInitialState());
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'handleCheckout',
        value: function handleCheckout() {
            var _this4 = this;

            this.setState({ data: this.getData() }, function () {
                window.localStorage.setItem('order', JSON.stringify(_this4.state));
                window.localStorage.setItem('step', '1');
                _this4.props.dispatch(_reduxSimpleRouter.routeActions.push('/checkout'));
            });
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @return {object}
         */

    }, {
        key: 'createInitialState',
        value: function createInitialState() {
            return {
                checkout: false,
                combinationDiscount: 0,
                promoDiscount: 0,
                emailDiscount: 0,
                promoCode: 'zdr12',
                promoDiscountFactor: 0.33,
                enteredCode: '',
                durationText: false,
                code: '',
                skype: {
                    s: { active: false, cost: 60, week: 1, code: '1', description: '1 Skype poziva' },
                    m: { active: false, cost: 171, week: 3, code: '3', description: 'Paket za 3 skype poziva' },
                    l: { active: false, cost: 444, week: 8, code: '8', description: 'Paket za 8 Skype poziva' }
                },
                email: {
                    s: { active: false, cost: 40, week: 1, code: '24', description: 'E-posta, odgovor u toku 24 sata' },
                    m: { active: false, cost: 110, week: 1, code: '04', description: 'E-posta, odgovor u toku 4 sata' }
                },
                skypeDuration: {
                    s: { length: 20, active: true, factor: 0.666666, code: '20' },
                    l: { length: 45, active: false, factor: 1, code: '45' }
                },
                lastSize: { skype: 's', email: '' }
            };
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'resetPackage',
        value: function resetPackage(type, lastSize) {
            var resetObj = this.state[type];

            if (lastSize[type].length) {
                resetObj[lastSize[type]] = this.createInitialState()[type][lastSize[type]];
            }

            this.setState({ resetObj: resetObj });
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'handlePackage',
        value: function handlePackage(e) {
            var type = e.target.id.split('-')[0];
            var size = e.target.id.split('-')[1];
            var lastSize = this.state.lastSize;

            if (size !== lastSize[type] || e.currentTarget.checked) {
                this.resetPackage(type, lastSize);
            }

            this.setCategorySize(size, type);
            var cost = this.calculateCost();

            var showDurationText = this.skypePackage ? this.skypePackage.cost === 0 : true;

            this.setState({ durationText: showDurationText, cost: cost });
            this.updateEncounter();
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {number}
         */

    }, {
        key: 'calculateEmailDiscount',
        value: function calculateEmailDiscount(_package) {
            var factor = void 0;

            switch (true) {
                case _package.week === 2:
                    factor = .05;
                    break;
                case _package.week === 3:
                    factor = .075;
                    break;
                case _package.week === 4:
                    factor = .1;
                    break;
                case _package.week > 4:
                    factor = .125;
                    break;
                default:
                    factor = 0;
            }

            return _package.cost * (1 - factor) * _package.week;
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {object} data
         */

    }, {
        key: 'getData',
        value: function getData() {
            var _this5 = this;

            var active = {};
            var keys = ['skype', 'email', 'skypeDuration'];

            Object.keys(this.state).filter(function (key) {
                return Object.keys(_this5.state[key]).filter(function (subKey) {
                    if (keys.includes(key)) {
                        if (_this5.state[key][subKey].active === true) {
                            active[key] = _this5.state[key][subKey];
                        }
                    }
                });
            });

            active.packageDiscount = this.packageDiscount;
            active.promoDiscount = this.promoDiscount;

            return active;
        }
    }, {
        key: 'calculateDiscounts',
        value: function calculateDiscounts(skypeCost, emailCost) {
            var packageFactor = 1;
            var promoFactor = 1;
            var skypeDiscount = 0;
            var emailDiscount = 0;

            if (skypeCost > 0 && emailCost > 0) {
                packageFactor = 0.95;
                this.packageDiscount = Math.round(emailCost - Math.round(emailCost * 0.95) + skypeCost - Math.round(skypeCost * 0.95));
            } else {
                delete this.packageDiscount;
            }

            if (this.state.enteredCode.toLowerCase() === this.state.promoCode) {
                skypeDiscount = skypeCost * this.state.promoDiscountFactor;
                emailDiscount = emailCost * this.state.promoDiscountFactor;
                promoFactor = 0.33;

                this.promoDiscount = skypeCost > 0 && emailCost > 0 ? Math.round((emailDiscount + skypeDiscount) * 0.95) : Math.round(emailDiscount + skypeDiscount);
            } else {
                promoFactor = 1;
                delete this.promoDiscount;
            }

            return { promoFactor: promoFactor, packageFactor: packageFactor };
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {object} cost
         */

    }, {
        key: 'calculateCost',
        value: function calculateCost() {
            var email = this.state.email;
            var skype = this.state.skype;
            var skypeDuration = this.state.skypeDuration.s.active ? 's' : 'l';

            var emailCost = 0;
            var skypeCost = 0;

            var emailWeeks = 1;
            var skypeWeeks = 1;

            var amount = {};

            this.skypePackage = skype[Object.keys(skype).filter(function (key) {
                return skype[key].active;
            })[0]];

            this.emailPackage = email[Object.keys(email).filter(function (key) {
                return email[key].active;
            })[0]];

            if (this.skypePackage) {
                skypeWeeks = this.skypePackage.week;
                skypeCost = this.skypePackage.cost * this.state.skypeDuration[skypeDuration].factor;
            }

            if (this.emailPackage) {
                emailWeeks = this.emailPackage.week;
                emailCost = this.calculateEmailDiscount(this.emailPackage);
            }

            var discount = this.calculateDiscounts(skypeCost, emailCost);

            amount.skype = Math.round(skypeCost / skypeWeeks * discount.promoFactor * discount.packageFactor / (0, _payment.getSelectedCurrency)(this.state)[0].rate);
            amount.email = Math.round(emailCost / emailWeeks * discount.promoFactor * discount.packageFactor / (0, _payment.getSelectedCurrency)(this.state)[0].rate);
            amount.total = (0, _payment.getTotal)(this.state);

            return amount;
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'handleWeeks',
        value: function handleWeeks(e) {
            var type = e.target.id.split('-')[0];
            var size = e.target.id.split('-')[1];
            var email = this.state.email;
            var factor = type === 'add' ? 1 : -1;

            if (email[size].week === 1 && type !== 'add') return;
            email[size].week = email[size].week + factor;

            this.setState({ email: email });
            this.updateEncounter();
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'updateEncounter',
        value: function updateEncounter() {
            var data = this.getData();
            var email = this.state.email;
            var cost = this.calculateCost();
            var emailPackage = email[Object.keys(email).filter(function (key) {
                return email[key].active;
            })[0]];

            var emailDiscount = 0;
            var promoDiscount = 0;

            if (this.state.enteredCode === this.state.promoCode) {
                promoDiscount = this.state.promoDiscount;
            }

            if (emailPackage) {
                emailDiscount = this.calculateEmailDiscount(emailPackage);
                this.setState({ emailDiscount: emailDiscount });
            }

            this.setState({ data: data, cost: cost });
            this.props.dispatch((0, _encounter.setEncounterData)(data, cost, emailDiscount, promoDiscount));
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'setCategorySize',
        value: function setCategorySize(size, type) {
            var category = this.state[type];
            var lastSize = this.state.lastSize;

            category[size].active = !category[size].active;
            lastSize[type] = size;

            this.setState({ category: category, lastSize: lastSize });
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {void}
         */

    }, {
        key: 'handleSkypeDuration',
        value: function handleSkypeDuration(e) {
            var size = e.currentTarget.id.split('-')[1];
            var skypeDuration = this.state.skypeDuration;

            skypeDuration.s.active = size === 's';
            skypeDuration.l.active = size === 'l';

            this.setState({ skypeDuration: skypeDuration });
            this.updateEncounter();
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(e) {
            var children = Array.prototype.slice.call(e.target.children);
            var currency = children.filter(function (child) {
                return child.selected === true;
            });
            this.setState({ language: currency[0]['attributes']['data-id']['nodeValue'], isDirty: true });
        }
    }, {
        key: 'renderCurrencies',
        value: function renderCurrencies() {
            var _this6 = this;

            return this.state.languages.map(function (country, i) {
                return _react2.default.createElement(
                    'option',
                    { key: i, 'data-id': country.currency, selected: _this6.state.language === country.currency, value: country.code },
                    country.code.toUpperCase()
                );
            });
        }

        /**
         * This callback type is called `requestCallback
         * @callback requestCallback
         * @param {number} responseCode
         * @return {node}
         */

    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var t = this.props.t;

            var order = this.calculateCost();
            var buttonStyle = order.total === 0 ? 'checkout-button disabled' : 'checkout-button';

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'cijene', className: 'payment' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'heading' },
                        t('heading')
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'preamble' },
                        t('intro')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'payment-type-wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container skype' },
                            _react2.default.createElement(
                                'h4',
                                { className: 'category-heading' },
                                'Online video'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper' },
                                _react2.default.createElement('input', {
                                    id: 'skype-s',
                                    type: 'checkbox',
                                    name: 'skype',
                                    checked: this.state.skype.s.active,
                                    onClick: this.handlePackage
                                }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'skype-s' },
                                    '1 ',
                                    t('skypeWeek')
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper' },
                                _react2.default.createElement('input', {
                                    id: 'skype-m',
                                    type: 'checkbox',
                                    name: 'skype',
                                    checked: this.state.skype.m.active,
                                    onClick: this.handlePackage
                                }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'skype-m' },
                                    t('packageWith'),
                                    ' 3 ',
                                    t('skypeWeeks')
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper' },
                                _react2.default.createElement('input', {
                                    id: 'skype-l',
                                    type: 'checkbox',
                                    name: 'skype',
                                    checked: this.state.skype.l.active,
                                    onClick: this.handlePackage
                                }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'skype-l' },
                                    t('packageWith'),
                                    ' 8 ',
                                    t('skypeWeeks')
                                )
                            ),
                            function () {
                                if (_this7.state.durationText === true) {
                                    return _react2.default.createElement(
                                        'p',
                                        { ref: 'duration-text', className: 'duration-text' },
                                        t('selectPackageText')
                                    );
                                } else {
                                    return _react2.default.createElement(
                                        'div',
                                        { ref: 'duration-radios', className: 'toggle_radios' },
                                        _react2.default.createElement('input', { type: 'radio', checked: _this7.state.skypeDuration.s.active, className: 'toggle_option', id: 'duration-s', name: 'toggle_option' }),
                                        _react2.default.createElement('input', { type: 'radio', checked: _this7.state.skypeDuration.l.active, className: 'toggle_option', id: 'duration-l', name: 'toggle_option' }),
                                        _react2.default.createElement(
                                            'label',
                                            { id: 'duration-s', onClick: _this7.handleSkypeDuration, className: 'small-skype', htmlFor: 'duration-s' },
                                            _react2.default.createElement(
                                                'p',
                                                null,
                                                '20 min ',
                                                t('call')
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            { id: 'duration-l', onClick: _this7.handleSkypeDuration, className: 'large-skype', htmlFor: 'duration-l' },
                                            _react2.default.createElement(
                                                'p',
                                                null,
                                                '45 min ',
                                                t('call')
                                            )
                                        ),
                                        _react2.default.createElement('div', { className: 'toggle_option_slider' })
                                    );
                                }
                            }()
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'email' },
                            _react2.default.createElement(
                                'h4',
                                { className: 'category-heading' },
                                t('email')
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper' },
                                _react2.default.createElement('input', {
                                    id: 'email-s',
                                    className: 'email-s',
                                    type: 'checkbox',
                                    name: 'skype',
                                    checked: this.state.email.s.active,
                                    onClick: this.handlePackage
                                }),
                                _react2.default.createElement(
                                    'label',
                                    { className: 'email-s-label', htmlFor: 'email-s' },
                                    t('answerWithin'),
                                    ' 24h'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'week-text week-text-s' },
                                    t('emailSmallText')
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'weeks' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'week-title' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            t('number')
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            t('week')
                                        )
                                    ),
                                    _react2.default.createElement('div', { id: 'sub-s', onClick: this.handleWeeks, className: 'arrow-left' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'n-weeks' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            this.state.email.s.week
                                        )
                                    ),
                                    _react2.default.createElement('div', { id: 'add-s', onClick: this.handleWeeks, className: 'arrow-right' })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper' },
                                _react2.default.createElement('input', {
                                    id: 'email-m',
                                    className: 'email-m',
                                    type: 'checkbox',
                                    name: 'skype',
                                    checked: this.state.email.m.active,
                                    onClick: this.handlePackage
                                }),
                                _react2.default.createElement(
                                    'label',
                                    { className: 'email-m-label', htmlFor: 'email-m' },
                                    t('answerWithin'),
                                    ' toku 4h'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'week-text week-text-m' },
                                    t('emailLargeText')
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'weeks' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'week-title' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            t('number')
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            t('week')
                                        )
                                    ),
                                    _react2.default.createElement('div', { id: 'sub-m', onClick: this.handleWeeks, className: 'arrow-left' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'n-weeks' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            this.state.email.m.week
                                        )
                                    ),
                                    _react2.default.createElement('div', { id: 'add-m', onClick: this.handleWeeks, className: 'arrow-right' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: 'https://www.zdravlje.nu/checkout?video=1&videoDuration=20&videoCost=0&videoDescription=Online%20Savjetovanje&title=Stavka&currency=\u20AC&price=0', className: 'info-text' },
                            _react2.default.createElement(
                                'div',
                                { className: 'promo' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'promo-text' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'percent-text' },
                                        'Kliknite ovde'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'launch' },
                                        'da biste dobili'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'web-adress' },
                                        'prvi 20 minuta'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'year-1' },
                                        'online sesije'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'kod-text' },
                                        'besplatno!'
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text-wrapper' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'total' },
                        t('price'),
                        ': ',
                        this.calculateCost().total,
                        _react2.default.createElement(
                            'span',
                            null,
                            this.state.language
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'spec' },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Skype: ',
                            this.calculateCost().skype,
                            ' ',
                            this.state.language,
                            ' / ',
                            t('call')
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            t('email'),
                            ': ',
                            this.calculateCost().email,
                            ' ',
                            this.state.language,
                            ' / ',
                            t('week')
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'promo-textfield' },
                        _react2.default.createElement('input', { type: 'text',
                            onChange: this.handlePromoCode,
                            placeholder: t('writeCode'),
                            value: this.state.enteredCode
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-element-wrapper currency-wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'select-style' },
                            _react2.default.createElement(
                                'select',
                                { onChange: this.handleSelect },
                                this.renderCurrencies()
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        {
                            className: buttonStyle,
                            onClick: this.handleCheckout },
                        t('purchase')
                    )
                )
            );
        }
    }]);

    return Payment;
}(_react.Component);

Payment.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {
        stripeToken: state.encounter.stripeToken,
        paypalEnv: state.encounter.paypalEnv
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('paymentView')(Payment));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPaypalEnv = exports.getStripeToken = undefined;

var _axios = __webpack_require__(4);

var request = _interopRequireWildcard(_axios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getStripeToken = exports.getStripeToken = function getStripeToken() {
    return function (dispatch) {
        return request.get('/stripe').then(function (data) {
            dispatch({ type: 'STRIPE_TOKEN', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var getPaypalEnv = exports.getPaypalEnv = function getPaypalEnv() {
    return function (dispatch) {
        return request.get('/paypal').then(function (data) {
            dispatch({ type: 'PAYPAL_ENV', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getSkypeCost = exports.getSkypeCost = function getSkypeCost(state) {
    if (!state.data || !state.data.skype || state.skype.active === false) {
        return 0;
    }

    var cost = 60 * state.data.skype.week;
    var duration = state.data.skypeDuration.factor;
    var sum = cost * duration;

    return exchange(sum, state) / state.paypalFactor;
};

var getWorkshopCost = exports.getWorkshopCost = function getWorkshopCost(cost, state) {
    return cost / state.paypalFactor;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var getEmailCost = exports.getEmailCost = function getEmailCost(state) {
    if (!state.data || !state.data.email || state.email.active === false) {
        return 0;
    }

    var sum = state.data.email.cost * state.data.email.week;
    return exchange(sum, state) / state.paypalFactor;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var getSum = exports.getSum = function getSum(state) {
    var data = state.data || state;
    var costSkype = data.skype ? getSkypeCost(state) : 0;
    var costEmail = data.email ? getEmailCost(state) : 0;
    return costSkype + costEmail;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var getPackageSum = exports.getPackageSum = function getPackageSum(state) {
    return Math.floor(getSum(state) - getPackageDiscount(state));
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 *
 */
var getPackageDiscount = exports.getPackageDiscount = function getPackageDiscount(state) {
    if (!state.data) {
        return 0;
    }

    var costSkype = state.data.skype ? state.data.skype.cost * state.data.skypeDuration.factor : 0;
    var discountSkype = getSkypeCost(state) - exchange(costSkype, state) / state.paypalFactor;
    var discountEmail = getEmailCost(state) - exchange(state.emailDiscount, state) / state.paypalFactor;
    var discountPackage = state.data.email && state.data.skype ? (getEmailCost(state) + getSkypeCost(state)) * 0.05 : 0;

    if (discountEmail < 0) {
        discountEmail = 0;
    }

    if (discountSkype < 0) {
        discountSkype = 0;
    }

    return Math.floor(Math.round(discountPackage) + parseFloat(discountSkype) + parseFloat(discountEmail));
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var getVoucherDiscount = exports.getVoucherDiscount = function getVoucherDiscount(state) {
    var data = state.data || state;
    return data.promoDiscount > 0 ? Math.round(getPackageSum(state) * 0.33) : 0;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var getTotal = exports.getTotal = function getTotal(state) {
    return getVoucherDiscount(state) > 0 ? getPackageSum(state) - getVoucherDiscount(state) : getPackageSum(state);
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var exchange = exports.exchange = function exchange(cost, state) {
    return state.paypalFactor === 1 ? parseInt((cost / getSelectedCurrency(state)[0].rate).toFixed(0)) : parseInt(cost.toFixed(0));
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
var getSelectedCurrency = exports.getSelectedCurrency = function getSelectedCurrency(state) {
    return state.languages.filter(function (country) {
        return country.currency === state.language;
    });
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Quote = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _styles = __webpack_require__(30);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quote = exports.Quote = function (_Component) {
	_inherits(Quote, _Component);

	function Quote(props) {
		_classCallCheck(this, Quote);

		var _this = _possibleConstructorReturn(this, (Quote.__proto__ || Object.getPrototypeOf(Quote)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Quote, [{
		key: 'render',
		value: function render() {
			var t = this.props.t;


			return _react2.default.createElement(
				'div',
				{ className: 'quote' },
				_react2.default.createElement(
					'p',
					null,
					t('quote1')
				),
				_react2.default.createElement(
					'p',
					null,
					t('quote2')
				),
				_react2.default.createElement(
					'span',
					null,
					t('signature')
				)
			);
		}
	}]);

	return Quote;
}(_react.Component);

Quote.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
	return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('quoteView')(Quote));

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Issues = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(3);

var _reactI18next = __webpack_require__(2);

var _styles = __webpack_require__(32);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Issues = exports.Issues = function (_Component) {
	_inherits(Issues, _Component);

	function Issues(props) {
		_classCallCheck(this, Issues);

		var _this = _possibleConstructorReturn(this, (Issues.__proto__ || Object.getPrototypeOf(Issues)).call(this, props));

		_this.state = {
			issues: ['stress', 'anxiety', 'exhaustion', 'backPain', 'depression', 'kids', 'weight', 'panic', 'fobia', 'violence', 'stuck'],
			index: 0
		};

		_this.renderMobileIssues = _this.renderMobileIssues.bind(_this);
		_this.handleSwipeLeft = _this.handleSwipeLeft.bind(_this);
		_this.handleSwipeRight = _this.handleSwipeRight.bind(_this);
		return _this;
	}

	_createClass(Issues, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var body = document.getElementsByTagName('body')[0];
			var width = body.offsetWidth;
			var issues = document.querySelectorAll('.issue-wrapper');

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var issue = _step.value;

					issue.style.width = width + 'px';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(e) {
			e.currentTarget.classList.add('show');
		}
	}, {
		key: 'handleMouseLeave',
		value: function handleMouseLeave(e) {
			e.currentTarget.classList.remove('show');
		}
	}, {
		key: 'renderMobileIssues',
		value: function renderMobileIssues() {
			var _this2 = this;

			var t = this.props.t;

			var issue = this.state.issues[this.state.index];
			var name = 'issues.' + issue + '.name';
			var description = 'issues.' + issue + '.description';
			var issueClass = 'issue ' + issue;
			var imgPath = '/images/' + issue + '.svg';
			var imgClass = 'issue-icon issue-icon-' + issue;

			return _react2.default.createElement(
				'div',
				{ className: 'issue-wrapper' },
				_react2.default.createElement('div', { id: t(name),
					onMouseEnter: this.handleMouseEnter,
					onMouseLeave: this.handleMouseLeave,
					ref: function ref(issueRef) {
						_this2.issueRef = issueRef;
					},
					className: issueClass }),
				_react2.default.createElement('img', { className: imgClass, src: imgPath }),
				_react2.default.createElement(
					'h6',
					{ className: 'heading' },
					t(name)
				),
				_react2.default.createElement(
					'p',
					{ className: 'issue-text' },
					t(description)
				)
			);
		}
	}, {
		key: 'handleSwipeRight',
		value: function handleSwipeRight() {
			var carousel = this.carousel;
			var issues = this.state.issues;
			var first = issues.pop();

			issues.unshift(first);
			this.setState({ issues: issues });

			carousel.classList.add('swipe-left');
			carousel.classList.add('swipe-zero');
		}
	}, {
		key: 'handleSwipeLeft',
		value: function handleSwipeLeft() {
			var carousel = this.refs.carousel;
			var issues = this.state.issues;
			var first = issues.shift();

			issues.push(first);
			this.setState({ issues: issues });

			carousel.classList.add('swipe-left');
			carousel.classList.add('swipe-zero');
		}
	}, {
		key: 'render',
		value: function render() {
			var t = this.props.t;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'usluge', className: 'issues desktop-issues' },
					_react2.default.createElement(
						'div',
						{ className: 'row-1' },
						_react2.default.createElement(
							'div',
							{ id: t('issues.stress.name'), onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'stres',
								className: 'issue stres' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.stress.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '512', height: '512', viewBox: '0 0 512 512' },
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M197.528 283.245c-25.568 29.446-24.312 75.135 2.725 103.322 15.09 15.823 35.313 23.683 55.434 23.683 19.7 0 39.296-7.545 54.28-22.53 6.812-6.81 12.156-14.67 15.823-22.948l99.025-191.974c2.62-5.45-3.038-11.107-8.487-8.488l-191.974 99.026c-9.955 4.4-19.072 11.107-26.826 19.91zm35 27.036c6.392-6.392 14.775-9.64 23.158-9.64s16.766 3.248 23.263 9.64c12.783 12.785 12.783 33.64 0 46.423-6.393 6.392-14.776 9.64-23.264 9.64-8.383 0-16.767-3.248-23.158-9.64-12.89-12.89-12.89-33.638 0-46.422zm228.753 47.47c0-36.256-9.534-71.885-27.663-103.007-7.02-12.156-2.934-27.665 9.222-34.686s27.663-2.935 34.684 9.222C500.054 268.155 512 312.586 512 357.75c0 14.043-11.317 25.36-25.36 25.36-13.937 0-25.36-11.317-25.36-25.36zM0 357.75c0-141.15 114.85-256 256-256 32.8 0 64.76 6.078 94.938 18.234 12.994 5.24 19.28 19.91 14.146 32.903-5.24 12.994-19.91 19.28-32.903 14.146-24.205-9.64-49.88-14.565-76.18-14.565-113.174 0-205.283 92.11-205.283 205.282 0 14.042-11.317 25.358-25.36 25.358C11.318 383.108 0 371.793 0 357.75z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.stress.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.anxiety.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'sikiracija',
								className: 'issue sikiracija' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.anxiety.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '292', height: '374', viewBox: '285.445 114.14 292 374' },
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M507 127.726c-14.6 5.5-21.6 12.6-28.9 29-1.3 2.9-1.2 23.8.1 25.4.6.7 1.4 2.4 1.8 3.8 2.6 8.4 13.8 19.6 23.9 23.9 3.2 1.4 4.6 2.6 4.3 3.5-.3.8-2.8 4.6-5.6 8.5s-5.1 7.3-5.1 7.6c0 .3-.5 1.1-1 1.8-.6.7-3 4-5.5 7.4-2.5 3.5-4.9 6.3-5.3 6.3-1.1 0-7.6-7-9.1-9.7-.6-1.2-1.7-2.7-2.3-3.5-3.4-3.5-8.8-10.8-8.8-11.7 0-.9 2.8-7.7 5.1-12.3 1.3-2.6 1.1-15.6-.3-19.7-2.1-6-8.3-14.5-12.2-16.6-1.926-1.432-3.386-2.2-3.696-2.453-.284-.232-3.833-1.958-5.48-2.562-2-1-6.212-2.937-12.812-2.937-8.2 0-9.912 1.753-14.412 4.053-2.9 1.4-6.8 4.5-8.9 7.1-8.2 10-14.8 17.8-15.3 18.3-.3.3-2.1 2.5-4 5s-3.7 4.7-4 5c-.3.3-2.7 3.2-5.2 6.5s-5.6 7.1-6.8 8.5c-1.2 1.4-3.4 4.1-4.8 6-1.5 1.9-3.6 4.4-4.7 5.5-1.1 1.1-3.3 3.8-4.9 6-1.7 2.2-5.3 6.7-8 10-2.8 3.4-6.4 7.8-8.1 10-3.9 4.9-9.9 12.2-13.3 16-1.5 1.6-3.5 4.2-4.4 5.7-1 1.5-2.9 4-4.3 5.5-2.5 2.8-13.9 16.8-20.3 25-1.8 2.3-4.5 6.8-6 10-2.3 5-2.7 7-2.7 15.3 0 8 .4 10.2 2.3 14 5 9.6 13.1 15.8 24.2 18.3 2.7.6 34.2 1.3 79.5 1.6l75 .6.8 4c.5 2.2 1.4 7.8 2.2 12.5.7 4.7 1.8 11 2.3 14s2.4 14 4.1 24.5c7.4 44.4 7.6 44.9 14 49 7.6 4.7 17.2 2.9 25.5-4.9 6.6-6.3 6.8-14 1.1-45.1-2.9-15.8-5.3-30.1-6.5-39-.4-3.3-1.3-8.9-2-12.5-.6-3.6-1.5-8.8-2-11.5-.5-2.8-1.4-7.7-2-11-.6-3.3-1.5-9.2-2-13-1.4-12-4.1-17.5-10.1-20.6-3.6-1.8-6.3-1.9-56.9-1.9h-53.1l.7-2.2c.3-1.2 1-2.6 1.5-3.2.5-.6 3.3-4 6.2-7.6 2.8-3.6 6.2-7.6 7.5-9 1.2-1.3 2.2-2.7 2.2-3 0-.4 1.5-2.3 3.3-4.2 1.7-2 3.9-4.4 4.7-5.4.8-1.1 4.4-5.5 7.9-9.9s7-8.4 7.8-8.8c1.6-1 2.5-.2 9 8.3 2.3 3 5 6.4 6 7.5 1 1.1 3.9 4.7 6.3 8 6.7 9 11 13.1 15.8 14.9 5.6 2.1 9 2 15.7-.5 5-1.8 12.5-7.9 12.5-10 0-.4.6-1.4 1.3-2.1 2.2-2.3 11.3-15.2 12-17.1.3-.9 1.1-1.7 1.7-1.7.5 0 1-.4 1-1 0-.5 2.3-4.2 5-8.2 2.8-4 8-11.8 11.8-17.3 3.7-5.5 7-10.2 7.4-10.3.5-.2.8-.8.8-1.3 0-.4 1.5-2.9 3.3-5.5 2.8-4 3.2-5.3 3.2-11.2.1-6.6.2-6.8 4.5-11.3 6.4-6.6 8-9.1 10.8-16.7 2.1-5.8 2.4-23.4.5-25.4-.7-.6-1.3-2.2-1.3-3.3 0-2.8-6.8-13.1-11.1-17-5.7-5.1-9.2-7.1-16.8-9.9-9.6-3.4-17.1-3.4-26.6.2z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.anxiety.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.exhaustion.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'iscrpljenost',
								className: 'issue iscrpljenost' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.exhaustion.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '448', height: '340', viewBox: '0 0 448 340' },
								_react2.default.createElement(
									'g',
									{ fill: '#C04C9C' },
									_react2.default.createElement('path', { fill: '#C04C9C', d: 'M15 13.4l-3 2.8V325.5l2.7 3 2.6 3H48c29.7 0 30.8-.1 33.1-2.1l2.4-2.1.5-33.6.5-33.7 142.3-.3 142.2-.2v32c0 27.8.2 32.5 1.6 35.3.9 1.8 2.2 3.5 2.8 3.9.6.4 14.9.8 31.8.8 32.3 0 30.7.2 34.6-4.4 1.6-1.9 1.8-132.6.2-132.6-.5 0-1-.7-1-1.5s-.9-1.9-1.9-2.5c-1.3-.7-58.4-1-177.5-1H84l-.2-87.4-.3-87.4-2.4-2.1c-2.3-2-3.4-2.1-32.8-2.1H18l-3 2.9z' }),
									_react2.default.createElement('path', { fill: '#C04C9C', d: 'M146 64.5c-1.4.4-5.3 1.6-8.7 2.6-3.5 1-6.3 2.1-6.3 2.6 0 .4-.7.8-1.5.8s-1.5.4-1.5 1c0 .5-.7 1-1.6 1-1.6 0-14.6 12.4-15.8 15-.3.8-1.4 2.8-2.4 4.5-2.3 3.6-4.6 10.8-6.2 19.2-1 5-1 7.6 0 12.5 1.4 7.1 4 16 4.9 16.8.3.3 1.5 2.3 2.5 4.5 2.1 4.3 15 17.5 17.1 17.5.8 0 1.5.4 1.7.8.2.4 3.4 2.1 7.3 3.8 6.6 2.7 7.8 2.9 20.7 2.9 9.6 0 14.1-.4 15-1.3.6-.6 1.9-1.2 2.8-1.2 2.5 0 15.1-7.9 18.9-11.9 5.2-5.4 11.5-15.9 13.4-22.2 2.3-7.6 2.3-24.3 0-31.8-1-3.1-2.8-7.3-4-9.3-1.3-2.1-2.3-4.1-2.3-4.5 0-.5-2.4-3.3-5.3-6.4-5.5-5.9-14.9-12.4-19.4-13.5-1.6-.4-3.2-1-3.8-1.4-2.8-2.1-21.2-3.5-25.5-2zM230.1 66.4l-3.1 2.9V165.6l2.5 2.4 2.4 2.5h101.8c56 0 102.3-.4 102.8-.8 3.4-2.4 4.6-6.4 4.2-13.5-.6-8.5-2.3-19.4-3.6-22.2-.5-1.1-2.1-5.2-3.7-9-5.6-14-12.2-23.6-23.4-34.3-3-2.9-6.7-6-8.2-7-1.6-.9-2.8-2-2.8-2.4 0-.4-.7-.8-1.5-.8s-1.5-.4-1.5-1c0-.5-1.1-1.2-2.5-1.6-1.4-.3-2.5-1-2.5-1.5s-.9-.9-2-.9-2-.5-2-1c0-.6-.6-1-1.2-1-.7 0-3.4-1.1-6-2.4-2.7-1.3-6.7-2.7-9-3.1-2.4-.4-4.7-1.1-5.3-1.5-2.4-1.9-13.5-2.3-71.1-2.7l-61.1-.3-3.2 2.9z' })
								)
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.exhaustion.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.weight.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'tezina',
								className: 'issue tezina' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.weight.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '512', height: '512', viewBox: '0 0 512 512' },
								_react2.default.createElement(
									'g',
									{ fill: '#C04C9C' },
									_react2.default.createElement('path', { fill: '#C04C9C', d: 'M416 0H96C42.97 0 0 42.97 0 96v320c0 53.032 42.97 96 96 96h320c53.03 0 96-42.968 96-96V96c0-53.03-42.97-96-96-96zm-61.54 236.307H157.54l-78.77-98.46s59.077-78.77 177.23-78.77c118.154 0 177.23 78.77 177.23 78.77l-78.767 98.46z' }),
									_react2.default.createElement('path', { fill: '#C04C9C', d: 'M307.456 216.615L334.414 98.66l-78.02 117.955' })
								)
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.weight.name')
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'row-2' },
						_react2.default.createElement(
							'div',
							{ id: t('issues.backPain.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'bol',
								className: 'issue bol' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.backPain.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '452', height: '399', viewBox: '0 0 452 399' },
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M354.5 25.5c-3.3.6-6.9 1.4-8 1.9-1.1.4-4.5 1.7-7.5 2.8-8 3.1-14.9 7.8-22 14.8-4.1 4.2-10 11-10 11.7 0 .2-1.2 2.5-2.7 5-1.5 2.6-3.8 7.8-5.2 11.7-2.3 6.4-2.6 8.5-2.6 22.6 0 14.3.2 16.1 2.7 23.2 1.5 4.2 3.8 9.5 5.2 11.7 1.4 2.2 2.6 4.4 2.6 4.7 0 .4.7 1.4 1.5 2.3.8.9 3.1 3.6 5.1 6.1 2 2.4 6.1 6.4 9.2 8.7 3.2 2.4 6.2 4.7 6.8 5.2.6.5 2.1 1.2 3.4 1.6 1.3.4 3.7 1.6 5.4 2.6 1.7 1.1 4 1.9 5.2 1.9 1.1 0 2.4.4 3 .9 3.1 3.1 25.7 4.1 36.3 1.7 6.7-1.5 20.7-7 22.1-8.7.3-.3 1.6-1.2 2.9-1.9 6.6-3.4 17.5-15.2 22.5-24.2 3.3-5.9 7.2-16.9 8.1-22.8 1.4-9 .5-29.7-1.5-32.5-.3-.6-1.3-3-2-5.5-5.1-17-23.9-35.8-42-42-1.9-.7-4.4-1.6-5.5-2-5.8-2.4-23.5-3.2-33-1.5zM287 146.3c0 .7 2 3.4 4.4 6 3.4 3.6 4.8 6.3 6.2 11.3 1.7 6.3 1.7 6.9 0 13.2-1.7 6.5-4.8 11.6-9.6 15.9-1.4 1.2-3 2.3-3.5 2.3-.602 0-2.602.8-4.5 1.9-2.9 1.5-6.2 1.9-19.5 2.1-8.8.1-18.2.4-21 .5-2.7.2-12.102.3-20.7.4l-15.7.1-3.2 5c-1.8 2.7-3.6 5-4.1 5-.4 0-.8.4-.8.9 0 .6-1.3 2.9-2.9 5.3-3.1 4.6-7.6 12.7-14.1 25-4 7.7-4.9 12.2-3.102 15.6 5.9 11.1 6.7 20 2.6 28.2-2.7 5.3-8.1 12-9.7 12-.5 0-2.1.9-3.5 2s-3.7 2-5 2c-4.3 0-6 1.7-7.2 7.2-.7 2.9-1.6 6.9-2.2 8.8-.5 1.9-1.1 4.4-1.3 5.5-.1 1.1-.6 3.1-.898 4.5-2 8.2-4.2 29.8-4.2 42.3v12.9l36-.2c19.8-.1 38.7-.4 42-.5 3.3-.2 9.8-.3 14.5-.4l8.6-.1.2-11.1c.4-15.6 1.2-20.5 6.4-40.4.5-2.2 1.4-4.8 1.9-5.7.5-1 .9-2.7.9-3.8 0-1.1.398-2.8.898-3.8.5-.9 1.9-4.4 3.1-7.7 1.2-3.3 3.2-8.3 4.6-11.1 1.3-2.8 2.4-5.6 2.4-6.2s.4-1.2.9-1.4c.5-.2 2-2.6 3.5-5.3 3.2-6.1 3.5-6.7 11.3-18.6 5.9-8.9 26-30.5 30.9-33.2 3.6-1.9 9.1-8.8 11.9-15 1.5-3.4 3.3-7.3 3.9-8.6 1.6-3.4 1.4-26.7-.2-28.3-.6-.6-1.2-1.9-1.2-2.8 0-2.1-4-9.8-6.8-12.9-1.3-1.4-3.1-3.8-4-5.3-.9-1.5-2.8-3.2-4.4-3.9-1.5-.6-2.8-1.5-2.8-1.9 0-.5-2.6-2.1-5.7-3.6C291.8 145.5 287 144.2 287 146.3z' }),
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M220 149.1c-9.6.4-35.3 1-57 1.3-53.8.8-60.8 1.2-64.2 3.6-1.5 1.1-3.1 2-3.6 2-1.2 0-4.8 5.1-6.6 9.5-2.8 6.6-1.7 15.1 3.2 25.3 3 6 5.1 11 5.8 13.2.4 1.4 1.5 4.1 2.5 6 1.1 1.9 1.9 4.3 1.9 5.2 0 1 .5 1.8 1 1.8.6 0 1 .8 1 1.8s.3 2.1.6 2.5c.8.7 7.4 15.9 7.4 16.9 0 .6 3.1 7.8 8 18.3 1 2.2 2.2 5.1 2.6 6.5.4 1.4 1.5 4.1 2.5 6 1.1 1.9 1.9 3.9 1.9 4.4s1.398 3.8 3.1 7.4c5.3 11.4 11.8 15.6 22.9 15 7.6-.4 15.2-4.4 17.3-9.1.6-1.5 1.5-2.7 1.9-2.7.6 0 2.1-6.9 2.198-10 0-3.2-1.5-8.9-3.4-12.8-1.1-2.3-2-4.5-2-5s-1.3-3.6-3-7-3-6.5-3-6.9c.002-.7-9.098-22.2-12.598-29.9-1.3-2.8-2.4-5.5-2.4-6 0-.6-.9-2.7-2-4.9-1.3-2.5-1.6-4.3-1-4.9.5-.5 9.8-1 20.7-1.2 10.9-.1 26.3-.5 34.3-.9 8-.3 28.2-.8 45-1.1 28.6-.5 34.1-1 37.5-3.6 7.7-5.8 10.5-11.1 10.5-19.6 0-5.1-.5-7.3-2-9.2-1.1-1.4-2-2.8-2-3.2 0-1.4-4.7-5.3-8.9-7.6-4.1-2.1-5.398-2.2-23.398-2-10.602 0-27.102.4-36.702.9zM42.8 252.6c-1.4 3-.5 4.9 3.2 6.9 2.3 1.2 5.7 2.7 7 2.9.3.1 1.9.6 3.5 1.3 2.5 1 7.6 2.1 10.7 2.4.4 0 2.2.5 4 1 4.4 1.4 16.2 2.9 28.1 3.6 8.3.4 9.7.3 9.7-1 0-2.7-11.8-9.2-22.5-12.4-2.7-.8-5.4-1.8-6-2.3-.5-.4-3-1-5.5-1.3-6.5-.9-8.6-1.4-10.9-2.6C63 250.5 58 250 53 250c-8.8 0-9.1.1-10.2 2.6zM100.5 296c-1.1.5-3.3.9-4.9.9-1.6.1-4.6.6-6.5 1.2-2 .7-4.2 1.3-4.9 1.5-.7.2-1.4.4-1.7.5-.2.1-2.8.7-5.7 1.5-7.3 1.8-20.8 6.3-23.8 7.9-1.4.7-4.3 1.6-6.5 2-2.2.4-4.5 1.2-5 1.9-.6.6-1.7 1.2-2.5 1.4-2.3.5-13.1 5.3-14 6.198-.3.3-1.6 1.1-3 1.8-6.5 3.3-7.9 4.4-8.5 6.3-.4 1.2-.2 2.6.4 3.2 1.6 1.6 13.7 1 17.2-.8 1.6-.898 3.1-1.498 3.4-1.398 1 .1 7-1.2 9-2.1 2.8-1.1 8.9-3.5 9.5-3.6.3 0 1.4-.4 2.5-.8 1.1-.5 3.8-1.5 6-2.3 18.6-6.9 45.4-20.9 47.9-25.102.9-1.398-5.6-1.598-8.9-.198zM114 325.5c-3.6 1.8-7.6 3.8-8.9 4.5-2.2 1-5.4 3-20.6 12.9-5.1 3.3-5.5 3.6-8.7 6.3-1.4 1.3-3.9 3.2-5.5 4.3-5.6 4-14.9 14.1-16.7 18.3-2.4 5.4-1.2 9.2 3.1 9.2 3 0 10.5-3.4 13.7-6.3 1.1-.9 2.6-1.7 3.3-1.7.7 0 1.3-.4 1.3-1 0-.5 2.1-2.3 4.6-4.1 5-3.4 42.8-40.8 44.5-44 1.5-3-2.5-2.3-10.1 1.6z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.backPain.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.depression.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'depresivno',
								className: 'issue depresivno' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.depression.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '397', height: '286', viewBox: '0 0 397 286' },
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M180.5 35.7c-6 .7-11.9 1.8-13 2.2-1.1.5-4.6 1.5-7.8 2.2-3.2.7-6 1.6-6.3 2.1-.3.4-1.5.8-2.8.8-1.2 0-4.1.9-6.4 2-2.2 1.1-4.8 2-5.7 2-.8 0-1.5.4-1.5 1 0 .5-.6 1-1.3 1-1.7 0-17.7 8.1-21.7 11-1.5 1.1-3.1 2-3.5 2-.5 0-8 5.3-11.2 8-.7.5-1.5 1-1.8 1-.6 0-12.2 9.2-17.8 14-4.2 3.6-19.3 18.8-25.7 25.8-6 6.5-7 7.7-11.4 13.7-1.7 2.2-3.2 4.2-3.5 4.5-.4.3-2.1 2.7-3.9 5.3-3.5 4.9-3.7 8-.9 10.9.7.7 2.6 3.1 4.2 5.3 1.7 2.2 3.2 4.2 3.5 4.5s2 2.4 3.7 4.7c4.1 5.3 4.2 8.7.3 15.3-1.6 2.8-3 5.7-3 6.5 0 .7-.4 1.5-.8 1.7-1 .4-12.2 23.1-12.2 24.7 0 .6-.6 2.2-1.4 3.4-5.9 9.1-8.1 28.1-4.1 36.1C26.7 252 35.9 262 37.8 262c.7 0 2.3.6 3.5 1.4 4 2.6 12.8 3.8 18.5 2.5 20.3-4.3 31.2-22.6 25-41.9-.6-1.9-1.7-4.9-2.5-6.7-.7-1.7-1.3-3.4-1.3-3.7 0-.6-5-11.8-8.1-17.9-4-8.1-1.5-8.9 5.8-2 7.4 7 29 23.3 30.9 23.3.3 0 1.9.9 3.4 2 4.7 3.4 15.1 9 16.6 9 .8 0 1.4.4 1.4 1 0 .5.8 1 1.8 1s2.2.4 2.7.9c.6.4 4.2 2 8 3.4 3.9 1.4 7.9 2.9 9 3.3 17 6.2 43.8 9.5 62.1 7.5 6-.7 13.6-1.4 16.9-1.7 3.3-.3 6.4-1 7-1.5.5-.5 1.6-.9 2.5-.9 2.6 0 19.2-5.6 24.9-8.4 3-1.4 6.3-2.6 7.2-2.6 1 0 1.9-.3 2.1-.8.2-.4 2.6-1.8 5.3-3.2 5-2.5 10.9-6.1 13.2-8 .7-.5 1.7-1 2.3-1s2-.8 3.1-1.8c1-1.1 3.1-2.5 4.6-3.3 1.5-.8 3.7-2.3 4.9-3.4 3.6-3.2 5.3-4.5 6-4.5.4 0 1.4-.8 2.3-1.8.9-.9 3.3-3 5.3-4.5 4.5-3.4 28.3-27 32-31.7 1.4-1.9 4.2-5.3 6.2-7.5s3.6-4.3 3.6-4.6c0-.3.8-1.5 1.8-2.7.9-1.1 2.5-3 3.5-4.1.9-1.2 1.7-2.8 1.7-3.5 0-.8.5-1.6 1-1.8 1.5-.5-3.1-10.2-6-12.8-.3-.3-2.4-2.8-4.5-5.5-2.2-2.8-5.2-6.2-6.7-7.7-1.6-1.4-2.8-2.9-2.8-3.2 0-1.5-14-16-24.1-24.7-3.3-3-8-7.1-10.2-9.1-2.3-2.1-4.5-3.8-5-3.8-.4 0-2.1-1.4-3.9-3-1.7-1.7-3.5-3-4.1-3-.5 0-2.3-1.1-4.1-2.5-3.8-3.1-4.6-3.6-7.5-5.3-7.3-4.2-9.3-5.2-10.6-5.2-.8 0-1.5-.4-1.5-.8 0-.5-4.2-2.8-9.2-5.1-5.1-2.4-10.6-4.9-12.2-5.7-1.6-.8-4.2-1.4-5.7-1.4s-3-.4-3.3-.9c-.3-.5-3-1.4-5.8-2.1-2.9-.6-6.4-1.6-7.8-2-4.5-1.7-26.7-4-36.2-3.9-5.1.1-14.2.8-20.3 1.6zm-45 49c-.3 1.6-1.1 2.9-1.6 3.1-.5.2-.9 1.4-.9 2.7s-.4 2.7-1 3c-.5.3-1 1.7-1 3.1 0 1.3-.4 2.4-.9 2.4s-1.1 1.5-1.4 3.2c-.3 1.8-1.1 6-1.7 9.3-1.3 6.4-.7 22.6 1 28.2.6 1.8 1.5 5 2.1 7 1.5 5.4 6.5 17 7.9 18.3.3.3 1.3 1.7 2.3 3.3 2.8 4.3 11.2 13.5 15.4 16.7 8.2 6.3 20.3 13 23.7 13 1.3 0 2.6.3 3 .7 4 4 41.2 4 45.2 0 .4-.4 1.7-.7 3-.7 2 0 15.2-6.4 16.4-8 .3-.3 2.5-2 5-3.7 7-4.8 16-14.9 19.7-22.1.9-1.7 2-3.2 2.5-3.2.4 0 .8-.6.8-1.3s.9-3.2 2-5.5c1.1-2.2 2-4.8 2-5.6 0-.8.4-1.7.9-2 2.2-1.4 3.4-29.5 1.7-39.6-.9-5.6-3.1-12.1-5.7-17.2-1.3-2.5-1.1-3.8.4-3.8 1.8 0 6.7 2.4 6.7 3.2 0 .5.6.8 1.4.8.8 0 1.6.3 1.8.7.2.5 2.1 2 4.4 3.6 2.2 1.5 4.9 3.5 6 4.5 1 .9 4.1 3.5 6.9 5.7 2.7 2.2 7.1 6.1 9.8 8.7 2.6 2.7 5.2 4.8 5.7 4.8.6 0 1 .4 1 .9s2.4 3.4 5.3 6.3c7.6 7.9 11.7 13.1 11.7 14.9 0 .8-1.7 3.5-3.7 6-5.2 6.1-27.2 28-30.7 30.4-1.6 1.1-4.4 3.5-6.3 5.3-1.9 1.7-4.1 3.2-4.8 3.2s-1.5.4-1.7.8c-.1.5-2.8 2.5-5.8 4.5-3 2.1-6.4 4.4-7.5 5.3-1.1.8-3 1.7-4.2 2-1.3.4-2.3 1-2.3 1.5s-.9.9-2 .9-2 .3-2 .8c0 .4-1.5 1.3-3.2 2.1-4 1.6-11.3 4.9-15 6.8-1.4.7-3.7 1.3-5 1.3s-2.8.4-3.3.8c-1.4 1.2-8.7 3.2-11.7 3.2-1.3 0-2.9.5-3.4 1-.7.7-8.8 1.1-21.9 1.1-13.1 0-21.2-.4-21.9-1.1-.5-.5-2.1-1-3.4-1-3 0-10.3-2-11.6-3.2-.6-.4-2.2-.8-3.6-.8s-3.5-.7-4.6-1.5c-1-.8-2.5-1.5-3.1-1.5-1.7 0-18.7-8.2-19.1-9.2-.2-.4-1.2-.8-2.2-.8s-2-.4-2.2-.8c-.1-.4-2.5-2.1-5.3-3.7-2.7-1.5-5.7-3.7-6.6-4.7s-2-1.8-2.5-1.8c-2.4 0-23.5-18.1-35-30-11.2-11.6-13.6-15-12.9-18 .4-1.4 1.1-2.7 1.6-2.8.5-.2.9-.8.9-1.4 0-1.7 32.8-33.8 34.5-33.8.4 0 1.2-.6 1.9-1.3.7-.6 2.5-2.1 4-3.2 1.6-1.1 4.8-3.5 7.1-5.3 2.4-1.7 4.9-3.2 5.4-3.2.6 0 1.1-.5 1.1-1 0-.6.6-1 1.3-1 .8 0 2.2-.9 3.3-1.9 1-1.1 3-2 4.3-2 2-.1 2.2.2 1.6 2.6zm44.4 3.9c3.4.7 10.7 8.6 11.6 12.5 1.6 7.7.4 17-2.6 20.3-1.1 1.1-1.9 2.3-1.9 2.6 0 .4-2.1 1.8-4.7 3.1-5.5 2.8-15.3 3.3-19.9.9-4.2-2.2-10.1-8.8-10.8-12.1-.3-1.6-.9-4.2-1.2-5.9-1-4.8 1.6-11.7 6.3-16.5 4-4.2 5.3-4.9 11.3-5.8 2.5-.4 7.3 0 11.9.9z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.depression.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.kids.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'djete',
								className: 'issue djete' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.kids.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '300', height: '399', viewBox: '0 0 300 399' },
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M59.9 303.5c0 2.2.2 3 .4 1.7.2-1.2.2-3 0-4-.3-.9-.5.1-.4 2.3zM59.9 314c0 3.6.2 5 .4 3.2.2-1.7.2-4.7 0-6.5-.2-1.7-.4-.3-.4 3.3z' }),
								_react2.default.createElement('circle', { fill: '#C04C9C', cx: '145.5', cy: '72', r: '57.5' }),
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M275 152.5c-10-11.5-26.8-14.3-26.8-14.3H54.6C27.5 142 14 163 14 163c-3.5 6.5-8 21-8 21v149c-1 9 5.5 20 5.5 20 12 22.5 40.5 29.5 40.5 29.5l106-1c12-1 18.5-13.3 18.5-13.3 5-17.8-1.6-28.7-1.6-28.7-3.6-12-19.9-17.1-19.9-17.1H65V277s.5 11 1.6-.2S77.9 261 77.9 261H210c16.5 1.5 23.3 13.5 23.3 13.5l1.8 108c18.6 2.5 31.994-8.4 40.9-17 14.5-14 17.5-32 17.5-32V199c.5-29.5-18.5-46.5-18.5-46.5zM148.5 239c-19.605 0-35.5-15.894-35.5-35.5 0-19.605 15.895-35.5 35.5-35.5 19.606 0 35.5 15.895 35.5 35.5 0 19.606-15.894 35.5-35.5 35.5z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.kids.name')
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'row-3' },
						_react2.default.createElement(
							'div',
							{ id: t('issues.panic.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'panika',
								className: 'issue panika' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.panic.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '70.5', height: '65.5' },
								_react2.default.createElement('path', { fill: '#c04c9c', d: 'M61.384 4.729c-1.628 7.321-2.467 14.833-2.547 22.333-.044 6.697.586 13.598 2.375 20.066 1.174 4.283 2.907 8.396 5.289 12.15-1.729 1.074-3.708 1.684-5.751 1.675-3.976.003-7.945-2.434-9.069-6.373-.349 1.121-.879 2.142-1.688 2.993-2.466 2.662-6.597 3.537-10.038 2.658-2.991-.762-5.611-2.852-6.443-5.905-1.09 3.956-5.086 6.121-8.999 6.141-3.958.05-8.055-2.167-9.169-6.158-1.057 3.785-4.745 6.45-8.612 6.634-1.634.111-3.151-.285-4.681-.796.07-.731.484-1.446.742-2.134 3.452-8.252 7.925-16.105 13.316-23.244 6.661-8.794 14.753-16.44 24.33-21.98 6.493-3.799 13.59-6.48 20.945-8.06z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.panic.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.fobia.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'fobia',
								className: 'issue fobia' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.fobia.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '390', height: '395', viewBox: '0 0 390 395' },
								_react2.default.createElement('path', { fill: '#C04C9C', d: 'M211.09 81.802v-12.82c4.98-1.01 9.518 2.615 11.484 9 .916 2.972.895 6.4 2.4 8.978 1.527 2.616 4.385 4.47 6.714 6.6 2.682 2.45 5.915 4.474 8.014 7.338 2.724 3.72 4.457 2.132 6.485-.246 3.498-4.1 7.025-8.177 10.4-12.374C261.513 82.152 267.013 76.34 271 69.64c5.256-8.836 9.247-18.422 13.85-27.654 4-8.023 7.823-16.153 12.233-23.948 3.07-5.424 12.473-8.424 16.876-6.106 7.79 4.1 11.04 12.01 7.447 19.557-5.56 11.675-11.48 23.18-17.332 34.716-4.138 8.156-8.09 16.436-12.754 24.286-2.827 4.76-6.706 8.934-10.372 13.146-7.146 8.214-14.47 16.274-21.732 24.387-1.187 1.325-2.63 2.462-3.605 3.92-.832 1.243-1.703 2.898-1.52 4.228.114.812 2.18 1.912 3.382 1.93 10.83.148 21.77.996 32.453-.27 6.03-.716 11.703-4.882 17.422-7.727 9.058-4.506 18.006-9.232 27.027-13.812 3.507-1.78 6.965-3.778 10.666-5.028 5.514-1.863 11.09-2.144 15.75 2.364 4.816 4.66 5.31 10.69 2.664 16.015-1.82 3.66-5.775 6.826-9.515 8.853-9.643 5.227-19.707 9.666-29.574 14.48-7.342 3.58-14.562 7.418-21.994 10.798-2.62 1.192-5.693 1.874-8.574 1.918-12.996.2-25.996.018-38.994.165-1.934.02-3.857 1.062-5.785 1.634 1.345 1.17 2.523 2.664 4.063 3.456 14.327 7.375 28.66 14.746 43.142 21.808 2.536 1.237 5.777 1.404 8.696 1.422 20 .117 39.997.032 59.995.08 6.832.016 13.06 4.476 13.887 9.736 1.255 7.985-1.846 14.502-8.678 16.948-2.824 1.01-6.086 1.077-9.15 1.094-20.64.106-41.284-.173-61.916.228-8.668.168-15.272-4.43-22.408-7.83-12.93-6.16-25.637-12.788-38.508-19.077-1.355-.663-3.182-.36-4.79-.504.826 1.308 1.524 2.72 2.502 3.905 3.782 4.584 7.71 9.047 11.476 13.643 5.43 6.627 10.705 13.38 16.153 19.99 8.677 10.53 17.42 21.003 26.177 31.466 5.19 6.2 11.282 11.83 15.465 18.64 4.424 7.206 7.204 15.45 10.452 23.342 6.534 15.877 13.35 31.662 19.146 47.81 3.007 8.375 3.82 15.5-4.96 20.822-4.954 3.002-15.28 1.64-18.044-4.688-3.88-8.884-7.723-17.788-11.35-26.778-5.576-13.827-10.5-27.94-16.64-41.508-2.51-5.548-7.34-10.094-11.343-14.906-7.46-8.97-15.082-17.802-22.654-26.676-.31-.36-.802-.565-1.777-1.23-.822 1.654-1.64 3.147-2.328 4.7-4.943 11.158-10.457 21.993-19.8 30.206-8.926 7.844-19.017 13.287-31.366 12.604-8.228-.454-15.326-3.93-22.074-8.596-12.648-8.744-19.19-21.7-25.2-35.118-.328-.734-.61-1.512-1.07-2.158-.372-.52-.977-.877-1.75-1.537-8.892 10.666-17.447 21.505-26.62 31.793-12.227 13.715-15.71 31.473-22.84 47.534-4.45 10.03-8.067 20.434-12.604 30.42-2.925 6.44-6.714 7.98-15.715 7.272-4.49-.354-7.945-4.043-9.346-9.54-1.933-7.586 1.73-14.004 4.21-20.64 4.183-11.188 8.356-22.39 12.89-33.437 3.918-9.542 7.955-19.074 12.684-28.227 2.45-4.743 6.386-8.762 9.88-12.916 11.236-13.366 22.68-26.56 33.847-39.983 8.305-9.983 16.277-20.243 24.47-30.32.912-1.12 2.454-1.715 3.424-2.803.644-.723.79-1.89 1.16-2.856-1.127-.178-2.5-.865-3.346-.456-9.936 4.807-19.792 9.778-29.67 14.706-7.96 3.97-15.83 8.13-23.93 11.793-2.41 1.09-5.453 1.055-8.208 1.064-22.046.082-44.092.03-66.138.067-6.526.012-11.385-3.613-13.69-8.85-1.87-4.246-2.278-10.327 1.945-13.875 3.158-2.653 7.715-4.933 11.722-5.06 17.314-.543 34.67-.673 51.98-.06 9.653.34 18.097-1.92 26.42-6.467 11.235-6.138 22.776-11.715 34.144-17.613 1.138-.59 1.99-1.736 2.973-2.625-1.364-.64-2.72-1.82-4.092-1.84-11.496-.15-23.016-.504-34.487.054-8.338.405-15.52-2.2-22.628-5.847-13.588-6.97-27.206-13.88-40.79-20.86-2.86-1.47-5.58-3.218-8.442-4.687-4.75-2.437-6.29-8.783-4.34-16.272 1.117-4.287 6.3-7.62 11.428-8.095 6.944-.642 12.22 3.383 17.854 6.105 13.13 6.348 25.983 13.266 39.046 19.756 2.417 1.2 5.28 2.014 7.96 2.08 9.825.242 19.662.17 29.492.005 1.378-.024 3.546-.948 3.892-1.956.4-1.166-.43-3.213-1.38-4.313-9.888-11.465-19.45-23.264-30.025-34.07-9.76-9.974-13.586-23.037-20.22-34.616-4.635-8.088-8.77-16.477-12.825-24.878-1.773-3.675-3.375-7.623-4.01-11.613-1.075-6.745 4.022-13.737 10.776-15.26 7.135-1.61 12.764 2.472 16.27 9.37 8.974 17.664 17.223 35.728 26.92 52.98 4.164 7.405 11.24 13.16 16.91 19.737 2.03 2.356 3.757 4.973 5.735 7.377 2.146 2.608 4.053 3.644 6.522-.104 1.68-2.55 4.134-4.968 6.802-6.407 5.816-3.138 8.44-7.94 10.004-14.1.896-3.528 3.085-6.87 5.277-9.868 1.037-1.418 3.446-1.832 6.146-3.145v14.562c9.973-.003 19.423-.003 29.284-.003z' })
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.fobia.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.violence.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'sukob',
								className: 'issue sukob' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.violence.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '408', height: '417', viewBox: '0 0 408 417' },
								_react2.default.createElement(
									'g',
									{ fill: '#C04C9C' },
									_react2.default.createElement('path', { d: 'M159.757 292.122c-.69.4-.828.546-.977.558-10.805.852-11.02.872-9.96 11.377 1.796 17.817 4.112 35.584 5.76 53.414.673 7.274.177 14.656.21 21.988.015 3.72.15 7.445.01 11.16-.383 10.157-11.263 13.51-18.584 11.632-8.497-2.177-11.797-7.3-12.08-16.312-.504-16.15-.707-32.34-2.083-48.424-1.172-13.697-3.758-27.277-5.85-40.89-.6-3.913-5.67-5.2-14.417-3.752-3.625.6-4.174 3.16-3.613 6.316.283 1.59.57 3.222.517 4.823-.59 17.894-.696 35.828-2.092 53.66-.84 10.73-3.467 21.353-5.75 31.924-2.147 9.938-12.64 14.085-21.384 8.835-6.486-3.894-8.597-10.212-7.49-18.126 2.07-14.812 3.696-29.696 5.13-44.586.775-8.063.973-16.2 1.042-24.308.044-5.104-.342-10.265-1.186-15.29-.22-1.307-2.81-2.988-4.435-3.14-4.627-.428-9.327-.317-13.983-.103-3.347.153-4.14-1.278-4.37-4.39-.85-11.437 3.06-21.77 7.015-32.096 6.613-17.26 16.45-32.803 25.74-48.672 3.677-6.284 5.757-13.54 8.273-20.46 3.53-9.703 6.793-19.503 10.146-29.27.4-1.168.648-2.39.03-4.64-2.585 1.41-5.303 2.624-7.733 4.266-13.238 8.94-26.406 17.984-39.597 26.994-3.146 2.15-10.886 1.616-13.884-.96-9.444-8.115-9.844-19.976.05-27.25 11.853-8.718 24.345-16.585 36.734-24.55 11.34-7.29 22.894-14.253 34.39-21.3 6.506-3.99 12.896-8.227 19.676-11.692 10.376-5.306 24.85-2.148 32.792 6.67 8.86 9.842 18.358 19.113 27.68 28.53 3.857 3.896 8.08 7.425 11.943 11.313 2.304 2.32 4.05 2.208 6.226-.118 6.807-7.274 14.18-14.07 20.49-21.747 8.055-9.8 22.478-7.202 28.247 1.077 1.67 2.396 2.803 2.957 5.572 1.84 9.43-3.797 18.992-7.265 28.506-10.854 4.2-1.584 8.4-3.16 13.096-4.925v10.388c-16.396 5.705-30.375 15.43-42.023 27.972-4.847 5.22-7.343 12.74-10.476 19.416-6.543 13.946-12.777 28.038-19.207 42.04-.576 1.255-1.64 2.287-3.55 3.023 2.112-16.3 4.226-32.602 6.34-48.902-.382-.217-.763-.433-1.145-.648-5.26 4.658-10.41 9.445-15.81 13.934-3.977 3.304-7.75 6.79-13.628 7.056-6.637.3-10.658-3.657-14.755-7.565-8.837-8.428-17.457-17.082-26.167-25.644-2.882-2.832-5.1-2.516-6.228.967-3.88 11.988-7.88 23.943-11.457 36.02-.92 3.105-1.152 6.762-.51 9.923 3.686 18.155 7.886 36.206 11.6 54.356 2.654 12.99 4.82 26.076 7.21 39.146z' }),
									_react2.default.createElement('path', { d: 'M335.57 192.91c-1.664 1.39-3.102 2.108-3.832 3.27-10.78 17.154-18.383 35.684-25.308 54.72-9.466 26.023-12.077 52.748-10.354 79.887 1.09 17.165 4.53 34.195 7.24 51.234.994 6.25 1.03 11.984-4.414 16.128-5.482 4.17-11.808 4.808-18.27 2.76-8.676-2.75-12.116-9.65-13.238-17.97-2.154-15.965-4.525-31.917-6.022-47.948-1.047-11.21-1.187-22.552-.976-33.82.135-7.19 1.656-14.353 2.535-21.53.163-1.313.306-2.64.32-3.962.032-2.917.87-6.753-3.187-7.17-1.854-.19-4.535 1.89-5.904 3.664-13.114 16.99-21.435 36.11-26.65 56.976-4.816 19.257-4.74 38.646-4.692 58.16.023 9.654-6.274 16.005-16.45 16.682-9.746.647-17.027-5.25-18.157-14.554-2.19-18.045-.885-35.905 1.82-53.83 3.193-21.164 9.37-41.3 19.235-60.214 8.372-16.05 18-32.033 33.04-42.05 11.243-7.484 11.54-18.99 16.772-28.625 6.12-11.27 11.038-23.214 17.45-34.303 6.634-11.474 13.933-22.65 21.9-33.235 5.31-7.058 11.937-13.27 18.645-19.09 6.554-5.688 22.398-5.2 30.1.027 6.275 4.26 12.252 8.877 14.536 16.563 1.015 3.414 1.864 6.985 2.036 10.522.89 18.337 4.54 36.187 10.002 53.6 4.553 14.518 9.91 28.8 15.357 43.015 4.75 12.397 2.742 20.994-7.312 27.62-9.004 5.933-18.687 3.078-22.466-6.975-6.21-16.518-12.25-33.103-18.106-49.748-2.16-6.144-3.6-12.542-5.647-19.804zM353.258 105.26c-19.727-.463-39.02-15.458-36.022-41.708 1.854-16.23 15.384-31.007 35.075-31.02 22.817-.015 36.788 16.952 36.836 35.25.065 24.348-17.335 36.37-35.888 37.478zM191.775 54.448c.777 18.13-14.995 34.5-34.352 34.257-20.32-.254-33.938-15.492-34.386-34.186-.48-19.973 15.75-35.287 34.683-35.29 19.667-.005 35.387 17.586 34.055 35.218z' })
								)
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.violence.name')
							)
						),
						_react2.default.createElement(
							'div',
							{ id: t('issues.stuck.name'),
								onMouseEnter: this.handleMouseEnter,
								onMouseLeave: this.handleMouseLeave,
								ref: 'zaglavili',
								className: 'issue zaglavili' },
							_react2.default.createElement(
								'p',
								{ className: 'issue-text' },
								t('issues.stuck.description')
							),
							_react2.default.createElement(
								'svg',
								{ xmlns: 'http://www.w3.org/2000/svg', width: '452', height: '397', viewBox: '0 0 452 397' },
								_react2.default.createElement(
									'g',
									{ fill: '#C04C9C' },
									_react2.default.createElement('path', { d: 'M269.59 380.82c-4.777 0-9.11.274-13.375-.156-1.38-.14-3.516-2.003-3.69-3.294-.997-7.438-1.62-14.932-2.167-22.422-1.43-19.61-2.705-39.233-4.146-58.843-.506-6.883-1.19-13.76-2.062-20.604-.303-2.363-1.426-4.622-2.174-6.93l-1.896.057c-1.767 5.01-4.16 9.896-5.156 15.053-1.553 8.046-1.818 16.336-3.262 24.41-1.37 7.66-3.554 15.176-5.384 22.754-.116.48-.33.94-.4 1.423-1.375 9.366-2.226 18.847-4.27 28.062-1.443 6.493-1.222 14.164-8.162 18.306-3.585 2.14-7.302 4.062-11.007 5.99-.52.27-1.44.25-1.956-.034-3.89-2.136-7.944-4.066-11.53-6.642-6.256-4.492-5.96-11.173-5.126-17.864.102-.82.21-1.64.344-2.455 1.77-10.66 3.515-21.323 5.327-31.976 1.538-9.043 3.035-18.096 4.77-27.102 1.64-8.505 3.64-16.94 5.347-25.432 1.26-6.264 2.353-12.562 3.433-18.86 1.13-6.6 2.168-13.216 3.227-19.827.82-5.116 8.692-12.012 13.994-12.27 3.082-.15 6.188-.176 9.226-.633 1.57-.237 3.99-1.01 4.295-2.05.47-1.6.088-4.49-1.05-5.34-4.865-3.63-9.594-7.467-16.414-7.443-43.997.154-87.995.216-131.99-.03-9.643-.054-22.213 12.41-22.738 22.397-1.01 19.218-3.385 38.362-5.12 57.545-.4 4.442-.334 8.93-.77 13.37-1.128 11.476-2.416 22.937-3.645 34.404-.053.492-.185.98-.22 1.472-1.02 14.3-2.03 28.6-3.052 42.897-.033.48-.174.95-.326 1.742h-16.25c1.14-10.43 2.276-20.84 3.435-31.246.07-.646.446-1.262.488-1.903 1.028-15.512 1.824-31.043 3.093-46.535 1.426-17.4 3.28-34.768 4.94-52.15.36-3.788 1.122-7.6.95-11.364-.36-7.868.896-15.36 3.15-22.89 1.93-6.45.864-7.372-5.94-7.632-.816-.03-1.63-.13-3.634-.295 0-7.404-.137-14.77.06-22.123.095-3.61 3.076-3.118 5.53-3.118 40 .003 79.996.005 119.994.002 30.832-.002 61.663-.02 92.495-.008 6.958.003 6.96.05 6.968 6.972.004 4.167-.145 8.34.04 12.498.185 4.12-1.244 6.396-5.677 6.12-.982-.063-1.994.075-2.973.24-3.816.645-4.882 2.678-3.303 6.28 3.775 8.616 3.73 8.453 13.927 8.248 7.632-.152 15.274.336 22.91.36 8.483.027 11.296-4.546 8.33-12.667-2.127-5.822-3.56-11.898-5.69-17.72-3.426-9.373-6.91-18.743-10.946-27.86-1.177-2.664-1.122-3.843.733-5.92 7.824-8.757 15.59-17.58 23.015-26.675 2.87-3.515 5.03-7.69 7.073-11.783 4.368-8.744 3.087-18.64-4.166-25.18-10.585-9.546-20.858-8.457-30.3 1.213-6.04 6.188-10.392 14.026-15.72 21.43-.568-.65-1.405-1.16-1.49-1.774-1.644-11.74 4.165-25.784 13.213-32.87 7.694-6.027 17.062-6.854 25.343-4.498 11.973 3.403 22.437 10.3 28.982 21.862 5.068 8.954 11.008 17.42 15.943 26.44 3.498 6.39 6.145 13.273 8.854 20.062 4.054 10.16 8.003 20.372 11.65 30.685 1.737 4.913 2.966 10.054 3.915 15.187 1.883 10.188 4.7 20.283 3.443 30.854-1.273 10.693-5.178 20.158-12.805 27.86-6.768 6.834-15.58 8.77-24.675 9.05-12.155.37-24.33.09-36.495.09-9.898 0-19.798-.027-29.697.012-6.403.025-7.282 1.222-7.492 7.542-.396 11.982.908 23.707 3.54 35.41 1.073 4.777.128 9.97.603 14.927 1.838 19.19 1.59 38.59 5.717 57.56.343 1.577.045 3.293.045 5.63z' }),
									_react2.default.createElement('path', { d: 'M359.332 377.704c-20.996 0-41.992-.077-62.987.07-3.833.026-5.823-.94-5.072-5.05 1.796-9.843 3.632-19.678 5.428-29.52.326-1.784.545-3.588.81-5.383 2.23-15.066 4.373-30.147 6.737-45.192.757-4.818 1.834-9.632 3.36-14.25.37-1.12 3.094-2.063 4.74-2.072 22.83-.13 45.658-.078 68.487-.075 8.33.002 16.664.057 24.994-.048 3.067-.038 4.8.514 5.193 4.237.962 9.095 2.24 18.18 3.886 27.177 1.547 8.46 3.875 16.775 5.55 25.216.638 3.22.05 6.678.655 9.908 1.846 9.832 3.834 19.645 6.11 29.383.985 4.207.105 5.704-4.402 5.67-21.162-.156-42.324-.07-63.486-.07zM242.154 169.156c-11.928-1.008-20.117-6.358-26.59-15.436-6.463-9.063-9.704-19.646-11.768-29.87-2.913-14.432-2.954-29.523-3.18-44.348-.044-2.98 4.037-7.505 7.19-8.66 3.612-1.323 8.348-2.02 12.42 1.84 4.555 4.316 5.605 8.986 5.788 14.965.312 10.2 1.172 20.48 3.026 30.5 1.183 6.387 4.263 12.51 7.05 18.49 3.617 7.757 11.568 4.778 16.88-.05 10.42-9.466 19.444-20.1 26.907-32.173 2.437-3.942 5.994-8.326 11.946-8.252 10.524.13 16.503 11.427 11.558 20.072-4.048 7.077-9.296 13.5-14.315 19.98-3.79 4.895-7.597 9.95-12.226 13.983-6.736 5.867-13.88 11.443-21.52 16.02-3.846 2.303-9.175 2.128-13.166 2.94z' }),
									_react2.default.createElement('path', { d: 'M234.346 93.305c-.07-8.01.13-15.014-3.91-21.487-3.7-5.934-8.517-9.313-15.357-9.99-8.825-.87-15.733 2.272-20.744 9.69-1.102 1.633-2.828 2.844-4.266 4.248-1.295-1.536-3.212-2.877-3.773-4.646-1.908-6.027-5.1-12.354-4.597-18.298 1.19-14.083 6.067-27.12 19.51-34.475 6.046-3.31 12.714-5.502 19.164-8.036 1.16-.455 2.727-.427 3.953-.08 15 4.227 28.895 9.42 35.98 25.54 6.66 15.157 4.725 29.11-3.957 42.017-3.925 5.836-9.873 10.89-17.29 13.104-1.334.4-2.527 1.276-4.714 2.415zM187.57 159.175v10.205c-4.928.483-9.8 1.303-14.686 1.376-12.993.193-25.992.066-38.988.066-21.708 0-43.417.082-65.124-.124-2.296-.02-5.484-1.146-6.593-2.845-.984-1.507.16-4.576.764-6.85.206-.772 1.562-1.564 2.513-1.758 5.92-1.203 7.07-4.504 4.33-10.274-2.326-4.893-3.824-10.184-5.61-15.325-1.074-3.084-1.908-6.252-3.01-9.324-2.625-7.31-5.447-14.548-7.997-21.882-2.78-8-5.253-16.11-8.04-24.107-1.6-4.583-3.768-8.97-5.3-13.573-2.057-6.175-4.073-12.398-5.488-18.74-1.06-4.75 4.08-3.87 6.41-5.285.66-.402 4.046 1.937 4.736 3.613 3.554 8.645 6.725 17.45 9.843 26.268C56.53 74 57.18 77.575 58.174 81.037c2.195 7.64 4.14 15.368 6.758 22.86 3.643 10.424 7.892 20.634 11.716 30.996 2.368 6.415 4.65 12.88 6.545 19.443 1.16 4.02 3.498 4.917 7.322 4.902 30.158-.114 60.316-.063 90.475-.063h6.582z' })
								)
							),
							_react2.default.createElement(
								'p',
								null,
								t('issues.stuck.name')
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'usluge-mobile', className: 'issues mobile-issues' },
					_react2.default.createElement('div', { id: 'left', onClick: this.handleSwipeRight, className: 'issue-arrow-left' }),
					_react2.default.createElement(
						'div',
						{ ref: 'carousel', className: 'issue-carousel' },
						this.renderMobileIssues()
					),
					_react2.default.createElement('div', { id: 'right', onClick: this.handleSwipeLeft, className: 'issue-arrow-right' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'text-wrapper text-wrapper-mobile' },
					_react2.default.createElement(
						'h3',
						{ className: 'heading' },
						t('heading')
					),
					_react2.default.createElement(
						'p',
						{ className: 'preamble' },
						t('preamble')
					),
					_react2.default.createElement(
						'a',
						{ href: '/kontakt', className: 'issue-button' },
						t('contactUs')
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'text-wrapper' },
					_react2.default.createElement(
						'h3',
						{ className: 'heading' },
						t('heading')
					),
					_react2.default.createElement(
						'p',
						{ className: 'preamble' },
						t('preamble')
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/kontakt', className: 'issue-button' },
						t('contactUs')
					)
				)
			);
		}
	}]);

	return Issues;
}(_react.Component);

Issues.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
	return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('issueView')(Issues));

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuoteImage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _styles = __webpack_require__(34);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuoteImage = exports.QuoteImage = function (_Component) {
    _inherits(QuoteImage, _Component);

    function QuoteImage(props) {
        _classCallCheck(this, QuoteImage);

        var _this = _possibleConstructorReturn(this, (QuoteImage.__proto__ || Object.getPrototypeOf(QuoteImage)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(QuoteImage, [{
        key: 'render',
        value: function render() {
            var t = this.props.t;


            return _react2.default.createElement(
                'div',
                { className: 'quote-image' },
                _react2.default.createElement(
                    'p',
                    null,
                    t('quote1')
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    t('quote2')
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    t('signature')
                ),
                _react2.default.createElement('img', { className: 'quote-image-desktop', src: '/images/reader.jpg' })
            );
        }
    }]);

    return QuoteImage;
}(_react.Component);

QuoteImage.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('quoteImageView')(QuoteImage));

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Staff = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _staff = __webpack_require__(36);

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = __webpack_require__(37);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Staff = exports.Staff = function (_Component) {
	_inherits(Staff, _Component);

	function Staff(props) {
		_classCallCheck(this, Staff);

		var _this = _possibleConstructorReturn(this, (Staff.__proto__ || Object.getPrototypeOf(Staff)).call(this, props));

		_this.state = {
			openDiploma: false,
			direction: '',
			diploma: ''
		};

		_this.openDiploma = _this.openDiploma.bind(_this);
		_this.closeDiploma = _this.closeDiploma.bind(_this);
		_this.renderPersonalText = _this.renderPersonalText.bind(_this);
		return _this;
	}

	_createClass(Staff, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.dispatch((0, _staff.getStaff)());
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'openDiploma',
		value: function openDiploma(e) {
			var _this2 = this;

			var diplomaDirection = e.currentTarget.getAttribute("data-direction");
			this.setState({ diploma: e.currentTarget.id, direction: diplomaDirection });

			setTimeout(function () {
				_this2.setState({ openDiploma: true });
			}, 200);
		}
	}, {
		key: 'closeDiploma',
		value: function closeDiploma(event) {
			var id = event.target.id;
			if (id === 'inner-wrapper') return;
			this.setState({ diploma: '', openDiploma: false });
		}
	}, {
		key: 'renderPersonalText',
		value: function renderPersonalText(person) {
			var locale = this.state.locale || _i18n2.default.language;
			return person.text[locale].map(function (part, i) {
				return _react2.default.createElement(
					'p',
					{ key: i },
					person.text[locale][i]
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var t = this.props.t;

			var diploma = this.state.openDiploma === true ? 'diploma show-diploma' : 'diploma';
			var self = this;

			return _react2.default.createElement(
				'div',
				{ id: 'kosmomi', className: 'staff' },
				_react2.default.createElement(
					'h3',
					{ className: 'heading' },
					t('heading')
				),
				_react2.default.createElement(
					'p',
					{ className: 'preamble' },
					t('preamble'),
					' ',
					_react2.default.createElement(
						'a',
						{ className: 'link', href: 'http://www.dpfbih.ba' },
						'www.dpfbih.ba'
					),
					'.'
				),
				_react2.default.createElement(
					'div',
					{ id: 'diploma-wrapper', onClick: this.closeDiploma, className: diploma },
					_react2.default.createElement(
						'div',
						{ id: 'inner-wrapper', className: 'diploma-open-wrapper diploma-wrapper-' + this.state.direction },
						_react2.default.createElement('img', { className: 'diploma-' + this.state.direction, src: 'images/diplom-' + this.state.diploma + '.jpg' }),
						_react2.default.createElement(
							'svg',
							{ onClick: this.closeDiploma, xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 44 44', width: '512', height: '512' },
							_react2.default.createElement('path', { d: 'M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm3.2 22.4l7.5 7.5c.2.2.3.5.3.7s-.1.5-.3.7l-1.4 1.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-7.5-7.5c-.2-.2-.5-.2-.7 0l-7.5 7.5c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-1.4-1.4c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l7.5-7.5c.2-.2.2-.5 0-.7l-7.5-7.5c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.2-.2.5-.3.7-.3s.5.1.7.3l7.5 7.5c.2.2.5.2.7 0l7.5-7.5c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.5.3.7s-.1.5-.3.7l-7.5 7.5c-.2.1-.2.5 0 .7z', fill: '#c04c9c' })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'cards' },
					this.props.staff.map(function (person, i) {
						var locale = _this3.state.locale || _i18n2.default.language;
						var image = "./images/" + person.image;

						if (person.active === true) {
							return _react2.default.createElement(
								'div',
								{ key: i, className: 'card' },
								_react2.default.createElement(
									'div',
									{ className: 'photo-wrapper' },
									_react2.default.createElement(
										'div',
										{ className: 'photo-info-wrapper' },
										_this3.renderPersonalText(person)
									),
									_react2.default.createElement('img', { className: 'img-' + person.name + ' ' + person.direction, src: image })
								),
								_react2.default.createElement(
									'div',
									{ className: 'info-wrapper' },
									_react2.default.createElement(
										'div',
										{ className: 'title-wrapper' },
										_react2.default.createElement(
											'p',
											null,
											person.fullName
										),
										_react2.default.createElement(
											'p',
											null,
											person.title[locale]
										)
									),
									_react2.default.createElement(
										'div',
										{ id: person.name, 'data-direction': person.direction,
											className: 'diploma-wrapper', onClick: self.openDiploma },
										_react2.default.createElement(
											'svg',
											{ xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512', width: '512',
												height: '512' },
											_react2.default.createElement('path', {
												d: 'M486.4 51.2H25.6C12.8 51.2 0 64 0 76.8v358.4c0 12.8 12.8 25.6 25.6 25.6h460.8c15.36 0 25.6-12.8 25.6-25.6V76.8c0-12.8-10.24-25.6-25.6-25.6zM58.88 135.68h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm0 102.4h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm256 153.6h-256c-15.36 0-25.6-10.24-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6h256c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zM435.2 256L384 222.72 332.8 256l12.8-51.2-38.4-51.2h53.76L384 102.4l23.04 51.2h53.76l-38.4 51.2 12.8 51.2z',
												fill: '#6393cf' })
										)
									)
								)
							);
						}
					})
				)
			);
		}
	}]);

	return Staff;
}(_react.Component);

Staff.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
	return {
		staff: state.staff.list
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('staffView')(Staff));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStaff = exports.getStaff = undefined;

var _axios = __webpack_require__(4);

var request = _interopRequireWildcard(_axios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getStaff = exports.getStaff = function getStaff() {
    return function (dispatch) {
        return request.get('/staff').then(function (data) {
            dispatch({ type: 'GET_STAFF', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

var createStaff = exports.createStaff = function createStaff(staff) {
    return function (dispatch) {
        return request.post('/staff', { staff: staff }).then(function (data) {}).catch(function (error) {
            console.log('error', error);
        });
    };
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HowItWorks = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _styles = __webpack_require__(39);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HowItWorks = exports.HowItWorks = function (_Component) {
    _inherits(HowItWorks, _Component);

    function HowItWorks(props) {
        _classCallCheck(this, HowItWorks);

        var _this = _possibleConstructorReturn(this, (HowItWorks.__proto__ || Object.getPrototypeOf(HowItWorks)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(HowItWorks, [{
        key: 'render',
        value: function render() {
            var t = this.props.t;


            return _react2.default.createElement(
                'div',
                { id: 'kakoradi', className: 'how-it-works' },
                _react2.default.createElement(
                    'h3',
                    { className: 'heading' },
                    t('heading')
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'preamble' },
                    t('intro'),
                    ' ',
                    _react2.default.createElement(
                        'a',
                        { href: '/faq' },
                        t('here')
                    ),
                    '.'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row-1' },
                    _react2.default.createElement(
                        'div',
                        { className: 'step-wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'circle' },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 626 626', height: '626pt', width: '626pt', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: 'M0 0h81.46c-.49 1.67-2.19 2.94-3.46 4.05-7.15 7.4-16.93 16.96-24.42 24.54-8.01 8.19-16.87 16.31-23.04 25.95-.98.55-1.6 1.37-1.85 2.46-1.75 2.72-4.7 6.57-6.31 9.34-1.84 4.77-5.5 8.42-6.84 14.22-1.24 1.95-1.88 4.07-2.91 6.12-1.71 3.39-2.16 7.61-4.17 10.78-.17 3.01-1.54 6.63-2.45 9.54-.3 1.73-.75 3.89-1.55 5.46-.37 7.15-2.23 11.44-1.92 18.08-.76.65-1.08 1.47-.96 2.46-.03 3.18.04 6.37-.04 9.54-.76.65-1.08 1.47-.96 2.46-.03 3.51.05 7.04-.04 10.54H0V0z', fill: 'transparent' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M81.46 0h1.58c-.71 1.28.65 2.75 1.23 3.87C91.15 13.89 97.03 23.92 103.91 34c1.9 3.8 5.44 7.75 7.37 12 .28 1.17 2.21 1.71 2.42 3 2.43 4.46 5.07 7.75 7.75 12.56 4.45 6.36 8.11 13.13 12.6 19.39 2.33 2.82 3.67 7.25 6.49 9.51 1.36 3.34 4.73 7.77 6.4 10.54.62 2.53 3.09 3.68 3.52 6.54 2.3 1.98 3.78 4.26 4.99 7.02 1.68.95 1.45 2.85 2.89 4.13 1 2.11 2.58 3.54 3.12 5.85 2.64 1.93 3.88 5.86 5.87 8.46 2.8 3.4 4.21 7.52 7.21 10.46 2.03 4.66 7.89 12.17 10.76 17.54 1.71 2.52 3.57 5.21 4.99 8 .01 4.57-2.6 7.04-3.83 11.46-.52 3.46-2.82 5.48-2.92 9.09-1.7 2.67-2.14 6.32-4.08 8.9-.7 4.62-3.37 10.14-5.05 14.55-1.61 2.17-1.02 4.55-2.63 7-1.09 4.97-4.71 10.44-5.24 15.54-2.01 1.29-1.81 4.95-3.08 6.9-.99 3.89-3.15 7.1-3.92 11.11-1.35 2.33-.39 3.97 1 5.9.74 2.13 2.45 3.9 2.92 6.1l1.08.91c.83 3.06 2.95 5.74 4.68 8.37 1.02.87.7 2.49 1.78 3.17 3.06 4.06 5.67 10.22 9.12 13.96 2.54 4.96 7.73 12.15 11.32 16.6 2.29 4.66 6.63 8.39 9.02 12.98 2.57 2.19 4.08 4.91 6.31 7.69 5.19 5.84 9.65 12.28 15.05 17.97.64 1.56 1.39 2.26 2.85 3.08 5.35 6.76 12.02 12.9 17.68 19.39 8.12 8.56 16.26 16.03 24.78 24.11 2.95 2.45 5.42 5.35 8.59 7.56.71 1.15 2 2.9 3.28 3.34 3.32 2.31 6.34 5.42 9.64 7.72.86 1.29 1.72 2.25 3.17 2.89 8.79 6.77 18.2 14.47 27.31 20.6 2.65 2.3 5.96 4.34 8.92 6.07 1.98 1.97 4.36 3.02 6.61 4.42 2.53 2.49 6.22 3.7 8.8 6.16 2.47.96 4.62 2.93 7.19 3.86 3.32 2.82 6.7 3.95 10.36 6.28 3.34.48 6.62 4.92 10 4.35 7.8-2.65 18.05-7.01 25-9.22 2.49-.19 4.58-2.45 7-2.63 3.36-.55 5.62-2.71 8.94-3.41 6.41-2.28 13.16-4.8 19.51-7.31 1.67-.43 3.57-1.02 5-2 3.53-.17 5.8-2.27 9.09-2.92 2.11-1.52 4.75-1.47 6.91-3.08 2.27.03 2.9-1.72 5.1-1 1.72 2.14 5.06 2.98 6.91 5.08 1.69.22 2.46 1.23 3.68 2.2 4.65 2.26 10.92 7.52 15.47 9.68 2.53 2.14 5.74 3.48 8.44 5.41 2.18.56 2.07 2.34 4.49 2.63 1.24 1.18 2.73 1.95 4.1 2.95 3.54 1.95 5.96 4.7 9.9 6.05.95 1.44 2.68 2.15 4.18 2.88 1.22.89 2.31 1.86 3.82 2.12 2.27 2.67 5.65 3.49 7.92 6.08 3.01 1.05 5.96 3.39 8.54 5.2 5.25 3.19 11.18 6.55 15.95 10.31 11.16 6.56 24.14 15.48 35.05 22.18 4.59 3.49 12.2 6.95 16.46 11.31 3.14.9 6.03 3.6 9.09 4.92.57.74 1.21 1.43 1.91 2.08 3.03.74 4.22 2.89 7.11 3.91 1.45 1.47 3.41 2.58 5.43 3.01v1.58c-1.53-.6-3.11 2-4.07 2.96-14.12 13.52-28.49 29.25-42.87 42.1-2.71 2.26-5.82 4.15-8.4 6.54-2.94.96-4.95 3.7-8.21 4.82-3.99 3.75-9.64 5.73-14.5 8.27-3.92.95-7.53 3.8-11.5 4.73-5.58 2.46-9.88 3.13-15.45 4.95-1.89-.35-2.57 1.25-4.55 1.05-2.62 1.53-5.38.76-7.9 2.08-4.86.45-9.18 1.66-14.55 1.88-6.63 1.37-13.84.88-20.54 1.04l-.5.54h-25.01l.01-.78c-3.16-1.44-7.07.28-9.96-1.37-2.85-.47-5.68-.17-8.54-.31-.78-1.02-2.27-.99-3.46-1.56-12.79-2.14-24.7-4.77-37-8.68-3.55-.64-6.6-1.86-10-3.06-4.25-.81-6.72-2.84-11-3.53-4.22-1.91-9.13-3.92-13.55-5.17-3.94-2.46-9.84-3.97-14.07-5.95-7.01-2.74-13.43-6.72-20.43-9.47-3.4-2.48-7.64-3.95-11.49-5.58-2.28-2.17-5.56-2.99-7.92-5.08-3.45-1.14-4.38-2.81-7.65-4.18-2.1-.58-3.21-2.34-5.44-2.74-2.51-2.74-6.95-3.44-9.73-6.19-5.23-2.78-8.06-5.83-12.81-8.12-4.61-3.72-7.36-4.58-11.96-8.05-4.93-2.71-7.28-5.38-11.85-8.41-3.43-3.24-7.79-5.22-11.1-8.6-1.85-.37-2.12-1.84-3.82-2.45-3.34-3.09-7.32-5.13-10.54-8.33-1.27-1-2.57-2.55-4.18-2.85-2.23-2.12-4.68-5.46-7.4-6.72-4.5-4.36-9.89-8.04-14.34-12.5-2.88-1.59-4.82-4.41-7.44-6.59-1.24-1.32-3.1-2.54-3.74-4.27-.89-.27-1.67-.8-2.36-1.6-2.98-3.07-6.47-5.8-9.29-8.86-1.03-1.95-3.71-2.32-4.35-4.54-1.8-1.55-4.21-2.84-5.85-5.46-.19-1.15-1.56-1.67-2.41-2.21-7.71-8.33-14.95-16.06-22.93-24.17-1.72-2.92-4.46-4.82-6.32-7.62-1.25-2.11-3.36-3.33-4.58-5.45-1-1.76-2.96-2.71-3.73-4.55-3.05-3.64-7.86-8.28-10.18-12.54-1.46-.46-2.14-1.93-2.9-3.14-1.73-3.15-5.3-5.92-6.84-9.2-3.54-3.94-5.78-8.17-10.02-13.07-1.23-2.78-4.08-4.16-4.97-7.05-1.22-1.45-2.79-3.65-3.27-5.54-1.9-1-2.21-3.78-4.08-4.92-.69-2.39-3-4.1-3.73-6.54-2.67-4.23-5.13-6.53-7.19-11.54-2.19-1.27-2.94-4.65-4.32-6.61-1.66-3.85-4.42-6.29-5.68-10.39-2.12-1.8-2.88-5.25-4.75-7.41-1.8-3.54-4.24-7.9-5.72-11.05-.6-2.47-2.45-3.84-2.53-6.54-2.33-2.01-3.03-5.89-4.72-8.4-5.52-10.47-9.78-23.03-14.51-34.06-.75-3.07-2.68-5.22-2.77-8.55-2.38-4.17-3.11-9.48-5.08-13.88-.63-2.22-.51-4.75-1.74-6.57-.89-2.37-1.14-5.16-2.26-7.45-.1-1.44-.15-2.76-1-4-.12-1.45-.11-2.76-1-3.99-.75-5.53-2.43-12.98-3.65-18.52-1.05-1.36.45-3.1-1.35-4.5-.29-2.72.55-6.65-1-8.98-.06-3.32.05-7.23-.71-10.5l-.75-.5v-20.02h.54c.09-3.5.01-7.03.04-10.54-.12-.99.2-1.81.96-2.46.08-3.17.01-6.36.04-9.54-.12-.99.2-1.81.96-2.46-.31-6.64 1.55-10.93 1.92-18.08.8-1.57 1.25-3.73 1.55-5.46.91-2.91 2.28-6.53 2.45-9.54 2.01-3.17 2.46-7.39 4.17-10.78 1.03-2.05 1.67-4.17 2.91-6.12 1.34-5.8 5-9.45 6.84-14.22 1.61-2.77 4.56-6.62 6.31-9.34.25-1.09.87-1.91 1.85-2.46 6.17-9.64 15.03-17.76 23.04-25.95C61.07 21.01 70.85 11.45 78 4.05c1.27-1.11 2.97-2.38 3.46-4.05z' }),
                                _react2.default.createElement('path', { d: 'M83.04 0h217.33c-.36 15.74-.06 32.17-.15 48-.26 1.29.5 2.48 1.78 2.58 8.04.02 15.99-.23 24 .68 2.48.32 5.06.06 7.55.2 1.89 1.39 5.19.85 7.45.96 3.99 2.1 8.99 1.85 13.42 3.12 3.66.68 8.13 2.01 12.12 1.92 1.41 1.52 3.11 1.58 5.02 2 3.38 1.22 5.87 2.11 9.44 2.62 3.07 1.13 6.71 2.04 9.56 3.38 3.73 1.65 8.88 2.26 11.9 5.08 2.2.07 4.19.77 6 2 4.24.84 7.86 4.03 12.08 4.92.77 1.42 1.87 1.05 2.91 2.08 3.96 1.71 8.52 4.35 12.1 5.92.84 1.5 2.22 1.41 3.49 2.32 4 2.64 8.43 5.05 12.53 7.68.53.85 1.34 1.41 2.43 1.68 2.31 1.4 3.93 3.42 6.54 4.32 1.2 2.31 4.75 2.73 5.92 5.08 2.99 1.39 5.31 4.21 8.18 5.85 3.05 3.05 6.45 5.41 9.49 8.4 2.81 1.89 4.56 4.94 7.41 6.67 2.64 3.45 6.18 5.76 8.74 9.27 4.76 4.22 8.46 9.57 12.87 14.17 3.1 4.49 7.04 8.39 9.8 13.1 2.21 2.59 3.62 5.16 5.9 8 .35 1.85 1.8 2.1 2.44 3.78 1.72 2.44 3.04 5.7 5.25 7.67.88 2.86 2.83 5.37 3.92 8.09 2.6 2.27 3.31 6.65 5.34 9.52 2.42 5.42 6.01 10.81 7.66 16.49 1.04 1.91 1.96 3.76 2 5.99 2.19 2.05 2.26 6.12 3.9 8.27 2.04 7.33 4.92 13.64 6.6 21.19.9 2.07 1.06 5.43 2.58 7.45-.26 2.87 1.02 5.25.92 8.09 1.11 1.57.89 3.22 1 5 1.61 2.67.59 5.4 2.08 7.91.14 1.54-.25 2.77 1 4 .17 2.77-.33 6.51 1 9-.13 4.24.45 8.33.62 12.55.52 5.82.11 11.71.3 17.55.44.73.95 1.13 1.54 1.19 15.99-.03 32.01.07 48-.05l1 .39v217.38c-2.02-.43-3.98-1.54-5.43-3.01-2.89-1.02-4.08-3.17-7.11-3.91-.7-.65-1.34-1.34-1.91-2.08-3.06-1.32-5.95-4.02-9.09-4.92-4.26-4.36-11.87-7.82-16.46-11.31-10.91-6.7-23.89-15.62-35.05-22.18-4.77-3.76-10.7-7.12-15.95-10.31-2.58-1.81-5.53-4.15-8.54-5.2-2.27-2.59-5.65-3.41-7.92-6.08-1.51-.26-2.6-1.23-3.82-2.12-1.5-.73-3.23-1.44-4.18-2.88-3.94-1.35-6.36-4.1-9.9-6.05-1.37-1-2.86-1.77-4.1-2.95-2.42-.29-2.31-2.07-4.49-2.63-2.7-1.93-5.91-3.27-8.44-5.41-4.55-2.16-10.82-7.42-15.47-9.68-1.22-.97-1.99-1.98-3.68-2.2-1.85-2.1-5.19-2.94-6.91-5.08-2.2-.72-2.83 1.03-5.1 1-2.16 1.61-4.8 1.56-6.91 3.08-3.29.65-5.56 2.75-9.09 2.92-1.43.98-3.33 1.57-5 2-6.35 2.51-13.1 5.03-19.51 7.31-3.32.7-5.58 2.86-8.94 3.41-2.42.18-4.51 2.44-7 2.63-6.95 2.21-17.2 6.57-25 9.22-3.38.57-6.66-3.87-10-4.35-3.66-2.33-7.04-3.46-10.36-6.28-2.57-.93-4.72-2.9-7.19-3.86-2.58-2.46-6.27-3.67-8.8-6.16-2.25-1.4-4.63-2.45-6.61-4.42-2.96-1.73-6.27-3.77-8.92-6.07-9.11-6.13-18.52-13.83-27.31-20.6-1.45-.64-2.31-1.6-3.17-2.89-3.3-2.3-6.32-5.41-9.64-7.72-1.28-.44-2.57-2.19-3.28-3.34-3.17-2.21-5.64-5.11-8.59-7.56-8.52-8.08-16.66-15.55-24.78-24.11-5.66-6.49-12.33-12.63-17.68-19.39-1.46-.82-2.21-1.52-2.85-3.08-5.4-5.69-9.86-12.13-15.05-17.97-2.23-2.78-3.74-5.5-6.31-7.69-2.39-4.59-6.73-8.32-9.02-12.98-3.59-4.45-8.78-11.64-11.32-16.6-3.45-3.74-6.06-9.9-9.12-13.96-1.08-.68-.76-2.3-1.78-3.17-1.73-2.63-3.85-5.31-4.68-8.37l-1.08-.91c-.47-2.2-2.18-3.97-2.92-6.1-1.39-1.93-2.35-3.57-1-5.9.77-4.01 2.93-7.22 3.92-11.11 1.27-1.95 1.07-5.61 3.08-6.9.53-5.1 4.15-10.57 5.24-15.54 1.61-2.45 1.02-4.83 2.63-7 1.68-4.41 4.35-9.93 5.05-14.55 1.94-2.58 2.38-6.23 4.08-8.9.1-3.61 2.4-5.63 2.92-9.09 1.23-4.42 3.84-6.89 3.83-11.46-1.42-2.79-3.28-5.48-4.99-8-2.87-5.37-8.73-12.88-10.76-17.54-3-2.94-4.41-7.06-7.21-10.46-1.99-2.6-3.23-6.53-5.87-8.46-.54-2.31-2.12-3.74-3.12-5.85-1.44-1.28-1.21-3.18-2.89-4.13-1.21-2.76-2.69-5.04-4.99-7.02-.43-2.86-2.9-4.01-3.52-6.54-1.67-2.77-5.04-7.2-6.4-10.54-2.82-2.26-4.16-6.69-6.49-9.51-4.49-6.26-8.15-13.03-12.6-19.39-2.68-4.81-5.32-8.1-7.75-12.56-.21-1.29-2.14-1.83-2.42-3-1.93-4.25-5.47-8.2-7.37-12-6.88-10.08-12.76-20.11-19.64-30.13-.58-1.12-1.94-2.59-1.23-3.87z', fill: 'transparent' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M300.37 0h7.08v.54c2.84.09 5.7.02 8.55.04.99-.12 1.81.2 2.46.96 4.5.11 9.03-.05 13.54.1.95-.02 1.77.28 2.45.9 2.43.2 5.91-.43 8 1 6.78-.47 12.15 1.61 18.55 2.29 20.74 3.97 38.67 9.21 58.33 16.79 1.94 1.71 5.61 2.62 8.21 2.84 1.02 1.72 3.65 2.18 5.37 2.85 5.26 2.79 12.08 5.12 16.53 8.23 4.04 2.11 8.9 4 12.4 6.72 5.42 3.02 10.89 6.47 16.15 9.74 1.16 1.49 3.62 1.88 4.83 3.22 2.99 2.79 5.65 3.57 8.62 6.33.65.38 1.35.68 2.1.91 1.02 2.02 2.82 2.35 4.46 3.64 1.73 1.08 2.35 2.89 4.54 3.36 2.88 3.04 6.69 5.45 9.66 8.36 2.42.89 3.08 3.33 5.36 4.64 1.89 2.82 4.96 3.86 6.71 6.54.57 1.78 2.11 1.47 3.01 2.72 4.04 3.61 7.63 7.73 11.46 11.57 1.59 2.95 5.38 4.86 6.72 8.25 1.35 1.43 3.02 2.12 4.1 3.91 1.22 2.53 3.95 4.15 5.29 6.55 1.19 2.24 2.97 3.63 4.69 5.46.39 2.21 2.38 3.08 2.92 5.09 3.26 3.14 5.17 7.32 8.2 10.72 1.43 1.42.9 3.18 2.88 4.19 3.73 6.93 8.32 13.24 11.73 20.54 2.83 3.65 4.58 9.55 7.39 13.23 2.39 6.27 6.78 13.6 8.8 20.34 2.21 5.79 5.94 12.87 7 18.98 2.15 4.82 3.25 9.35 4.79 14.38 1.09 4.26 3.15 10.06 3.53 14.07.98 3.92 2.47 8.54 2.68 12.55 1.24 2.9.45 5.99 2.08 8.9.01 3.6 1.03 6.96.89 10.55-.32 1.61.81 2.4.71 4 .9 3.01-.67 6.63 1.21 9 .16 3.18 0 6.37.11 9.55.62.66.92 1.48.91 2.45.12 5.17-.03 10.37.09 15.54l.54.5v3.04l-1-.39c-15.99.12-32.01.02-48 .05-.59-.06-1.1-.46-1.54-1.19-.19-5.84.22-11.73-.3-17.55-.17-4.22-.75-8.31-.62-12.55-1.33-2.49-.83-6.23-1-9-1.25-1.23-.86-2.46-1-4-1.49-2.51-.47-5.24-2.08-7.91-.11-1.78.11-3.43-1-5 .1-2.84-1.18-5.22-.92-8.09-1.52-2.02-1.68-5.38-2.58-7.45-1.68-7.55-4.56-13.86-6.6-21.19-1.64-2.15-1.71-6.22-3.9-8.27-.04-2.23-.96-4.08-2-5.99-1.65-5.68-5.24-11.07-7.66-16.49-2.03-2.87-2.74-7.25-5.34-9.52-1.09-2.72-3.04-5.23-3.92-8.09-2.21-1.97-3.53-5.23-5.25-7.67-.64-1.68-2.09-1.93-2.44-3.78-2.28-2.84-3.69-5.41-5.9-8-2.76-4.71-6.7-8.61-9.8-13.1-4.41-4.6-8.11-9.95-12.87-14.17-2.56-3.51-6.1-5.82-8.74-9.27-2.85-1.73-4.6-4.78-7.41-6.67-3.04-2.99-6.44-5.35-9.49-8.4-2.87-1.64-5.19-4.46-8.18-5.85-1.17-2.35-4.72-2.77-5.92-5.08-2.61-.9-4.23-2.92-6.54-4.32-1.09-.27-1.9-.83-2.43-1.68-4.1-2.63-8.53-5.04-12.53-7.68-1.27-.91-2.65-.82-3.49-2.32-3.58-1.57-8.14-4.21-12.1-5.92-1.04-1.03-2.14-.66-2.91-2.08-4.22-.89-7.84-4.08-12.08-4.92-1.81-1.23-3.8-1.93-6-2-3.02-2.82-8.17-3.43-11.9-5.08-2.85-1.34-6.49-2.25-9.56-3.38-3.57-.51-6.06-1.4-9.44-2.62-1.91-.42-3.61-.48-5.02-2-3.99.09-8.46-1.24-12.12-1.92-4.43-1.27-9.43-1.02-13.42-3.12-2.26-.11-5.56.43-7.45-.96-2.49-.14-5.07.12-7.55-.2-8.01-.91-15.96-.66-24-.68-1.28-.1-2.04-1.29-1.78-2.58.09-15.83-.21-32.26.15-48z' }),
                                _react2.default.createElement('path', { d: 'M307.45 0H626v323.04l-.54-.5c-.12-5.17.03-10.37-.09-15.54.01-.97-.29-1.79-.91-2.45-.11-3.18.05-6.37-.11-9.55-1.88-2.37-.31-5.99-1.21-9 .1-1.6-1.03-2.39-.71-4 .14-3.59-.88-6.95-.89-10.55-1.63-2.91-.84-6-2.08-8.9-.21-4.01-1.7-8.63-2.68-12.55-.38-4.01-2.44-9.81-3.53-14.07-1.54-5.03-2.64-9.56-4.79-14.38-1.06-6.11-4.79-13.19-7-18.98-2.02-6.74-6.41-14.07-8.8-20.34-2.81-3.68-4.56-9.58-7.39-13.23-3.41-7.3-8-13.61-11.73-20.54-1.98-1.01-1.45-2.77-2.88-4.19-3.03-3.4-4.94-7.58-8.2-10.72-.54-2.01-2.53-2.88-2.92-5.09-1.72-1.83-3.5-3.22-4.69-5.46-1.34-2.4-4.07-4.02-5.29-6.55-1.08-1.79-2.75-2.48-4.1-3.91-1.34-3.39-5.13-5.3-6.72-8.25-3.83-3.84-7.42-7.96-11.46-11.57-.9-1.25-2.44-.94-3.01-2.72-1.75-2.68-4.82-3.72-6.71-6.54-2.28-1.31-2.94-3.75-5.36-4.64-2.97-2.91-6.78-5.32-9.66-8.36-2.19-.47-2.81-2.28-4.54-3.36-1.64-1.29-3.44-1.62-4.46-3.64-.75-.23-1.45-.53-2.1-.91-2.97-2.76-5.63-3.54-8.62-6.33-1.21-1.34-3.67-1.73-4.83-3.22-5.26-3.27-10.73-6.72-16.15-9.74-3.5-2.72-8.36-4.61-12.4-6.72-4.45-3.11-11.27-5.44-16.53-8.23-1.72-.67-4.35-1.13-5.37-2.85-2.6-.22-6.27-1.13-8.21-2.84C399.67 15.04 381.74 9.8 361 5.83c-6.4-.68-11.77-2.76-18.55-2.29-2.09-1.43-5.57-.8-8-1-.68-.62-1.5-.92-2.45-.9-4.51-.15-9.04.01-13.54-.1-.65-.76-1.47-1.08-2.46-.96-2.85-.02-5.71.05-8.55-.04V0z', fill: 'transparent' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M300.36 101.23c.67-.55 1.55-.77 2.64-.65 8.53.21 16.99.89 25.54.88 2.83 2.5 8.48 1.29 11.46 2.54 2.46 1.12 4.91.14 7.44 1.54 5.68.75 13.13 3.61 19.56 4.74 4.08 1.99 9.13 3.36 13.46 5.26 3.45.51 5.47 2.76 9.08 2.92 1.03 1.64 3.61 2.2 5.32 2.86 5.78 3.04 13.75 6.01 18.6 10.22 2.12.36 3.41 1.69 4.99 3 4.36 1.72 6.37 3.85 9.95 6.03 1.68 1.81 4.11 2.39 5.78 4.24 4.71 3.75 11.86 8.9 15.85 13.19 1.04 1.33 2.99 1.49 3.43 3.54.74.11 1.38.47 1.91 1.07 1.67 2.12 4.04 3.1 5.56 5.39.97 1.69 3.23 2.66 3.53 4.54 2.87 1.93 4.41 4.77 7.08 6.92 7.36 9.4 14.95 18.72 20.81 29.21 2.05 2.21 2.81 5.96 5.19 7.78 1.33 3.31 3.15 5.63 3.92 9.1 1.85.99 1.2 3.12 2.42 4.5 1.26 1.13 1.04 2.73 1.91 4 1.45 3.25 3.45 5.75 3.67 9.5 1.53 1.63 1.44 3.52 2.37 5.45 2.02 4.39 2.08 7.3 3.9 11.04 1.85 5.76 3.13 13.55 4.97 19.02 1.78 8.39 2.03 12.86 3.04 21 1.42 7.24.32 15.09.72 22.48 1.8 1.48.58 3.13-1.46 2.89-15.33-.01-30.67 0-46-.01-1.09-.29-1.57-1.1-1.42-2.42-.01-3.67 0-7.33 0-11-1.08-2.97-.96-6.35-1.04-9.55-1.37-1.2-.81-2.44-1-4-1.47-2.91-.35-5.94-2.08-8.9-.11-1.43-.14-2.79-1-4-.09-3.57-1.89-6.5-1.92-10.1-3.08-5.95-5.56-15.91-8.83-22.45-2.72-3.28-3.59-8.14-5.99-12-3.18-4.34-4.88-8.53-8.36-13.27-2.11-4.02-6.14-7.22-7.82-11.27-2.63-1.9-3.82-4.61-6.17-6.82-2.91-2.37-4.76-5.68-7.91-8.1-1.89-2.89-5.04-4.12-7.1-6.91-3.72-3.23-7.11-6.17-11.17-8.91-4.25-4.01-8.51-6.21-13.5-9.33-4.99-2.38-7.03-5.16-12.42-6.75-1.42-1.15-2.97-1.91-4.82-2.1-1.24-1.99-4.55-2.29-6.45-3.41-5.89-2.5-12.86-4.59-18-6.71-3.42-.15-6.15-1.93-9.54-1.88-1.23-.96-2.53-.94-4-1-2.91-1.69-6.02-.79-8.91-2.08-1.54-.13-2.76.22-4-1-7.67-.29-15.2-.93-23.09-.92-.27-1.14-.37-2.32-.28-3.54.14-14.92-.22-31.03.18-45.77z' }),
                                _react2.default.createElement('path', { d: 'M0 175.56l.75.5c.76 3.27.65 7.18.71 10.5 1.55 2.33.71 6.26 1 8.98 1.8 1.4.3 3.14 1.35 4.5 1.22 5.54 2.9 12.99 3.65 18.52.89 1.23.88 2.54 1 3.99.85 1.24.9 2.56 1 4 1.12 2.29 1.37 5.08 2.26 7.45 1.23 1.82 1.11 4.35 1.74 6.57 1.97 4.4 2.7 9.71 5.08 13.88.09 3.33 2.02 5.48 2.77 8.55 4.73 11.03 8.99 23.59 14.51 34.06 1.69 2.51 2.39 6.39 4.72 8.4.08 2.7 1.93 4.07 2.53 6.54 1.48 3.15 3.92 7.51 5.72 11.05 1.87 2.16 2.63 5.61 4.75 7.41 1.26 4.1 4.02 6.54 5.68 10.39 1.38 1.96 2.13 5.34 4.32 6.61 2.06 5.01 4.52 7.31 7.19 11.54.73 2.44 3.04 4.15 3.73 6.54 1.87 1.14 2.18 3.92 4.08 4.92.48 1.89 2.05 4.09 3.27 5.54.89 2.89 3.74 4.27 4.97 7.05 4.24 4.9 6.48 9.13 10.02 13.07 1.54 3.28 5.11 6.05 6.84 9.2.76 1.21 1.44 2.68 2.9 3.14 2.32 4.26 7.13 8.9 10.18 12.54.77 1.84 2.73 2.79 3.73 4.55 1.22 2.12 3.33 3.34 4.58 5.45 1.86 2.8 4.6 4.7 6.32 7.62 7.98 8.11 15.22 15.84 22.93 24.17.85.54 2.22 1.06 2.41 2.21 1.64 2.62 4.05 3.91 5.85 5.46.64 2.22 3.32 2.59 4.35 4.54 2.82 3.06 6.31 5.79 9.29 8.86.69.8 1.47 1.33 2.36 1.6.64 1.73 2.5 2.95 3.74 4.27 2.62 2.18 4.56 5 7.44 6.59 4.45 4.46 9.84 8.14 14.34 12.5 2.72 1.26 5.17 4.6 7.4 6.72 1.61.3 2.91 1.85 4.18 2.85 3.22 3.2 7.2 5.24 10.54 8.33 1.7.61 1.97 2.08 3.82 2.45 3.31 3.38 7.67 5.36 11.1 8.6 4.57 3.03 6.92 5.7 11.85 8.41 4.6 3.47 7.35 4.33 11.96 8.05 4.75 2.29 7.58 5.34 12.81 8.12 2.78 2.75 7.22 3.45 9.73 6.19 2.23.4 3.34 2.16 5.44 2.74 3.27 1.37 4.2 3.04 7.65 4.18 2.36 2.09 5.64 2.91 7.92 5.08 3.85 1.63 8.09 3.1 11.49 5.58 7 2.75 13.42 6.73 20.43 9.47 4.23 1.98 10.13 3.49 14.07 5.95 4.42 1.25 9.33 3.26 13.55 5.17 4.28.69 6.75 2.72 11 3.53 3.4 1.2 6.45 2.42 10 3.06 12.3 3.91 24.21 6.54 37 8.68 1.19.57 2.68.54 3.46 1.56 2.86.14 5.69-.16 8.54.31 2.89 1.65 6.8-.07 9.96 1.37l-.01.78H0V175.56z', fill: 'transparent' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M300.46 200.46c4.02-.06 8.07-.06 12.08 0 1.61 1.73 3.43.32 5.46 1.61 4.74.35 10.77 1.53 15 3.51 5.77.61 11.61 3.39 17 5.43 3.76 1.23 7.82 4 11.55 5.45 1.56 2.34 4.81 2.31 6.68 4.3 1.77 1.16 2.71 2.74 4.7 3.39 4.77 3.34 9.55 7.11 13.53 11.39 3 1.63 3.86 4.48 6.54 6.46 2.37 2.27 4.09 5.2 6.54 7.46 1.8 3.37 4.49 6.26 6.48 9.54 2.16 3.94 4.28 7.57 6.52 11.46.64 1.57.41 3.08 2 3.99.74 3.37 2.69 6.16 3.47 9.55 1.84 5.15 3.47 11.6 4.92 17 1.02 3.63.59 9.41 2.61 12.46.06 4.01.06 8.06 0 12.08-4.47.43-9.05.1-13.54.2-12.02-.13-24.62.26-36.54-.2-.54-3.92-.6-8.11-.92-12.09-1.3-2.31-.27-4.74-2.08-6.9-.04-3.22-2.12-5.66-1.92-9.09-1.55-.36-1.65-1.69-2-3-1.13-1.89-2.2-3.97-3-6.02-1.52-.83-1.31-2.28-2.36-3.49-4.99-7.18-10.93-14.09-18.18-19.24-2.54-2.3-5.43-3.32-8-5.47-2.37-1.5-5.3-2.01-7.45-3.78-3.41-.74-6.62-2.77-10.1-2.92-4.58-2.19-10.08-1.95-15-2-1.27-1.11-2.49-.52-3.99-1-.21-.82-.29-1.66-.25-2.54.01-15-.01-30 .02-45-.04-.88.03-1.72.23-2.54z' }),
                                _react2.default.createElement('path', { d: 'M626 545.04V626H472.96l.5-.54c6.7-.16 13.91.33 20.54-1.04 5.37-.22 9.69-1.43 14.55-1.88 2.52-1.32 5.28-.55 7.9-2.08 1.98.2 2.66-1.4 4.55-1.05 5.57-1.82 9.87-2.49 15.45-4.95 3.97-.93 7.58-3.78 11.5-4.73 4.86-2.54 10.51-4.52 14.5-8.27 3.26-1.12 5.27-3.86 8.21-4.82 2.58-2.39 5.69-4.28 8.4-6.54 14.38-12.85 28.75-28.58 42.87-42.1.96-.96 2.54-3.56 4.07-2.96z', fill: 'transparent' })
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'sub-heading' },
                            t('step1.heading')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description' },
                            t('step1.text')
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'step-wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'circle' },
                            _react2.default.createElement(
                                'svg',
                                { className: 'step-2', viewBox: '0 0 78 81', height: '108', width: '104', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: 'M0 0h78v81h-.07c-1.3-3.21-2.71-6.37-4.13-9.52-1.72.88-3.41 1.84-5.13 2.74-7.68-2.97-15.41-5.86-23.03-9.01 5.09-2.06 10.13-4.24 15.2-6.34 2.48-1.39 5.24.5 7.79 1.05-.79-1.83-1.6-3.65-2.39-5.47-4.92.01-9.88-.15-14.79.12 1.57.5 3.14.99 4.71 1.48-3.4 1.37-6.83 2.7-10.27 3.99.09-11.8-.27-23.64.16-35.44l1.34 1.12c.73 5.66-.08 11.61.56 17.31.85 2.34 4.22 2.08 4.56-.43.3-6.1.27-12.35.07-18.46-.12-4.3-3.7-6.96-7.58-7.85-4.56-.92-9.76-1.02-14.14.71-2.97 1.19-5.31 3.65-5.39 6.99-.15 6.21-.34 12.51-.07 18.72.71 2.4 3.7 2.68 4.65.32.64-5.7-.17-11.63.56-17.3l1.34-1.14c.44 11.8.07 23.64.16 35.45-3.43-1.29-6.85-2.62-10.26-3.99 1.57-.49 3.13-.97 4.69-1.48-4.91-.27-9.86-.12-14.78-.12-.79 1.83-1.6 3.65-2.39 5.48 2.53-.55 5.33-2.45 7.79-1.06 5.07 2.09 10.1 4.29 15.19 6.35-7.6 3.14-15.31 6.02-22.98 9-1.74-.9-3.45-1.85-5.21-2.72C2.74 74.65 1.41 77.84.02 81H0V0z', fill: 'transparent' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M35.27 1.25c2.5-1.55 4.95-1.53 7.45.01 3.62 2.28 4.19 7.68 1.33 10.78-2.55 2.99-7.56 2.99-10.11.01-2.85-3.12-2.33-8.53 1.33-10.8zM45 16.29c3.88.89 7.46 3.55 7.58 7.85.2 6.11.23 12.36-.07 18.46-.34 2.51-3.71 2.77-4.56.43-.64-5.7.17-11.65-.56-17.31l-1.34-1.12c-.43 11.8-.07 23.64-.16 35.44 3.44-1.29 6.87-2.62 10.27-3.99-1.57-.49-3.14-.98-4.71-1.48 4.91-.27 9.87-.11 14.79-.12.79 1.82 1.6 3.64 2.39 5.47-2.55-.55-5.31-2.44-7.79-1.05-5.07 2.1-10.11 4.28-15.2 6.34 7.62 3.15 15.35 6.04 23.03 9.01 1.72-.9 3.41-1.86 5.13-2.74 1.42 3.15 2.83 6.31 4.13 9.52H56.27c1.99-1.04 3.94-2.17 5.9-3.26-7.69-3.28-15.39-6.6-23.17-9.66-7.78 3.06-15.47 6.38-23.17 9.66 1.97 1.09 3.92 2.21 5.91 3.26H.02c1.39-3.16 2.72-6.35 4.14-9.5 1.76.87 3.47 1.82 5.21 2.72 7.67-2.98 15.38-5.86 22.98-9-5.09-2.06-10.12-4.26-15.19-6.35-2.46-1.39-5.26.51-7.79 1.06.79-1.83 1.6-3.65 2.39-5.48 4.92 0 9.87-.15 14.78.12-1.56.51-3.12.99-4.69 1.48 3.41 1.37 6.83 2.7 10.26 3.99-.09-11.81.28-23.65-.16-35.45l-1.34 1.14c-.73 5.67.08 11.6-.56 17.3-.95 2.36-3.94 2.08-4.65-.32-.27-6.21-.08-12.51.07-18.72.08-3.34 2.42-5.8 5.39-6.99 4.38-1.73 9.58-1.63 14.14-.71z' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M39.94 41.76c.07 6.42.18 12.87 0 19.29.11.93-.48 1.61-1.78 2.05-.28-5.35-.11-10.73-.21-16.1.37-2.31-1.06-4.65 1.99-5.24z' }),
                                _react2.default.createElement('path', { fill: 'transparent', d: 'M39 68.08c7.78 3.06 15.48 6.38 23.17 9.66-1.96 1.09-3.91 2.22-5.9 3.26H21.74c-1.99-1.05-3.94-2.17-5.91-3.26 7.7-3.28 15.39-6.6 23.17-9.66z' })
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'sub-heading' },
                            t('step2.heading')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description' },
                            t('step2.text')
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row-2' },
                    _react2.default.createElement(
                        'div',
                        { className: 'step-wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'circle' },
                            _react2.default.createElement(
                                'svg',
                                { className: 'step-3', viewBox: '0 0 95 95', height: '95pt', width: '95pt', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: 'M0 0h95v95H0V0z', fill: '#C04C9C' }),
                                _react2.default.createElement('path', { d: 'M20.01 5c.23 3.78.23 8.27 0 12.06-.49 2.61-3.79 3.16-5.13.85-.56-2.2-.27-4.65-.34-6.91.09-2.25-.26-4.75.39-6.91 1.45-2.13 4.5-1.54 5.08.91zM60.93 2.76c1.97-.13 3.41 1.13 3.3 3.16.02 3.96.26 8.03-.2 11.97-1.46 1.92-3.7 2.05-5.06-.03-.44-2.22-.24-4.6-.29-6.86.38-2.71-1.19-7.24 2.25-8.24z', fill: '#ffffff' }),
                                _react2.default.createElement('path', { d: 'M11.69 13.66c.2 2.29-.21 4.44 1.32 6.34 2.12 2.69 6 2.77 8.35.34 1.8-1.83 1.32-4.17 1.55-6.54 10.97-.01 21.93-.01 32.89 0 .27 2.38-.09 4.87 1.76 6.67 2.22 2.17 5.66 2.17 7.87-.02 1.91-1.84 1.35-4.32 1.59-6.75 3.91-.06 7.37.89 8.15 5.21.33 7.48.01 15.02.14 22.51h-5.57c0-3.67.01-7.34.04-11.01-20.24-.03-40.49-.04-60.73.01.17 12.88-.06 25.77.12 38.65 11.02.02 22.03 0 33.05.01-.04 1.85-.07 3.69-.1 5.54-10.98-.21-21.99.08-32.96-.14-3.34-.11-5.83-3.15-5.62-6.44-.06-15.33.04-30.71-.04-46.04.08-2.25-.12-4.25 1.49-6.05 1.82-2.2 4.08-2.02 6.7-2.29z', fill: '#ffffff' }),
                                _react2.default.createElement('path', { d: 'M14.57 35.86H25.6c0 3.67.01 7.34.02 11.01-3.68.03-7.37.04-11.06.02 0-3.68 0-7.36.01-11.03zM31.17 35.86c3.67-.01 7.34-.01 11.01 0 .01 3.68.01 7.36.01 11.03-3.68.01-7.36.01-11.05-.01l.03-11.02zM47.68 35.86h11.03c.01 3.67.02 7.34.02 11.01-3.68.03-7.37.04-11.05.02V35.86zM64.46 47.61c12.54-3.27 25.56 5.6 27.17 18.42 1.68 11.46-6.29 22.54-17.64 24.65-11.87 2.49-23.9-5.81-25.95-17.71-2.19-11.29 5.29-22.7 16.42-25.36zM25.64 52.49c-.04 3.67-.05 7.33 0 11-3.7.01-7.4.01-11.1 0 .03-3.67.03-7.33-.01-11 3.71-.03 7.41-.04 11.11 0zM31.11 52.49c3.7-.03 7.4-.03 11.1 0-.03 3.66-.03 7.33-.01 11-3.7.02-7.4.01-11.1-.02.07-3.66.08-7.32.01-10.98z', fill: '#ffffff' }),
                                _react2.default.createElement('path', { d: 'M65.18 53.12c6.25-1.86 13.22.33 17.32 5.36 4.2 4.98 5.02 12.23 2.02 18.03-3.23 6.4-10.46 10.1-17.56 8.83-7.45-1.24-13.34-7.76-13.71-15.32-.56-7.62 4.61-14.83 11.93-16.9z', fill: '#C04C9C' }),
                                _react2.default.createElement('path', { d: 'M80.78 63.17c2.16 1.21 1.87 3.32.22 4.84-4.35 4.16-8.31 8.86-13.08 12.54-3.41-2.17-5.71-5.06-8.63-7.85-.85-.99-2.32-2.11-2.05-3.56.27-1.91 2.8-3.31 4.34-1.78 2.25 1.81 4.17 4.05 6.24 6.06 2.92-2.95 5.82-5.93 8.78-8.84 1.26-1.06 2.41-2.49 4.18-1.41z', fill: '#ffffff' })
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'sub-heading' },
                            t('step3.heading')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description narrow' },
                            t('step3.text1')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'narrow' },
                            'E-po\u0161ta: ',
                            _react2.default.createElement(
                                'a',
                                { href: 'mailto:info@zdravlje.nu' },
                                'info@zdravlje.nu'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'narrow' },
                            ' Telefon: +387 603 21 22 90 ili +387 66 23 60 83'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'narrow' },
                            'Skype-ime: info@zdravlje.nu'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description' },
                            t('step3.text2')
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'step-wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'circle' },
                            _react2.default.createElement(
                                'svg',
                                { className: 'step-4', viewBox: '0 0 287 230', height: '230pt', width: '287pt', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: 'M0 0h287v230H0V0z', fill: 'transparent' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M41.98 15.01c67.22-.03 134.89.02 202.06-.03 7.69-.14 14.5 6.18 15.24 13.76.82 3.73.36 7.38.61 11.2.04 22.37.05 44.75 0 67.12-.51 4.77.08 9.42-.28 14.19.36 3.14.33 5.89 0 9.03.17 8.41.55 16.8.18 25.21-.02 4.79-.17 10.38-2.77 14.56-1.88 3.54-6.62 5.46-10.19 6.83-3.25.3-6.56.08-9.83.12H42.99c-8.24-.27-15.24-7.71-15.01-15.96.06-43.6 0-87.42.02-131.05.31-6.95 6.81-14.63 13.98-14.98z' }),
                                _react2.default.createElement('path', { d: 'M145.5 20.23c.82.96 1.61 1.95 2.4 2.93-1.04.89-2.17 2.73-3.7 2.5-1.67-.15-2.09-1.5-3.1-2.62 1.4-2.1 1.88-2.63 4.4-2.81zM52.6 30.66c60 .01 120 0 180 .01 4.01.01 8.05-.11 12.04.16-.98 4.12-.59 7.97-.64 12.17 0 21.35.01 42.7-.01 64.04-.1 3.47.71 6.71.21 10.16-.49 4.21-.07 8.34.19 12.54-.66 7.1-.3 14.14-.4 21.25.03 3.64-.24 7.06.54 10.59-1.31-.16-2.62-.22-3.93-.25-63.59 0-127.21.02-190.8-.01-2.28-.02-4.54-.01-6.8.31-.01-43.57.01-87.16-.01-130.73 3.15-.44 6.43-.21 9.61-.24z', fill: '#C04C9C' }),
                                _react2.default.createElement('path', { fill: '#ffffff', d: 'M141.56 51.25c4.75 0 10.03-.42 14.57 1.11 3.04.84 5.57 2.33 8.53 3.63 2.36.91 3.31 3.25 5.47 4.69 1.75 1.24 3.44 2.26 4.52 4.19 2.8 4.53 5.37 9.47 6.52 14.7 2.78-.06 8.04-1.41 9.51 1.73 2.38 5.44 1.49 12.16-.98 17.41-.69 1.45-1.18 1.66-2.68 2.07 1.46 4.08 4.23 7.72 5.52 11.83-1.08 1.88-2.12 3.81-3.37 5.58-2.16 2.62-4.94 4.72-7.35 7.12-3.63 3.34-7.99 4.99-12.31 7.22-3.72 1.68-7.79 2.01-11.52 3.7 2.26-2.61 3.87-5.57 5.83-8.41 2.57-3.58 2.98-8.01 5.21-11.84-5.29 1.08-10.76.57-16.07 2.1-1.19.71-2.23 1.69-3.39 2.47-3.62.54-7.05-.02-10.52-1.07-.81-3.02-3.01-5.16-.81-8.1 4.21-1.96 8.18-1.32 12.67-1.38-.22.48-.45.96-.68 1.43 6.77.96 13.18-.43 19.86-.96 1.42-4.07.82-8.08.94-12.51.24-5.9-1.86-10.84-2.9-16.44-1.01-.9-1.99-1.82-2.99-2.73-5.89 4.34-13.25 6.88-20.37 8.24-6.19 1.67-12.48 3.07-18.75 4.4-2.84.52-5.96 1.31-8.31 3.04-2.06 7.77.26 14.56 1.7 22.13 1.05 3.36 2.35 6.87 3.99 9.98 2.23 2.96 4.51 5.8 6.03 9.23-5.3-1.32-11.11-2.6-15.92-5.22-3.85-3.24-8.47-5.45-11.98-8.97-2.13-3.04-5.49-5.34-6.56-8.76-.33-2.43 1.61-5.05 2.89-7 2.55-3.1 4.04-6.62 5.81-10.18 3.63-7.77 4.57-16.08 8.21-23.83 1.73-3.62 3.78-7.64 6.88-10.27 2.16-1.93 4.13-4.2 6.46-5.92 5.18-2.57 10.48-4.43 16.34-4.41zM40.99 182.01c54.35.01 108.71 0 163.06 0 1.76.03 3.51.2 5.26.38 12.46-.78 25.19-.2 37.72-.4 5.65.05 7.82 4.16 10.97 8.01 5.28 6.33 10.53 12.83 15.78 19.23 1.73 1.61 1.1 4.44 1.34 6.62-3.19 2.76-8.02 3.25-12.08 3.18-5.94-.15-11.4.38-17.18-.64-2.28.07-4.51.68-6.82.61-63.36-.03-126.73 0-190.09-.01-2.22.04-4.43-.46-6.64-.38-5.16.62-10.12.33-15.31.4-4.07-.03-7.81.43-11.64-1.33-2.06-1.64-4.46-3.26-3.06-6.22 3.11-4.8 7.34-8.81 10.7-13.47 3.52-4.17 7-8.35 10.29-12.71 1.74-2.51 4.85-3.07 7.7-3.27z' }),
                                _react2.default.createElement('path', { fill: '#C04C9C', d: 'M125.98 197.97c15.34.07 30.7.01 46.04.02 2.42-.09 4.22 1.18 6.4 2.09.31 2.94 1.68 5.76 1.64 8.7-.49 1.2-1.46 2.21-2.22 3.26-22.23-.09-44.57.05-66.78-.06-2.43.26-3.98-2.88-3.81-5.01.76-2.73 1.77-5.36 2.97-7.93 5.42.48 10.39-1.3 15.76-1.07z' })
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'sub-heading' },
                            t('step4.heading')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description' },
                            t('step4.text1')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description' },
                            t('step4.text2')
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'description' },
                            t('step4.text3')
                        )
                    )
                )
            );
        }
    }]);

    return HowItWorks;
}(_react.Component);

HowItWorks.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('howItWorksView')(HowItWorks));

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Newsletter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _joiValidationStrategy = __webpack_require__(41);

var _joiValidationStrategy2 = _interopRequireDefault(_joiValidationStrategy);

var _validation = __webpack_require__(42);

var _reactValidationMixin = __webpack_require__(43);

var _reactValidationMixin2 = _interopRequireDefault(_reactValidationMixin);

var _encounter = __webpack_require__(8);

var _newsletter = __webpack_require__(44);

var _styles = __webpack_require__(46);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Newsletter = exports.Newsletter = function (_Component) {
    _inherits(Newsletter, _Component);

    function Newsletter(props) {
        _classCallCheck(this, Newsletter);

        var _this = _possibleConstructorReturn(this, (Newsletter.__proto__ || Object.getPrototypeOf(Newsletter)).call(this, props));

        _this.state = {
            mail: '',
            successMessage: ''
        };

        _this.validatorTypes = _newsletter.newsletterValidator;
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.getValidationMessages = _this.getValidationMessages.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.resetSuccess = _this.resetSuccess.bind(_this);
        return _this;
    }

    _createClass(Newsletter, [{
        key: 'getValidationMessages',
        value: function getValidationMessages(prop) {
            var t = this.props.t;

            return this.props.getValidationMessages(prop).map(function (message, i) {
                var validationMessage = message.indexOf('pattern') > -1 ? t('validation.wrongRegexFormat') : t('validation.' + message);
                return _react2.default.createElement(
                    'span',
                    { key: i, className: 'error' },
                    validationMessage
                );
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ mail: event.target.value });
        }
    }, {
        key: 'getValidatorData',
        value: function getValidatorData() {
            return this.state;
        }
    }, {
        key: 'resetSuccess',
        value: function resetSuccess() {
            this.setState({ successMessage: '' });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            var _this2 = this;

            event.preventDefault();

            this.props.validate(function (error) {
                if (!error) {
                    _this2.setState({ mail: '', successMessage: 'Hvala vam što ste zainteresovani za Zdravlje.nu.' });
                    _this2.props.dispatch((0, _encounter.addUserToNewsletter)(_this2.state.mail));
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var t = this.props.t;


            return _react2.default.createElement(
                'div',
                { className: 'newsletter' },
                _react2.default.createElement('img', { src: '/images/envelope-feelwell.svg' }),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h2',
                        { className: 'heading' },
                        '\u017Delim da dobijam informacije o popustima i drugim ponudama'
                    ),
                    _react2.default.createElement('input', {
                        onChange: this.handleChange,
                        onKeyUp: this.resetSuccess,
                        className: this.getValidatorData('mail'),
                        value: this.state.mail,
                        placeholder: 'E-po\u0161ta adresa', type: 'text' }),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.handleSubmit },
                        'OK'
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'successMessage' },
                    this.state.successMessage
                ),
                this.getValidationMessages('mail')
            );
        }
    }]);

    return Newsletter;
}(_react.Component);

Newsletter.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('newsletterView')((0, _reactValidationMixin2.default)((0, _joiValidationStrategy2.default)((0, _validation.i18nValidation)()))(Newsletter)));

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("joi-validation-strategy");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var i18nValidation = exports.i18nValidation = function i18nValidation() {
    return {
        language: {
            string: {
                regex: {
                    phone: '!!Netačan format telefona'
                }
            }
        }
    };
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("react-validation-mixin");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newsletterValidator = undefined;

var _joi = __webpack_require__(45);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newsletterValidator = exports.newsletterValidator = _joi2.default.object().keys({
    mail: _joi2.default.string().email().required()
}).options({
    stripUnknown: true,
    allowUnknown: true
});

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Share = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactI18next = __webpack_require__(2);

var _styles = __webpack_require__(48);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Share = exports.Share = function (_Component) {
    _inherits(Share, _Component);

    function Share(props) {
        _classCallCheck(this, Share);

        var _this = _possibleConstructorReturn(this, (Share.__proto__ || Object.getPrototypeOf(Share)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Share, [{
        key: 'render',
        value: function render() {
            var t = this.props.t;


            return _react2.default.createElement(
                'div',
                { className: 'share' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { src: '/images/facebook.svg' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Facebook'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { src: '/images/twitter.svg' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Twitter'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { src: '/images/youtube.svg' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Youtube'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { src: '/images/instagram.svg' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Instagram'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { src: '/images/skype.svg' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Skype'
                    )
                )
            );
        }
    }]);

    return Share;
}(_react.Component);

Share.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('ShareView')(Share));

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Footer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(3);

var _reactI18next = __webpack_require__(2);

var _blog = __webpack_require__(50);

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = __webpack_require__(51);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = exports.Footer = function (_Component) {
    _inherits(Footer, _Component);

    function Footer(props) {
        _classCallCheck(this, Footer);

        var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Footer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.dispatch((0, _blog.getBlogs)());
        }
    }, {
        key: 'render',
        value: function render() {
            var t = this.props.t;

            var locale = this.state.locale || _i18n2.default.language;

            /*
             <div>
                <img src="/images/twitter.svg" />
                <span className="label">Twitter</span>
             </div>
             <div>
                <img src="/images/youtube.svg" />
                <span className="label">Youtube</span>
             </div>
             <div>
                <img src="/images/instagram.svg" />
                <span className="label">Instagram</span>
             </div>
             */

            return _react2.default.createElement(
                'footer',
                { className: 'footer' },
                _react2.default.createElement(
                    'div',
                    { className: 'col col-1' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        t('aboutWord'),
                        ' zdravlje.nu'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        t('about')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'address' },
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'heading' },
                                t('address'),
                                ':'
                            ),
                            ' Baunad doo Tuzla, Zdravlje.nu, Mar\u0161ala Tita 109, 75000 Tuzla, Bosna i Hercegovina'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'share-mobile' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: 'blank', href: 'https://www.facebook.com/zdravljenu-158721211521168', className: 'label' },
                                _react2.default.createElement('img', { src: '/images/facebook.svg' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: 'blank', href: 'skype:info@zdravlje.nu?call', className: 'label' },
                                _react2.default.createElement('img', { src: '/images/skype.svg' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: 'blank', href: 'mailto:info@zdravlje.nu', className: 'label' },
                                _react2.default.createElement('img', { src: '/images/email.png' })
                            )
                        )
                    )
                ),
                _react2.default.createElement('div', { className: 'col col-2' }),
                _react2.default.createElement(
                    'div',
                    { className: 'col col-3' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        t('conditions')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'link', to: '/politika-privatnosti' },
                        t('privacyPolicy')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'link', to: '/tac' },
                        t('tac')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'link', to: '/cookies' },
                        t('cookiePolicy')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'link', to: '/faq' },
                        'FAQ - ',
                        t('questions')
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'link', to: '/kontakt' },
                        t('customerService')
                    )
                )
            );
        }
    }]);

    return Footer;
}(_react.Component);

Footer.propTypes = { dispatch: _react.PropTypes.func };

var mapStateToProps = function mapStateToProps(state) {
    return {
        blogs: state.blog.list
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.translate)('footerView')(Footer));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBlogs = undefined;

var _axios = __webpack_require__(4);

var request = _interopRequireWildcard(_axios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getBlogs = exports.getBlogs = function getBlogs() {
    return function (dispatch) {
        return request.get('/blog').then(function (data) {
            dispatch({ type: 'GET_BLOGS', payload: data.data });
        }).catch(function (error) {
            console.log('error', error);
        });
    };
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 52 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(9);

var _reduxSimpleRouter = __webpack_require__(7);

var _encounter = __webpack_require__(55);

var _encounter2 = _interopRequireDefault(_encounter);

var _staff = __webpack_require__(56);

var _staff2 = _interopRequireDefault(_staff);

var _issue = __webpack_require__(57);

var _issue2 = _interopRequireDefault(_issue);

var _auth = __webpack_require__(58);

var _auth2 = _interopRequireDefault(_auth);

var _blog = __webpack_require__(59);

var _blog2 = _interopRequireDefault(_blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    routeReducer: _reduxSimpleRouter.routeReducer,
    encounter: _encounter2.default,
    staff: _staff2.default,
    issue: _issue2.default,
    auth: _auth2.default,
    blog: _blog2.default
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = __webpack_require__(5);

exports.default = (0, _reduxActions.handleActions)({
    WORKSHOPS: function WORKSHOPS(state, action) {
        return _extends({}, state, {
            workshops: action.payload,
            workshopErased: false
        });
    },
    WORKSHOP_DELETED: function WORKSHOP_DELETED(state, action) {
        return _extends({}, state, {
            workshopErased: true
        });
    },
    NEWSLETTERS: function NEWSLETTERS(state, action) {
        return _extends({}, state, {
            newsletters: action.payload,
            newsletterErased: false
        });
    },
    NEWSLETTER_DELETED: function NEWSLETTER_DELETED(state, action) {
        return _extends({}, state, {
            newsletterErased: true
        });
    },
    ENCOUNTERS: function ENCOUNTERS(state, action) {
        return _extends({}, state, {
            list: action.payload,
            erased: false
        });
    },
    ENCOUNTER_SAVED: function ENCOUNTER_SAVED(state, action) {
        return _extends({}, state, {
            stripe: action.payload,
            errorMessage: '',
            saved: true,
            rating: false,
            erased: false

        });
    },
    ENCOUNTER_DELETED: function ENCOUNTER_DELETED(state, action) {
        return _extends({}, state, {
            erased: true
        });
    },
    RATING_SAVED: function RATING_SAVED(state, action) {
        return _extends({}, state, {
            rating: true,
            saved: false
        });
    },
    RESET_RATING: function RESET_RATING(state, action) {
        return _extends({}, state, {
            rating: false,
            stripe: {}
        });
    },
    RESET_ENCOUNTER: function RESET_ENCOUNTER(state) {
        return _extends({}, state, {
            saved: false
        });
    },
    ENCOUNTER_DATA: function ENCOUNTER_DATA(state, action) {
        return _extends({}, state, {
            data: action.payload.data,
            cost: action.payload.cost,
            emailDiscount: action.payload.emailDiscount,
            promoDiscount: action.payload.promoDiscount,
            errorMessage: ''
        });
    },
    STRIPE_TOKEN: function STRIPE_TOKEN(state, action) {
        return _extends({}, state, {
            stripeToken: action.payload
        });
    },
    CHECKOUT_ERROR: function CHECKOUT_ERROR(state, action) {
        return _extends({}, state, {
            errorMessage: action.payload
        });
    },
    PAYPAL: function PAYPAL(state, action) {
        return _extends({}, state, {
            paypalId: action.payload
        });
    },
    PAYPAL_ENV: function PAYPAL_ENV(state, action) {
        return _extends({}, state, {
            paypalEnv: action.payload
        });
    },
    CONTACT_MESSAGE_SENT: function CONTACT_MESSAGE_SENT(state) {
        return _extends({}, state, {
            contactMessage: 'Hvala vam što ste nas kontaktirali, vratit ćemo vam se uskoro'
        });
    },
    RESET_CONTACT: function RESET_CONTACT(state) {
        return _extends({}, state, {
            contactMessage: ''
        });
    }
}, {
    saved: false,
    list: [],
    data: {},
    cost: {},
    stripe: {},
    emailDiscount: 0,
    promoDiscount: 0,
    errorMessage: '',
    rating: false,
    erased: false,
    stripeToken: '',
    paypalId: '',
    paypalEnv: '',
    workshops: [],
    newsletters: [],
    newsletterErased: false,
    workshopErased: false,
    contactMessage: ''
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = __webpack_require__(5);

exports.default = (0, _reduxActions.handleActions)({
    GET_STAFF: function GET_STAFF(state, action) {
        return _extends({}, state, {
            list: action.payload
        });
    }
}, {
    list: []
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = __webpack_require__(5);

exports.default = (0, _reduxActions.handleActions)({
    GET_ISSUES: function GET_ISSUES(state, action) {
        return _extends({}, state, {
            list: action.payload
        });
    }
}, {
    list: []
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = __webpack_require__(5);

var initialState = {
    username: '',
    scope: null,
    session: [],
    credentials: {},
    isAuthenticated: false
};

exports.default = (0, _reduxActions.handleActions)({
    AUTH_INFO: function AUTH_INFO(state, action) {
        var cred = action.payload.credentials;
        var isAuth = action.payload.isAuthenticated;

        return _extends({}, state, {
            credentials: cred,
            isAuthenticated: isAuth
        });
    },

    AUTH_LOGOUT: function AUTH_LOGOUT(state, action) {
        return initialState;
    }
}, initialState);

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = __webpack_require__(5);

exports.default = (0, _reduxActions.handleActions)({
    GET_BLOGS: function GET_BLOGS(state, action) {
        return _extends({}, state, {
            list: action.payload
        });
    }
}, {
    list: []
});

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })
/******/ ]);