import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { fetchProduct } from '../services/productServices';
import { addToCart } from '../redux/slices/cartSlicle';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
        const [qty, setQty] = useState(1);
        const navigate = useNavigate();
        const {id} = useParams();
        const dispatch = useDispatch();
        const {product, isLoading, error} = useSelector((state) => state.singleProductReducer);
        // const cartProducts = useSelector((state) => state.cartProductReducer);
        // console.log(cartProducts)

        useEffect(()=>{
            dispatch(fetchProduct(id))
        }, [dispatch, id]) 
        
        const addToCartHandler = () => {
            const cartItem = {...product, qty}
            console.log(cartItem)
            dispatch(addToCart(cartItem))
            navigate(`/cart/${id}?qty=${qty}?`)
        }
    return (
        <>
        <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
        {isLoading ? <Loader /> : error ? <Message variant='danger' children={error} /> : <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text ={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: $ {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>                    
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price: 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>                                
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status: 
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock': 'Out of stock'}                          
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                onClick={addToCartHandler}
                                className ='btn-block'
                                type='button'
                                disabled={product.countInStock ===0}>
                                Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}
        </>
    )
}

export default ProductScreen
