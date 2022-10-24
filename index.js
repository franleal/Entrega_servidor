const express = require("express");
const app = express();
const PORT = 8082;

const fs = require('fs');
const Contenedor = require('./contenedor')
const productos = new Contenedor("./productos.json");

const cargarProductos = async ()=>{

    await productos.save({title: 'El señor de lo anillos', price: 5000, thumbnail: 'https://i.ibb.co/ZKgRL18/20061512.jpg'})
    await productos.save({title: 'Demon Slayer', price: 4500, thumbnail: 'https://i.ibb.co/sFGWN2k/thumb-1920-1007550.jpg'})
    await productos.save({title: 'Naruto', price: 3200, thumbnail: 'https://i.ibb.co/tM7066P/378271.jpg'})
} 

cargarProductos()

//Condexion con el servidor---------------------------------------
const server = app.listen(PORT,() =>{
    console.log(`servidor http escuchado en el puerto ${server.address().port}`)
})
server.on("error",error => console.log(`Error en el servidor ${error}`))


app.get('/',(req,res)=>{

    res.send(`<h1 style="text-align: center">Entrega servidores!! esquere qeueueu</h1>`);
})




app.get('/productos',(req,res)=>{

    const todos = async () =>{
        const getAll = await productos.getAll();
        let card = ``;
        getAll.map(
            item => (card += `<div style="background-color: darkgray ; color: white; margin:auto; height: auto; width: 400px"><h2>Nombre: ${item.title}</h2><h3>Precio: ${item.price}</h3><img style="margin-bottom: 20px" height="250px" src="${item.thumbnail}"></div>`)
        );

        res.send(`<section>${card}</section>`);
    };

    todos();
});

app.get('/random',(req,res)=>{

    const random = async ()=>{
        const getAll = await productos.getAll();
        let numero = Math.floor(Math.random() * getAll.length);

        const productoRandom = await productos.getById(numero + 1);

        let card = `<div style="background-color: black; color: white; text-align: center; height: auto; min-width: 400px"><h2>Nombre: ${productoRandom.title}</h2> <h3>Precio: ${productoRandom.price}</h3> <img style="margin-bottom: 10px"height="250px" src="${productoRandom.thumbnail}"></div>`;

        res.send(`<section>${card}</section>`);
    }

    random();
});
