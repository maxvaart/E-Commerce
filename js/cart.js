//VARIABLES
var arrayComprados = [];
var arrayCantidades =[];
var arrayValoresUnitarios =[];
var arraySubtotales=[];


//BOTONES MODIFICADORES
function modificadorPositivo(valor){
    var aux = valor-1;
    arrayCantidades[aux].value = parseInt(arrayCantidades[aux].value)+1;
    actualizarPrecio (valor);
}

function modificadorNegativo(valor){
    var aux = valor-1;
    if (arrayCantidades[aux].value !=0){
        arrayCantidades[aux].value = parseInt(arrayCantidades[aux].value)-1;
    }
    actualizarPrecio (valor);
}
//CAMBIA LA MONEDA PESOS A DOLARES
function cambiarMoneda(moneda,cantidad){
    var resultado = cantidad;
    if(moneda=="UYU"){
        resultado = cantidad / 40;
    }
    return resultado;
}
//CALCULA EL PRECIO SEGUN LA CANTIDAD DE ELEMENTOS COMPRADOS
function calcular(indiceArray){
    return arrayCantidades[indiceArray].value * arrayValoresUnitarios[indiceArray]
}
//ACTUALIZA EL PRECIO TOTAL EN LA PANTALLA
function actualizarPrecio (indiceArray){
    var aux = indiceArray - 1;
    arraySubtotales[aux].innerHTML = calcular(aux); 
}
//ALMACENA Y ACTUALIZA EL ARRAY CON LOS VALORES NUEVOS
function actualizarArray(array){
    for(let i = 1; i <= array.length; i++){
        arrayCantidades.push(document.getElementById("cantidad"+i));
        arrayValoresUnitarios.push(parseFloat(cambiarMoneda(document.getElementById("moneda"+i).innerHTML, document.getElementById("unitario"+i).innerHTML)));
        arraySubtotales.push(document.getElementById("subtotal"+i)); 
    }
}
//PRESENTO EN HTML LOS PRODUCTOS COMPRADOS
function showObjetcsList(array){
    
    let htmlContentToAppend = "";
    for(let i = 1; i <= array.length; i++){
        let objeto = array[i-1];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row" style="display:flex; align-items:center">
                <div class="col-2">
                    <img src="` + objeto.src + `" class="img-thumbnail">
                </div>
                <div class="col-3">
                    <p>`+ objeto.name +`</p>
                </div>
                <div class="col-2">
                    <span><button class="btn" style="color: #c80e60;" onclick=modificadorPositivo(`+i+`)><strong style="font-size:30px" >+</strong></button> </span>
                    <input id= "cantidad`+i+`"class="input-md" type="number" size="2" min="1" value="` +objeto.count+`" style="text-align:center" onchange=actualizarPrecio(`+i+`)> 
                    <span><button class="btn" style="color: #c80e60;"onclick=modificadorNegativo(`+i+`)><strong style="font-size:30px">-</strong></button></span>
                </div>
                <div class="col-2">
                <p style="font-size:20px;"><strong><span id="moneda`+i+`">` + objeto.currency+`</span> <span id="unitario`+i+`">` +objeto.unitCost + `</span> </strong></p>
                </div>
                <div class="col-2">
                <p style="font-size:20px;"><strong>USD <span id="subtotal`+i+`">` + cambiarMoneda(objeto.currency, objeto.unitCost)+ `</span></strong></p>
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONCart("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
    arrayComprados = resultObj.data.articles;
    showObjetcsList(arrayComprados);
    })
});

