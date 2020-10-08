//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    function login(){
        var usuario = document.getElementById("user").value;
        var contrasena = document.getElementById("pass").value;
        var localusuario;
        
        if (usuario!=""&& contrasena!=""){ 
            //document.form.submit();// 
            localStorage.setItem("usuario",usuario)
            window.location="cover.html";
        } 
        else{ 
             alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
        } 
    };
document.addEventListener("DOMContentLoaded", function(e){
})
function logout(){
    localStorage.clear();
    window.location="index.html";
    almacenoCarrito();
}

