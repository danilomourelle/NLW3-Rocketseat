import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { FiPlus, FiArrowRight } from 'react-icons/fi'

import '../styles/pages/orphanages-map.css'
import mapMarkerImg from '../images/map-marker.svg';
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  useEffect(() => {
    api
      .get('/orphanages')
      .then(res => {
        setOrphanages(res.data)
      })
      .catch()
  }, [setOrphanages]);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy Locations" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita <span role="img" aria-label="carinha feliz">😁</span></p>
        </header>

        <footer>
          <strong>Capital</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.655497, -46.6415726]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {
          orphanages.map((orphanage, index) => (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={happyMapIcon}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          ))
        }
      </Map>

      <Link to="orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFFFFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap