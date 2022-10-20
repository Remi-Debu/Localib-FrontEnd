import Location from "../models/location";

export default class LocationService {
    static getLocations(): Promise<Location[]> {
        return fetch('http://localhost:3001/locations')
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static getLocation(id: number): Promise<Location | null> {
        return fetch(`http://localhost:3001/locations/${id}`)
            .then(res => res.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(err => this.handleError(err));
    }

    static isEmpty(data: Object): Boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}