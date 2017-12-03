import React from 'react';
import moxios from 'moxios';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { describe, it, have } from 'mocha';
import {expect} from 'chai';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

import Checkout from '../src/components/Public/Checkout';
import { saveEncounter } from '../src/actions/encounter';

const dispatch = sinon.spy();
const middleWares = [ thunk ];
const mockStore = configureStore(middleWares);
const mockObj = {
    "name": "Daniel Jansson",
    "mail": "janzon.daniel@gmail.com",
    "phone": "081234567",
    "comment": "",
    "code": "",
    "data": {
        "skype": {
            "active": true,
            "cost": 174,
            "week": 3,
            "code": "3",
            "description": "Paket za 3 skype poziva"
        },
        "email": {
            "active": true,
            "cost": 110,
            "week": 2,
            "code": "04",
            "description": "E-posta, odgovor u toku 4 sata"
        },
        "skypeDuration": {
            "length": 20,
            "active": true,
            "factor": 0.666666,
            "code": "20"
        },
        "packageDiscount": 16,
        "promoDiscount": 155
    },
    "isOpen": true,
    "skype": {
        "active": true,
        "cost": 174,
        "week": 3,
        "code": "3",
        "description": "Paket za 3 skype poziva"
    },
    "email": {
        "active": true,
        "cost": 110,
        "week": 2,
        "code": "04",
        "description": "E-posta, odgovor u toku 4 sata"
    },
    "cost": {
        "skype": 39,
        "email": 105,
        "code": "32004",
        "total": 155
    },
    "packageDiscount": 16,
    "promoDiscount": 155,
    "_empty_": "Kontakta mig snarast"
};

const mapStateToProps = (state) => ({
    state,
});

const ConnectedComponent = connect(mapStateToProps)(Checkout);
const component = shallowWithStore(
    <ConnectedComponent
        t={key => key}
        getValidationMessages={ () => [] }
        data={mockObj.data}
        cost={mockObj.cost}
        emailDiscount= '0.95'
        dispatch={dispatch}
    />,
    createMockStore()
);

/*
const wrapper = shallow(
    <Checkout
        t={key => key}
        getValidationMessages={ () => [] }
        data={mockObj.data}
        cost={mockObj.cost}
        emailDiscount= '0.95'
        dispatch={dispatch}
        store={mockStore({ runtime: {} }) }
    />
);
*/

const store = mockStore({});

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('Checkout component', () => {
    it('should make an action when placing order', done => {
        store.dispatch(saveEncounter(mockObj));

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: []
            }).then(function (data) {
                const actions = store.getActions();
                const expectedActions = { type: 'ENCOUNTER_SAVED' };

                try {
                    expect(actions[0].type).to.equal(expectedActions.type);
                } catch (e) {
                    return done(e);
                }
                done();
            });
        });
    });
});