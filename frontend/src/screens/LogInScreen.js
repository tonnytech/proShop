// import React, { useState } from "react";
// import { Link } from "react-router-dom"
// import { FormLabel, Col, Row, Button, Form } from "react-bootstrap";


import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Button, Form  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { loginUser } from '../services/userServices'
import FormContainer from "../components/FormContainer";

const LogInScreen = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin= useSelector(state=> state.loginUserSlice)
        
    const {isLoading, error, loginUserInfo, } = userLogin;
    
    useEffect(()=> {
        console.log(loginUserInfo)
        if(loginUserInfo._id) {
            navigate('/');
        }
    },[navigate, loginUserInfo.length, dispatch, loginUserInfo, userLogin])

    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(loginUser({email, password}));
    }


return (
    <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger' childern={error.error} />}
            {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <h1>Password</h1>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer?
            <Link to='/register' >Register</Link>
            </Col>
        </Row>
    </FormContainer>
    )
}

export default LogInScreen;
