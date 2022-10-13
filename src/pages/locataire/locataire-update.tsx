import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Locataire from '../../models/locataire';
import { Toolbar } from 'primereact/toolbar';
import LocataireService from '../../services/locataire-service';
import LocataireForm from '../../components/locataire-form';

const LocataireUpdate: React.FunctionComponent = () => {
    const state: number = useLocation().state;
    const [locataire, setLocataire] = useState<Locataire | null>(null);

    useEffect(() => {
        LocataireService.getLocataire(state).then(locataire => setLocataire(locataire));
    }, [state]);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => (
        <>
            {locataire ? (
                <h1 className="mx-0 my-1">Modifier {locataire.nom + " " + locataire.prenom}</h1>
            ) : (
                <h4 className="center">Inconnu</h4>
            )}
        </>
    );

    return (
        <>
            {locataire ? (
                <div>
                    <Toolbar left={leftContents} />
                    <LocataireForm locataire={locataire} isEditForm={true} />
                </div>
            ) : (
                <h4>Inconnu</h4>
            )}
        </>
    )
}

export default LocataireUpdate;
