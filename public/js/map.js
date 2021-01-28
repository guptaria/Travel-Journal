// Initialize and add the map

//   const userLocation = { lat: userLat, lng: userLong };
// const userLocation = { lat: userLat, lng: userLong };

function initMap() {
    // user location input has to be in this format: arrays of arrays
    const locations = [
      ["Texas State Capitol", 30.2747, -97.7404],
      ["Barton Spring Pool", 30.264, -97.771],
      ["Frankin BBQ", 30.2701, -97.7313],
      ["The Oasis on Lake Travis", 30.4057, -97.8741]
    ];
  
    // Always center the first location
    const userLocation1LaLong = new google.maps.LatLng(
      locations[0][1],
      locations[0][2]
    );
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      // center: { lat: -25.344, lng: 131.036 },
      // center: new google.maps.LatLng(49.343085, -123.305938),
      center: userLocation1LaLong
    });
  
    // Drop pins on all locations
    const latlngbounds = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {
      // const userLocation1LaLong = new google.maps.LatLng(locations[0][1], locations[0][2]);
      const markerLocation = new google.maps.LatLng(
        locations[i][1],
        locations[i][2]
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
  