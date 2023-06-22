const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Client Management",
        description: "Client Management System API - BYUI CSE 341"
    },
    host: "cse341-node-6oti.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);