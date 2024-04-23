import React, {useEffect, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../redux/slices/cartSlicle'


const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartProductReducer)
  const product = useSelector(state => state.singleProductReducer);

  const { cartItems } = cart
  
  useEffect(()=> {
    if(product ){
      dispatch(addToCart(product))
    }
  }, [product, dispatch])

  const removeFromCartHandler = (id) => {
    console.log(`remove ${id}`)
  }

  const addToCartHandler = (e, id) => {
   if(cartItems) {
    const selectedProduct = cartItems.find(item => item._id === id);
    const newProduct = { ...selectedProduct, qty: e.target.value };
    dispatch(addToCart(newProduct));
   }
  };

  const checkoutHandler = () => {
    console.log('checkout in process')
    Navigate('/login?redirect=shipping')
  }

  return (
    <Row>
        <Col md={8}>
          <h1>shopping cart</h1>
          {cartItems.length === 0 || cartItems.length === undefined ? <Message variant='primary' childern='Your cart is empty'><Link to='./'>Go back</Link></Message> : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded>
                        </Image>                    
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e)=> addToCartHandler(e, item._id)}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                            }
                                        </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item._id)}>
                                            <i className='fas fa-trash'> </i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc,item)=> +acc + +(item.qty), 0)}) items</h2>
                ${cartItems.reduce((acc, item)=> +acc + +item.qty * (+item.price), 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disable={(cartItems.length === 0).toString()} onClick={checkoutHandler}>
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
    </Row>
  )
}

export default CartScreen
