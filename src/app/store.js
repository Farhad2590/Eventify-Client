import { configureStore } from "@reduxjs/toolkit";
import  formSlice  from "../Components/AddEventComponents/MultipleFormSlice";

const store = configureStore({
    reducer: {
        formInfo: formSlice
    }
})

export default store;