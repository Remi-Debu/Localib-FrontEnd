import Locataire from "../models/locataire";

export default class LocataireService {
    static getLocataires(): Promise<Locataire[]> {
        return fetch('http://localhost:3001/locataires')
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static getLocataire(id: number): Promise<Locataire | null> {
        return fetch(`http://localhost:3001/locataires/${id}`)
            .then(res => res.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(err => this.handleError(err));
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

    static updateLocataire(locataire: Locataire): Promise<Locataire> {
        return fetch(`http://localhost:3001/locataires/${locataire.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locataire)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deleteLocataire(locataire: Locataire): Promise<{}> {
        return fetch(`http://localhost:3001/locataires/${locataire.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static handleError(error: Error): void {
        console.error(error);
    }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }
}