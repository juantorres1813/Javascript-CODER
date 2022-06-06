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

let carrito = []

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


const agregarAlCarrito = (prodId) => {

    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map(prod => { 
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else { 
        const item = Productos.find((prod) => prod.id === prodId) 

        carrito.push(item)
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 

}

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

    })

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}



