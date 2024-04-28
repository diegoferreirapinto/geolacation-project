import { useEffect, useState } from "react";
import L, { point } from 'leaflet';
import 'leaflet/dist/leaflet.css';


export function App() {

  // const [mapa, setMapa] = useState()

  useEffect(() => {

    const mapContainer = document.getElementById('mapa');

    if (mapContainer) {
      // Verifique se o mapa não está inicializado
      if (!mapContainer._leaflet_id) {
        const map = L.map('mapa').setView([-22.615739, -43.233173], 16);
        
        // Para acessar de fora
        setMapa(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click',function(e){
          pointLat = e.latlng.lat;
          pointLon = e.latlng.lng;
      
          //console.log('Latitude:', lat, 'Longitude:', lng);
          console.log("tamanho antes", points.length);
          
      
          //pensar em pegar todos os marcadores e colocar ele em um array
          //fazer com que esse each do loop do array coloque eles na tela
          point = L.marker([pointLat, pointLon]).addTo(map).bindPopup(points.length + 1).openPopup();
      
          points.appenChild(point)

          console.log("tamanho dps", points.length);
        })


        console.log("clietWi", mapContainer.clientWidth)
        console.log("clientHe", mapContainer.clientHeight)
        console.log("offWi", mapContainer.offsetWidth)
        console.log("offHei", mapContainer.offsetHeight)
        // return () => { mapContainer.remove()}
      }
    }
  }, [])

  let points = []
  let pointLat, pointLon;


  
  // function createMarkerPoint(e) {
  //
  //   pointLat = e.target.latlng.lat;
  //   pointLon = e.target.latlng.lng;

  
  //   //console.log('Latitude:', lat, 'Longitude:', lng);

  //   //pensar em pegar todos os marcadores e colocar ele em um array
  //   //fazer com que esse each do loop do array coloque eles na tela
  //   point = L.marker([pointLat, pointLon]).addTo(mapa)
  //     .bindPopup('Jogo de Bola aqui hoje!')
  //     .openPopup();
  //     points.push(point)
  // }

  return (
    <div id="mapa" style={{ width: '100vw', height: '100vh' }}>

    </div>
  )
}
