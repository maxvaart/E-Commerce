//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showCategoriesList(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
    }
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData1("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
    
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
        hideSpinner();
    });
});