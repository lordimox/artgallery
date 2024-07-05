import { User } from "@/lib/definitions/user.definition";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxStore";

const initialState:User[] = [];

const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser(state, action) {
            let newUser = action.payload;
            let index = state.findIndex(user=>user.id==newUser.id);
            if(index<0) {
                state.push(newUser);
            }
        },
        removeUser(state, action) {
            let index = state.findIndex(user=>user.id==action.payload);
            state.splice(index, 1);
        },
        updateUser(state, action) {
            let index = state.findIndex(user=>user.id==action.payload.id);
            state[index] = action.payload;
        }
    },
});

export const {addUser, removeUser, updateUser} = userSlice.actions;

export default userSlice.reducer;

export const getUsers = (state:RootState) => state.users;
export const getUsersLength = (state:RootState) => state.users.length;
