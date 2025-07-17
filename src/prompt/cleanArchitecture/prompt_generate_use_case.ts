export function generateUseCasePrompt(modulePath: string, documentationPath: string): string {
    return `
        Objetivo: Generar un caso de uso para la capa de dominio siguiendo Clean Architecture en Android.
        La clase debe crearse en la ruta ${modulePath}/FeatureName/domain/usecase/NombreUseCase.kt. Si no existe la carpeta usecase, debes crearla automáticamente siguiendo la estructura de Clean Architecture.

        1. El nombre del caso de uso debe ser en formato VerboEntidadUseCase (ej. GetCreditCardUseCase)

        2. Debe ser una clase suspend operator fun invoke() si tiene un solo método

        3. Debe ser parte del paquete domain.usecase

        4. No contiene lógica, solo delega al repository

Sigue estrictamente las convenciones definidas en:
${documentationPath}/CleanArchitectureGuide.md
${documentationPath}/CodeStyling.md

🧠 REGLAS Y CONVENCIONES PARA EL CÓDIGO:

    - La clase debe llamarse NombreUseCase.
    - El método principal debe ser suspend operator fun invoke(...).
    - Si el método no recibe parámetros, simplemente se define invoke() vacío.
    - Si el método recibe parámetros, deben ser claros y con tipos exactos (por ejemplo, userId: String o params: UpdateCardStatusParams).
    - Si se reciben múltiples parámetros complejos, crear una data class Params(...) interna.

    📌 Ejemplo de clase simple:

    \`\`\`kotlin
    class GetCreditCardUseCase(
        private val repository: CreditCardRepository
    ) {
        suspend operator fun invoke(): CreditCard {
            return repository.getCreditCard()
        }
    }
    \`\`\`

    📌 Ejemplo con parámetros agrupados:

    \`\`\`kotlin
    class UpdateCardStatusUseCase(
        private val repository: CardRepository
    ) {
        data class Params(
            val cardId: String,
            val status: String
        )

        suspend operator fun invoke(params: Params): Result<Unit> {
            return repository.updateCardStatus(params.cardId, params.status)
        }
    }
    \`\`\`

    ---

    ✅ BUENAS PRÁCTICAS:

    - No coloques lógica de validación o transformación de datos en el UseCase.
    - No expongas clases del paquete data dentro del UseCase (solo domain).
    - Si el UseCase devuelve Result<T>, debes capturar y propagar excepciones dentro del mismo (fallback seguro).

    📍Estructura esperada del archivo generado:

    \`\`\`
    📁 domain/
    └── usecase/
        └── NombreUseCase.kt
    \`\`\`

    ✍️ Al finalizar, genera la clase y avísame para que la revise.

    `;
}