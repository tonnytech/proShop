import {useState} from 'react'
import { Button, Form, Col  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer";
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethord } from '../redux/slices/paymentAndShipping';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.paymentAndShipping)
    const {shippingAddress} = cart
    
    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethord, setPaymentMethord] = useState('Paypal')


    const submitHandler = (e) => {
        e.preventDefault();
        console.log('on submit handler')
        dispatch(savePaymentMethord(paymentMethord))
        navigate('/placeorder')
    }

return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Methord</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Methord</Form.Label>
            <Col>
                <Form.Check type='radio' label='Paypal or Credt Card' id='Paypal' name='paymentMethord' value='paypal' checked onChange={(e)=> setPaymentMethord(e.target.value)}></Form.Check>
                {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethord' value='stripe' onChange={(e)=> setPaymentMethord(e.target.value)}></Form.Check> */}
            </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='button'>Continue</Button>
        </Form>
    </FormContainer>
)
}

export default PaymentScreen
