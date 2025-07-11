export function generateModelPrompt(modulePath: string, documentationPath: string): string {
  return `
⚠️ Antes de continuar realizame las siguientes preguntas:
    1.  Pregúntame cuál es el método que se va a implementar si es GET o POST. U
        Una vez definido el método a implementar, si el método es POST sólicitame el JSON de la request y la JSON de la response.
        Si es un método GET, solicítame el JSON de la response. No generes código hasta recibir el JSON.
    2.  Pregúntame cuál es el nombre del feature que estás implementando.

Sigue estrictamente las convenciones definidas en:
${documentationPath}/CleanArchitectureGuide.md
${documentationPath}/CodeStyling.md
Una vez recibido el JSON, sigue estas instrucciones:

---

1. **Solicitame el JSON de la request y/o response**
Con la información obtenida del método REST solicitame el JSON de la request y response si es un método POST, y si solo es un método GET, solícitame explícitamente el JSON de la response.

Una vez que me solicites el JSON, sigue las siguientes instrucciones. Si no me solicitas el JSON, no pases a la siguiente instrucción.

2. **Conversión a Kotlin Data Class**  
Crea una data class en Kotlin que represente fielmente la estructura del JSON recibido.

3. **Ubicación del archivo:**
El archivo generado debe guardarse en:  
📁 ${modulePath}/data/network/model/request/NombreDelModeloRequest.kt
📁 ${modulePath}/data/network/model/response/NombreDelModeloResponse.kt

4. **Nombre del archivo y clase:**
El nombre del archivo y de la clase principal deben estar en formato PascalCase, en inglés, y terminar en Response o Request según corresponda.  
Ejemplo: CreditCardResponse.kt → data class CreditCardResponse(...) ó CreditCardRequest.kt -> data class CreditCardRequest(...)

5. **Nombres de propiedades:**  
- Si en el JSON las claves están en snake_case, conviértelas a camelCase.
- Si las claves están en español, las variables deben estar en inglés y en camelCase.  
- Usa la anotación @SerializedName("nombre_original") para mapear las claves correctamente.
- No asignes la data class como Serializable, ya que no es necesario en este contexto.
- Todas las propiedades deben marcarse como opcionales (?).

6. **Subestructuras anidadas:**  
- Si el JSON contiene objetos o arrays de objetos anidados, crea en una nueva clase el objeto o array correspondiente.
- Si por ejemplo el JSON tiene un campo "direccion" que es un objeto, crea una clase AddressResponse.
- Si estás creando un objeto anidado dentro de la misma data class no pases al siguiente paso sin corregir y crear una nueva clase para este objeto anidado.

7. **Tipos de datos:**  
- Utiliza los tipos apropiados: String, Int, Double, Boolean, List<T>, etc.  
- Si algún campo puede tener múltiples tipos, usar Any? temporalmente y consultar antes de asumir.

8. **Ejemplo de salida esperada:**

kotlin

data class CreditCardResponse(
    @SerializedName("card_number") val cardNumber: String?,
    @SerializedName("expiration_date") val expirationDate: String?,
    @SerializedName("holder_name") val holderName: String?,
    @SerializedName("metadata") val metadata: MetadataResponse?
)

//crear nueva clase para MetadataResponse dentro de la misma carpeta
data class MetadataResponse(
    @SerializedName("transaction_id") val transactionId: String?
)

9. **Creación de clases entity en domain y su mapper**
Así mismo, debes crear las clases entities correspondientes según la request y/o response en el dominio, la ruta debe ser ${modulePath}domain/entity, 
si la carpeta no existe, créala antes de generar las clases y no continues hasta crearla, siguiendo las convenciones de Clean Architecture.

Ejemplo de clase entity:

data class CreditCard(
    val cardNumber: String?,
    val expirationDate: String?,
    val holderName: String?,
    val metadata: MetadataResponse?
)

//crear nueva clase para MetadataResponse dentro de la misma carpeta
data class MetadataResponse(
    val transactionId: String?
)

---
10. Ahora vamos a crear la clase FeatureNameMapper.kt en la carpeta ${modulePath}data/network/repository/mapper, si no existe esa carpeta creala y no continues hasta que hayas creado la carpeta antes, que será responsable de mapear las clases de Request/Response a las clases Entity del dominio.

Ejemplo de clase FeatureNameMapper.kt:

package data.mapper
import data.model.CreditCardResponse
import domain.entity.CreditCard
import data.model.MetadataResponse

fun CreditCardResponse.toCreditCard(): CreditCard {
    return CreditCard(
        cardNumber = this.cardNumber,
        expirationDate = this.expirationDate,
        holderName = this.holderName,
        metadata = this.metadata?.toMetadata()
    )
}

fun MetadataResponse.toMetadata(): Metadata {
    return Metadata(
        transactionId = this.transactionId
    )
}

Compila el código generado y verifica que no existan errores de sintaxis o convenciones. En el caso de existencias de errores, corrígelos siguiendo las convenciones de Clean Architecture y Kotlin, compila nuevamente y verifica que no existan errores.

⚠️ Antes de continuar, no pases al siguiente paso sin verificar que todas las clases hayan sido creadas.

📝 IMPORTANTE: Si el archivo o carpeta no existe, debe ser creada automáticamente siguiendo la estructura de Clean Architecture.

---
🚀 ¡Una vez generado, avísame para validar la clase!
`;
}