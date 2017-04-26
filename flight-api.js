var FlightApi = function(apiClient) {

  return {
    getFlightData: function(airportCode) {
      return apiClient.get({
        url: 'http://api.magairports.com/v1/flights/departures/${airportCode}',
        headers: {
          'x-api-key': ''
        }
      });
    }
  }
}

module.exports = FlightApi;
