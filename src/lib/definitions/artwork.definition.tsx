export type Artwork = {
    id: number;
    title: string;
    image_id: string;
    config: {
        iiif_url: string
    };
    artist_title: string;
    artist_display: string;
    description: string;
}