const express = require('express');

const PORT = 3000;


const server = async () => {
    const app = express();

    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`)
    });
}

try {
    server();
} catch (error) {
    console.log(error);
    process.exit();
}