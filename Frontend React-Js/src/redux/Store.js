import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import PlagiatSlice from './PlagiatSlice'

export default configureStore({
    reducer: {
        "authentication": AuthReducer,
        "plagiarism": PlagiatSlice
    },
})