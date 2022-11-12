import React, { useRef, useState } from 'react';

import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import bcrypt from 'bcryptjs';

interface LoginProps {
  handleClose: () => void;
  show: boolean;
}

const Login = (props: LoginProps) => {
  const [cookies, setCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const [showError, setShowError] = useState('');

  const emailInput = useRef<any>(null);
  const passwordInput = useRef<any>(null);

  const navigate = useNavigate();

  interface User {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }

  const loginUser = async() => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    axios.get('/users')
      .then(res => {
        const allUsers = res.data;

        const fetchUser = allUsers.find((user: User) => user.email === email);
          if (fetchUser) {
            if (bcrypt.compareSync(password, fetchUser.password)) {
              const user_id = fetchUser.id;

              axios.get(`/login/${user_id}`)
                .then((res) => {
                  console.log('login data', res.data);
                  setCookie('username', res.data.username, {path: '/'});
                  setCookie('user_id', res.data.id, {path: '/'});
                  setCookie('logged_in', 'yes', {path: '/'});
                  setShowError('');
                  navigate(`/dashboard/${user_id}`);
                })
                .catch(error => console.log(error.message));
            } else {
              setShowError('Wrong credentials.');
            }
          }
          if (!fetchUser) {
            setShowError('This email adress is not registered.');
          }
      })
      .catch(error => console.log(error.message));
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        {showError && <Alert id='alert' key='danger' variant='danger'>
        {showError}
        </Alert>}

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                autoFocus
                placeholder="name@example.com"
                ref={emailInput}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="loginForm.ControlPassword1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordInput}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button id='login' onClick={loginUser}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default Login;