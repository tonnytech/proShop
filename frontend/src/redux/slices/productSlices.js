import { createSlice } from '@reduxjs/toolkit';
import {fetchProducts} from '../../services/productServices';

// Set the initial state
export const initialState = {
  products: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const getProductsSlice = createSlice({
  name: 'ProductList',
  initialState,
  reducers: {
    resetSuccessful: (state) => ({ ...state, isSuccessfull: false }),
  },
  extraReducers: (builder) => {
    // fetch all existing houses
    builder
      .addCase(fetchProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const backedData = action.payload;
        let newProducts = [];
        backedData.map(element => (
          newProducts.push({
            product: element._id,
            name: element.name,
            image: element.image,
            description: element.description,
            brand: element.brand,
            category: element.category,
            price: element.price,
            countInStock: element.countInStock,
            rating: element.rating,
            numReviews: element.numReviews,
          })
        ));
        const returnPoducts = {
          ...state,
          products: newProducts,
          isLoading: false,
          isSuccessfull: true
        }

        return returnPoducts;
  })
      .addCase(fetchProducts.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        isLoading: false,
      }));
  },
});

export const { resetSuccessful } = getProductsSlice.actions;
export default getProductsSlice.reducer;