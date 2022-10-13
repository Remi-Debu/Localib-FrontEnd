import React, { useState, useEffect } from 'react'
import Locataire from '../models/locataire';
import LocataireService from '../services/locataire-service';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

const GestionLocataires: React.FunctionComponent = () => {
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [selectedLocataire, setSelectedLocataire] = useState(null);
    const [deleteLocataireDialog, setDeleteLocataireDialog] = useState(false);
    const [id] = useState<number>(new Date().getTime());
    const [locataire, setLocataire] = useState<Locataire>(new Locataire(id));

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
     * Afficher le bouton de modification et de suppression du tableau pour la dernière colonne
     * @returns Bouton modifier et supprimer.
     */
    const actionButtonTable = (rowData: Locataire) => {
        return (
            <>
                <Link to={"/gestion-locataires/modifier"} state={rowData.id} style={{ textDecoration: "none" }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteLocataire(rowData)} />
            </>
        );
    }

    /**
     * Définit l'état locataire sur rowData et définit l'état deleteLocataireDialog sur true.
     * @param {Locataire} rowData - Locataire est la donnée de la ligne sur laquelle on a cliqué
     */
    const confirmDeleteLocataire = (rowData: Locataire) => {
        setLocataire(rowData);
        setDeleteLocataireDialog(true);
    }

    /**
     * Footer de la fenetre de suppression 
     * qui contient 2 boutons "oui" et "non"
     * 
     * @returns L'instruction return renvoie un fragment de réaction.
     */
    const deleteLocataireDialogFooter = () => {
        return (
            <>
                <Button label="Non" icon="pi pi-times" className="p-button-text p-button-danger" onClick={hideDeleteLocataireDialog} />
                <Button label="Oui" icon="pi pi-check" className="p-button-text p-button-success" onClick={deleteLocataire} />
            </>
        );
    }

    /**
     * Cache la fenetre de suppression.
     */
    const hideDeleteLocataireDialog = () => {
        setDeleteLocataireDialog(false);
    }

    /**
     * Supprime le locataire et cache la fenetre de suppression.
     */
    const deleteLocataire = () => {
        let _locataires = locataires.filter(loc => loc.id !== locataire.id);
        setLocataires(_locataires);
        setDeleteLocataireDialog(false);
        LocataireService.deleteLocataire(locataire);
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

            <Dialog visible={deleteLocataireDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteLocataireDialogFooter} onHide={hideDeleteLocataireDialog}>
                <div className="confirmation-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="pi pi-exclamation-triangle mr-3" style={{ color: '#EF4444', fontSize: '2rem', marginRight: '10px' }} />
                    {locataire && <span>Êtes-vous sûr de vouloir supprimer<b> {locataire.nom} {locataire.prenom} </b>?</span>}
                </div>
            </Dialog>
        </>
    );

}

export default GestionLocataires;
