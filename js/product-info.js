var category = {};
var comments ={};
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
        
    }
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
        });
});