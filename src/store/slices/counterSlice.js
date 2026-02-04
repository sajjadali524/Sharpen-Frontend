import { createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setValue } = counterSlice.actions;
export default counterSlice.reducer;

