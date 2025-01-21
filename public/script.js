const API_URL = '/pets';

const form = document.getElementById('add-pet-form');
const petList = document.getElementById('pet-list');

//fetch & display
async function fetchPets() {
    const response = await fetch(API_URL);
    const pets = await response.json();

    petList.innerHTML = pets.map(pet =>`
        <li>
            ${pet.name}(${pet.species},${pet.age} years old)
            <button onclick="deletePet(${pet.id})">Remove</button>
        </li>
    `).join('');
}

//add new pet
form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const name = document.getElementById('name').value;
    const species = document.getElementById('species').value;
    const age = parseInt(document.getElementById('age').value,10);

    await fetch(API_URL, {
       method: 'POST',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({name,species,age}) 
    });

    form.reset();
fetchPets();
});

async function deletePet(id){
    await fetch (`${API_URL}/${id}`, {method: 'DELETE'});
    fetchPets();
}

fetchPets();