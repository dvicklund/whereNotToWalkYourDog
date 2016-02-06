var map = L.map('map').setView([39.8282, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>, Website by <a href="http://twitter.com/dvicklund">David Vicklund</a>',
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
        '<div><a target="_blank" href="' + curr.attributes.PublicWebpageUrl + '">' +
        curr.attributes.Name + '</a><br>' +
        'Transfer Year: ' + curr.attributes.TransferYear + '<br>' +
        'Lat: ' + curr.attributes.Latitude +
        ', Lng: ' + curr.attributes.Longitude + '<br>' +
        'Maintenance Category: ' + curr.attributes.MaintenanceCategory + '<br>' +
        'Regulatory Driver: ' + curr.attributes.RegulatoryDriver + '<br>' +  
        '<a target="_blank" href="' + curr.attributes.FactSheetUrl + '">Fact Sheet (PDF)</a></div>'
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

$(function() {

  var hideButton = $('#hide');
  var showButton = $('#show');
  var header = $('#desc');
  showButton.hide();

  hideButton.on('click', function(e) {
    header.hide();
    hideButton.hide();
    showButton.show();
  });

  showButton.on('click', function(e) {
    header.show();
    showButton.hide();
    hideButton.show();
  })
});
