import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        product: [],
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        }
    }
});

export const {setLoading, setProduct} = productSlice.actions;
export default productSlice.reducer;