const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const warehouses = [];

// POST request, jossa lähetetty data tallennetaan warehouse objektiin
app.post('/', jsonParser, (req, res) => {
    try {
        console.log('handling POST request');
        //id, name, latitde, longitude, processing_cost, max_hr_cap, sla
        /*
        const newWarehouse = {
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        }
        */
        const newWarehouse = req.body;
        console.log(newWarehouse);
        console.log(typeof(newWarehouse));
        warehouses.push(newWarehouse);
        console.log(warehouses.length);

        res.json({ message: 'Added warehouse:', newWarehouse });
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