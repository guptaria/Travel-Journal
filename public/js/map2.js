
// Initialize and add the map
let map;
let service;
let infowindow;
const userListArr = [];
// var userListArr = [{
//   "place": "franklin bbq",
//   "latlang": (30.2701188, -97.7313156)
// }];

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    // center: { lat: -25.344, lng: 131.036 },
    // center: new google.maps.LatLng(37.0902, -95.7129)
  });

  // Drop pins on all locations
  const latlngbounds = new google.maps.LatLngBounds();
  
  if (userListArr.length === 1) {
    const markerLocation = new google.maps.LatLng(
      userListArr[0].lat,
      userListArr[0].lang
    );

    const map = new google.maps.Map(document.getElementById("map"), {
      // zoom: 12,
      zoom: 6,
      // center: { lat: -25.344, lng: 131.036 },
      center: new google.maps.LatLng(userListArr[0].lat, userListArr[0].lang)
    });

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(userListArr[0].lat, userListArr[0].lang),
      map: map
    });

  } else {

      for (i = 0; i < userListArr.length; i++) {
        const markerLocation = new google.maps.LatLng(
          userListArr[i].lat,
          userListArr[i].lang
        );

        // eslint-disable-next-line no-unused-vars
        const marker = new google.maps.Marker({
          // position: { lat: -25.344, lng: 131.036 },
          position: markerLocation,
          map: map
        });
        latlngbounds.extend(markerLocation);
      }
      map.fitBounds(latlngbounds);

    }

}

function postLocation(geoLocationObj) {
  console.log("postLocations = " + geoLocationObj);
  console.log("postLocations = " + geoLocationObj.place);
  console.log("postLocations = " + geoLocationObj.lat);
  console.log("postLocations = " + geoLocationObj.lang);

  const place = geoLocationObj.place;
  const latitude = geoLocationObj.lat;
  const longitude = geoLocationObj.lang;

  $.post("/api/location", {
    place: place,
    latitude: latitude,
    longitude: longitude
  })
    .then(function (data) {
      // window.location.replace("/user_journal");
      alert("Adding character...");
    });
}

function getGeolocation(placeName) {
  infowindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(document.getElementById("map"));

  const request = {
    query: placeName,
    fields: ["name", "geometry"]
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        // console.log("results.length = " + results.length);
        infowindow.setContent(results[i].name);
        infowindow.open(map);

        var latitude = results[i].geometry.location.lat();
        var longitude = results[i].geometry.location.lng();

        // Make an Object
        const geoLocationObj = {
          "place": placeName,
          "lat": latitude,
          "lang": longitude
        }
        collectUserSearch(geoLocationObj);

        // return geoLocationObj;
        // Moved to collectUserSearch
        // userListArr.push(geoLocationObj);
        // // Render new userListArr
        // renderJournal(userListArr);
        // initMap(userListArr);
      }
    }
  });
  // return userListArr;
  // return geoLocationObj; not defined here
}


function collectUserSearch(geoLocationObj) {
  console.log("collectUserSearc geoLocationObj = " + geoLocationObj);
  userListArr.push(geoLocationObj);

        // Render new userListArr
        renderJournal(userListArr);
        initMap(userListArr);
        postLocation(geoLocationObj);

}

function renderJournal() {
  if (userListArr) {
    for (var i = 0; i < userListArr.length; ++i) {
      $(`#row${i}`).html(`<td><p class="">${userListArr[i][0]}</p>
      <button class="" style="float:right"><i class="fas fa-trash-alt"></i></button>
      <button class="" style="float:right"><i class="fas fa-camera"></i></button></td>`);

      // $(`#journal_row${i}`).html(`<td><p class="">${userListArr[i][0]}</p></td>`);

    }
  }
}


// To have a landing map when array is first empty
function landingMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    // landing page center on united states
    center: new google.maps.LatLng(37.0902, -95.7129),
    mapTypeId: 'satellite'
  });
}




//////////////////////////// EXECUTION ////////////////////////////////////////

$(document).ready(function () {

  // Render user journal list
  renderJournal();

  // Render map section
  if (userListArr.length === 0) {
    // Landing page when array is first empty
    landingMap();
  } else {
    // Render map with existing array
    initMap(userListArr);
  }

  // When user click to search a place
  $(document).on("click", "#searchBtn", handleSearchBtnSubmit);

  function handleSearchBtnSubmit(event) {
    event.preventDefault;

    // if (!$('input').val().trim().trim()) {
    //   return;
    // }

    var placeName = $('input').val();
    $('input').val('')
    getGeolocation(placeName);




    // Need to add async await here since getGeolocation is slow
    // const newTrip = getGeolocation(placeName);
    // Is newTrip always an array or not
    // if (newTrip) {
    //   console.log("newTrip.length = " + newTrip.length);
    //   for (var i = 0; i < newTrip.length; ++i) {
    //     console.log("i =" + i);

    //     // const newTrip = [{
    //     //   "place": "UT Austin",
    //     //   "lat": "30.2849185",
    //     //   "lang": "-97.7340567"
    //     // }];
    //     console.log("newTrip[i] = " + newTrip[i]);
    //     console.log("newTrip[i] = " + newTrip[i].place);
    //     console.log("newTrip[i] = " + newTrip[i].lat);
    //     console.log("newTrip[i] = " + newTrip[i].lang);

    //     postLocations(newTrip[i].place, newTrip[i].lat, newTrip[i].lang);
    //   }
    // }
  }



});
