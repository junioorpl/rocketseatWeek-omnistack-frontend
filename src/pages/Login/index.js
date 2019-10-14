import React, {useState} from 'react';

import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');

    }
    return (
        <>
            <p>Alugue locais para <strong>aumentar</strong> sua network e descobrir talentos para seu ambiente.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="e-mail">Seu melhor E-Mail*</label>
                <input
                    type="email"
                    id="email"
                    placeholder="exemplo@dominio.com"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">ENTRAR</button>
            </form>
        </>
    )
}