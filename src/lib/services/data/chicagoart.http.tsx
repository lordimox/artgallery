import { Artwork } from "@/lib/definitions/artwork.definition";
import { apiUrl } from "./dotenv.service";

export class ChicagoArtHttpService {
    private baseUrl;

    constructor(baseURL=apiUrl) {
        this.baseUrl = baseURL;
    }

    private defaultHeaders() {
        return {
            'Content-Type': 'application/json'
        };
    }

    private getInits() {
        return {
            method: 'GET',
            headers: this.defaultHeaders(),
        }
    }

    async getArtWorks(page:number) {
        let response = await fetch(`${this.baseUrl}?page=${page}&limit=12`, this.getInits());
        let data = await response.json();
        return data;
    }

    async getArtworkById(id:number) {
        let response = await fetch(`${this.baseUrl}/${id}`, this.getInits());
        let data = await response.json();
        return data;
    }
}