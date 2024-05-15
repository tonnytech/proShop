import {useState} from 'react'
import { Button, Form  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer";
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/slices/paymentAndShipping';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
    const cart = useSelector(state => state.paymentAndShipping)
    const {shippingAddress, paymentMethord} = cart
    console.log(paymentMethord)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('on submit handler')
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

return (
    <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' required placeholder='Enter Address' value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' required placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' required placeholder='Enter Address' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' required placeholder='Enter Country' value={country} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
)
}

export default ShippingScreen
