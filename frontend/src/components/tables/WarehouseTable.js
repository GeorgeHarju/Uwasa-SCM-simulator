import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// TODO: pitäisi saada renderöitymään vain kun warehouseTiedot muuttuvat
// ja vasta kun halutaan (eli painetaan search/get nappia tmv.)

// MUI DataGrid komponentti, joka näyttää tiedot taulukossa. Syötetään sille warehouse tiedot
function WarehouseTable(props) {
    //console.log('props on', props);
    // Mapataan warehouset riveille
    const rows: GridRowsProp = props.warehouses.map((warehouse) => (
        { id: warehouse.id, col1: warehouse.id, col2: warehouse.name, col3: warehouse.latitude,
            col4: warehouse.longitude, col5: warehouse.processing_cost, col6: warehouse.max_hr_cap, col7: warehouse.sla }
    ));
    //console.log(rows);
    const columns: GridColDef = [
        { field: 'col1', headerName: 'ID', width: 150 },
        { field: 'col2', headerName: 'Name', width: 150 },
        { field: 'col3', headerName: 'Latitude', width: 150 },
        { field: 'col4', headerName: 'Longitude', width: 150 },
        { field: 'col5', headerName: 'Processing cost', width: 150 },
        { field: 'col6', headerName: 'Max hr cap', width: 150 },
        { field: 'col7', headerName: 'SLA', width: 150 },
    ];
    return (
        <div>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}

export default WarehouseTable;