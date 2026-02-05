import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice.js";
import productSlice from "./slices/productsSlice.js"

const store = configureStore({
    reducer: {
        counter: counterSlice,
        products: productSlice
    }
});

export default store;
