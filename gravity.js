
let map
let marker

function getJson() {
  return fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
}

function startMap() {
  getJson()
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
  getJson()
    .then(response => {
      marker.remove()
      marker = L.marker([response.iss_position.latitude, response.iss_position.longitude]).addTo(map);
    })
}

function centerOnISS() {
  getJson()
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
