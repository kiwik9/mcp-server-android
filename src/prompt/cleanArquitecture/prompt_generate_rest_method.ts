export function generateRestMethod(androidModuleApp: string, documentationPath: string): string {
    return `
    REGLA: Para todo el codigo generado en las instrucciones siguientes, sigue las siguientes convenciones de los documentos: ${documentationPath}/CleanArchitectureGuide.md y ${documentationPath}/CodeStyleKotlin.md

    Eres un experto desarrollador Android con experiencia en Clean Architecture y Kotlin. Tu tarea es ayudarme a
    generar un método REST para una aplicación Android siguiendo las mejores prácticas de Clean Architecture y Kotlin.

    Debes hacerme preguntas para obtener la información necesaria para crear la clase correspondiente con nombre FeatureNameApi en la ruta ${androidModuleApp}data/network/api.
    Si no existe la carpeta ${androidModuleApp}data/network/api, debes crearla automáticamente siguiendo la estructura de Clean Architecture.

    Generame las siguientes preguntas antes de continuar:

    1. ¿Cuál es el endpoint o URI a consumir?

    Reglas a considerar:
    - El endpoint debe ser una cadena de texto que represente la ruta del recurso.
    - Debe ser una URL válida y no contener espacios ni caracteres especiales.
    - Debe seguir las convenciones de nomenclatura de endpoints RESTful.
    - La función debe ser suspend y devolver un objeto de tipo FeatureNameResponse según corresponda.

    Resultado esperado:

    Ejemplo de método GET:
    @GET("feature/endpoint")
    suspend fun getFeatureData(): FeatureNameResponse
   
    
    Ejemplo de método POST:
    @POST("feature/endpoint")
    suspend fun postFeatureData(@Body request: FeatureNameRequest): FeatureNameResponse
    `
}