// cartSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage, getLocalStorage } from '../../constants/constants';
import { arrayToObject } from '../../constants/constants';
import { putOrder } from '../../services/orderServices';

const addressInitialState = () => {
    const storedCart = arrayToObject(getLocalStorage('shippingAddress'));
    return storedCart;
};

const paymentInitionState = () => {
    const storedCart = arrayToObject(getLocalStorage('paymentMethord'));
    return storedCart;
};

const initialState = {
    shippingAddress: addressInitialState(),
    paymentMethord: paymentInitionState(),
    order: [],
    isLoading: false,
    error: null,
    isSuccessfull: false,
};

const paymentAndShipping = createSlice({
name: 'address',
initialState,
reducers: {
        saveShippingAddress(state, action) {
        const shippingAddressReturn = {
            ...state,
            shippingAddress: action.payload
        }
        setLocalStorage('shippingAddress', shippingAddressReturn.shippingAddress)
        },

        savePaymentMethord(state, action){
            const paymentMethordReturn ={
                ...state,
                paymentMethord: action.payload
            }

            setLocalStorage( 'paymentMethord', paymentMethordReturn.paymentMethord)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(putOrder.pending, (state) => ({
        ...state,
        isLoading: true,
        }))
        .addCase(putOrder.fulfilled, (state, action) => ({
        ...state,
        order: action.payload,
        isLoading: false,
        isSuccessfull: true
        }))
        .addCase(putOrder.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        isLoading: false,
        }));
    }
});

export const {saveShippingAddress, savePaymentMethord} = paymentAndShipping.actions;
export default paymentAndShipping.reducer;
