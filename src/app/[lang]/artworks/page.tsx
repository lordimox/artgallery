'use client'
import { Artwork } from "@/lib/definitions/artwork.definition";
import { ChicagoArtHttpService } from "@/lib/services/data/chicagoart.http";
import { useEffect, useState } from "react";
import ArtCard from "../../components/cards/art.card";
import { getDictionary } from "../dictionaries";

export default function NewsHome({params}:{params:{lang:string}}) {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const artService = new ChicagoArtHttpService();
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [dict, setDict] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        getDataFromPage(page);
        getDictionary(params.lang).then(dict=>setDict(dict));
    }, [])

    const getDataFromPage = (newPage:number)=> {
        setPage(newPage);
        setIsLoading(true);
        artService.getArtWorks(newPage).then(response=> {
            let data = response.data as Artwork[];
            data.map(artwork=>{
                artwork.config = response.config;
            });
            setArtworks(data);
            setLastPage(response.pagination.total_pages);
            setIsLoading(false);
        }).catch(err=>console.log(err));
    }

    return <div className="container">
        <div className="grid-4c flex-gap">
            {!isLoading ? artworks.map(artwork=>(
                <ArtCard key={artwork.id} artwork={artwork}></ArtCard>
            )) : <></>}
            {isLoading ? <h4 className="loading-text">{dict.loading ? dict.loading : ''}</h4> : <></>}
        </div>
        <div className="pagination flex-space-btwn">
            { page > 1 ? 
                <button className="navigation-btn" onClick={()=>getDataFromPage(page-1)}>{dict.pagination ? dict.pagination.prev : ''}</button>
            : <div></div>}
            { page < lastPage ? 
                <button className="navigation-btn" onClick={()=>getDataFromPage(page+1)}>{dict.pagination ? dict.pagination.next : ''}</button>
            : <div></div>
            }
        </div>
    </div>;
}