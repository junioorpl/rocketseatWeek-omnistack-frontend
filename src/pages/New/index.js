import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api'
import './styles.css';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');

    };

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select" />
            </label>

            <label htmlFor="company">EMPRESA*</label>
            <input
                id="company"
                placeholder="Sua incrível empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="company">TECNOLOGIAS* <span>(Separe-as por virgula)</span></label>
            <input
                id="techs"
                placeholder="Tecnologias que utilizam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="company">VALOR DA DIÁRIA <span>(Vazio para gratuito)</span></label>
            <input
                id="price"
                placeholder="Valor por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar SPOT!</button>
        </form>
    )
}