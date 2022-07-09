document.addEventListener("DOMContentLoaded", () => {
    // traer productos de data.json
    fetchData()
    // parseo json carrito
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

// declaro funciones

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
const contendorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    // console.log(template)
    data.forEach(producto => {
        // console.log(producto)
        template.querySelector('img').setAttribute('src', producto.img)
        template.querySelector('h5').textContent = producto.nombre
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
}

let carrito = {}
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
            Toastify({
                text: "Producto Agregado!",
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: "linear-gradient(90deg, rgba(9,9,121,0.7399159492898721) 43%, rgba(0,212,255,1) 97%)",
                }
            }).showToast();
            pintarCarrito()
        })
    })
}

const items = document.querySelector('#items')

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

// carrito footer
const footer = document.querySelector('#footer-carrito')
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

// Accion de botones (agregar, eliminar)
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
            Toastify({
                text: "Producto Agregado!",
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: "linear-gradient(90deg, rgba(9,9,121,0.7399159492898721) 43%, rgba(0,212,255,1) 97%)",
                }
            }).showToast();
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
            Toastify({
                text: "Producto Eliminado!",
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: "linear-gradient(90deg, rgba(253,29,29,0.8939775739397321) 57%, rgba(224,188,188,1) 96%)",
                }
            }).showToast();
            pintarCarrito()
        })
    })
}

function swalCheckout() {
    const swal = Swal.mixin({
        customClass: {
            confirmButton: 'boton-confirmar',
            cancelButton: 'boton-cancelar'
        },
    })

    swal.fire({
        title: 'Confirmar compra?',
        html: `<form>
        <input type="text" name="nombre" placeholder="Nombre"><br>
        <input type="text" name="email" placeholder="Email"><br>
        </form>`,
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire(
                'Compra realizada!',
                'Gracias por comprar en Mi Equilibrio',
                'success')
        }
    })
}

