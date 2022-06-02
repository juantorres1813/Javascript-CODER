document.addEventListener('DOMContentLoaded', function () {
    //declaro variables
    let total = 0
    let accion
    let Loop = true
    let objeto1 = {
        nombre: "Cartuchera",
        precio: 2000
    }

    class ProductoClass {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = parseFloat(precio);
        }
    }

    const productos = [];
    productos.push(new ProductoClass("Bolso", 3500));
    productos.push(new ProductoClass("Lunchera", 1200));
    productos.push(new ProductoClass("Guardatuti", 1000));
    productos.unshift(objeto1)
    productos.push({
        nombre: "Portacelular",
        precio: 350
    })

    // ejemplo de filtro y busqueda para preentrega
    let encontrado = productos.find((el) => el.nombre === "Bolso")
    console.log(encontrado)
    let baratos = productos.filter((x) => x.precio < 500)
    console.log(baratos)
    console.table(productos)

    //declaracion funciones

    function añadirCarrito(añade) {
        if (añade > 0) {
            total += añade
            alert(`Añadiste ${añade}, el total de tu carrito es de ${total}`)
        } else {
            alert('No puedes añadir precios menores a 0 al carrito')
        }
    }

    function RemoverCarrito(remove) {
        if (remove > 0) {
            total -= remove
            alert(`Quitaste ${remove}, el total de tu carrito es de ${total}`)
        } else {
            alert('No puedes añadir precios menores a 0 al carrito')
        }
    }

    for (let i = 1; i <= 3; i++) {
        alert('Bienvenidos a Mi Equilibrio')
        while (Loop) {
            accion = prompt('Escriba "Agregar" para agregar productos al carrito,\n"Quitar" para remover productos del carrito\n"Pagar" para comprar los productos agregados al carito o\n"Salir" para terminar sus operaciones')
            if (accion == 'Agregar') {
                añadir = prompt('Escriba "Cartuchera" para añadir cartuchera al carrito,(2000$)\n"Bolso" para añadir bolso al carrito(3500$)\n"Lunchera" para añadir lunchera al carrito(1200$)\n"Guardatuti" para añadir Guarda Tuti al carrito(1000$)\n"Portacelular" para añadir Porta Celular al carrito(350$)\n"Volver" para volver al menú')
                if (añadir == productos[0].nombre) {
                    let añade = productos[0].precio
                    añadirCarrito(añade)
                } else if (añadir == productos[1].nombre) {
                    let añade = productos[1].precio
                    añadirCarrito(añade)
                } else if (añadir == productos[2].nombre) {
                    let añade = productos[2].precio
                    añadirCarrito(añade)
                } else if (añadir == productos[3].nombre) {
                    let añade = productos[3].precio
                    añadirCarrito(añade)
                } else if (añadir == productos[4].nombre) {
                    let añade = productos[4].precio
                    añadirCarrito(añade)
                } else if (añadir == 'Volver') {
                    continue
                }
            } else if (accion == 'Quitar') {
                remueve = prompt('Escriba "Cartuchera" para remover cartuchera del carrito,(2000$)\n"Bolso" para remover bolso del carrito(3500$)\n"Lunchera" para remover lunchera del carrito(1200$)\n"Guardatuti" para remover Guarda Tuti del carrito(1000$)\n"Portacelular" para remover Porta Celular del carrito(350$)\n"Volver" para volver al menú')
                if (remueve == productos[0].nombre) {
                    let remove = productos[0].precio
                    RemoverCarrito(remove)
                } else if (remueve == productos[1].nombre) {
                    let remove = productos[1].precio
                    RemoverCarrito(remove)
                } else if (remueve == productos[2].nombre) {
                    let remove = productos[2].precio
                    RemoverCarrito(remove)
                } else if (remueve == productos[3].nombre) {
                    let remove = productos[3].precio
                    RemoverCarrito(remove)
                } else if (remueve == productos[4].nombre) {
                    let remove = productos[4].precio
                    RemoverCarrito(remove)
                } else if (remueve == 'Volver') {
                    continue
                }
            } else if (accion == 'Pagar') {
                alert('Tu precio total a pagar es de: ' + total)
            } else if (accion == 'Salir') {
                alert('Gracias por usar Mi equilibrio')
                Loop = false
            } else {
                alert('Selecciona una orden válida')
            }
        }
        break
    }
}, false);