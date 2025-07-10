# Commit Message Guidelines

Para mantener un historial de cambios claro y consistente, sigue la siguiente convención para los mensajes de commit:

## Formato

```
[Type][TicketCode] commit message in English
```

- **Type**: El tipo de cambio. Usa uno de los siguientes:
  - `Feature` para nuevas funcionalidades
  - `Bugfix` para correcciones de errores
  - `Chore` para tareas de mantenimiento
  - `Docs` para cambios en la documentación
  - `Refactor` para refactorizaciones
  - `Test` para cambios en pruebas
  - `Style` para cambios de formato/código que no afectan la lógica
- **TicketCode**: Código del ticket o tarea relacionado (por ejemplo, JIRA, Trello, etc.). Si no aplica, puedes omitirlo o usar `N/A`.
- **commit message**: Descripción breve y clara del cambio realizado, siempre en inglés.

## Ejemplos

```
[Feature][ABC-123] Add user authentication with JWT
[Bugfix][DEF-456] Fix crash on login when password is empty
[Chore][N/A] Update dependencies to latest versions
[Docs][GHI-789] Add API usage examples to README
```

## Recomendaciones
- Usa el imperativo en la descripción ("Add", "Fix", "Update", etc.).
- Sé breve pero específico.
- Escribe siempre el mensaje en inglés.
- Si el commit afecta a varios tickets, puedes listarlos separados por coma: `[Feature][ABC-123,XYZ-789] ...`

---

Adherirse a esta convención facilita la revisión, el seguimiento y la automatización en el ciclo de vida del desarrollo.
