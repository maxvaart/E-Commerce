
var arrayProductosConst = [];
var arrayProductos = [];
var arrayFiltrado = [];

//FILTRA POR PRECIO Y MUESTRA EN PANTALLA
function filtrar(){
    var productosFiltrados = [];
    var minimo = parseInt(document.getElementById("rangeFilterCountMin").value);
    var maximo = parseInt(document.getElementById("rangeFilterCountMax").value);
    for (i=0; i<arrayProductos.length;i++){
        if(arrayProductos[i].cost>minimo && arrayProductos[i].cost<maximo)
        {productosFiltrados.push(arrayProductos[i]);}
    };
    if (productosFiltrados.length == 0)
    {
        document.getElementById("conjuntoTarjetas").innerHTML = `
            <div class="row">
                <div class="col-12 text-muted">
                <br>
                        <h4 class="mb-1">No existen productos disponibles con esas características.</h4>
                </div>
            </div>
        `
     } 
    else {
    showCategoriesList(productosFiltrados);
    arrayProductos = productosFiltrados;
    };
};

function limpiar(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    showCategoriesList(arrayProductosConst);
    arrayProductos = arrayProductosConst;
    
};

//CAMBIAR DISPOSICION DE PANELES
function disposicion() {
    var imgBoton = document.getElementById("imgBoton");
    var arrayTotalCartas = document.getElementsByClassName("total-carta");
    var arrayDescripcionCartas = document.getElementsByClassName("descripcion-carta");
    var arrayImgsCartas = document.getElementsByClassName("img-carta");
    var arrayPrecioCartas = document.getElementsByClassName("precio-carta");
    var arrayDisponibleCartas = document.getElementsByClassName("disponible-carta");
    if ((imgBoton.className) == "fas fa-th-large") {
        imgBoton.classList.remove("fa-th-large");
        imgBoton.classList.add("fa-bars");
        for(i=0;i<arrayProductos.length;i++){
            //TAMAÑO CARTA
            arrayTotalCartas[i].classList.remove("col-6");
            arrayTotalCartas[i].classList.remove("col-md-12");
            arrayTotalCartas[i].classList.add("col-12");
            arrayTotalCartas[i].classList.add("col-md-6");
            //TAMAÑO IMAGEN
            arrayImgsCartas[i].classList.remove("col-md-4");
            //TAMAÑO TEXTO DESCRIPTIVO
            arrayDescripcionCartas[i].classList.remove("d-md-block");
            arrayDescripcionCartas[i].classList.remove("d-none");
            arrayDescripcionCartas[i].classList.remove("offset-md-1");
            arrayDescripcionCartas[i].classList.remove("col-md-5");
            arrayDescripcionCartas[i].classList.add("col-12");
            //TAMAÑO TEXTO PRECIO
            arrayPrecioCartas[i].classList.remove("offset-md-6");
            arrayPrecioCartas[i].classList.remove("col-md-3");
            //TAMAÑO DISPONIBLES
            arrayDisponibleCartas[i].classList.remove("col-md-3");            
            
            
            

        }
    } else {
        for(i=0;i<arrayProductos.length;i++){
        imgBoton.classList.remove("fa-bars");
        imgBoton.classList.add("fa-th-large")
        //TAMAÑO CARTA
        arrayTotalCartas[i].classList.add("col-6");
        arrayTotalCartas[i].classList.add("col-md-12");
        arrayTotalCartas[i].classList.remove("col-12");
        arrayTotalCartas[i].classList.remove("col-md-6");
        //TAMAÑO IMAGEN
        arrayImgsCartas[i].classList.add("col-md-4");
        //TAMAÑO TEXTO DESCRIPTIVO
        arrayDescripcionCartas[i].classList.add("d-md-block");
        arrayDescripcionCartas[i].classList.add("d-none");
        arrayDescripcionCartas[i].classList.add("offset-md-1");
        arrayDescripcionCartas[i].classList.add("col-md-5");
        arrayDescripcionCartas[i].classList.remove("col-12");
        //TAMAÑO TEXTO PRECIO
        arrayPrecioCartas[i].classList.add("offset-md-6");
        arrayPrecioCartas[i].classList.add("col-md-3");
        //TAMAÑO DISPONIBLES
        arrayDisponibleCartas[i].classList.add("col-md-3"); 
    }
    }
    
}


//CAMBIA IMAGEN DEL BOTON AL CAMBIAR ORDEN DE PRODUCTOS
function cambiarImagen(){
    var activa= document.getElementById("icono");
    if ((activa.className) == "fas mr-1 fa-sort-amount-up")
    {
        activa.classList.remove("fa-sort-amount-up");
        activa.classList.add("fa-sort-amount-down");
        
        
    } else{
        activa.classList.remove("fa-sort-amount-down");
        activa.classList.add("fa-sort-amount-up");
        ivertidoOrdenCant();
    };
};

