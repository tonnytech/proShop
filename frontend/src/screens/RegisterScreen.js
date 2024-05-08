import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Button, Form  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer";
import { registerUser } from '../services/userServices'

const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister= useSelector(state=> state.registerUserSlice)
        
    const { isLoading, error, registerUserInfo} = userRegister;
            
    useEffect(()=> {
        if(registerUserInfo.length) {
            navigate('/');
         } else {
            navigate('/register')
         }
    },[navigate, registerUserInfo.length, dispatch, registerUserInfo])

    const submitHandler = (e)=> {
        e.preventDefault();
        setMessage(null)
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
        dispatch(registerUser( {name, email, password}));
        }
    }

    
  return (
    <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger' childern={error}>{error}</Message>}
            {message && <Message variant='danger' childern={message}>{message}</Message>}
            {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Have an account?
            <Link to='/login' >Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen;
