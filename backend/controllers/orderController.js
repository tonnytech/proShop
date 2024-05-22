import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
//@router POST/api/orders
//@access private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethord,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.User._id,
      shippingAddress,
      paymentMethod: paymentMethord,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    console.log(order);
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
//@router GET/api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems, getOrderById };
