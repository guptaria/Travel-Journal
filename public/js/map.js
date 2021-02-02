
// Initialize and add the map
let map;
let service;
let infowindow;
const userListArr = [];
// var userListArr = [{
//   "place": "franklin bbq",
//   "latlang": (30.2701188, -97.7313156)
// }];

const newAddArr = [];


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
      zoom: 12,
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
  // renderJournal(userListArr);
  initMap(userListArr);
  postLocation(geoLocationObj);

}

function renderJournal() {
  if (userListArr) {
    for (var i = 0; i < userListArr.length; ++i) {
      $(`#row${i}`).html(`<td><p class="">${userListArr[i].place} ${userListArr[i].date}
      <button class="" style="float:right"><i class="fas fa-trash-alt"></i></button>
      <button class="" style="float:right"><i class="fas fa-camera"></i></button></p>
      <p class="">${userListArr[i].journal}</p>
      </td>`);

      // $(`#journal_row${i}`).html(`<td><p class="">${userListArr[i].place}</p></td>`);

    }
  }
}

function renderJournal2(newAddArr) {
  console.log("newAddArr.length = " + newAddArr.length);

  for (var i = 0; i < newAddArr.length; ++i) {

    console.log("newAddArr[i].placeName = " + newAddArr[i].placeName);
    console.log("newAddArr[i].date = " + newAddArr[i].date);
    console.log("newAddArr[i].journal = " + newAddArr[i].journal);
    console.log("newAddArr[i].tripName = " + newAddArr[i].tripName);

    $(`#row${i}`).html(`<td class="journal_table"><p>${newAddArr[i].placeName} - ${newAddArr[i].date}
  <button class="" style="float:right"><i class="fas fa-trash-alt"></i></button>
  <button class="" style="float:right"><i class="fas fa-camera"></i></button></p>
  <p class="">${newAddArr[i].journal}</p>
  </td>`);

  }


}


