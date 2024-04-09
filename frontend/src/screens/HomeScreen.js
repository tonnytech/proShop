import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Product from '../components/Product';

const HomeScreen = () => {
  const products = useSelector((state) => state.productListReducer.products);

    // const dispatch = useDispatch();

// useEffect(()=>{
//    dispatch(listProducts)
// }, [dispatch]);
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
