import Link from "next/link";
import { ReactNode } from "react";
import { getDictionary } from "./dictionaries";
import { locales } from "@/lib/dictionaries/locales";
import { useRouter } from "next/navigation";
import LanguageSelect from "../components/form-controls/language.select";

export default async function LangLayout({children,params}:{children:ReactNode,params:{lang:string}}) {
    const dict = await getDictionary(params.lang);

    return <>
        <div className="challenge-header">
            <h1>My Driscolls Challenge</h1>
        </div>
        <div className="nav-bar">
            <div className="container">
                <div className="flex-center">
                    <Link href={`/${params.lang}/users`} className="nav-bar_link">{dict.users.link}</Link>
                    <Link href={`/${params.lang}/artworks`} className="nav-bar_link">{dict.artworks.link}</Link>
                </div>
                <div className="lang-chooser">
                    <LanguageSelect lang={params.lang}></LanguageSelect>
                </div>
            </div>
        </div>
        {children}
    </>
}