function script(planElegido) {
  // Simulador de presupuesto de planes.

  const planBasico = 2000;
  const planLibre = 3000;
  const planFull = 4500;
  const moneda = " $";

  let stringMenuPlanes =
    "Ingrese: 1= Plan Basico / 2= Plan Libre / 3= Plan Full / 4=Cotizar Plan Familiar / 5=Cotizar nuevo Plan // Presione s para salir.";
  //Implemento varibles para guardar los string asi achicar y no repetir tanto codigo

  let plan = planElegido.toString();

  let stringAlertaPlanesInicio = "Ha elegido el Plan ";
  let stringAlertaPlanesFin = " con un precio de: ";


  let stringPlanBonificado = "El precio de tu Plan bonificado es de: ";

  let stringMenuPlanFamiliar =
    "Ingrese: 1= Plan Basico / 2= Plan Libre / 3= Plan Full // Presione s para salir.";

  let stringAlertaPlanFamiliar =
    "Vamos a cotizar el Plan para tu grupo familiar. Ingresa los Planes y un asesor se pondra en contacto con vos.";

  let stringAlertaNuevoPlan =
    "Vamos a cotizar un Plan que se adepte mejor a vos!";

  let stringAlertDefault = "No elegiste ningún número de Plan válido";

  //Aplico ciclo while para funcionalidad de recotizacion de planes.
  //Aplico switch para poder manejar todas las condiciones sin tener que abusar de los "if".

  while (plan != "s") {
    switch (plan) {
      case "1":
        precioPlan = planBasico;
        alert(stringAlertaPlanesInicio + plan + stringAlertaPlanesFin + precioPlan + moneda);
        simuladorPlanes(plan, precioPlan);
        plan = prompt(stringMenuPlanes);

        break;

      case "2":
        precioPlan = planLibre;
        alert(stringAlertaPlanesInicio + plan + stringAlertaPlanesFin + precioPlan + moneda);
        simuladorPlanes(plan, precioPlan);
        plan = prompt(stringMenuPlanes);

        break;

      case "3":
        precioPlan = planFull;
        alert(stringAlertaPlanesInicio + plan + stringAlertaPlanesFin + precioPlan + moneda);
        simuladorPlanes(plan, precioPlan);
        plan = prompt(stringMenuPlanes);

        break;

      case "4":
        alert(stringAlertaPlanFamiliar);
        plan = prompt(stringMenuPlanFamiliar);
        while (plan != "s") {
          console.log(plan);
          plan = prompt(stringMenuPlanFamiliar);
          //Enviar datos de planes en consola a un adm. para que se ponga en contacto con el cliente.
        }
        break;

      case "5":
        alert(stringAlertaNuevoPlan);
        plan = prompt(stringMenuPlanes);

        break;

      default:
        alert(stringAlertDefault);
        plan = prompt(stringMenuPlanes);
    }
  }

  function simuladorPlanes(plan, precioPlan) {
    descuento = (precioPlan * 15) / 100;
    planConDescuento = precioPlan - descuento;
    alert(stringPlanBonificado + planConDescuento + moneda);
  }
}


function comprarRemera() {

  const precioRemera = 1000;

  const carrito = [];
  let stockRemeras = 2;
  


class Remera {
  constructor(modelo, precio, talle, color) {
    this.modelo = prompt("ingrese modelo 1, 2 o 3");
    this.precio = precioRemera;
    this.talle = prompt("ingrese talle S, M o L");
    this.color = prompt("ingrese color Blanco o Negro");
    this.vendido = false;
  }

  sumarIva() {
    this.precio = this.precio * 1.21;
  }

  vender(){
      this.vendido = true;

  }
}

const remera1 = new Remera();
alert("Usted Eligio Remera modelo: " + remera1.modelo + " talle: " + remera1.talle + " color: " + remera1.color);

let confirmacionCompra =  prompt("Confirmar compra ? (1 para confirmar o 2 para agregar mas remeras)")
if(confirmacionCompra == 1){
  remera1.vender(); 
  remera1.sumarIva(); 
  console.log(remera1)
  alert("Precio total + iva: " + remera1.precio);

  return alert("Compra Finalizada");
} else
console.log(remera1);

carrito.push(remera1);
console.log(carrito);

for (let i = 2; i <= stockRemeras; i++ ){
  carrito.push(new Remera());

  if(i == stockRemeras){
    for (const remera of carrito){
    remera.sumarIva();
    remera.vender();   
    alert("Usted a agregado " + "Remera modelo: " + remera.modelo + ", precio: " + remera.precio + " $ con IVA incluido");

    }
    console.log(carrito);
  break;
  }

}
}


