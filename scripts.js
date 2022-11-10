let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let container = document.getElementById("items");
let btnConfirmar = document.getElementById("btnConfirmarCompra");
let productosJSON=[];

//Tomé como esquelo el carrito hecho en el after ya que me resulto muy claro
//Implemento funcion para mensaje de bienvenida al ingresar a la tienda
function bievenida(){
  Swal.fire({ title: "Bienvenido/a a la tienda Wolf Gym !", 
background: '#111111',
color: '#edf2f4',
confirmButtonColor: '#d63138',
showConfirmButton: false,
timer: 1500,
});
}

bievenida();


//validacion que chequea si hay datos en el carrito (storage)
if (carrito.legth != 0) {
  getTable();
}

function getTable() {
  for (const producto of carrito) {
    document.getElementById("primaryTable").innerHTML += `
    <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td> <button id="btnConfirmarCompra" class="btn btn-danger" onclick="eliminarProducto(event)">X</button> </td>
    </tr>
`;
  }

  totalCarrito = carrito.reduce(
    (acumulador, prod) => acumulador + prod.precio,
    0
  );
  let carritoTotal = document.getElementById("total");
  carritoTotal.innerHTML = "Total a pagar $: " + totalCarrito;
}


// Armo funcion para obtener los datos del .json donde tengo la base de datos con los productos. 
// Los cuales voy a necesitar para poder mostrarlos seguidamente.
async function obtenerDatosJson(){
    const archivoJson= "./productos.json";
    const resp = await fetch(archivoJson)
    const data = await resp.json();
    productosJSON = data;
    mostrarProductos();
}

obtenerDatosJson();

function mostrarProductos() {
  for (const producto of productosJSON) {
    container.innerHTML += `
            <div class="card col-sm-2" style="background-color: #111111;">
                <img src=${producto.foto} class="card-img-top img-fluid " alt="Remeras">
                <div class="card-body, text-white">
                    <h5 class="text-white, card-title">${producto.id}</h5>
                    <p class="text-white, card-text">${producto.nombre}</p>
                    <p class="text-white,  card-text">$ ${producto.precio}</p>
                    <button id='btn${producto.id}' class="btn btn-danger">Comprar</button>
                </div>
            </div>   
        `;
  }
  //Armo un bucle forEach para definir evento para los 5 botones sin tener que repetir codigo
  productosJSON.forEach((producto) => {
    document
      .getElementById(`btn${producto.id}`)
      .addEventListener("click", function () {
        agregarAlCarrito(producto);
      });
  });
}

// Llamo a la funcion para mostrar los productos
mostrarProductos();
//Armo funcion para agregar al carrito los productos que previamente renderice
function agregarAlCarrito(prodStock) {
  /* pusheo productos al carrito */
  carrito.push(prodStock);
  console.table(carrito);
  /* Implemento alerta (sweet alert) al agregar un producto (la adapte para el diseño y concondancia con mi pagina) */
  Swal.fire({
    title: prodStock.nombre,
    text: "Agregado al Carrito!",
    showConfirmButton: false,
    timer: 1500,
    background: "#111111",
    color: "#edf2f4",
    imageUrl: prodStock.foto,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
  /* Armo tabla para mostrar los productos que vaya agregando */
  document.getElementById("primaryTable").innerHTML += `
        <tr>
            <td>${prodStock.id}</td>
            <td>${prodStock.nombre}</td>
            <td>${prodStock.precio}</td>
            <td> <button id="btnConfirmarCompra" class="btn btn-danger" onclick="eliminarProducto(event)">X</button> </td>

        </tr>
    `;

      /* implemento guardado en el storage de los objetos del carrito. */
  const objetoAJson = JSON.stringify(carrito);
  localStorage.setItem("carrito", objetoAJson);

  //calculo total a pagar recorriendo el array con los productos
  let totalCarrito = carrito.reduce(
    (acumulador, prod) => acumulador + prod.precio,
    0
  );
  document.getElementById("total").innerText =
    "Total a pagar $: " + totalCarrito;
}


function eliminarProducto(ev){
  console.log(ev);
  let fila = ev.target.parentElement.parentElement;
  let id = fila.children[0].innerText;
  let indice = carrito.findIndex(producto => producto.id == id);
  carrito.splice(indice,1);
  fila.remove();
  //recacalculo total
  let totalAcumulado = carrito.reduce((acumulador, prod) => acumulador + prod.precio,0);
  let carritoTotal = document.getElementById("total");
  carritoTotal.innerHTML = "Total a pagar $: " + totalAcumulado;
  const objetoAJson = JSON.stringify(carrito);
  localStorage.setItem("carrito", objetoAJson);  

}

//Agrego tostify para el boton de confirmacion de compra
btnConfirmar.onclick = () => {
  //borro array de productos agregados y tabla completa
  carrito = [];
  document.getElementById("primaryTable").innerHTML = "";
  document.getElementById("total").innerText = "";
  //Borro storage
  const objetoAJson = JSON.stringify(carrito);
  localStorage.setItem("carrito", objetoAJson);
  //Implemento tostify
  Toastify({
    text: "Compra en proceso!",
    duration: 2000,
    position: "center",
    gravity: "bottom",
    style: {
      background: "#d63138",
    },
    className: "btn-danger",
  }).showToast();
};