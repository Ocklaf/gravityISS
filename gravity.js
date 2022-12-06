
let map
let marker

function startMap() {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(response => {
      map = L.map('map').setView([response.iss_position.latitude, response.iss_position.longitude], 4)
      marker = L.marker([response.iss_position.latitude, response.iss_position.longitude]).addTo(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    })
}

function updateMarkerISS() {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(response => {
      marker.remove()
      marker = L.marker([response.iss_position.latitude, response.iss_position.longitude]).addTo(map);
    })
}

function centerOnISS() {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(response => {
      map.setView([response.iss_position.latitude, response.iss_position.longitude], 4)
    })
}

startMap()

setInterval(() => {
  updateMarkerISS()
}, 10000)

let nowBtn = document.getElementsByTagName('button')

nowBtn[0].addEventListener('click', centerOnISS)
