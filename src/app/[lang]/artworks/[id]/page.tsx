import { Artwork } from "@/lib/definitions/artwork.definition";
import { ChicagoArtHttpService } from "@/lib/services/data/chicagoart.http"

export default async function ArtworkDetails({params}:{params:{id:number}}) {
    const artService = new ChicagoArtHttpService();
    const data = await artService.getArtworkById(params.id);
    const artwork:Artwork = data.data;


    return <div className="container">
        <div className="grid-1to3 artwork-view">
            <div className="flex-column">
                <h2 className="title">{artwork.title}</h2>
                <p className="artist-name">{artwork.artist_display}</p>
                <p className="description" dangerouslySetInnerHTML={{__html:artwork.description}}></p>
            </div>
            <div className="flex-center">
                <img src={`${data.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`} alt={`${artwork.title}`} />
            </div>
        </div>
    </div>
}
