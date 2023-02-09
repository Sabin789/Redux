import {configureStore} from "@reduxjs/toolkit"
import MainReducer from "../reducers/index"
const store=configureStore({
    reducer:MainReducer
    
})
export default store