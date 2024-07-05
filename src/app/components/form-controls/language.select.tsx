'use client'
import { locales } from "@/lib/dictionaries/locales";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelect({lang}:{lang:string}) {
    const router = useRouter();
    const pathname = usePathname();

    const changeLang = (lang:string) => {
        let values = pathname.split('/');
        values.splice(1,1,lang);
        router.push(`${values.join('/')}`);
    }

    return <>
        <label htmlFor="language">Lang:</label>
        <select id="language" className="select-control" value={lang} onChange={(event)=>changeLang(event.target.value)}>
            {locales.map(local=>(
                <option key={local} value={local}>{local}</option>
            ))}
        </select>
    </>;
}