var Index = function(flightApi) {

  function getAllFlightDepartures() {
    return requestPromise(getOptions);
  }

  return {
    get: function(request, response) {
      return flightApi.getFlightData(request.params.airportCode).then(departureData => {
        let firstFlight = departureData.Flights[0];
        response.send(firstFlight);
      }).catch(error => {
        response.sendStatus(500);
      });
    }
  }
}

module.exports = Index;
