var perfil = {
    nombre: "----",
    apellido: "----",
    direccion: "direccion de ejemplo 123",
    email: "emaildeejemplo@hotmail.com",
    telefono: 099999999,
    edad: 99,
    imagen: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
}

//FUNCION QUE MUESTRA LOS DATOS EN EL PERFIL
function mostrarPerfil(){
    perfil = JSON.parse(localStorage.getItem("perfil"));
    document.getElementById("showNombre").innerHTML = perfil.nombre ;
    document.getElementById("showApellido").innerHTML = perfil.apellido;
    document.getElementById("showDirec").innerHTML = perfil.direccion;
    document.getElementById("showMail").innerHTML = perfil.email;
    document.getElementById("showTel").innerHTML = perfil.telefono;
    document.getElementById("showEdad").innerHTML = perfil.edad;
    document.getElementById("muestraImg").src = perfil.imagen;
}

function guardarImagen(){
    var file = document.getElementById("imgPerfil").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        perfil.imagen = reader.result;
        localStorage.setItem("perfil",JSON.stringify(perfil))
        mostrarPerfil();
      } 

        reader.readAsDataURL(file);
        
}
function almacenarPerfil(){
    if(document.getElementsByTagName("form")[0].checkValidity()){
    perfil.nombre = document.getElementById("nombre").value;
    perfil.apellido = document.getElementById("apellido").value;
    perfil.direccion = document.getElementById("direccion").value;
    perfil.email = document.getElementById("mail").value;
    perfil.telefono = document.getElementById("telefono").value;
    perfil.edad = document.getElementById("edad").value;
    localStorage.setItem("perfil",JSON.stringify(perfil));
    mostrarPerfil()
} else{
    swal("Faltan datos", "No completaste todos los datos necesarios", "error")
}
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if(localStorage.getItem("perfil") == null)
    {
        localStorage.setItem("perfil",JSON.stringify(perfil));
        perfil = localStorage.getItem("perfil");
    };
    perfil = localStorage.getItem("perfil");
    mostrarPerfil();
});

document.getElementById("muestraImg").addEventListener("mouseenter", function(event) {   
    event.target.style.filter = "brightness(0.5)";
    document.getElementById("cambiarFoto").style.display = "block";
})
document.getElementById("muestraImg").addEventListener("mouseout", function(event) {   
    event.target.style.filter = "brightness(1)";
    document.getElementById("cambiarFoto").style.display = "none"
})

document.getElementById("imgPerfil").addEventListener("change", guardarImagen)