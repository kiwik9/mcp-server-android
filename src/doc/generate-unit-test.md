# Prompt: Generar Pruebas Unitarias en Kotlin 

### Requisitos obligatorios:

- Usa **JUnit** como framework de pruebas.
- Usa **MockK** para mocks, stubs o spies, en caso las clases o funciones no esten dentro del contexto puedes crearlas con la libreria de mockk.
- Las pruebas deben cubrir el **100% del flujo de control del código**, incluyendo:
  - condiciones (`if`, `when`, etc.),
  - excepciones,
  - casos borde,
  - entradas inválidas o nulas.
- Agrega las mismas importaciones que tiene el archivo del cual requiere el test, no crees ninguna clase adicional o helpers.
- Los **títulos de las funciones de prueba deben estar en inglés** y deben **expresar claramente** el comportamiento validado.
  Ejemplo: `shouldReturnUser_WhenIdIsValid`
- IMPORTANTE: No utilices mockkStatic, unmockkStatic, encrypt
- IMPORTANTE: No uses las funciones safeApiCall, isResponseSuccessful, mapFlatDetail, resultDetail, .
- Solo has pruebas funcionales y de flujo.

---

## Nombre del archivo 
El nombre del archivo tiene que ser el mismo nombre de la clase + Test
por ejemplo si la clase se llama MyClass el nombre del archivo del test debe ser MyClassTest

## Buenas prácticas esperadas

### 1. AAA + Given-When-Then

Estructura tus pruebas usando una combinación de:

- **AAA**: Arrange, Act, Assert
- **Given-When-Then** (integrado dentro del AAA)

```kotlin
@Test
fun `shouldReturnBalance_WhenAccountIsActive`() {
  // Given
  val cuenta = Cuenta(activa = true, saldo = 100.0)
  val service = CuentaService()

  // When
  val resultado = service.obtenerSaldo(cuenta)

  // Then
  assertEquals(100.0, resultado, 0.01)
}
```

### 2. FIRST (principios de calidad de pruebas)

Tus pruebas deben seguir los principios:

- **Fast**: deben ejecutarse rápidamente.
- **Independent**: no deben depender unas de otras.
- **Repeatable**: deben ser determinísticas (mismo resultado cada vez).
- **Self-validating**: deben fallar o pasar sin intervención manual.
- **Timely**: deben escribirse junto al código o antes (TDD-friendly).

### 3. Naming convention recomendado (en inglés)

Usa nombres de test con el patrón:

```
should<ExpectedBehavior>_When<Condition>()
```

Ejemplo:

```kotlin
@Test
fun `shouldReturnEmptyList_WhenNoUsersAreRegistered`() { ... }
```

### 4. Estilo “Clean Test”

- Mantén las pruebas simples, legibles y bien estructuradas.
- Extrae lógica repetida a funciones auxiliares o `@Before` y si es necesario `@After`.
- Evita múltiples validaciones por prueba: **una sola responsabilidad por test**.

---

## Librerías obligatorias

- `JUnit` (ver. 4)
- `MockK` (ver. 1.13.3)

---

## Validación esperada
- Usa funciones de aserción (`assertEquals`, `assertFailsWith`, `assertThrows`, `assertTrue`, etc.), usando la 
  libreria JUnit.
- Verifica valores de retorno y efectos secundarios.
- Cubre múltiples escenarios para cada función si aplica.
- Asegúrate de que el código bajo prueba esté **totalmente ejercitado**.

## Ejemplos de salida 

@OptIn(ExperimentalCoroutinesApi::class)
class AdditionalCardRepositoryImplTest : BaseRespositoryTest() {
    @MockK
    private lateinit var mockContext: Context

    @MockK
    private lateinit var mockDigitalSalesServicesDS: DigitalSalesServicesDS

    @MockK
    private lateinit var mockSecurityServiceDS: SecurityServiceDS

    @MockK
    private lateinit var mockUtilIntegrationDS: UtilIntegrationDS

    @MockK
    private lateinit var mockCreditCardServiceDS: CreditCardServiceDS

    @MockK
    private lateinit var mockUserServiceDS: UserServiceDS

    @MockK
    private lateinit var mockAppSession: AppSessionBase

    @MockK
    private lateinit var mockCryptoUtil: Encrypt

    @MockK
    private lateinit var mockDataAppSession: DataAppSession

    private lateinit var additionalCardRepository: AdditionalCardRepository

    override fun build() {
        additionalCardRepository = AdditionalCardRepositoryImpl(
            mockContext,
            mockDigitalSalesServicesDS,
            mockSecurityServiceDS,
            mockUtilIntegrationDS,
            mockCreditCardServiceDS,
            mockUserServiceDS,
            mockAppSession,
            mockCryptoUtil,
            mockDataAppSession
        )
    }
    
    @Test
    fun `Given successful benefits retrieval, when getBenefits is called, then it returns DataResult Success with mapped BenefitResults`() =
        runTest {
            // Arrange
            val info = Benefit(data = CardData(subProductCode = "abc"), productType = "xyz")
            val fakeResponse = BenefitResponse(
                title = "Title",
                imageUrl = "Image URL",
                description = "Description",
                benefits = arrayListOf(
                    BenefitResponse.Benefit(),
                    BenefitResponse.Benefit()
                )
            )

            coEvery { mockDigitalSalesServicesDS.getBenefits(any()) } returns DataResult.Success(BaseResponse(resultDetail = fakeResponse))
            // Act
            build()
            val result = additionalCardRepository.getBenefits(info)

            // Assert
            assertTrue(result is DataResult.Success)
            val benefitResults = (result as DataResult.Success).data
            assertEquals("Title", benefitResults.title)
            assertEquals("Image URL", benefitResults.imageUrl)
            assertEquals("Description", benefitResults.description)
            assertEquals(2, benefitResults.benefits?.size)
        }

    @Test
    fun `Given successful useful validation, when usefulValidation is called, then it returns DataResult Success with mapped UsefulValidation`() =
        runTest {
            // Arrange
            val data = DocumentValidation("Passport", "12345", "CreditCard")
            val fakeResponse = UsefulValidationResponse(
                documentType = "Passport",
                documentNumber = "12345"
            )
            coEvery { mockDigitalSalesServicesDS.validation(any()) } returns DataResult.Success(BaseResponse(resultDetail = fakeResponse))

            // Act
            build()
            val result = additionalCardRepository.usefulValidation(data)

            // Assert
            assertTrue(result is DataResult.Success)
            val usefulValidation = (result as DataResult.Success).data
            assertEquals("Passport", usefulValidation.documentType)
            assertEquals("12345", usefulValidation.documentNumber)
        }

    @Test
    fun `Given valid ConsultReentryLogic data, when reentryLogic is called, then return DataResult with true`() = runTest {
        // Arrange
        val data = ConsultReentryLogic(
            ConsultReentryLogic.Customer("Passport", "12345"),
            ConsultReentryLogic.Product("CreditCard")
        )
        val fakeResponse = ReentryLogicResponse(cardBrand = "Visa", cardType = "CreditCard")
        coEvery { mockDigitalSalesServicesDS.reentrylogic(any()) } returns DataResult.Success(BaseResponse(resultDetail = fakeResponse))

        // Act
        build()
        val result = additionalCardRepository.reentryLogic(data)

        // Assert
        assertTrue(result is DataResult.Success)
        assertTrue((result as DataResult.Success).data is Boolean)
        assertTrue(result.data == true)
    }

}

---