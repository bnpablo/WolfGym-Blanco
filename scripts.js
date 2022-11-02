const carrito = [];
let contenedor = document.getElementById("misprods");

function mostrarProductos(){
    for(const producto of productos){
        contenedor.innerHTML += `
            <div class="card col-sm-2" style="background-color: #111111;">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body, text-white">
                    <h5 class="text-white, card-title">${producto.id}</h5>
                    <p class="text-white, card-text">${producto.nombre}</p>
                    <p class="text-white,  card-text">$ ${producto.precio}</p>
                    <button id='btn${producto.id}' class="btn btn-danger">Comprar</button>
                </div>
            </div>   
        `;
    }

    productos.forEach((producto)=>{
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    });
}

mostrarProductos();

function agregarAlCarrito(productoAComprar){
    carrito.push(productoAComprar);
    console.table(carrito);
    const objetoAJson = JSON.stringify(productoAComprar);
    localStorage.setItem("objeto", objetoAJson);
    alert("Has agregado producto "+productoAComprar.nombre+" exitosamente");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoAComprar.id}</td>
            <td>${productoAComprar.nombre}</td>
            <td>${productoAComprar.precio}</td>
        </tr>
    `;
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
}




function agregarAlCarro() {
  alert("La remera fue agregada con exito a su carrito");
  carrito.push(remera);
  console.table(carrito);
  const objetoAJson = JSON.stringify(remera);
  localStorage.setItem("objeto", objetoAJson);}

botonRemera.onclick = agregarAlCarro;

botonRemera.onmouseover = () => {
  botonRemera.className = "btn btn-danger";
};

botonRemera.onmouseout = () => {
  botonRemera.className = "btn btn-primary";
};



const objetoAJson = JSON.stringify(remera);
localStorage.setItem("Objeto", objetoAJson);

const getCarritoStorage = localStorage.getItem("objeto");
const jsonObjeto = JSON.parse(getCarritoStorage);
console.log(jsonObjeto)