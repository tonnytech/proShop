import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
 //@router POST/api/orders
 //@access private

export const addOrderItems = asyncHandler(async(req, res) => {
    const {orderItems, shippingAddress, paymentMethord, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.User._id,
            shippingAddress,
            paymentMethord,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

export default addOrderItems;