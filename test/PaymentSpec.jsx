import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { shallow, mount, render } from 'enzyme';
import { describe, it, before, after, have } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
import { Payment } from '../src/components/Front/Payment';

const wrapper = shallow(
	<Payment
		dispatch={dispatch}
		store={mockStore({ runtime: {} }) }
	/>
);

const instance = wrapper.instance();

describe('Payment Component', () => {
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
    });
});