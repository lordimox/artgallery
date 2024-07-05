import { Artwork } from "@/lib/definitions/artwork.definition";
import { useRouter } from "next/navigation";

export default function ArtCard({artwork}:{artwork:Artwork}) {
    const router = useRouter();

    const goToDetails = ()=> {
        router.push(`artworks/${artwork.id}`);
    }

    return <div className="card flex-column-space-btwn" onClick={goToDetails}>
        <div className="card-image flex-center">
            <img className="card-image" src={`${artwork.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`} alt={`${artwork.title}`} />
        </div>
        <div className="flex-column-center">
            <h3 className="artwork-title">{artwork.title}</h3>
            <span className="artist-name">{artwork.artist_title}</span>
        </div>
    </div>
}