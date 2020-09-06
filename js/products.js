
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
        document.getElementById("cat-list-container").innerHTML = `
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
        document.getElementById("cat-list-container").innerHTML = `
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
        <a class="list-group-item list-group-item-action" href="product-info.html" >
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <p class="text-muted">` + category.soldCount + ` artículos</p>
                    </div>
                    <div class="row">
                    <div class="col>
                    <p class="text-muted">` + category.description + ` artículos</p>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row">
                    <div class="offset-9 col-3">
                    <p style="font-size:25px;"><strong>$USD ` + category.cost + ` </strong></p>
                    </div>
                    </div>
            </div>
        </a>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
    }
}
//LLAMADO A JSON CUANDO EL DOCUMENTO CARGA
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONDataProduct("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
    arrayProductos = resultObj.data;
    arrayProductosConst = resultObj.data;
    ordenarAlfa()
})   
});


document.getElementById("buscador").addEventListener("keyup",buscar);