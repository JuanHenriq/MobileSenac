let map, infoWindow;

function initMap() {
  if (map) return;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 16,
  }); 
  infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const currentposition = new google.maps.Marker({
          position: pos,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'purple',
            fillOpacity: 1,
            scale: 10,
            strokeWeight: 2
          }
        });

        infoWindow.setPosition(pos);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  fetch("https://juanhenriq.github.io/api-mobile-map/feira_livre.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const marker = new google.maps.Marker({
          position: { lat: item.Latitude, lng: item.Longitude },
          map: map,
          title: item.Nome,
        });

        marker.addListener("click", () => {
          const content = `
            <div>
              <h3>${item.Nome}</h3>
              <p>Localização: ${item.Localização}</p>
              <p>Dias: ${item.Dias}</p>
              <p>Horário: ${item.Horário || "N/A"}</p>
            </div>
          `;

          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      });
    })
    .catch((error) => console.error("Error loading JSON file:", error));
}

window.initMap = initMap;

window.addEventListener('pageshow', function(event) {
  initMap();
});
