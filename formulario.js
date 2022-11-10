let enviarFormulario = document.getElementById("enviarFormulario");
let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let telefono = document.getElementById("telefono");
let mensaje = document.getElementById("mensaje");

/*
Separé diferentes validaciones en diferentes funciones, las cuales voy llamando segun lo se va requiriendo.
Los if de la funcion flecha primaria los utilizo para cortar con la lista de validaciones si una ya no cumple con lo pedido
Por ultimo si pasan todas las validaciones se guarda el formualrio en el storage y se muestra un mensaje de que se envio el mismo.
Lo como se me fue ocurriendo, casi no mire ninguna ayuda, por lo tanto estoy seguro que se puede hacer mucho mejor y en menos lineas
pero quise intentarlo, me sirvio para aprender bastante.
Entiendo que capaz no es tan facil de leer, voy a dejar comentarios mas abajo para que sea mas sencillo diferenciar cada funcion.
*/

enviarFormulario.onclick = () => {
  validarNullAndEmpty();
  if (validarNullAndEmpty()) {
    return;
  } else
  if (comprobarNum(nombre.value)) {
    return;
  } else  
  if (!email.value.includes("@")) {
    alertEmailNoArroba();
    return;
  }

  let objetoFormularioValidado = new Object();
  objetoFormularioValidado.nombre = nombre.value;
  objetoFormularioValidado.email = email.value;
  objetoFormularioValidado.mensaje = mensaje.value;

  const objetoAJson = JSON.stringify(objetoFormularioValidado);
  localStorage.setItem("formularioValidado", objetoAJson);

  Toastify({
    text: "Consulta enviada correctamente",
    duration: 2000,
    position: "center",
    gravity: "bottom",
    style: {
      background: "#d63138",
    },
    className: "btn-danger",
  }).showToast();
};

//Funcion que valida que cualquier campo no sea nulo ni este vacio
function validarNullAndEmpty() {
  if (nombre.value === null || nombre.value === "") {
    alertDatos("nombre");
    return true;
  }
  if (email.value === null || email.value === "") {
    alertDatos("email");
    return true;
  }
  if (mensaje.value === null || mensaje.value === "") {
    alertDatos("mensaje");
    return true;
  }
}

//Funcion que valida que en el nombre no haya numeros
function comprobarNum(palabra){
    expRegNumeros = /[0-9]/;
    if ((expRegNumeros.test(palabra))) {
        alertNombreNoInt();
        return true;
      }
    }





/* FUNCIONES ESPECIFICAS PARA ALERTAS PERSONALIZADOS */


//Funcion para alerta cuando hay un campo nulo o vacio.

function alertDatos(mensaje) {
  Swal.fire({
    title: "Ingresa tu " + mensaje,
    showConfirmButton: false,
    timer: 2000,
    background: "#111111",
    color: "#edf2f4",
    icon: "warning",
    iconColor: "#d63138",
  });
}

//Funcion para alerta cuando el nombre contiene numeros

function alertNombreNoInt() {
  Swal.fire({
    title: "El nombre no puede contener numeros",
    showConfirmButton: false,
    timer: 2000,
    background: "#111111",
    color: "#edf2f4",
    icon: "warning",
    iconColor: "#d63138",
  });
}

//Funcion para alerta cuando el mail no es valido

function alertEmailNoArroba() {
  Swal.fire({
    title: "Registrá un email valido",
    showConfirmButton: false,
    timer: 2000,
    background: "#111111",
    color: "#edf2f4",
    icon: "warning",
    iconColor: "#d63138",
  });
}



