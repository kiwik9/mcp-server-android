export default function promptInstallApp(): string {
    return `
Compilar el APK de la app en modo debug usando Gradle.
Validar si existen emuladores Android disponibles y, si no hay ninguno corriendo, mostrar la lista de emuladores disponibles y pedir al usuario que elija uno.
Iniciar el emulador seleccionado (o el primero disponible si el usuario no elige).
Instalar automáticamente el APK debug generado en el emulador.
Si la instalación es exitosa, abrir la app automáticamente usando el nombre de paquete correcto (debe obtenerse del AndroidManifest o build.gradle).
Si ocurre algún error (compilación, emulador, instalación, nombre de paquete, etc.), muestra el error y sugiere la acción correcta o pregunta al usuario si desea ayuda para corregirlo.
No asumas rutas ni nombres de paquete, siempre obtén la información real del proyecto.
`
}