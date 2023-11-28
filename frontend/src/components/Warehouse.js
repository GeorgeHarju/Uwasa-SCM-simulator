import React, {useState} from 'react';
import '../Warehouse.css';
import WarehouseTable from './tables/WarehouseTable';
import Button from '@mui/material/Button';

function Warehouse() {
    const [warehouseTiedot, setWarehouseTiedot] = useState([]);

    const handleTiedot = (e) => {
        setWarehouseTiedot(e.warehouses);
        console.log('warehouseTiedot on', warehouseTiedot);
    }

    // post request eli lisätään uusi warehouse
    // get request eli haetaan kaikki warehouset ja näytetään taulukossa
    // delete request jossa poistetaan id:tä vastaava warehouse
    // put request jolla muokataan id:tä vastaavaa warehousea
    const handlePost = async (row) => {
        const jsonData = JSON.stringify(row);
        console.log(jsonData);
        await fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        })
        // logataan warehouseTiedot, jotka lähetettiin
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    }

    const handleGet = () => {
        console.log('lets get');
        fetch('http://localhost:3001/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        // parsitaan json, data-objekti sisältää warehouseTiedot
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // tallennetaan warehouseTiedot tilamuuttujaan
            handleTiedot(data);
        })
        .catch((error) => console.error('Error:', error));
    }

    const handleDelete = async (row) => {
        console.log('lets delete');
        const jsonData = JSON.stringify(row);
        console.log(jsonData);
        await fetch('http://localhost:3001/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    }

    const handlePut = async (row) => {
        console.log('lets put/edit');
        const jsonData = JSON.stringify(row);
        console.log(jsonData);
        await fetch('http://localhost:3001/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    }

    const buttonFunction = (e) => {
        e.target.style.display = 'none';
        handleGet();
    }

    return (
        <div>
            <div style={{ margin: '5%' }}>
                <Button onClick={buttonFunction}>refresh</Button>
                {warehouseTiedot.length > 0 &&
                <WarehouseTable warehouses={warehouseTiedot} getData={handleGet}
                addData={handlePost} editData={handlePut} deleteData={handleDelete} />}
            </div>
        </div>
    );
}

export default Warehouse;