import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Product from '../components/Product';
import { fetchProducts } from '../services/productServices';


const HomeScreen = () => {
  const products = useSelector((state) => state.productListReducer.products);

    const dispatch = useDispatch();
    console.log(products);
    console.log('I can reach the home page');

useEffect(()=>{
   dispatch(fetchProducts())
}, [dispatch]);
  return (
    <>
    <h1>Latest products</h1>
    <Row>
        {products.map(product =>(
            <Col key={product._id} sm={12} md={6} ld={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
    </Row>
      
    </>
  )
}

export default HomeScreen
