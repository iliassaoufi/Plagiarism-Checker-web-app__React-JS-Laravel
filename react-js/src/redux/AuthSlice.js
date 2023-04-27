import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "authentication",
    initialState: {
        user: null,
        token: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', JSON.stringify(state.token));
        },
        deleteUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        deleteToken: (state) => {
            state.token = "";
            localStorage.removeItem('token');
        }
    },
});

export const { setUser, setToken, deleteUser, deleteToken } = AuthSlice.actions;

export default AuthSlice.reducer;


// setCompleted: (state, action) => {
//     state.value = state.value.map((value) => {
//         let todo = value;
//         if (todo.id === action.payload)
//             todo.completed = !todo.completed;
//         return todo;
//     });
//     state.show = state.value
// },
//     showTodos: (state, action) => {
//         state.show = state.value.filter((value) => {
//             if (action.payload === 0)
//                 return true;
//             else if (action.payload === 1)
//                 return value.completed === true;
//             else if (action.payload === -1)
//                 return value.completed === false;
//         });
//     },