//ORDEN DE PRODUCTOS
function ordenarAlfa(){
    arrayProductos.sort((a,b)=>{
        if (a.cost < b.cost){
            return -1;
        } else if (a.cost > b.cost){
            return 1;
        } else { return 0; }
    });
    showCategoriesList(arrayProductos);
    corroborarActivos();
       };
   
function ordenarZeta(){
    arrayProductos.sort((a,b)=>{
        if (a.cost < b.cost){
            return 1;
        } else if (a.cost > b.cost){
            return -1;
        } else { return 0; }
        
    });
    showCategoriesList(arrayProductos);
    corroborarActivos();
   };


function ivertidoOrdenCant(){
    arrayProductos.sort((a,b)=>{
        return b.soldCount - a.soldCount
    });
    showCategoriesList(arrayProductos);
    corroborarActivos();
};


function ordenCant(){
    arrayProductos.sort((a,b)=>{
        return a.soldCount - b.soldCount
    });
    showCategoriesList(arrayProductos);
    cambiarImagen();
    corroborarActivos();
};

//HACE QUE NO SE SUPERPONGAN BOTONES ACTIVOS
function corroborarActivos(){
    var claseBotonA = document.getElementById("botonA");
    var claseBotonZ = document.getElementById("botonZ");
    var claseBotonC = document.getElementById("botonC");
    if (claseBotonA.className == "btn" || claseBotonA.className == "btn focus") {
        claseBotonZ.classList.remove("active");
        claseBotonC.classList.remove("active");
    } else if (claseBotonZ.className == "btn" || claseBotonZ.className == "btn focus"){
        claseBotonA.classList.remove("active");
        claseBotonC.classList.remove("active");
    } else if (claseBotonC.className == "btn" || claseBotonC.className == "btn focus"){
        claseBotonA.classList.remove("active");
        claseBotonZ.classList.remove("active");
    } else{console.log("no hay cuestion")};

};

//BUSCA LOS ELEMENTOS QUE CONTENGAN LAS LETRAS ESCRITAS EN EL BUSCADOR
function buscar(){
    var textoEscrito = document.getElementById("buscador").value.toLowerCase();
    for (i=0; i<arrayProductos.length;i++){
        if(arrayProductos[i].name.toLowerCase().includes(textoEscrito)){
            arrayFiltrado.push(arrayProductos[i]);
        }
    }
    if (arrayFiltrado.length == 0){
        document.getElementById("conjuntoTarjetas").innerHTML = `
            <div class="row">
                <div class="col-12 text-muted">
                <br>
                        <h4 class="mb-1">No existen productos disponibles con esas características.</h4>
                </div>
            </div>
        `
    } else {
        showCategoriesList(arrayFiltrado);
        arrayFiltrado = [];
    }
};

//PRESENTA EN HTML LOS ELEMENTOS DEL JSON
function showCategoriesList(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="total-carta col-6 col-md-12 ">
            <a class="card  shadow tarjeta-producto"  style="color:black;padding: 15px; margin:10px;" href="product-info.html" >
                <div class="card-header text-center" style="background-color:#c80e60; color:white">
                    <h3>`+ category.name +`</h3>
                </div>
                <div class="row mt-3 mb-3 align-items-center">
                    <div class=" img-carta col-12 col-md-4">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="descripcion-carta d-none d-md-block offset-md-1 col-md-5">
                        <p class="align-self-center" style="font-size:20px;">` + category.description + `</p>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="disponible-carta col-12 col-md-3">
                        <p class="text-muted" style="font-size:18px;"><span class="d-none d-sm-block"> Disponibilidad: </span>` + category.soldCount + ` artículos</p>
                    </div>
                    <div class="precio-carta col-12 offset-md-6 col-md-3">
                        <p style="font-size:24px;"><span class="d-none d-sm-block">Precio Actual:<br></span><span style="font-size:28px;"><strong>$USD ` + category.cost + ` </strong></span></p>
                    </div>
                </div>
            </a>
        </div>   
        `

        document.getElementById("conjuntoTarjetas").innerHTML = htmlContentToAppend;
        
    }
}
//LLAMADO A JSON CUANDO EL DOCUMENTO CARGA
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONDataProduct("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
    arrayProductos = resultObj.data;
    arrayProductosConst = resultObj.data;
    ordenarAlfa();
    almacenoCarrito();
})   
});


document.getElementById("buscador").addEventListener("keyup",buscar);