import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { describe, it, have } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
import { Issues } from '../src/components/Public/Issues';

const IssueComponent = mount(
    <Issues
        t={key => key}
        dispatch={dispatch}
        store={mockStore({ runtime: {} }) }
    />
);

const instance = IssueComponent.instance();

describe('Issue component', () => {
    it('should call handleSwipeLeft on Click', () => {
        const issueSpy = sinon.spy(instance, 'handleSwipeLeft');

        instance.forceUpdate();
        IssueComponent.update();

        // simulate btn-click
        IssueComponent.find('.issue-arrow-right').simulate('click');

        expect(issueSpy.called).to.equal(true);
        issueSpy.restore();
    });

    it('should render issue-carousel element', () => {
        expect(IssueComponent.find('.issue-carousel')).to.have.length(1);
    });

    it('should update state issues', () => {
        const secondIssue = IssueComponent.state().issues[1];

        // simulate btn-click
        IssueComponent.find('.issue-arrow-right').simulate('click');
        expect(IssueComponent.state().issues[0]).to.equal(secondIssue);
    });
});
