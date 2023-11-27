import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// TODO: pitäisi saada renderöitymään vain kun warehouseTiedot muuttuvat
// ja vasta kun halutaan (eli painetaan search/get nappia tmv.)

// MUI DataGrid komponentti, joka näyttää tiedot taulukossa. Syötetään sille warehouse tiedot
function WarehouseTable(props) {
    //console.log('props on', props);
    // Mapataan warehouset riveille
    const rows: GridRowsProp = props.warehouses.map((warehouse) => (
        { id: warehouse.id, name: warehouse.name, latitude: warehouse.latitude,
            longitude: warehouse.longitude, processing_cost: warehouse.processing_cost,
            max_hr_cap: warehouse.max_hr_cap, sla: warehouse.sla }
    ));
    
    const columns: GridColDef = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', editable: true, width: 150 },
        { field: 'latitude', headerName: 'Latitude', editable: true, width: 150 },
        { field: 'longitude', headerName: 'Longitude', editable: true, width: 150 },
        { field: 'processing_cost', headerName: 'Processing cost', editable: true, width: 150 },
        { field: 'max_hr_cap', headerName: 'Max hr cap', editable: true, width: 150 },
        { field: 'sla', headerName: 'SLA', editable: true, width: 150 },
    ];

    const handleUpdate = async (updatedRow, originalRow) => {
        console.log('starting update', updatedRow, originalRow);
        console.log('editData');
        await props.editData(updatedRow);
        console.log('getData');
        props.getData();
    }

    return (
        <div>
            <DataGrid rows={rows} columns={columns}
            editMode="row"
            processRowUpdate={(updatedRow, originalRow) => handleUpdate(updatedRow, originalRow)}
            onProcessRowUpdateError={(error) => console.log(error)}
            />
        </div>
    )
}

export default WarehouseTable;