import express  from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) =>{
    console.log('test');
    next();
});

app.get('/', (req, res)=>{
    res.send('¡Hola, mundo!');
})

app.listen(8080, () => console.log('Listening 8080'))