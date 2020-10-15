import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import '../styles/pages/create-orphanage.css';
import happyMapIcon from "../utils/mapIcon";
import { LeafletMouseEvent } from 'leaflet'
import api from "../services/api";


export default function CreateOrphanage() {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openHours, setOpenHours] = useState('');
  const [openWeekends, setOpenWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const receivedImages = Array.from(event.target.files);
    setImages([...images, ...receivedImages]);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(); 
    
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', openHours);
    data.append('open_on_weekends', String(openWeekends));
    data.append('latitude', String(position.latitude));
    data.append('longitude', String(position.longitude));
    
    images.forEach(image => (
      data.append('images', image)
    ))
   

    await api.post('/orphanages', data)

    alert('Cadastro realizado com sucesso')
    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.655497, -46.6415726]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 &&
                <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
              }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  images.map((image, index) => {
                    const preview = URL.createObjectURL(image)
                    return (
                      <img src={preview} key={index} alt={`Imagem ${index + 1}`} />
                    )
                  })
                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                type="file"
                multiple
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={openHours}
                onChange={(event) => setOpenHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openWeekends ? 'active' : undefined}
                  onClick={() => setOpenWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={openWeekends ? undefined : 'inactive'}
                  onClick={() => setOpenWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
