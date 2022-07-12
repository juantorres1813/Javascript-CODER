// variables

let usuarioRegistrado = document.getElementById("usuarioLogin");
let mailUsuario = document.getElementById("emailLogin");
let botonLogin = document.querySelector(".botonLogin")
const form = document.getElementById("form")
const parrafo = document.getElementById("warning")

// funcion cargar 
function carga() {
    const usuarioRegistrado = localStorage.getItem("Usuario") || null;
    if (usuarioRegistrado != null) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Como desea ingresar?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Nuevo usuario',
            cancelButtonText: 'Ingresar como ' + usuarioRegistrado,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {} else if (result.dismiss === Swal.DismissReason.cancel) {
                location.href = "./catalogo.html"
            }
        })
    }

}

botonLogin.classList.add("disabled")

//verifico al momento que cambia el input, que los datos ingresados sean validos

mailUsuario.addEventListener('change', habilitarBoton);
usuarioRegistrado.addEventListener('change', habilitarBoton)

// funcion para habilitar el boton cuando todo es correcto
function habilitarBoton() {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if ((regexEmail.test(mailUsuario.value) && usuarioRegistrado.value != "")) {
        botonLogin.classList.remove("disabled")
        botonLogin.addEventListener('click', () => {

            localStorage.setItem("Usuario", usuarioRegistrado.value)
            localStorage.setItem("email", mailUsuario.value)
            location.href = './catalogo.html'
        })
    } else {
        botonLogin.classList.add("disabled")
    }
}

// ejecuto funcion carga
carga()