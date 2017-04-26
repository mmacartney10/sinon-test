var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var MockExpressRequest = require('mock-express-request');
var MockExpressResponse = require('mock-express-response');

var sinon = require('sinon');
require('sinon-as-promised');

var proxyquire = require('proxyquire');

var index = require('./index.js');

const requestPromise = {
  get: function() {},
};

describe('When the get function is called', () => {

  // var stub;
  //
  // beforeEach(function(done) {
  //   stub = sinon.stub(requestPromise, 'get').yields({flights: [{bob: 'test'}]});
  //   done();
  // });
  //
  // after(function (done) {
  //   requestPromise.get.restore();
  //   done();
  // });

  it('Should return an object with the property Destination', () => {

    var request = new MockExpressRequest();
    var response = new MockExpressResponse();

    // var result = stub().index.get(request, response).then(data => {
    var result = index.get(request, response).then(data => {
      return data._getJSON().Flights[0];
    });

    return expect(result).to.eventually.have.property('Destination');
  });
});
