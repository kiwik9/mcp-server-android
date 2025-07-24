# Guía para Crear un Pull Request (PR)

Esta guía define el formato y los elementos que deben incluirse al crear un Pull Request (PR) para asegurar la claridad, trazabilidad y consistencia en el flujo de trabajo colaborativo.

---

## 🏷️ Nombre del Pull Request (Título)

El título debe ser conciso, descriptivo y seguir la siguiente convención:

[Tipo] Nombre corto del cambio (#ID opcional)

## Formato
```
[Type][TicketCode] commit message in English
```
[TicketCode] -> usualmente se peude sacar del nombre de la rama
Ejemplos: 
    Rama feature/DDAP12-dev Ticket DDAP12

### Ejemplos:
- `[Fix][DDAP12] Corrige bug al iniciar sesión (#456)`
- `[Feature][DDAP123] Agrega pantalla de registro de usuarios`
- `[Refactor][DDAP12] Limpieza del componente Header`

**Tipos comunes**:
- `Bugfix`: Corrección de errores que parten de una rama de desarrollo 
- `Bugfix`: Corrección de errores que parten de una rama de produccion
- `Feature`: Nuevas funcionalidades
- `Release`: Rama de produccion

---

## ✍️ Descripción del PR

Incluye una descripción clara y detallada de los cambios realizados. Usa este formato:

### Descripción general
Breve resumen del objetivo del PR.

### Cambios realizados
- Lista de cambios principales
- Estructura de carpetas afectadas
- Comportamiento nuevo o modificado

### Motivo del cambio
Explica por qué se hicieron estos cambios (bug, nueva funcionalidad, etc.).

### Evidencia
Capturas de pantalla, gifs, o referencias a historias de usuario si aplica. esto es opcional.

---

## 💬 Comentarios y Revisiones

- Asegúrate de responder a los comentarios de revisión directamente en el hilo correspondiente.
- Si aplicaste una sugerencia, marca el comentario como resuelto.
- Utiliza `@usuario` para mencionar y notificar al revisor si necesitas atención especial.

---

## ✅ Checklist antes de enviar el PR

- [ ] Código formateado (Ktlint, etc.)
- [ ] Maxima cantidad de archivos modificados 20 (excluyendo archivos eliminados)
- [ ] Pruebas pasan exitosamente (si aplica)
- [ ] Se añadieron pruebas unitarias/casos nuevos
- [ ] El código ha sido probado manualmente
- [ ] Se actualizó la documentación (si aplica)
- [ ] El título y la descripción siguen esta guía

---

## 📎 Ejemplo completo

**Título:**  
`[Feature][DDAPP-12] Agrega validación de correo en pantalla de login (#123)`

**Descripción:**

### Descripción general  
Se agrega una validación local de correo electrónico antes de enviar el formulario de login.

### Cambios realizados
- Se añadió método `isValidEmail()` en `Utils.kt`
- Se actualizó `LoginViewModel` para validar el input
- Mensaje de error mostrado debajo del input

### Motivo del cambio  
Prevención de errores del lado del cliente y mejora en UX.

