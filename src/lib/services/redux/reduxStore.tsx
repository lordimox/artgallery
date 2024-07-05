import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './user.slice';
import { saveState } from "../data/storage";

export const makeStore = () => {
    return configureStore({
        reducer: {
            users: usersReducer
        },
        middleware: (getDef) => getDef().concat(saveState)
    });
}

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];