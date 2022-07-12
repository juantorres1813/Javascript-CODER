// variables
const contendorProductos = document.querySelector('#contenedor-productos')
const items = document.querySelector('#items')
const footer = document.querySelector('#footer-carrito')
let carrito = {}

// importo modulos de librerias

import {toastifyBienvenida, toastifyAgregar, toastifyEliminar, swalCheckout} from "./libraries.js"

// Cuando cargue todo el html ejecuto estas funciones
document.addEventListener("DOMContentLoaded", () => {
    // traer productos de data.json
    fetchData()
    // parseo json carrito
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

toastifyBienvenida()

// Leer datos desde archivo data.json
const fetchData = async () => {
    try {
        const res = await fetch('data.json')
        const data = await res.json()
        // console.log(data)
        pintarProductos(data)
        detectarBotones(data)
    } catch (error) {
        console.log(error)
    }
}
// traer productos a html
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    // console.log(template)
    for (let i = 0; i < data.length; i++) {
        // console.log(producto)
        let { img, nombre, precio, id } = data[i];
        template.querySelector('img').setAttribute('src', img)
        template.querySelector('h5').textContent = nombre
        template.querySelector('p span').textContent = precio
        template.querySelector('button').dataset.id = id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    }
    contendorProductos.appendChild(fragment)
}

// reconocer los botones
const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = {
                ...producto
            }
            // console.log('carrito', carrito)
            // Agregué Toastify
            toastifyAgregar()
            pintarCarrito()
        })
    })
}
// crear carrito en html
const pintarCarrito = () => {

    //pendiente innerHTML
    items.innerHTML = ''

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

    Object.values(carrito).forEach(producto => {
        // console.log('producto', producto)
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.nombre
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad

        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()
    // guardo LocalStorage del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito))

}

// carrito en footer
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // Sumar cantidad y totales
    const nCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)
    // console.log(nPrecio)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    // boton vaciar carrito
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

    // boton pagar carrito
    const botonPagar = document.querySelector('#pagar-carrito')
    botonPagar.addEventListener('click', () => {
        swalCheckout()
        pintarCarrito()
    })

}

// Accion de botones (agregar, eliminar) producto
const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    // console.log(botonesAgregar)
    // Boton para agregar producto

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id]
            producto.cantidad++
            carrito[btn.dataset.id] = {
                ...producto
            }
            // Agregué Toastify
            toastifyAgregar()
            pintarCarrito()
        })
    })

    // Boton para eliminar producto
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = {
                    ...producto
                }
            }
            toastifyEliminar()
            pintarCarrito()
        })
    })
}

