const carrito = [];
let container = document.getElementById("items");

//Tomé como esquelo el carrito hecho en el after ya que me resulto muy util

function mostrarProductos() {
  for (const producto of productos) {
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
  productos.forEach((producto) => {
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
  /* implemento guardado en el storage de los objetos del carrito. */
  const objetoAJson = JSON.stringify(carrito);
  localStorage.setItem("objeto", objetoAJson);
  /* Implemento alerta con sweetAlert */
  alertProdAgregado();
  /* Armo tabla para mostrar los productos que vaya agregando */
  document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${prodStock.id}</td>
            <td>${prodStock.nombre}</td>
            <td>${prodStock.precio}</td>
        </tr>
    `;
  let totalCarrito = carrito.reduce(
    (acumulador, prod) => acumulador + prod.precio,
    0
  );
  document.getElementById("total").innerText =
    "Total a pagar $: " + totalCarrito;
}

function alertProdAgregado() {
  Swal.fire({
    title: "Producto agregado al Carrito!",
    showConfirmButton: false,
    timer: 1500,
    background: "#111111",
    color: "#d63138",
  });
}

function agregarAlCarro() {
  carrito.push(remera);
  console.table(carrito);
  const objetoAJson = JSON.stringify(remera);
  localStorage.setItem("objeto", objetoAJson);
}

botonRemera.onclick = agregarAlCarro;

botonRemera.onmouseover = () => {
  botonRemera.className = "btn btn-danger";
};

botonRemera.onmouseout = () => {
  botonRemera.className = "btn btn-primary";
};
