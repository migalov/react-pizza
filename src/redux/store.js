import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },

});

export default counterSlice.reducer;