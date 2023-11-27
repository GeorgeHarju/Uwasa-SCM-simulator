import React, {useState} from 'react';
import '../Warehouse.css';
import WarehouseTable from './tables/WarehouseTable';

function Warehouse() {
    const [warehouseFormData, setWarehouseFormData] = useState({
        id: '',
        name: '',
        latitude: '',
        longitude: '',
        processing_cost: '',
        max_hr_cap: '',
        sla: ''
    });
    const [warehouseTiedot, setWarehouseTiedot] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWarehouseFormData({ ...warehouseFormData, [name]: value });
    };

    const handleTiedot = (e) => {
        setWarehouseTiedot(e.warehouses);
        console.log('warehouseTiedot on', warehouseTiedot);
        //console.log('length on', warehouseTiedot.length);
    }

    const handleSubmit = (e) => {
        //e.preventDefault();
        const jsonData = JSON.stringify(warehouseFormData);
        console.log(warehouseFormData);
        console.log(jsonData);

        fetch('http://localhost:3001/', {
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

    const handleDelete = () => {
        console.log('lets delete');
        const jsonData = JSON.stringify(warehouseFormData);
        console.log(jsonData);
        fetch('http://localhost:3001/', {
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

    // Asetetaan napin teksti valitun labelin mukaan
    const toggleNappi = (e) => {
        setNappi(e.target.id);
        document.getElementById("cButton").innerHTML = document.getElementById(e.target.id).innerHTML;
    }

    // Suoritetaan napin funktion valitun tilan perusteella
    const onClickFunction = () => {
        switch (nappi) {
            case 'add':
                handleSubmit();
                break;
            case 'edit':
                handlePut();
                break;
            case 'delete':
                handleDelete();
                break;
            case 'view':
                handleGet();
                break;
            default:
                console.log('No state detected for onClickFunction');
                break;
        }
    }

    const [nappi, setNappi] = useState('');
    const formVisible = () => {
        return nappi === "add" || nappi === "edit" ? "visible" : "hidden";
    }

    // ADD napin / formin avulla lähetetään post request eli lisätään uusi warehouse
    // GET napin avulla lähetetään get request eli haetaan kaikki warehouset ja näytetään taulukossa
    // DELETE napin avulla lähetetään delete request jossa poistetaan id:tä vastaava warehouse
    // PUT napin avulla lähetetään put request jolla muokataan id:tä vastaavaa warehousea
    return (
        <div>
            <form style={{margin:'5%'}} onSubmit={handleSubmit}>
                <input type="text" name="id" placeholder="Warehouse id" value={warehouseFormData.id} onChange={handleChange} />
                <input type="text" name="name" placeholder="Warehouse name" value={warehouseFormData.name} onChange={handleChange}
                style={{visibility:formVisible()}}/>
                <input type="text" name="latitude" placeholder="Latitude" value={warehouseFormData.latitude} onChange={handleChange}
                style={{visibility:formVisible()}}/>
                <input type="text" name="longitude" placeholder="Longitude" value={warehouseFormData.longitude} onChange={handleChange}
                style={{visibility:formVisible()}}/>
                <input type="text" name="processing_cost" placeholder="Processing cost" value={warehouseFormData.processing_cost} onChange={handleChange}
                style={{visibility:formVisible()}}/>
                <input type="text" name="max_hr_cap" placeholder="Max hr cap" value={warehouseFormData.max_hr_cap} onChange={handleChange}
                style={{visibility:formVisible()}}/>
                <input type="text" name="sla" placeholder="SLA" value={warehouseFormData.sla} onChange={handleChange}
                style={{visibility:formVisible()}}/>
                <input type="submit" value="Add warehouse" />
            </form>
            <div style={{display:'flex', gap:'0%', marginLeft:'0%'}}>
                <div className="grid-container" style={{display:'grid'}}>
                    <label className="label" id="add">Add</label>
                    <label className="label" id="edit">Edit</label>
                    <label className="label" id="delete">Delete</label>
                    <label className="label" id="view">View</label>
                    <input type="checkbox" className="cbox" id="add" onChange={toggleNappi}
                    checked={nappi === "add" ? true : false}></input>
                    <input type="checkbox" className="cbox" id="edit" onChange={toggleNappi}
                    checked={nappi === "edit" ? true : false}></input>
                    <input type="checkbox" className="cbox" id="delete" onChange={toggleNappi}
                    checked={nappi === "delete" ? true : false}></input>
                    <input type="checkbox" className="cbox" id="view" onChange={toggleNappi}
                    checked={nappi === "view" ? true : false}></input>
                </div>
                <button style={{width:'100px', fontSize:'20px'}} id="cButton" onClick={onClickFunction}></button>
            </div>
            <button onClick={handleGet}>GET</button>
            <button onClick={handleDelete}>DELETE</button>
            <button onClick={handlePut}>PUT</button>
            <div style={{ margin: '5%', }}>
                {<WarehouseTable warehouses={warehouseTiedot} getData={handleGet} editData={handlePut} />}
                {<WarehouseTable warehouses={warehouseTiedot} getData={handleGet} editData={handlePut} />}
            </div>
        </div>
    );
    //style={{ height: 300, width: '100%' }}
}

export default Warehouse;