import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../services/orderServices";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderSlice);
  const { isLoading, singleOrderDetails, error, isSuccessfull, order } =
    orderDetails;

  const allAddresses = singleOrderDetails.shippingAddress;
  console.log(allAddresses);
  console.log(singleOrderDetails);
  console.log(order);

  //   dispatch(getOrderDetails(id));

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' children={error} />
  ) : (
    <>
      <h1>Order {singleOrderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Name:</strong>{" "}
                {singleOrderDetails.user
                  ? singleOrderDetails.user.name
                  : "Name"}
              </p>
              <p>
                <strong>Email: </strong>
                <a
                  href={`mailto:${
                    singleOrderDetails.user
                      ? singleOrderDetails.user.email
                      : "Email"
                  }`}>
                  {singleOrderDetails.user
                    ? singleOrderDetails.user.email
                    : "Email"}
                </a>{" "}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {allAddresses ? allAddresses.address : "Address"},{" "}
                {allAddresses ? allAddresses.city : "City"},{" "}
                {allAddresses ? allAddresses.postalCode : "postalCode"},{" "}
                {allAddresses ? allAddresses.country : "Country"}
              </p>
              {singleOrderDetails.isDelivered ? (
                <Message variant='success'>
                  {" "}
                  Delivered at {singleOrderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger' children='Not Paid'>
                  Not Delivered
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {singleOrderDetails.PaymentMethod}
              </p>
              {singleOrderDetails.isPaid ? (
                <Message variant='success'>
                  {" "}
                  Paid at {singleOrderDetails.paidAt}
                </Message>
              ) : (
                <Message variant='danger' children='Not Paid'>
                  Not Paid
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {singleOrderDetails.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {singleOrderDetails.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {singleOrderDetails.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {singleOrderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {singleOrderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger' children={error.error} />
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {singleOrderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
