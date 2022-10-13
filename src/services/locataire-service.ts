import Locataire from "../models/locataire";

export default class LocataireService {
    static getLocataires(): Promise<Locataire[]> {
        return fetch('http://localhost:3001/locataires')
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static addLocataire(locataire: Locataire): Promise<Locataire> {
        return fetch('http://localhost:3001/locataires', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locataire)
        })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}