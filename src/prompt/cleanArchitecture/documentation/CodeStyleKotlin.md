# Kotlin Code Style Guide para Proyectos Android

Este documento define las convenciones de estilo que deben respetarse para mantener un código consistente y limpio en todos los proyectos Android escritos en Kotlin.

---

## 📚 Organización de Código

1. **Orden de declaraciones en clases:**
   ```kotlin
   class MiClase {
       // 1. Constantes companion object
       // 2. Variables privadas
       // 3. Dependencias inyectadas
       // 4. Variables de estado
       // 5. Métodos públicos
       // 6. Métodos privados
   }
   ```

2. **Arquitectura por paquetes**
   - Prefiere organizar por feature y no por tipo (feature-based structure)
   ```
   features/
   └── login/
       ├── data/
       ├── domain/
       └── presentation/
   ```

---

## 📐 Convenciones de Nombres

| Elemento         | Estilo         | Ejemplo                     |
|------------------|----------------|-----------------------------|
| Clases           | PascalCase     | `UserRepository`            |
| Variables        | camelCase      | `userId`, `isActive`        |
| Constantes       | UPPER_SNAKE    | `MAX_RETRIES`               |
| Archivos         | PascalCase     | `LoginFragment.kt`          |
| Paquetes         | lowercase      | `login`, `remote`           |
| Funciones        | camelCase      | `getUser()`, `submitForm()` |
| Interfaces       | PascalCase     | `UserService`               |
| Test Class       | PascalCase + Test | `UserRepositoryTest`     |

---

## 🧼 Estilo de Código

- Siempre usar `val` cuando la variable no cambia
- Evitar `!!` (operator de not-null forzado)
- Prefiere expresiones `when` sobre `if` anidados
- Utiliza `apply`, `also`, `run`, `let` de forma semántica

```kotlin
user?.let {
    // bloque seguro para user
}
```

- No dejar comentarios innecesarios o código comentado sin uso
- Usa `TODO()` con descripción clara si algo está pendiente

---