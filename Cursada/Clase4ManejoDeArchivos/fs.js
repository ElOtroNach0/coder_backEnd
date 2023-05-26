const fs = require('fs');
const contenido = fs.readFileSync('./hola.txt', 'utf8');
console.log(contenido);


fs.writeFileSync('./adios.txt', 'Adios coders');