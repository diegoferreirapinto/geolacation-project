// import { useEffect, useState } from "react";
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';


// export function App() {

//   let point;
//   const [mapa, setMapa] = useState()

//   useEffect(() => {

//     const mapContainer = document.getElementById('mapa');

//     if (mapContainer) {
//       // Verifique se o mapa não está inicializado
//       if (!mapContainer._leaflet_id) {
//         const map = L.map('mapa').setView([-22.615739, -43.233173], 16);

//         // Para acessar de fora
//         setMapa(map);

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);
//       }
//     }
//   }, [mapa])

//   let points = []
//   let pointLat, pointLon;

//   let createMarkerPoint = (mapa) => {
//     mapa.on('click',function(e){
//       pointLat = e.latlng.lat;
//       pointLon = e.latlng.lng;

//       //console.log('Latitude:', lat, 'Longitude:', lng);
//       console.log("tamanho antes", points.length);

//       //pensar em pegar todos os marcadores e colocar ele em um array
//       //fazer com que esse each do loop do array coloque eles na tela
//       points.push(L.marker([pointLat, pointLon]).addTo(mapa).bindPopup(points.length + 1).openPopup());

//       console.log("tamanho dps", points.length);
//     })
//   }

//   return (
//     <div id="mapa" style={{ width: '100vw', height: '100vh' }} onClick={createMarkerPoint()}>

//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function App() {

  const [mapa, setMapa] = useState(null);
  const [markerGroup, setMarkerGroup] = useState(null);
  const [groupLength, setGroupLength] = useState(0);
  const [markers, setMarkers] = useState([]); // Armazenar coordenadas dos marcadores
  const [polyline, setPolyline] = useState(null); // Armazenar a linha
  const [polygon, setPolygon] = useState(null); // Armazenar o polígono

  useEffect(() => {
    const mapContainer = document.getElementById('mapa');

    if (mapContainer) {
      // Verifique se o mapa não está inicializado
      if (!mapContainer._leaflet_id) {

        const map = L.map('mapa').setView([-22.615739, -43.233173], 16);
        setMapa(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const newMarkerGroup = L.layerGroup().addTo(map);
        setMarkerGroup(newMarkerGroup);
      }
    }
  }, []);

  useEffect(() => {
    if (markerGroup) {
      createMarkerPoint(mapa, markerGroup);
    }

  }, [markerGroup, markers]);

  const createMarkerPoint = (map, markerGroup) => {
    map.on('click', function (e) {
      const pointLat = e.latlng.lat;
      const pointLon = e.latlng.lng;

      const marker = L.marker([pointLat, pointLon]).bindPopup(groupLength + 1).openPopup();
      markerGroup.addLayer(marker);

      const newGroupLength = markerGroup.getLayers().length;
      setGroupLength(newGroupLength);

      const newMarkers = [...markers, [pointLat, pointLon]]; // Adicione as novas coordenadas ao array de marcadores
      setMarkers(newMarkers);

      // Remova a linha existente
      if (polyline) {
        map.removeLayer(polyline);
      }

      // Remova o polígono existente
      if (polygon) {
        map.removeLayer(polygon);
      }

      // Se houver mais de um marcador, crie a linha e o polígono
      if (newMarkers.length > 1) {
        const newPolyline = L.polyline(newMarkers, { color: 'blue' }).addTo(map);
        setPolyline(newPolyline);

        const newPolygon = L.polygon(newMarkers, { color: 'red' }).addTo(map);
        setPolygon(newPolygon);
      }
    });
  };

  return (
    <>
      <div id="mapa" style={{ width: '100vw', height: '80vh' }}></div>
    </>
  )
}
