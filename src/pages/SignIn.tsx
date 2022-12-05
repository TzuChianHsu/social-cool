import React, { useState } from 'react';
import { Menu, Form, Container, Message } from 'semantic-ui-react'
import firebase from '../utils/firebase';
 import { useNavigate } from 'react-router-dom'
 import 'firebase/auth';

interface StringMap { [key: string]: string; }
const ERROR_REGISTER_MSG: StringMap = {
    'auth/email-already-in-use': '信箱已存在',
    'auth/invalid-email': '信箱格式不正確',
    'auth/weak-password': '密碼強度不足'
}
const ERROR_SIGNIN_MSG: StringMap = {
    'auth/invalid-email': '信箱格式不正確',
    'auth/user-not-found': '信箱不存在',
    'auth/wrong-password': '密碼錯誤'
}
function Signin () {
    let navigate = useNavigate();
    const  [active, setActive] = useState('signin')
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('')
    const [ errorMsg, setErrorMsg] = useState<any>(null);
    const [ loading, setLoading ]= useState(false)
    const onSubmit = () => {
        setLoading(true)
        if(active === 'signin') {
           firebase.auth().signInWithEmailAndPassword(email, password).then(()=> {
             navigate('/')
           }).catch((error)=> {
              setErrorMsg(ERROR_SIGNIN_MSG[error.code])
           }).finally(()=> {
            setLoading(false)
           })
        }
        if(active === 'register'){
            firebase.auth().createUserWithEmailAndPassword( email, password).then(()=> {
            navigate('/')
            }).catch((error)=> {
                setErrorMsg(ERROR_REGISTER_MSG[error.code])
            }).finally(()=> {
                setLoading(false)
            })
        }
    }
    return <Container><Menu  widths="2">
        <Menu.Item active={active === 'register' } onClick={ ()=> { 
            setErrorMsg('')
            setActive('register') 
            }}>註冊</Menu.Item>
        <Menu.Item active={active === 'signin' } onClick={()=> { 
            setErrorMsg('')
            setActive('signin') 
            } }>登入</Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
            <Form.Input label="信箱" value={email} placeholder="請輸入信箱" onChange={(e)=> setEmail(e.target.value)}></Form.Input>
            <Form.Input label="密碼" value={password} placeholder="請輸入密碼"onChange={(e)=> setPassword(e.target.value)} type="password"></Form.Input>
            {
                errorMsg && <Message negative>{errorMsg}</Message>
            }
            <Form.Button loading={loading}>
                { active === 'register' && '註冊'}
                { active === 'signin' && '登入'}
            </Form.Button>
        </Form>
        </Container>
}

export default Signin;