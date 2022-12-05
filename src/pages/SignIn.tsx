import React, { useState } from 'react';
import { Menu, Form, Container } from 'semantic-ui-react'
import firebase from '../utils/firebase';
 import { useNavigate } from 'react-router-dom'
 import 'firebase/auth';


function Signin () {
    let navigate = useNavigate();
    const  [active, setActive] = useState('signin')
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('')
    const onSubmit = () => {
        if(active === 'signin') {
           firebase.auth().signInWithEmailAndPassword(email, password).then(()=> {
             navigate('/')
           })
        }
        if(active === 'register'){
            firebase.auth().createUserWithEmailAndPassword( email, password).then(()=> {
            navigate('/')
            })
        }
    }
    return <Container><Menu  widths="2">
        <Menu.Item active={active === 'register' } onClick={ ()=>setActive('register')}>註冊</Menu.Item>
        <Menu.Item active={active === 'signin' } onClick={()=>setActive('signin')}>登入</Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
            <Form.Input label="信箱" value={email} placeholder="請輸入信箱" onChange={(e)=> setEmail(e.target.value)}></Form.Input>
            <Form.Input label="密碼" value={password} placeholder="請輸入密碼"onChange={(e)=> setPassword(e.target.value)} type="password"></Form.Input>
            <Form.Button>
                { active === 'register' && '註冊'}
                { active === 'signin' && '登入'}
            </Form.Button>
        </Form>
        </Container>
}

export default Signin;