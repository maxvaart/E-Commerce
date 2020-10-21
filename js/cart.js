//VARIABLES
var arrayComprados = [];
var arrayCantidades =[];
var arrayValoresUnitarios =[];
var arraySubtotales=[];
var arrayPorcentajes=[];
var porcentajeSeleccionado;
var precioTotal = document.getElementById("totalCostText");
var totalProductos = document.getElementById("productCostText");
var gastoPorcentaje = document.getElementById("comissionText");


//BOTONES MODIFICADORES DE CANTIDAD
function modificadorPositivo(valor){
    var aux = valor-1;
    arrayCantidades[aux].value = parseInt(arrayCantidades[aux].value)+1;
    actualizarPrecio(valor);
}

function modificadorNegativo(valor){
    var aux = valor-1;
    if (arrayCantidades[aux].value > 1){
        arrayCantidades[aux].value = parseInt(arrayCantidades[aux].value)-1;
    }
    actualizarPrecio(valor);
}
//ACTUALIZA EL PRECIO TOTAL EN LA PANTALLA
function actualizarPrecio (indiceArray){
    
    var aux = indiceArray - 1;
    if (arrayCantidades.length!=0){
    arraySubtotales[aux].innerHTML = calcular(aux); 
} 
    actualizarTotales()

}
//CALCULA LOS VALORES FINALES - TOTALES
function actualizarTotales(){
    if (arrayComprados.length !=0) {
    totalProductos.innerHTML = calculoProductos();
    gastoPorcentaje.innerHTML = (calculoProductos() * porcentajeSelec()) / 100;
    precioTotal.innerHTML = parseFloat(totalProductos.innerHTML) + parseFloat(gastoPorcentaje.innerHTML);} 
    else{
        totalProductos.innerHTML=0;
        gastoPorcentaje.innerHTML=0;
        precioTotal.innerHTML=0;
    }
}
//DA EL TOTAL GASTADO
function calculoProductos(){
    var gastoProductos = 0;
    for(i=0;i<arraySubtotales.length;i++){
        gastoProductos += parseFloat(arraySubtotales[i].innerHTML);
    }
    return gastoProductos
}
//CALCULA EL PRECIO SEGUN LA CANTIDAD DE ELEMENTOS COMPRADOS
function calcular(indiceArray){
    if (arrayCantidades.length!=0){
    return arrayCantidades[indiceArray].value * arrayValoresUnitarios[indiceArray]
}
}
//VERIFICA LOS CAMPOS Y GENERA EL ALERT
function terminarCompra(){
    var direccion = document.getElementById("direccion").value;
    var esquina = document.getElementById("esquina").value;
    var numero = document.getElementById("numero").value;
    if (arrayComprados.length != 0){
    if (direccion != "" && esquina !="" && numero !="") {
        if(document.getElementsByTagName("form")[0].checkValidity() ||  document.getElementsByTagName("form")[1].checkValidity()){
        swal("Compra Realizada con exito", "Disfruta tus nuevos productos!", "success")
        setTimeout( function() { window.location = "cover.html" }, 3300 );
    } else{
        swal("Error en forma de pago", "No completaste un metodo de pago", "error")
    }
    }
    else {
        swal("Error en direccion de entrega", "No completaste la direccion de entrega", "error")
    }
} else {
    swal("El carrito esta vacio", "No tienes nada para comprar", "error")
}}
//FUNCION QUE VERIFICA EL PORCENTAJE SELECCIONADO
function porcentaje(){
    for(i=1;i<4;i++){
        arrayPorcentajes.push(document.getElementById("envio"+i));
    }
}
//DA EL PORCENTAJE SELECCIONADO
function porcentajeSelec(){
    for(i=0;i<arrayPorcentajes.length;i++){
        if(arrayPorcentajes[i].checked)
        {
            porcentajeSeleccionado = arrayPorcentajes[i].value;
        }
    }
    return parseFloat(porcentajeSeleccionado)
}



//CAMBIA LA MONEDA PESOS A DOLARES
function cambiarMoneda(moneda,cantidad){
    var resultado = cantidad;
    if(moneda=="UYU"){
        resultado = cantidad / 40;
    }
    return resultado;
}

//ALMACENA Y ACTUALIZA EL ARRAY CON LOS VALORES NUEVOS
function actualizarArray(array){
    for(let i = 1; i <= array.length; i++){
        arrayCantidades.push(document.getElementById("cantidad"+i));
        arrayValoresUnitarios.push(parseFloat(cambiarMoneda(document.getElementById("moneda"+i).innerHTML, document.getElementById("unitario"+i).innerHTML)));
        arraySubtotales.push(document.getElementById("subtotal"+i)); 
    }
    porcentaje();
}
//ALMACENO EN LOCAL STORAGE LA CANTIDAD DE PRODUCTOS EN EL CARRITO
function almacenoCarrito(){
    if(arrayComprados.length!= 0){
        localStorage.setItem("productosEnCarro" , arrayComprados.length)
    }
}
//FUNCION QUE ELIMINA UN ELEMENTO DEL CARRITO
function eliminarElemento(indice){
    var aux = indice-1
    arrayComprados.splice(aux,1);
    showObjetcsList(arrayComprados);
    actualizarPrecio (indice);
}
//PRESENTO EN HTML LOS PRODUCTOS COMPRADOS
function showObjetcsList(array){
    arrayValoresUnitarios = [];
    arrayCantidades =[];
    arraySubtotales =[];
    let htmlContentToAppend = "";
    if (array.length==0){
        htmlContentToAppend += `
        <div class="row">
        <div class="col-12">
        <br>
        <p class="lead"><em>Tu carrito no tiene productos</em></p>
        <hr>
        </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    } else{
    
   
    for(let i = 1; i <= array.length; i++){
        let objeto = array[i-1];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row" style="align-items:center">
                <div class="col-2">
                    <img src="` + objeto.src + `" class="img-thumbnail">
                </div>
                <div class="col-3">
                    <p>`+ objeto.name +`</p>
                </div>
                <div class="col-2">
                    <span><button class="btn" style="color: #c80e60;" onclick=modificadorPositivo(`+i+`)><strong style="font-size:30px" >+</strong></button> </span>
                    <input id= "cantidad`+i+`"class="input-md cant" type="number" size="2" min="1" value="` +objeto.count+`" style="text-align:center" onchange=actualizarPrecio(`+i+`)> 
                    <span><button class="btn" style="color: #c80e60;"onclick=modificadorNegativo(`+i+`)><strong style="font-size:30px">-</strong></button></span>
                </div>
                <div class="col-2">
                <p style="font-size:20px;"><strong><span id="moneda`+i+`">` + objeto.currency+`</span> <span id="unitario`+i+`">` +objeto.unitCost + `</span> </strong></p>
                </div>
                <div class="col-2">
                <p style="font-size:20px;"><strong>USD <span id="subtotal`+i+`">` + cambiarMoneda(objeto.currency, objeto.unitCost)+ `</span></strong></p>
                </div>
                <div class="col-1">
                <button class="btn" style="background-color: #c80e60" onclick="eliminarElemento(`+i+`)"><i style="color:white"class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
    }
    actualizarArray(array);
        for (i=1;i<=array.length;i++){
        actualizarPrecio(i);
    }
    
}
    

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONCart("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
    arrayComprados = resultObj.data.articles;
    showObjetcsList(arrayComprados);
    almacenoCarrito();
    actualizarNombre();
    })});
