import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import './loginStyles.css';

function Login(props) {

    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState({})

    let navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
    }
    const formData = new FormData()

    formData.append('email', email)
    formData.append('password', pass)

    axios.post("http://127.0.0.1:8000/api/auth/login", formData)
    .then(response => {
        console.log(response);
        return response;
    })
    .then(json => {
        if (json.data.success) {
          alert("Login Successful!");

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            token: json.data.data.token,
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
        } else alert("Login Failed!");
    })
    
  return (
    <Container fluid className="loginContainer">
        <div className="loginWrapper">
            <Form className="loginForm" onSubmit={signIn}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={email} placeholder="Email" required onChange={(event)=>{setEmail(event.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={pass} placeholder='Password' required onChange={(event)=>{setPassword(event.target.value)}} />
                </Form.Group>
                <Button variant="primary" type='submit'>
                    Login
                </Button>
            </Form>
        </div>
    </Container>
  )
}

export default Login