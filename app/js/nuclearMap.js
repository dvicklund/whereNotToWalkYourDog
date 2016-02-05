(function() {
  var map = L.map('map').setView([39.8282, -98.5795], 4);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'dvicklund.p2no7d88',
      accessToken: 'pk.eyJ1IjoiZHZpY2tsdW5kIiwiYSI6ImNpazllZzk3bTA3enF2OWt1cXRvbjVvdzEifQ.xZoxddPrFFB8m8za__Xa4A'
  }).addTo(map);

  var nuclearData;

  var nuclearIcon = L.icon({
    iconUrl: 'img/Nuclear_symbol.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  $.ajax({
    url: 'data/nuclearData.json',
    dataType: 'json',
    success: function(data) {
      nuclearData = data;
      nuclearData.features.forEach(function(curr, i, arr) {
        var marker = L.marker([
          curr.attributes.Latitude,
          curr.attributes.Longitude
        ], {
          icon: nuclearIcon
        }).bindPopup(
          '<div>Transfer Year: ' + curr.attributes.TransferYear + '<br>' +
          'Lat: ' + curr.attributes.Latitude +
          ', Lng: ' + curr.attributes.Longitude + '<br>' +
          curr.attributes.Name + '</div>'
        ).on('mouseover', function(e) {
          this.openPopup();
        }).addTo(map);
      });
    },
    error: function(xhr, textStatus, eThrown) {
      console.log(xhr);
      console.log(textStatus);
      console.log(eThrown);
    }
  });
});
