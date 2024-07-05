'use client'
import { loadInitialState } from "@/lib/services/data/storage";
import { addUser } from "@/lib/services/redux/user.slice";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UsersProvider({children}:{children:ReactNode}) {
    const dispatch = useDispatch();

    useEffect(()=>{
        let users = loadInitialState();
        for (const user of users) {
            dispatch(addUser(user));
        }
    }, []);

    return children;
}