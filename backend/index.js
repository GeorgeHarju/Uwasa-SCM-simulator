const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const warehouses = [];

// POST request, jossa lähetetty data tallennetaan newWarehouse objektiin
app.post('/', jsonParser, (req, res) => {
    try {
        console.log('handling POST request');
        const newWarehouse = req.body;
        console.log(newWarehouse);
        console.log(typeof(newWarehouse));
        // lisätään newWarehouse warehouses-taulukkoon
        warehouses.push(newWarehouse);
        console.log(warehouses.length);

        res.json({ message: 'Added warehouse:', newWarehouse });
    }
    catch (error) {
        console.error(error);
        res.json({'Error:': error});
    }
})

// GET request, palautetaan warehouses-taulukko responsena
app.get('/', (req, res) => {
    try {
        console.log('handling GET request');
        res.json({warehouses});
    }
    catch (error) {
        console.error(error);
        res.json({'Error:': error});
    }
})

// DELETE request, poistaa annettua id:tä vastaavan warehousen taulukosta
app.delete('/', jsonParser, (req, res) => {
    try {
        console.log('handling DELETE request');
        const deleteId = req.body.id;
        console.log('deleteId:', deleteId);
        var jsonResponse = {message: 'Could not delete warehouse'};
        warehouses.forEach((warehouse) => {
            if (warehouse.id === deleteId) {
                console.log(warehouses.length);
                // poistetaan taulukosta requestia vastaava warehouse
                warehouses.splice(warehouses.indexOf(warehouse), 1);
                console.log(warehouses.length);
                //res.json({ message: 'Deleted warehouse', warehouse });
                jsonResponse = {message: 'Deleted warehouse', warehouse};
            }
        })
        res.json(jsonResponse);
    }
    catch (error) {
        console.error(error);
        res.json({'Error:': error});
    }
})

const port = 3001;
app.listen(port, () => {
    console.log('Server is now running');
})