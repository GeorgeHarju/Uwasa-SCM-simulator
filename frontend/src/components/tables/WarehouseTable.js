import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

// MUI DataGrid komponentti, joka näyttää tiedot taulukossa. Syötetään sille warehouse tiedot
function WarehouseTable(props) {
    console.log('props on', props);
    const apiRef = useGridApiRef();
    // Mapataan warehouset riveille
    const rows = props.warehouses.map((warehouse) => (
        { id: warehouse.id, name: warehouse.name, latitude: warehouse.latitude,
            longitude: warehouse.longitude, processing_cost: warehouse.processing_cost,
            max_hr_cap: warehouse.max_hr_cap, sla: warehouse.sla }
    ));

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', editable: true, width: 150 },
        { field: 'latitude', headerName: 'Latitude', editable: true, width: 150 },
        { field: 'longitude', headerName: 'Longitude', editable: true, width: 150 },
        { field: 'processing_cost', headerName: 'Processing cost', editable: true, width: 150 },
        { field: 'max_hr_cap', headerName: 'Max hr cap', editable: true, width: 150 },
        { field: 'sla', headerName: 'SLA', editable: true, width: 150 },
    ];

    // päivitetään tiedot backendille ja päivitetään taulukko
    const handleUpdate = async (updatedRow, originalRow) => {
        console.log('starting update', updatedRow, originalRow);
        console.log('editData');
        await props.editData(updatedRow);
        console.log('getData');
        props.getData();
    }

    // lisätään uusi rivi ja annetaan sille id
    // lisätään uusi tieto backendille ja päivitetään taulukko
    const handleAddRow = async () => {
        const button = document.getElementById('addButton');
        button.style.visibility = 'hidden';
        var idCounter = 1;
        if (rows.length > 0) {
            idCounter = rows[rows.length - 1].id + 1;
        }
        apiRef.current.updateRows([{ id: idCounter, name: '', latitude: '',
            longitude: '', processing_cost: '', max_hr_cap: '', sla: '' }]);
        console.log('addData');
        await props.addData(apiRef.current.getRow(idCounter));
        console.log('getData');
        props.getData();
        button.style.visibility = 'visible';
    }

    // sillä hetkellä valittu rivi poistetaan backendillä ja päivitetään taulukko
    const handleDeleteRow = async () => {
        if (window.confirm('Are you sure you wish to delete ?')) {
            console.log(rows.filter(row => apiRef.current.isRowSelected(row.id))[0]);
            console.log('deleteData');
            await props.deleteData(rows.filter(row => apiRef.current.isRowSelected(row.id))[0]);
            console.log('getData');
            props.getData();
        }
    }

    const [rowHeight, setRowHeight] = useState(50);

    return (
        <div>
            <Button style={{marginRight: '5%'}} onClick={props.getData}>refresh</Button>
            <Button style={{marginRight: '5%'}} onClick={handleAddRow} id='addButton'>add new row</Button>
            <Button style={{marginRight: '5%'}} onClick={handleDeleteRow}>delete selected row</Button>
            <Button>row height</Button>
            <Select defaultValue={50} onChange={e => setRowHeight(parseInt(e.target.value))} style={{ height: 25 }}>
                <MenuItem value='20'>20</MenuItem>
                <MenuItem value='30'>30</MenuItem>
                <MenuItem value='40'>40</MenuItem>
                <MenuItem value='50'>50</MenuItem>
                <MenuItem value='60'>60</MenuItem>
                <MenuItem value='70'>70</MenuItem>
                <MenuItem value='80'>80</MenuItem>
            </Select>
            <div style={{ height: 500 }}>
                <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowHeight={rowHeight}
                autoPageSize
                apiRef={apiRef}
                processRowUpdate={(updatedRow, originalRow) => handleUpdate(updatedRow, originalRow)}
                onProcessRowUpdateError={(error) => console.log(error)}
                />
            </div>
        </div>
    )
}

export default WarehouseTable;