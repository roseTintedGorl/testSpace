const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

let pets = [];
app.post('/pets', (req,res) => {
    const {name, species, age} = req.body;

    if(!name||!species||typeof age !=='number'){
        return res.status(400).json({error: "Invalid data supplied"})
    }

    const newPet = {id: pets.length +1, name, species, age};
    pets.push(newPet);

    res.status(201).json(newPet);
});

app.delete('/pets/:id', (req,res) => {
    const{id}= req.params;
    const petIndex = pets.findIndex((pet) =>pet.id === parseInt(id,10));

    if(petIndex === -1){
        return res.status(404).json({error:'Pet not found.'});
    }

    const removedPet = pets.splice(petIndex, 1)
    res.json(removedPet[0]);
});

//list all pets
app.get('/pets', (req,res) => {
    res.json(pets);
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:$PORT}`);
});
