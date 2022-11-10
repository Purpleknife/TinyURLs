import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { useCookies } from 'react-cookie';

import axios from 'axios';
import bcrypt from 'bcryptjs';


interface RegisterProps {
  handleClose: () => void;
  show: boolean
}

const Register = (props: RegisterProps) => {
  const [cookies, setCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const [showError, setShowError] = useState('');

  const usernameInput = useRef<any>(null);
  const emailInput = useRef<any>(null);
  const passwordInput = useRef<any>(null);
  const passwordConfirmationInput = useRef<any>(null);

  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);

  interface User {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }

  const registerUser = async() => {
    const password = passwordInput.current.value;
    const saltedPassword = bcrypt.hashSync(password, salt);

    const passwordConfirmation = passwordConfirmationInput.current.value;
    const saltedPasswordConfirmation = bcrypt.hashSync(passwordConfirmation, salt);

    axios.get('/users')
      .then(res => {    
        const allUsers = res.data;
        const fetchUser = allUsers.find((user: User) => user.email === emailInput.current.value);
        if (fetchUser) {
          setShowError('This email adress is already registered.');
        } else {
          axios.post('/users', {
            username: usernameInput!.current!.value,
            email: emailInput.current.value,
            password: saltedPassword, //=> BCRYPT
            password_confirmation: saltedPasswordConfirmation
          })
            .then(res => {
              console.log('res from front-end', res.data);
              setCookie('username', res.data.username, {path: '/'});
              setCookie('user_id', res.data.id, {path: '/'});
              setCookie('logged_in', 'yes', {path: '/'});
              setShowError('');
              const user_id = res.data.id;
              //navigate(`/dashboard/${user_id}`);
            })
            .catch((error) => {
              console.log(error.message);
            })
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>

      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        {showError && <Alert id='alert' key='danger' variant='danger'>
        {showError}
        </Alert>}

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="username"
                name='username'
                autoFocus
                ref={usernameInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerForm.ControlInput2">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="name@example.com"
                ref={emailInput}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="registerForm.ControlPassword1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordInput}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="registerForm.ControlPassword2"
            >
              <Form.Label>Password confirmation:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordConfirmationInput}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button id='register' onClick={registerUser}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default Register;