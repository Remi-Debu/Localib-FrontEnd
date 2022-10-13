import React, { useState, useEffect } from 'react'
import Locataire from '../models/locataire';
import LocataireService from '../services/locataire-service';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const GestionLocataires: React.FunctionComponent = () => {
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [selectedLocataire, setSelectedLocataire] = useState(null);

    useEffect(() => {
        LocataireService.getLocataires().then(locataires => setLocataires(locataires));
    }, []);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => {
        return (
            <>
                <h1 className="mx-0 my-1">Gestion des Locataires</h1>
            </>
        );
    }

    /**
     *  Affiche le contenu de droite de la Toolbar
     *  @returns Bouton d'ajout.
     */
    const rightContents = () => {
        return (
            <>
                <Link to="/gestion-locataires/ajouter" style={{ textDecoration: "none" }}>
                    <Button label="Ajouter" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </>
        );
    }

    /**
     * Sert a afficher le bouton de modification et de suppression du tableau pour la dernière colonne
     * @returns Un composant React.
     */
    const actionButtonTable = (rowData: Locataire) => {
        return (
            <>
                <Link to={"/gestion-locataires/modifier"} state={rowData.id} style={{ textDecoration: "none" }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" />
            </>
        );
    }

    return (
        <>
            <Toolbar left={leftContents} right={rightContents} />

            <DataTable
                value={locataires}
                selectionMode="single"
                selection={selectedLocataire}
                onSelectionChange={e => setSelectedLocataire(e.value)}
                responsiveLayout="scroll"
                stripedRows
            >
                <Column field="nom" header="Nom" sortable />
                <Column field="prenom" header="Prénom" sortable />
                <Column field="email" header="E-mail" sortable />
                <Column field="telephone" header="Téléphone" sortable />
                <Column body={actionButtonTable} />
            </DataTable>
        </>
    );

}

export default GestionLocataires;
