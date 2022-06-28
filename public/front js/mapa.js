let map = L.map('map').setView([-34.522991, -58.700757], 5);
let arrayMarcadores = []


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '© OpenStreetMap'
}).addTo(map);



const ponerPunto = (lat, lon) => {
    map.setView([lat, lon])

    let marcador = L.marker([lat, lon]).addTo(map).bindPopup('Aeropuerto')
    arrayMarcadores.push(marcador);
    map.addLayer(marcador);
    marcador.openPopup();
}

const eliminarMarcadores = () => {

    for (let mark of arrayMarcadores) {
        map.removeLayer(mark);
    }
    arrayMarcadores = []
}


export { ponerPunto, eliminarMarcadores }