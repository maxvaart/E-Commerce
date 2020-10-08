var category = {};
var comments ={};
var productRelacionated=[];
var auxArrayProductos=[];

//MOSTRAR PRODUCTOS RELACIONADOS
function showRelacionated(array){
    asignarRelacionados();
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let productElement = array[i];
        if (i==0){
            htmlContentToAppend += `
            <div class="carousel-item active">
            <img src=`+productElement.imgSrc+` class="d-block w-90 float-right">
            <div class="carousel-caption d-none d-md-block text-left align-middle ">
            <h2><strong>`+productElement.name+`</strong></h4>
            <p style="margin-right:500px; margin-bottom:130px">`+productElement.description+`</p>
            <button type="button" class="btn btn-light">Ver Producto</button>
            </div>
            </div>
        `
        } else{
            htmlContentToAppend += `
            <div class="carousel-item">
            <img src=`+productElement.imgSrc+` class="d-block w-90 float-right">
            <div class="carousel-caption d-none d-md-block text-left">
              <h2><strong>`+productElement.name+`</strong></h4>
              <p style="margin-right:500px; margin-bottom:130px">`+productElement.description+`</p>
              <button type="button" class="btn btn-light">Ver Producto</button>
            </div>
            </div>
        `
        }
        
        document.getElementById("articleRelacionated").innerHTML = htmlContentToAppend;
    } 
}
//TOMAR LOS DATOS DE RELACIONADOS
function asignarRelacionados(){
    for(i=0;i<category.relatedProducts.length;i++){
        var idRelacion = parseInt(category.relatedProducts[i]);
        productRelacionated.push(auxArrayProductos[idRelacion]);
    }
}
//MUESTRA IMAGENES DE LA GALERIA
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
//PRESENTA EN HTML LOS COMENTARIOS DEL JSON
function showCommentsList(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let commentElement = array[i];
        var scorePoints = commentElement.score;
        htmlContentToAppend += `
        <div id="comentario">
            <h4 style="text-align: left;">
              <span style="display: inline-flex; padding-left: 40px;"><i class="fas fa-user-alt"></i></span><span style="display: inline-flex; vertical-align: bottom;" id="userComment"><strong>`+commentElement.user+`</strong></span>
              <span style="float: right; padding-right: 40px ;" id="score">Calificacion: `+countStars(scorePoints)+`</span>
            </h4>
            <hr>
            <p style="text-align: center ;" id="descriptionComment">`+commentElement.description+`</p>
            <p style="margin: 15px 0 0 0 ;" id="dateComment"><em>`+commentElement.dateTime+`</em></p>
          </div>
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
        document.getElementById("idNewComment").value ="";
        document.getElementById("newComment").value = "";
        estrellasBlancas(document.getElementsByClassName("scoreStar"));
        
        
    }
}

//VOLVER AL ESTILO BLANCO
function estrellasBlancas(array){
    for (i=0;i<array.length;i++){
        document.getElementsByClassName("scoreStar")[i].checked = false;
    }
}
//ENVIA EL COMENTARIO Y LO PRESENTA EN PANTALLA\
    
function enviarComentario(){
    var nombre = document.getElementById("idNewComment").value;
    var arrayEstrellas = document.getElementsByClassName("scoreStar");
    var calificacion = calculoPuntaje(arrayEstrellas);
    var comentario = document.getElementById("newComment").value;
    var hoy = new Date();
    var fecha= hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate();
    var hora=hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds();
    var fechaYhora=fecha+" "+hora;
    var comentarioCompleto = {
        "score": calificacion,
        "description": comentario,
        "user": nombre,
        "dateTime": fechaYhora
    }
    if(nombre.trim()!="" && comentario.trim()!=""){
    comments.push(comentarioCompleto);
    showCommentsList(comments);
}
    else{
        alert("Faltan completar campos.")
    }

}

//PASA ESTRELLAS A PUNTAJE
function calculoPuntaje(arreglo){
    var valor;
    for(i=0;i<arreglo.length; i++){
        if (arreglo[i].checked){
            valor = parseInt(arreglo[i].value); 
        }
    }
    return valor;
}
function countStars(i){
    var cStars = new String;
    var calification = parseInt(i);
    for (x = 0 ; x<calification ; x++){
       cStars +=  `<span class= "fa fa-star" style="color:white;"></span>`
    };
    return cStars;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONDataProduct("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
        auxArrayProductos = resultObj.data;
})
    getJSONDataProductInfo(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            var productNameHTML = document.getElementById("productName");
            var productDescriptionHTML = document.getElementById("productDescription");
            var productSoldHTML = document.getElementById("productSold");
            var productCategoryHTML = document.getElementById("productCategory");
            var productPriceHTML = document.getElementById("productPrice");

            productNameHTML.innerHTML = category.name;
            productDescriptionHTML.innerHTML = category.description;
            productSoldHTML.innerHTML = category.soldCount;
            productCategoryHTML.innerHTML = category.category;
            productPriceHTML.innerHTML = category.cost;
            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
    
    getJSONDataProductComments(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

                comments = resultObj.data;
                showCommentsList(comments);
                showRelacionated(productRelacionated);
                almacenoCarrito();
        });
});