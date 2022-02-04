const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// cpf - string
// name - stringid - 
// id - uuid
// statement - []

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const constumerAlreadyExists = customers.some(
        (costumer) => costumer.cpf === cpf
    );

    if(constumerAlreadyExists) {
        return response.status(400).json({error: "Costumer already exists!"});
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send("Account created");
})

app.get("/statement/:cpf", (request, response) => {
    const { cpf } = request.params;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({error: "Customer not found"});
    }

    return response.json(customer.statement);
})

app.listen(3000)