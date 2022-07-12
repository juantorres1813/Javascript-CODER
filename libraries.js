export function toastifyBienvenida() {
    Toastify({
        text: "Bienvenido " + localStorage.getItem("Usuario"),
        className: "info",
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

export function toastifyAgregar() {
    Toastify({
        text: "Producto Agregado!",
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "linear-gradient(90deg, rgba(9,9,121,0.7399159492898721) 43%, rgba(0,212,255,1) 97%)",
        }
    }).showToast();
}

export function toastifyEliminar() {
    Toastify({
        text: "Producto Eliminado!",
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "linear-gradient(90deg, rgba(253,29,29,0.8939775739397321) 57%, rgba(224,188,188,1) 96%)",
        }
    }).showToast();
}

export function swalCheckout() {
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
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire(
                'Compra realizada!',
                'Gracias por comprar en Mi Equilibrio',
                'success')
        }
    })
}
