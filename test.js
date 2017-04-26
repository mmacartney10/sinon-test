var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
require('sinon-as-promised');

var apiClient = require('request-promise');
var flightApi = require('./flight-api')(apiClient);
var index = require('./index.js')(flightApi);


describe('When the get function is called', () => {

  var mockFlightData = { Flights: [{
    "FlightNumber": "MT524",
    "AorD": 1,
    "Destination": "Antalya",
    "Terminal": "T1",
    "ScheduledDateTime": "2017-04-26T09:55:00",
    "Status": "Airborne 10:33",
    "LastStatusDateTime": "2017-04-26T10:33:00",
    "CanFollow": false,
    "Id": "MT524201704260955D",
    "StatusColour": "none",
    "Gate": "",
    "AirportCode": "STN",
    "DestinationAirportCode": "AYT"
  }]}

  beforeEach(() => {
    sinon.stub(apiClient, 'get').resolves(mockFlightData);
  });

  afterEach(() => {
    apiClient.get.restore();
  });

  it('Should return an object with the Destination Antalya', done => {

    var request = {
      params: {
        airportCode: 'STN'
      }
    };

    var response = {
      send: function(data) {
        try {
          expect(data.Destination).to.equal('Antalya')
          done();
        } catch(e) {
          done(e)
        }
      }
    }

      index.get(request, response);
  });
});
