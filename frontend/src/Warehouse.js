import React, {useState} from 'react';
import './Warehouse.css';

function Warehouse() {
    const [warehouseData, setWarehouseData] = useState({
        id: '',
        name: '',
        latitude: '',
        longitude: '',
        processing_cost: '',
        max_hr_cap: '',
        sla: ''
    });
    const [tiedot, setTiedot] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWarehouseData({ ...warehouseData, [name]: value });
    };

    const handleTiedot = (e) => {
        setTiedot(e.warehouses);
        console.log('tiedot on', tiedot);
        //console.log('length on', tiedot.length);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const jsonData = JSON.stringify(warehouseData);
        console.log(warehouseData);
        console.log(jsonData);

        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        })
        // logataan tiedot, jotka lähetettiin
        .then((response) => response.json())
        .then((data) => {
            console.log(typeof(data));
            console.log(data);
        })
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
        // parsitaan json, data-objekti sisältää tiedot
        .then((response) => response.json())
        .then((data) => {
            console.log(typeof(data));
            console.log(data);
            // tallennetaan tiedot tilamuuttujaan
            handleTiedot(data);
        })
    }

    const handleDelete = () => {
        console.log('lets delete');
        const jsonData = JSON.stringify(warehouseData);
        console.log(jsonData);
        fetch('http://localhost:3001/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
    }

    const handlePut = () => {
        console.log('lets put/edit');
        const jsonData = JSON.stringify(warehouseData);
        console.log(jsonData);
        fetch('http://localhost:3001/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    // formin avulla lähetetään post request eli lisätään uusi warehouse
    // GET napin avulla lähetetään get request eli haetaan kaikki warehouset
    // DELETE napin avulla lähetetään delete request jossa poistetaan id:tä vastaava warehouse
    // PUT napin avulla lähetetään put request jolla muokataan id:tä vastaavaa warehousea
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" placeholder="Warehouse id" value={warehouseData.id} onChange={handleChange} />
                <input type="text" name="name" placeholder="Warehouse name" value={warehouseData.name} onChange={handleChange} />
                <input type="text" name="latitude" placeholder="Latitude" value={warehouseData.latitude} onChange={handleChange} />
                <input type="text" name="longitude" placeholder="Longitude" value={warehouseData.longitude} onChange={handleChange} />
                <input type="text" name="processing_cost" placeholder="Processing cost" value={warehouseData.processing_cost} onChange={handleChange} />
                <input type="text" name="max_hr_cap" placeholder="Max hr cap" value={warehouseData.max_hr_cap} onChange={handleChange} />
                <input type="text" name="sla" placeholder="SLA" value={warehouseData.sla} onChange={handleChange} />
                <input type="submit" value="Add warehouse" />
            </form>
            <button onClick={handleGet}>GET</button>
            <button onClick={handleDelete}>DELETE</button>
            <button onClick={handlePut}>PUT</button>
            {tiedot.length > 0 &&
            <Tiedot warehouses={tiedot} />}
        </div>
    );
}


// TODO: pitäisi saada renderöitymään vain kun tiedot muuttuvat
// ja vasta kun halutaan (eli painetaan search/get nappia tmv.)

// erillinen komponentti, joka näyttää tiedot.
// taulukossa näytetään tiedot, jokaiselle warehouselle rivi
// taulukko jaettu 5:n warehousen kokoisiin sivuihin
// select valikolla valitaan sivu, jonka mukaan warehouse taulukko
// katkaistaan ja näytetään sopivasta kohtaa (voisi tehdä myös napeilla)
function Tiedot(props) {
    console.log('props on', props);

    const [page, setPage] = useState(1);
    //const [wList, setWList] = useState([]);
    //const [pageList, setPageList] = useState([]);
    //const pageList = [];
    const handlePageList = () => {
        const wList = [];
        const pageList = [];
        // käy läpi taulukon indeksit ja tekee niistä taulukon
        const iterator = props.warehouses.keys();
        for (const key of iterator) {
            wList.push(key);
        }
        // tehdään indekseistä sivutaulukko, joka voidaan mapata select napeiksi
        wList
        .filter((number) => number % 5 === 0)
        .forEach((number) => pageList.push(number / 5 + 1));
        console.log('wlist on', wList);
        console.log('pagelist on', pageList);
        console.log('page on', page);
        return pageList;
    }

    return (
        <div>
            <p>{JSON.stringify(props.warehouses[0])}</p>
            <p>{JSON.stringify(props.warehouses[0].name)}</p>
            <table>
                <thead><tr><th>ID</th><th>Name</th><th>Latitude</th><th>Longitude</th>
                <th>Processing cost</th><th>Max hr cap</th><th>SLA</th></tr></thead>
                <tbody>
                    {props.warehouses.slice(page*5-5, page*5)
                    .map((warehouse) => (
                        <tr key={warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.latitude}</td>
                            <td>{warehouse.longitude}</td>
                            <td>{warehouse.processing_cost}</td>
                            <td>{warehouse.max_hr_cap}</td>
                            <td>{warehouse.sla}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <select onChange={(e) => setPage(e.target.value)}>
                {handlePageList().map((number) => (
                    <option key={number} value={number}>page {number}</option>
                ))}
            </select>
        </div>
    )
}

export default Warehouse;