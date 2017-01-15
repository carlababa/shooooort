import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

require('babel-polyfill');

chai.use(chaiEnzyme());

global.chai = chai;
global.expect = chai.expect;

const testsContext = require.context('.', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