function loopJournal(newAddArrAfterSearch) {
  console.log("newAddArrAfterSearch.length = " + newAddArrAfterSearch.length);


  for (var i = 0; i < newAddArrAfterSearch.length; ++i) {

    let newAddArrAfterSearchEach = newAddArrAfterSearch[i];

    console.log("newAddArrAfterSearchEach.placeName = " + newAddArrAfterSearchEach.placeName);
    console.log("newAddArrAfterSearchEach.date = " + newAddArrAfterSearchEach.date);
    console.log("newAddArrAfterSearchEach.journal = " + newAddArrAfterSearchEach.journal);
    console.log("newAddArrAfterSearchEach.tripName = " + newAddArrAfterSearchEach.tripName);

    postJournal(newAddArrAfterSearchEach);

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


function handleSearchBtnSubmit(event) {
  event.preventDefault;

  var newAdd = {
    // placeName: $('input').val(),
    placeName: $('#placeForm').val(),
    date: $("#date").val(),
    journal: $("#journal-body").val(),
    tripName: $("#tripName").val(),
  };

  getGeolocation(newAdd.placeName);
  postJournal(newAdd);

  newAddArr.push(newAdd);
  renderJournal2(newAddArr);

  // postJournal(newAddArr);

  // $('input').val("");
  $('#placeForm').val("");
  $("#date").val("");
}

function postJournal(newAdd) {
  console.log("postJournal newAdd = " + newAdd);
  console.log("postJournal newAdd.tripName = " + newAdd.tripName);
  console.log("postJournal newAdd.placeName = " + newAdd.placeName);
  console.log("postJournal newAdd.date = " + newAdd.date);
  console.log("postJournal newAdd.journal = " + newAdd.journal);

  const tripName = newAdd.tripName;
  const placeName = newAdd.placeName;
  const date = newAdd.date;
  const journal = newAdd.journal;

  $.post("/api/journal", {
    journalTitle: tripName,
    location: placeName,
    start_date: date,
    journalEntry: journal
  })
    .then(function (data) {
      // window.location.replace("/user_journal");
      alert("Adding journal...");
    });
}

// function postJournal(newAddArrAfterSearchEach) {
//   console.log("postJournal newAddArrAfterSearchEach = " + newAddArrAfterSearchEach);
//   console.log("postJournal newAddArrAfterSearchEach.tripName = " + newAddArrAfterSearchEach.tripName);
//   console.log("postJournal newAddArrAfterSearchEach.placeName = " + newAddArrAfterSearchEach.placeName);
//   console.log("postJournal newAddArrAfterSearchEach.date = " + newAddArrAfterSearchEach.date);
//   console.log("postJournal newAddArrAfterSearchEach.journal = " + newAddArrAfterSearchEach.journal);

//   const tripName = newAddArrAfterSearchEach.tripName;
//   const placeName = newAddArrAfterSearchEach.placeName;
//   const date = newAddArrAfterSearchEach.date;
//   const journal = newAddArrAfterSearchEach.journal;

//   $.post("/api/journal", {
//     journalTitle: tripName,
//     location: placeName,
//     start_date: date,
//     journalEntry: journal
//   })
//     .then(function (data) {
//       // window.location.replace("/user_journal");
//       alert("Adding character...");
//     });
// }

function handlePushBtnSubmit(event) {
  event.preventDefault;

  // console.log("event.data = " + event.data);

  // const newAddArrAfterSearch = event.data;
  // console.log("newAddArrAfterSearch under function handlePushBtnSubmit = " + newAddArrAfterSearch);
  // console.log("newAddArrAfterSearch[0].placeName = " + newAddArrAfterSearch[0].placeName);
  // console.log("newAddArrAfterSearch[1].placeName = " + newAddArrAfterSearch[1].placeName);

  // loopJournal(newAddArrAfterSearch);

  $('#placeForm').val("");
  $("#date").val("");
  $("#journal-body").val("");
  $("#tripName").val("");
  $(".journal_table").remove();
  landingMap()


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

  // This is not working got HTML return
  // const newAddArrAfterSearch = $(document).on("click", "#searchBtn", handleSearchBtnSubmit);

  // console.log("newAddArrAfterSearch after HandleSearchBtnSubmit = " + newAddArrAfterSearch);




  // Try Hardcode
  // const newAddArrAfterSearch = [
  //   {
  //     tripName : "Austin Day Trip",
  //     placeName : "Fremont, CA",
  //     date : 2021-01-21,
  //     journal : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quibusdam. Repudiandae, nulla nemo nisi molestias commodi ipsum cum dolores quaerat modi totam obcaecati assumenda necessitatibus veniam quibusdam odio accusantium minus. Ipsa suscipit corrupti"
  //   },
  //   {
  //     tripName : "Austin Day Trip",
  //     placeName : "San Jose, CA",
  //     date : 2021-01-20,
  //     journal : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quibusdam. Repudiandae, nulla nemo nisi molestias commodi ipsum cum dolores quaerat modi totam obcaecati assumenda necessitatibus veniam quibusdam odio accusantium minus. Ipsa suscipit corrupti"
  //   }
  // ];

  // console.log("newAddArrAfterSearch = " + newAddArrAfterSearch);
  // console.log("newAddArrAfterSearch[0] = " + newAddArrAfterSearch[0]);
  // console.log("newAddArrAfterSearch[1] = " + newAddArrAfterSearch[1]);
  // console.log("newAddArrAfterSearch[0].placeName = " + newAddArrAfterSearch[0].placeName);
  // console.log("newAddArrAfterSearch[1].placeName = " + newAddArrAfterSearch[1].placeName);


  // $(document).on("click", "#pushBtn", newAddArrAfterSearch, handlePushBtnSubmit);

  $(document).on("click", "#pushBtn", handlePushBtnSubmit);


});
