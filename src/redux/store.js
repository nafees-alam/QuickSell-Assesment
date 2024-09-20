import { configureStore } from '@reduxjs/toolkit';
import { DataReducer} from './dataSlice';
import { SelectDataReducer } from './selectDataSlice';
const store = configureStore({
    reducer: {
        DataReducer, SelectDataReducer
    }
})
export default store;