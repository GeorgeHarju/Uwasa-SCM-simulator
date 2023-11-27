import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

// TODO: pitäisi saada renderöitymään vain kun warehouseTiedot muuttuvat
// ja vasta kun halutaan (eli painetaan search/get nappia tmv.)

// MUI DataGrid komponentti, joka näyttää tiedot taulukossa. Syötetään sille warehouse tiedot
function WarehouseTable(props) {
    //console.log('props on', props);
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

    const apiRef = useGridApiRef();

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
    }

    return (
        <div>
            <DataGrid rows={rows} columns={columns}
            editMode="row"
            apiRef={apiRef}
            processRowUpdate={(updatedRow, originalRow) => handleUpdate(updatedRow, originalRow)}
            onProcessRowUpdateError={(error) => console.log(error)}
            />
            <Button onClick={handleAddRow}>add row</Button>
        </div>
    )
}

export default WarehouseTable;