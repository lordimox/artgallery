'use client'
import { getDictionary } from "@/app/[lang]/dictionaries";
import { addUser, getUsers, getUsersLength, removeUser, updateUser } from "@/lib/services/redux/user.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserView({params}:{params:{id?:number[], lang:string}}) {
    const [userDoesntExist, setUserDoesntExist] = useState(false);
    const [dict, setDict] = useState<any>({});
    const allUsers = useSelector(getUsers);
    const lastId = allUsers.length > 0 ? allUsers[allUsers.length-1].id : 0;
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        id: lastId + 1,
        firstname: '',
        lastname: '',
        username: ''
    });
    const [hasErrors, setHasErrors] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        getDictionary(params.lang).then(dict=>setDict(dict));
    },[]);

    useEffect(()=>{
        if(params.id) {
            let currId = params.id[0];
            if(currId > lastId) {
                setUserDoesntExist(true);
            } else {
                let currentUser = allUsers.filter((item)=>item.id == currId);
                if(currentUser.length > 0) {
                    setUser({...user, ...currentUser[0]});
                    setUserDoesntExist(false);
                } else {
                    setUserDoesntExist(true);
                }
            }
        }
    }, [allUsers]);

    let saveUser = () => {
        setHasErrors(false);
        if(user.firstname.length == 0 || user.lastname.length == 0 || user.username.length == 0) {
            setHasErrors(true);
            return;
        }
        let index = allUsers.findIndex(item=>item.id==user.id);
        if(index >=0) {
            dispatch(updateUser(user));
        } else {
            dispatch(addUser(user));
        }
        router.push(`/${params.lang}/users`);
    }

    let deleteUser = () => {
        dispatch(removeUser(user.id));
        router.push(`/${params.lang}/users`);
    }

    return <div className="container">
        <Link href={`/${params.lang}/users`} className="btn">{dict.buttons ? dict.buttons.back : ''}</Link>
        {userDoesntExist ? <h3 className="m2">User not found</h3> : 
            <div className="flex-column-center">
                <label htmlFor="userid">ID:</label>
                <input className="form-control" type="number" value={user.id} disabled id="userid" readOnly/>
                <label htmlFor="firstname">{dict.users ? dict.users.firstname : ''}:</label>
                <input className="form-control" type="text" value={user.firstname} onChange={(event)=>setUser({...user, firstname: event.target.value})} id="firstname"/>
                <label htmlFor="lastname">{dict.users ? dict.users.lastname : ''}:</label>
                <input className="form-control" type="text" value={user.lastname} onChange={(event)=>setUser({...user, lastname: event.target.value})} id="lastname"/>
                <label htmlFor="lastname">{dict.users ? dict.users.username : ''}:</label>
                <input className="form-control" type="text" value={user.username} onChange={(event)=>setUser({...user, username: event.target.value})} id="username"/>
                { hasErrors ? <p className="error-text">You must fill every slot.</p>:<></>}
                <div className="flex-center">
                    <button className="btn" onClick={saveUser}>{dict.buttons ? dict.buttons.save : ''}</button>
                    { user.id <= lastId ? 
                        <button className="btn btn-danger" onClick={deleteUser}>{dict.buttons ? dict.buttons.delete : ''}</button>
                        : <></>
                    }
                </div>

            </div>
        }
    </div>;
}