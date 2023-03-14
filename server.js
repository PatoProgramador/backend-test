const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3500;

const app = express();

app.use(morgan("dev"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));