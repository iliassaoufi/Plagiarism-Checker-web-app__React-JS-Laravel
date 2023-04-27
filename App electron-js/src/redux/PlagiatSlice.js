import { createSlice } from "@reduxjs/toolkit";

export const PlagiatSlice = createSlice({
    name: "plagiarism",
    initialState: {
        result: null,
        hestoric: [],
    },
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload;
            localStorage.setItem('result', JSON.stringify(state.result));
        },
        setHestoric: (state, action) => {
            state.hestoric = action.payload;
            localStorage.setItem(
                'hestoric',
                JSON.stringify(
                    state.hestoric.slice(-3)
                ));
        },
        AddToHestoric: (state, action) => {
            state.hestoric.push(action.payload);
            localStorage.setItem(
                'hestoric',
                JSON.stringify(
                    state.hestoric.slice(-3)
                ));
        },
        deleteFromHestoric: (state, action) => {
            const id = action.payload;
            state.hestoric = state.hestoric.filter(item => item.id != id);
            localStorage.setItem(
                'hestoric',
                JSON.stringify(
                    state.hestoric.slice(-3)
                ));
        },
        deleteResult: (state) => {
            state.result = null;
            localStorage.removeItem('result');
        },
        deleteHestoric: (state) => {
            state.hestoric = [];
            localStorage.removeItem('hestoric');
        }
    },
});

export const { setResult, setHestoric, AddToHestoric, deleteFromHestoric, deleteResult, deleteHestoric } = PlagiatSlice.actions;

export default PlagiatSlice.reducer;
