import React, {useState} from 'react';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWarehouseData({ ...warehouseData, [name]: value });
    };

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
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(typeof(data));
        })
        .catch((error) => console.error('Error:', error));
    }

    return (
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
    );
}

export default Warehouse