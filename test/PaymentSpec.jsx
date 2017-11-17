import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { shallow, mount, render } from 'enzyme';
import { describe, it, before, after, have } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
import Payment from '../src/components/Front/Payment';

describe('Payment Component', () => {
	it('should call handleCheckout on button click', () => {
		const wrapper = shallow(
			<Payment
				dispatch={dispatch}
				store={mockStore({ runtime: {} }) }
			/>
		);

		const instance = wrapper.instance();
		const spy = sinon.spy(instance, 'handleCheckout');
		instance.forceUpdate();
		wrapper.update();
		wrapper.find('.checkout-button').simulate('click', { preventDefault() {} });
		expect(spy.called).to.equal(true);
	});
});