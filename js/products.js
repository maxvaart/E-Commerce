//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var arrayProductosConst = [];
var arrayProductos = [];


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
}

function limpiar(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    showCategoriesList(arrayProductosConst);
    arrayProductos = arrayProductosConst;
    
}

function ordenarAlfa(){
 arrayProductos.sort((a,b)=>{
     if (a.name < b.name){
         return -1;
     } else if (a.name > b.name){
         return 1;
     } else { return 0; }
 });
 showCategoriesList(arrayProductos);
 corroborarActivos();
    };

function cambiarImagen(){
    var activa= document.getElementById("icono");
    if ((activa.className) === "fas fa-sort-amount-down mr-1")
    {
        activa.classList.remove("fa-sort-amount-dow");
        activa.classList.add("fa-sort-amount-up");
        
        
    } else{
        activa.classList.remove("fa-sort-amount-up");
        activa.classList.add("fa-sort-amount-down");
        ivertidoOrdenCant();
    };
};


function ordenarZeta(){
    arrayProductos.sort((a,b)=>{
        if (a.name < b.name){
            return 1;
        } else if (a.name > b.name){
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
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData1("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
    arrayProductos = resultObj.data;
    arrayProductosConst = resultObj.data;
    ordenarAlfa()
})   
});