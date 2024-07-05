'use client'
import { User } from "@/lib/definitions/user.definition";
import EmptySection from "../../components/fillers/emptySection";
import { useSelector } from "react-redux";
import { getUsers } from "@/lib/services/redux/user.slice";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { useEffect, useState } from "react";

export default function UsersHome({params}:{params:{lang:string}}) {
    const [dict, setDict] = useState<any>({});
    const users:User[] = useSelector(getUsers);

    useEffect(()=>{
        getDictionary(params.lang).then(dict=>setDict(dict));
    }, []);

    return (
        <>
            <div className="container flex-end">
                <Link className="btn" href={`/${params.lang}/users/view`}>{dict.users ? dict.users.new : 'New'}</Link>
            </div>
            <div className="container table-wrapper">
                <table className="width-100p">
                    <thead>
                        <tr className="grid-4c">
                            <th>ID</th>
                            <th>{dict.users ? dict.users.firstname : ''}</th>
                            <th>{dict.users ? dict.users.lastname : ''}</th>
                            <th>{dict.users ? dict.users.username : ''}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user.id} className="grid-4c">
                                <td className="flex-center"><Link className="table-redirect" href={`/${params.lang}/users/view/${user.id}`}>{user.id}</Link></td>
                                <td className="flex-center">{user.firstname}</td>
                                <td className="flex-center">{user.lastname}</td>
                                <td className="flex-center">{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    users.length > 0 ? <></> : <EmptySection></EmptySection>
                }
            </div>
        </>
    )
}