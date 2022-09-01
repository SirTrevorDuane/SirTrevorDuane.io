import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import './loginStyles.css';

function Login(props) {

    const [name, setName] = useState("");
    const [pass, setPassword] = useState("");
    const [token, setToken] = useState("");

    let navigate = useNavigate();

    const {email, password } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    

    const signIn = () =>
    {
        const users = { name }; //to store email in local storage and send it to home page
        try{
            if(user.email === '')
            {
                console.log('Email field is empty')
            }
            else if(user.password === '')
            {
                console.log('Pass field is empty')
            }
        }
        catch(error){
            console.log(error)
        }

        const headers ={
            'Authorization':'application/json',
        }

        axios.post("http://127.0.0.1:8000/api/auth/login", user, {headers})
        .then((response) => { 
            localStorage.setItem("users",response.data);
            navigate("/main")
            if(response.data){
                console.log("login/success")
                navigate("/main")
            }
        })
        .catch((error) => {
            if(error.response){
                if(error.response.data.message){
                    console.log(error.response.data.message);
                }

                if(error.response.data.errors) {
                    console.log(error.response.data.errors);
                }
            }
        });
        
    }


    // const makeRequest = (e) => {
    //     e.preventDefault();
    //     setErrors(null);
    //     setMessage('');

    //     axios.get('/sanctum/csrf-cookie').then(() => {
    //         const payload = {
    //             email,
    //             password
    //         };
    //         if(remember){
    //             payload.remember =  true;
    //         }
    //         axios.post('http://127.0.0.1:8000/api/auth/login', payload, {headers: {Accept: 'application/json', Authorization: 'bearer ' + data.user.token}
    //     }).then(response => {
    //         console.log(response.data.user);

    //         if(response.data.user) {
    //             alert('Login/success');
    //             navigate('/main');
    //         }
    //     }).catch(error => {
    //         console.log(error);
            
    //         if(error.response){
    //             if(error.response.data.message){
    //                 setMessage(error.response.data.message);
    //             }

    //             if(error.response.data.errors) {
    //                 setErrors(error.response.data.errors);
    //             }
    //         }
    //     });
    //     });
    // };



  return (
    <Container fluid className="loginContainer">
        <div className="loginWrapper">
            <Form className="loginForm">

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={email} placeholder="Email" required onChange={e => onInputChange(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} placeholder='Password' required onChange={e => onInputChange(e)} />
                </Form.Group>
                <Button variant="primary"type='submit' onClick={signIn}>
                    Login
                </Button>
            </Form>
        </div>
    </Container>
  )
}

export default Login