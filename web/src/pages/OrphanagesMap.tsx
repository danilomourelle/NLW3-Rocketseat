import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { FiPlus, FiArrowRight } from 'react-icons/fi'

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanages-map.css'
import mapMarkerImg from '../images/map-marker.svg';
import happyMapIcon from '../utils/mapIcon';

function OrphanagesMap() {
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
        <Marker
          position={[-23.655497, -46.6415726]}
          icon={happyMapIcon}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Lar das meninas
            <Link to="/orphanage/1">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFFFFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap