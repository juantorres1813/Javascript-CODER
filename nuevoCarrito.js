let Productos = [{
    id: 1,
    nombre: "Cartuchera",
    cantidad: 1,
    precio: 1900,
    img: './assets/multimedia/producto10.jpg'
},
{
    id: 2,
    nombre: "Bolso",
    cantidad: 1,
    precio: 3900,
    img: './assets/multimedia/producto1.jpg'
},
{
    id: 3,
    nombre: "Lunchera",
    cantidad: 1,
    precio: 1200,
    img: './assets/multimedia/producto12.jpeg'
},
{
    id: 4,
    nombre: "Guardatuti",
    cantidad: 1,
    precio: 950,
    img: './assets/multimedia/producto14.jpeg'
},
{
    id: 5,
    nombre: "Portacelular",
    cantidad: 1,
    precio: 350,
    img: './assets/multimedia/producto3.jpg'
},
]

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

//  Carrito JSON

let carrito = []

document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Vaciar carrito

botonVaciar.addEventListener('click', () => {
carrito.length = 0
actualizarCarrito()
})

Productos.forEach((producto) => {
const div = document.createElement('div')
div.classList.add('card')
div.innerHTML = `
<img class="card-img-top mx-auto mt-3" src=${producto.img} alt= "${producto.id}">
<div class="card-body">
    <h3 class="card-title">${producto.nombre}</h3>
    <p class="card-text">Precio:$ ${producto.precio}</p>
    <button type="button" id="agregar${producto.id}" class="btn btn-dark">Agregar</button>
</div>
`
contenedorProductos.appendChild(div)

const boton = document.getElementById(`agregar${producto.id}`)

boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id)
})
})

// Agregar producto a carrito

const agregarAlCarrito = (prodId) => {

const existe = carrito.some(prod => prod.id === prodId)

// Agrego uso de operador AND y ++

if (existe) {
    const prod = carrito.map(prod => { 
        prod.id === prodId && prod.cantidad++
        
    })
} else { 
    const item = Productos.find((prod) => prod.id === prodId) 

    carrito.push(item)
}

actualizarCarrito()
}

// Eliminar producto del carrito

const eliminarDelCarrito = (prodId) => {
const item = carrito.find((prod) => prod.id === prodId)

const indice = carrito.indexOf(item) 

carrito.splice(indice, 1) 

actualizarCarrito() 

}

// Actualizar carrito

const actualizarCarrito = () => {
contenedorCarrito.innerHTML = "" 

carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('card-title')
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>Precio:$${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <button onclick="eliminarDelCarrito(${prod.id})" class="btn btn-danger">Eliminar</button>
    `

    contenedorCarrito.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))

})

precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

// Ejemplos Desestructuracion y Spread para complementario

const objetos = {
    nombre: "Javier",
    ocupacion: "Pediatra",
    hospital: "Dominguez",
    dni: 38617495,
}

const {nombre:nombreO,ocupacion,hospital,dni} = objetos

// console.log(nombreO,ocupacion,hospital,dni)

const objetos2 = {
    ...objetos,
    dni: 37456345,
    localidad: "Deseado",
}

// console.log(objetos2)