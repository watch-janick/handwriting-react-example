import chai, { expect, assert } from 'chai';
import chaiJestSnapshot from "chai-jest-snapshot";
import sinon, { fake, spy } from 'sinon';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

chai.use(chaiJestSnapshot);
configure({ adapter: new Adapter() });

global.fn = () => ({});

setTimeout(() => {
  before(function () {
    chaiJestSnapshot.resetSnapshotRegistry();
  });

  beforeEach(function () {
    chaiJestSnapshot.configureUsingMochaContext(this);
  });

  afterEach(function() {
    // Restore the default sandbox here
    sinon.restore();
  });
});

const { document, window } = new JSDOM('<!doctype html><html><body></body></html>');

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.document = document;
global.window = window;
global.Image = window.Image;
global.sinon = sinon;
global.fake = fake;
global.spy = spy;
global.expect = expect;
global.assert = assert;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);