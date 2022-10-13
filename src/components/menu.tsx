import React, { FunctionComponent } from 'react'
import { Menubar } from 'primereact/menubar';

const Menu: FunctionComponent = () => {
    const items = [
        {
            label: 'Gestion Véhicules',
            url: '/gestion-vehicules'
        },
        {
            label: 'Gestion Locataires',
            url: '/gestion-locataires'
        }

    ];

    const start = <img src="/localib.png" height={90} alt="logo" />;

    return (
        <>
            <Menubar model={items} start={start} />
        </>
    );
}

export default Menu;