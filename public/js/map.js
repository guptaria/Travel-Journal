// Initialize and add the map

//   const userLocation = { lat: userLat, lng: userLong };
// const userLocation = { lat: userLat, lng: userLong };

let map;
let service;
let infowindow;
// var userListArr = [];
// var userListObj = [{
//   "place": "franklin bbq",
//   "latlang": (30.2701188, -97.7313156)
// }];

const userListArr = [];
// const userListArr = [
//   ["Texas State Capitol", 30.2747, -97.7404],
//   ["Barton Spring Pool", 30.264, -97.771],
//   ["Frankin BBQ", 30.2701, -97.7313],
//   ["The Oasis on Lake Travis", 30.4057, -97.8741]
// ];

function initMap() {
  console.log("userListArr = " + userListArr);
  // user location input has to be in this format: arrays of arrays
  // const locations = [
  //   ["Texas State Capitol", 30.2747, -97.7404],
  //   ["Barton Spring Pool", 30.264, -97.771],
  //   ["Frankin BBQ", 30.2701, -97.7313],
  //   ["The Oasis on Lake Travis", 30.4057, -97.8741]
  // ];

  // Always center the first location
  // const userLocation1LaLong = new google.maps.LatLng(
  //   userListArr[0][1],
  //   userListArr[0][2]
  // );

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    // center: { lat: -25.344, lng: 131.036 },
    center: new google.maps.LatLng(37.0902, -95.7129)
    // center: userLocation1LaLong
  });

  // Drop pins on all locations
  const latlngbounds = new google.maps.LatLngBounds();
  for (i = 0; i < userListArr.length; i++) {
    // const userLocation1LaLong = new google.maps.LatLng(locations[0][1], locations[0][2]);
    const markerLocation = new google.maps.LatLng(
      userListArr[i][1],
      userListArr[i][2]
    );

    // eslint-disable-next-line no-unused-vars
    const marker = new google.maps.Marker({
      // position: { lat: -25.344, lng: 131.036 },
      position: markerLocation,
      map: map
    });
    console.log("markerLocation = " + markerLocation);
    latlngbounds.extend(markerLocation);
  }
  map.fitBounds(latlngbounds);
}


function getGeolocation(placeName) {
  // console.log("userListArr" + userListArr);

  infowindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(document.getElementById("map"));

  // const unitedStates = new google.maps.LatLng(37.0902, -95.7129);
  // map = new google.maps.Map(document.getElementById("map"), {
  //   center: unitedStates,
  //   zoom: 4,
  // });

  console.log("placeName = " + placeName);
  const request = {
    query: placeName,
    fields: ["name", "geometry"]
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        console.log("results.length = " + results.length);
        infowindow.setContent(results[i].name);
        infowindow.open(map);

        // map.setCenter(results[0].geometry.location);

        var latitude = results[i].geometry.location.lat();
        var longtitude = results[i].geometry.location.lng();

        // console.log("latitude = " + latitude);
        // console.log("longtitude = " + longtitude);

        const geoLocationArr = [placeName, latitude, longtitude]
        console.log("geoLocationArr = " + geoLocationArr);

        // Add new place into existing array
        userListArr.push(geoLocationArr);
        // console.log("userListArr = " + userListArr);
        console.log("userListArr[0] = " + userListArr[0]);
        console.log("userListArr[1] = " + userListArr[1]);
        console.log("userListArr[2] = " + userListArr[2]);
        console.log("userListArr[3] = " + userListArr[3]);
        console.log("userListArr[4] = " + userListArr[4]);
        
        renderJournal(userListArr);
        initMap(userListArr);

        // console.log("geoLocationArr[0]" + geoLocationArr[0]);
        // console.log("geoLocationArr[1]" + geoLocationArr[1]);
        // console.log("geoLocationArr[2]" + geoLocationArr[2]);

        // const geoLocationObj = {
        //   place : placeName,
        //   lat: latitude,
        //   lang: longtitude
        // }
        // console.log("geoLocationObj.place" + geoLocationObj.place);
        // console.log("geoLocationObj.lat" + geoLocationObj.lat);
        // console.log("geoLocationObj.lang" + geoLocationObj.lang);
      }
    }
  });
}



function renderJournal() {
  console.log("userListArr = " + userListArr);
  if (userListArr) {
    for (var i = 0; i < userListArr.length; ++i) {
      $(`#row${i}`).html(`<td><button class="recent btn btn-link">${userListArr[i][0]}</button></td>`);
    }
  }
}


// function createMarker(place) {
//   const marker = new google.maps.Marker({
//     map,
//     position: place.geometry.location,
//   });
//   google.maps.event.addListener(marker, "click", () => {
//     infowindow.setContent(place.name);
//     infowindow.open(map);
//   });
// }

//////////////////////////// EXECUTION ////////////////////////////////////////

$(document).ready(function () {
  renderJournal();
  initMap(userListArr);

  $("#searchBtn").click(function (event) {
    event.preventDefault;
    // WORKING SKIPPED FOR NOW TO SAVE API CALL
    var placeName = $('input').val();
    getGeolocation(placeName);
  })
});



//////////////////////////////// BACK UP CODE //////////////////////////////////

  // service = new google.maps.places.PlacesService(map);
  // service.findPlaceFromQuery(request, (results, status) => {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {

  //     for (let i = 0; i < results.length; i++) {
  //       // createMarker(results[i]);
  //       const marker = new google.maps.Marker({
  //         map,
  //         position: results[i].geometry.location,
  //       });

  //       google.maps.event.addListener(marker, "click", () => {
  //         infowindow.setContent(results[i].name);
  //         infowindow.open(map);
  //       });
  //     }
  //     console.log("results" + results);
  //     console.log("results[0].geometry.location " + results[0].geometry.location);
  //     map.setCenter(results[0].geometry.location);
  //   }
  // });


  // function initMap() {
  //   // user location input has to be in this format: arrays of arrays
  //   const locations = [
  //     ["Texas State Capitol", 30.2747, -97.7404],
  //     ["Barton Spring Pool", 30.264, -97.771],
  //     ["Frankin BBQ", 30.2701, -97.7313],
  //     ["The Oasis on Lake Travis", 30.4057, -97.8741]
  //   ];
  
  //   // Always center the first location
  //   const userLocation1LaLong = new google.maps.LatLng(
  //     locations[0][1],
  //     locations[0][2]
  //   );
  
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 13,
  //     // center: { lat: -25.344, lng: 131.036 },
  //     // center: new google.maps.LatLng(49.343085, -123.305938),
  //     center: userLocation1LaLong
  //   });
  
  //   // Drop pins on all locations
  //   const latlngbounds = new google.maps.LatLngBounds();
  //   for (i = 0; i < locations.length; i++) {
  //     // const userLocation1LaLong = new google.maps.LatLng(locations[0][1], locations[0][2]);
  //     const markerLocation = new google.maps.LatLng(
  //       locations[i][1],
  //       locations[i][2]
  //     );
  
  //     // eslint-disable-next-line no-unused-vars
  //     const marker = new google.maps.Marker({
  //       // position: { lat: -25.344, lng: 131.036 },
  //       position: markerLocation,
  //       map: map
  //     });
  //     console.log("markerLocation = " + markerLocation);
  //     latlngbounds.extend(markerLocation);
  //   }
  //   map.fitBounds(latlngbounds);
  
  // }