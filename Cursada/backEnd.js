const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]


let nuevoArray = [];
let suma = 0;

objetos.forEach(objeto => {
    const keys = Object.keys(objeto);
    keys.forEach(key => {
        if (!nuevoArray.includes(key)) {
            nuevoArray.push(key);
        }
    })

    suma += Object.values(objeto).reduce((a, b) => a + b, 0);
})

console.log({ nuevoArray });
console.log({ suma });