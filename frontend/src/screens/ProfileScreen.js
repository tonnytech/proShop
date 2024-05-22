import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button, Form  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserOrGetUser } from '../services/userServices'

const ProfileScreen = () => {
    const [updateName,setUpdateName] = useState('');
    const [updateEmail,setUpdateEmail] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails= useSelector(state=> state.loginUserSlice)
    const {loginUserInfo, userProfile, error, isLoading } = userDetails;
    useEffect(()=> {
        if(loginUserInfo.length < 1) {
            navigate('/login');
        } else {
        dispatch(updateUserOrGetUser({ isUpdate: false }))
        }
    },[dispatch,loginUserInfo.length,navigate])

    const submitHandler = (e)=> {
        e.preventDefault();
        setMessage(null)
        const updateInfo = {};
        if(updatePassword !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            if(userProfile.name !== updateName && updateName !== ''){
                updateInfo.name = updateName
            }
            if(userProfile.email !== updateEmail && updateEmail !== ''){
                updateInfo.email = updateEmail
            }
            if(updatePassword !== ''){
                updateInfo.password = updatePassword
            }

            if (Object.entries(updateInfo).length !== 0){         
                dispatch(updateUserOrGetUser({updateInfo, isUpdate: true}))
            } else {
                return
            }
        }
    }

    return <Row>
    <Col md={3}>
    <h2>User Profile</h2>
            {error && <Message variant='danger' children={error}>{error}</Message>}
            {message && <Message variant='danger' children={message}>{message}</Message>}
            {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder={userProfile.name} value={updateName} onChange={(e)=>setUpdateName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder={userProfile.email} value={updateEmail} onChange={(e)=>setUpdateEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder="Update password" value={updatePassword} onChange={(e)=>setUpdatePassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password Update' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>Update</Button>
        </Form>
    </Col>
    <Col md={9}>
        <h2>my orders</h2>
    </Col>
  </Row>
}

export default ProfileScreen;
