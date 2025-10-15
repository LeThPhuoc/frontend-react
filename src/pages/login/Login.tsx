import React, { useState } from 'react';
import { css } from '@emotion/react';
import api from '../../api/axiosConfig';

export const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (name?: string, password?: string) => {
        const a = await api.get('/sanctum/csrf-cookie')
        await api.post('/api/login', {
            login_name: name,
            password: password
        }).then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div css={container}>
            <div>
                <label htmlFor="">Tên đăng nhập</label>
                <input type="text" placeholder='Tên đăng nhập' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Mật khẩu</label>
                <input type="password" placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button onClick={() => handleSubmit(name, password)}>Login</button>
            <button onClick={() => api.post('/api/logout')}>Logout</button>
        </div>
    )
}

const container = css`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 600px;
    border-radius: 10px;
`