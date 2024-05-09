const express = require("express");
const ConnectDB = require('./Database/Db-Configorition')
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(express.static('./uploads'))

app.use('/', require("./Routes/routes"))

ConnectDB()

app.listen(3000);