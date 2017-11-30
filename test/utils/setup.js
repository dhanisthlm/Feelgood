import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

if (JSDOM) {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const {window} = jsdom;

    function copyProps(src, target) {
        const props = Object.getOwnPropertyNames(src)
            .filter(prop => typeof target[prop] === 'undefined')
            .map(prop => Object.getOwnPropertyDescriptor(src, prop));

        Object.defineProperties(target, props);
    }

    global.window = window;
    global.document = window.document;
    global.navigator = {userAgent: 'node.js'};

    // Simulate window resize event

    copyProps(window, global);
    global.navigator = {userAgent: 'node.js'};
}