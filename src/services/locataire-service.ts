import Locataire from "../models/locataire";

export default class LocataireService {
    static getLocataires(): Promise<Locataire[]> {
        return fetch('http://localhost:3001/locataires')
            .then(response => response.json());
    }
}