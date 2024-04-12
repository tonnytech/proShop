import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProducts } from '../services/productServices';


const HomeScreen = () => {
  const {isLoading, products, error} = useSelector((state) => state.productListReducer);
  const dispatch = useDispatch();
useEffect(()=>{
   dispatch(fetchProducts())
}, [dispatch]);
  return (
    <>
    <h1>Latest products</h1>
    {isLoading ? <Loader /> : error ? <Message variant='danger' childern={error} /> : <Row>
        {products.map(product =>(
            <Col key={product._id} sm={12} md={6} ld={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
    </Row>}   
    </>
  )
}

export default HomeScreen
