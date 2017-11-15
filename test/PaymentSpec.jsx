import { shallow } from 'enzyme';
import { describe, it, before, after } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import Payment from '../src/components/Front/Payment';

describe('<Payment />', () => {

	/*
	let wrapper;
	let onButtonClickSpy;

	before(() => {
		onButtonClickSpy = sinon.spy();
		wrapper = shallow(<ModuleToolbar onButtonClick={onButtonClickSpy}/>);
	});

	after(() => {
		sinon.restore();
	});
	it('should render 2 <div> tags', () => {
		expect(wrapper.find(<div>)).to.have.length(2);
			});

			it('should render 1 <a> tag', () => {
				expect(wrapper.find(<a>)).to.have.length(1);
					});

				it('should render a `.clicks-0`', () => {
					expect(wrapper.find('.clicks-0')).to.have.length(1);
				});

				it('should click button once', () => {
					wrapper.find('button').simulate('click');
					expect(onButtonClickSpy.calledOnce).to.equal(true);
				});
				*/
});