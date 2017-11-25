import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { shallow, mount, render } from 'enzyme';
import { describe, it, before, after, have } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
import { Payment } from '../src/components/Public/Payment';

const wrapper = shallow(
	<Payment
		dispatch={dispatch}
		store={mockStore({ runtime: {} }) }
	/>
);

const instance = wrapper.instance();

describe('Payment component', () => {
	it('should call handleCheckout on button click', () => {
		const checkoutSpy = sinon.spy(instance, 'handleCheckout');

		// attach the spy to the method
		instance.forceUpdate();
		wrapper.update();

		// simulate btn-click
		wrapper.find('.checkout-button').simulate('click', { preventDefault() {} });

		// method should have been called
		expect(checkoutSpy.calledOnce).to.equal(true);
		checkoutSpy.restore();
	});

    it('should call handleCheckout width event object', () => {
        const event = { target: wrapper.find('.checkout-button') };
        const checkoutSpy = sinon.spy(instance, 'handleCheckout');

        // attach the spy to the method
        instance.forceUpdate();
        wrapper.update();

        // attach event object to method
		// test that method receives argument
        wrapper.find('.checkout-button').simulate('click', event);
        expect(checkoutSpy.calledWith(event)).to.equal(true);
        checkoutSpy.restore();
    });

    it('should return correct sum: -skype (1week, 20min)', () => {
        const costSpy = sinon.spy(instance, 'calculateCost');
        instance.setState({
            skype: {
                s: { active: true, cost: 60, week: 1 },
                m: { active: false, cost: 174, week: 3 },
                l: { active: false, cost: 448, week: 8 }
            },
            email: {
                s: { active: false, cost: 40, week: 1 },
                m: { active: false, cost: 110, week: 1 }
            },
            skypeDuration: {
                s: { length: 20, active: true, factor: 0.666666 },
                l: { length: 45, active: false, factor: 1 }
            }
        });

        // atach spy to component
        instance.forceUpdate();

        expect(costSpy.returnValues[0].total()).to.equal(40);
        expect(costSpy.returnValues[0].email).to.equal(0);
        expect(costSpy.returnValues[0].skype).to.equal(40);
        costSpy.restore();
    });

    it('should return correct sum: -skype (3weeks, 45min), -email (2weeks, 24h) and 5% discount', () => {
        const costSpy = sinon.spy(instance, 'calculateCost');
        instance.setState({
            skype: {
                s: { active: false, cost: 60, week: 1 },
                m: { active: true, cost: 174, week: 3 },
                l: { active: false, cost: 448, week: 8 }
            },
            email: {
                s: { active: true, cost: 40, week: 2 },
                m: { active: false, cost: 110, week: 1 }
            },
            skypeDuration: {
                s: { length: 20, active: true, factor: 0.666666 },
                l: { length: 45, active: false, factor: 1 }
            }
        });

        // atach spy to component
        instance.forceUpdate();

        expect(costSpy.returnValues[0].total()).to.equal(183);
        expect(costSpy.returnValues[0].email).to.equal(36);
        expect(costSpy.returnValues[0].skype).to.equal(37);
        costSpy.restore();
    });

    it('should return correct sum: -skype (8weeks, 45min), -email (3weeks, 4h) and 5% discount', () => {
        const costSpy = sinon.spy(instance, 'calculateCost');
        instance.setState({
            skype: {
                s: { active: false, cost: 60, week: 1 },
                m: { active: false, cost: 174, week: 3 },
                l: { active: true, cost: 448, week: 8 }
            },
            email: {
                s: { active: false, cost: 40, week: 1 },
                m: { active: true, cost: 110, week: 3 }
            },
            skypeDuration: {
                s: { length: 20, active: false, factor: 0.666666 },
                l: { length: 45, active: true, factor: 1 }
            }
        });

        // atach spy to component
        instance.forceUpdate();

        expect(costSpy.returnValues[0].total()).to.equal(715);
        expect(costSpy.returnValues[0].email).to.equal(97);
        expect(costSpy.returnValues[0].skype).to.equal(53);
        costSpy.restore();
    });

    it('should return correct sum: -email (4weeks, 24h)', () => {
        const costSpy = sinon.spy(instance, 'calculateCost');
        instance.setState({
            skype: {
                s: { active: false, cost: 60, week: 1 },
                m: { active: false, cost: 174, week: 3 },
                l: { active: false, cost: 448, week: 8 }
            },
            email: {
                s: { active: true, cost: 40, week: 4 },
                m: { active: false, cost: 110, week: 1 }
            },
            skypeDuration: {
                s: { length: 20, active: false, factor: 0.666666 },
                l: { length: 45, active: true, factor: 1 }
            }
        });

        // atach spy to component
        instance.forceUpdate();

        expect(costSpy.returnValues[0].total()).to.equal(144);
        expect(costSpy.returnValues[0].email).to.equal(36);
        expect(costSpy.returnValues[0].skype).to.equal(0);
        costSpy.restore();
    });
});

