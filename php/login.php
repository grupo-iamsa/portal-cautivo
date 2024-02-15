<?php
// Incluir el archivo donde está definida la función login
require_once "loginFunction.php";

// Verificar si se ha enviado el formulario
if (isset($_POST['submit'])) {
    // Llamar a la función login
    MiClase::login();
}
?>
