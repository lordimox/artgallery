import { useSelector } from "react-redux";
import { getUsers } from "../redux/user.slice";

export const loadInitialState = () => {
    try {
        const serialState = localStorage.getItem('appState');
        if(serialState == null) {
            return [];
        } 
        return JSON.parse(serialState);
    } catch(err) {
        return [];
    }
}

export const saveState = (store:any) => (next:any) => (action:any) => {
    const result = next(action);
    try {
        const serialState = JSON.stringify(store.getState().users);
        localStorage.setItem('appState', serialState);
        return result;
    } catch(err) {
        console.log(err);
        return result;
    }
}