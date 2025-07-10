# Prompt: Generar Pruebas Unitarias en Kotlin 

### Requisitos obligatorios:

- Usa **JUnit** como framework de pruebas.
- Usa **MockK** para mocks, stubs o spies, en caso las clases o funciones no esten dentro del contexto puedes crearlas con la libreria 
  de mockk.
- Las pruebas deben cubrir el **100% del flujo de control del código**, incluyendo:
  - condiciones (`if`, `when`, etc.),
  - excepciones,
  - casos borde,
  - entradas inválidas o nulas.
- Agrega las mismas importaciones que tiene el archivo del cual requiere el test, no crees ninguna clase adicional o helpers.
- Los **títulos de las funciones de prueba deben estar en inglés** y deben **expresar claramente** el comportamiento validado.
  Ejemplo: `shouldReturnUser_WhenIdIsValid`

---

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
- Extrae lógica repetida a funciones auxiliares o `@Before`.
- Evita múltiples validaciones por prueba: **una sola responsabilidad por test**.

---

## Librerías obligatorias

- `JUnit` (v4 o v5)
- `MockK` (para mocking y verificación de comportamiento)

---

## Validación esperada

- Usa funciones de aserción (`assertEquals`, `assertFailsWith`, `assertThrows`, `assertTrue`, etc.).
- Verifica valores de retorno y efectos secundarios.
- Cubre múltiples escenarios para cada función si aplica.
- Asegúrate de que el código bajo prueba esté **totalmente ejercitado**.

---