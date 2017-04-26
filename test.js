var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var MockExpressRequest = require('mock-express-request');
var MockExpressResponse = require('mock-express-response');

var sinon = require('sinon');
require('sinon-as-promised');

var proxyquire = require('proxyquire');

describe('When the get function is called', () => {

  var index;
  var stub;
  var url = 'http://api.magairports.com/v1/flights/departures/STN';
  var body = JSON.stringify({Flights:[{Destination:'Antalya'}]});

  beforeEach(function() {
    requestPromise = sinon.stub();
    index = proxyquire('./index.js', {
      'request-promise': requestPromise
    });
  });

  it('Should return an object with the property Destination', () => {

    var request = new MockExpressRequest();
    var response = new MockExpressResponse();

    requestPromise.resolves(body);

    var result = index.get(request, response).then(data => {
      return JSON.parse(data._getJSON()).Flights[0];
    });

    return expect(result).to.eventually.have.property('Destination');
  });
});
