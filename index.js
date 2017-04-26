var requestPromise = require('request-promise');

var Index = function() {

  var getOptions = {
    method: 'get',
    url: 'http://api.magairports.com/v1/flights/departures/STN',
    headers: {
      'x-api-key': ''
    }
  }

  function getAllFlightDepartures() {
    return new Promise((resolve, reject) => {
      requestPromise(getOptions).then(data => {
        return resolve(data);
      }).catch(error => {
        return reject(error);
      });
    });
  }

  return {
    get: function(request, response) {
      return getAllFlightDepartures().then(flightDepartures => {
        return response.send(flightDepartures);
      }).catch(error => {
        console.error(error);
      });
    }
  }
}

module.exports = new Index();
