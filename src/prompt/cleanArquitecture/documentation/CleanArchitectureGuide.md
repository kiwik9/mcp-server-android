# Clean Architecture Guide para Android

Este documento define la estructura y convenciones que deben seguirse para implementar funcionalidades nuevas en una arquitectura limpia (Clean Architecture) dentro de un proyecto Android Kotlin.

---

## 🧱 Estructura General del Módulo

Cada feature debe seguir la siguiente organización:

```
<feature-name>/
│
├── data/
│   ├── model/            # DTOs o modelos de red
│   ├── remote/           # Retrofit interfaces y mappers
│   ├── repository/       # Implementación de repositorios
│
├── domain/
│   ├── model/            # Entidades del dominio
│   ├── repository/       # Interfaces de repositorios
│   ├── usecase/          # Casos de uso
│
├── presentation/
│   ├── viewmodel/        # ViewModels
│   ├── ui/               # Activities, Fragments, Compose Screens
```

---

## 🧩 Dependencias entre capas

- `data` → depende de `domain`
- `domain` → no depende de ninguna capa
- `presentation` → depende de `domain`

Esto garantiza el principio de independencia de la arquitectura limpia.

---

## 📦 Naming Conventions

- Request → `NombreRequest`
- Response → `NombreResponse`
- Entities → `NombreEntity`
- Repositories → `NombreRepository`, `NombreRepositoryImpl`
- Use Cases → `AccionNombreUseCase`
- ViewModels → `NombreViewModel`

---

## 🔄 Flujo de Datos

1. ViewModel ejecuta un UseCase
2. UseCase invoca un método del Repository
3. Repository accede a un API (Remote) o Cache (Local)
4. Respuesta se mapea de Response → Entity
5. Entity se devuelve al ViewModel
6. ViewModel actualiza el UI state

---

## ✅ Buenas Prácticas

- Mapea siempre Response → Entity antes de exponer datos a capa de dominio o presentación
- Usa `Result<T>`, `Either<L, R>` o `sealed class` para representar estados
- Manten cada clase con una sola responsabilidad
- Prefiere `StateFlow` sobre `LiveData` para manejar estados reactivos
- Usa `@Inject constructor(...)` para dependencias

---

## 📄 Ejemplo de Caso de Uso

```kotlin
class GetUserProfileUseCase(
  private val repository: UserRepository
) {
  suspend operator fun invoke(): UserEntity {
    return repository.getUserProfile()
  }
}
```

---

## 📄 Ejemplo de ViewModel

```kotlin
@HiltViewModel
class UserProfileViewModel @Inject constructor(
  private val getUserProfileUseCase: GetUserProfileUseCase
) : ViewModel() {

  private val _state = MutableStateFlow<UserUiState>(UserUiState.Loading)
  val state: StateFlow<UserUiState> = _state

  fun loadUser() {
    viewModelScope.launch {
      try {
        val user = getUserProfileUseCase()
        _state.value = UserUiState.Success(user)
      } catch (e: Exception) {
        _state.value = UserUiState.Error(e.message ?: "Error desconocido")
      }
    }
  }
}