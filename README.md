## Menú

Este proyecto es un servidor MCP (Model Context Protocol) para Android, desarrollado en TypeScript/Node.js.

- [1. Configuración Visual Studio Insiders](#configuración-visual-studio-insiders)
- [2. Instalación](#instalación)
- [3. Configuracion MCP](#mcp)
- [4. Uso General](#uso-general)
- [5. Promp Unit Test](#unit-test)

## 1. Configuración Visual Studio Insiders

Para trabajar con este proyecto en Visual Studio Code Insiders, se recomienda:

### 1. Configuración de entorno 

#### 1. Instalar la versión Insiders desde https://code.visualstudio.com/insiders/
   
#### 2. Ir a Settings y darle click: 
   <img width="600" height="300" alt="image" src="https://github.com/user-attachments/assets/cf700784-5407-4505-b434-cf8232ff2b56" />
   
#### 3. Buscar chat:auto y darle check a estos dos valores
   <img width="600" height="300" alt="image" src="https://github.com/user-attachments/assets/23195856-f20c-4a53-ba89-8269de02ac8f" />
   
#### 4. Buscar chat:MaxRequest y poner el valor de 100 
   <img width="600" height="300" alt="image" src="https://github.com/user-attachments/assets/d48552b1-9aa0-4c2e-b88e-19bbad3ecb37" />

## 2. Instalación

### 1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd mcp-server-android
   ```
### 2. Instala las dependencias:
   ```sh
   npm install
   ```
### 3. Para compilar el proyecto:
```sh
npm run build
```

## 3. Configuracion MCP 

### 1. Para agregar el mcp En el panel superior darle click, buscar >MCP y darle click a MCP: Open configuration server
<img width="644" height="121" alt="image" src="https://github.com/user-attachments/assets/44daa4a2-877e-4e43-ab6a-fed824a342ce" />

### 2. Se abria un archivo de configuracion mcp.json el cual solo modificaral la ubicacion de la carpeta donde se generea el compilado al lanzar el comando npm run build
<img width="688" height="313" alt="image" src="https://github.com/user-attachments/assets/6507aa78-35b9-41e2-a85b-8b4971d9c698" />

### 3. Para iniciar el MCP darle click a start, ademas tendras opciones de restart, stop, resume.
   <img width="276" height="58" alt="image" src="https://github.com/user-attachments/assets/08cb5562-bb3c-49d5-b499-ff68ad8376ec" />

### 3. Iniciar MCP de forma (alternativa)
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/2932c612-cb08-4375-9de8-85070879b3d1" />

En la barra izquierda tendras la opcion de agregar e iniciar el mcp por el VSC

## 4. Uso General

### 1. Abrir Chat 
<img width="896" height="168" alt="image" src="https://github.com/user-attachments/assets/103e35a4-349d-4700-8475-ff3e2420a043" />

### 2. Cambiar modo a agente 
<img width="315" height="192" alt="image" src="https://github.com/user-attachments/assets/16920b44-5dc1-4919-b131-26169e27b397" />

### 3. Para acceder a tools y promps, al escribir /{tu nombre del mcp agregado en la configuracion anterior}, podras ver todos los promps
<img width="447" height="116" alt="image" src="https://github.com/user-attachments/assets/b4df0fcb-3312-4423-acb6-08b83a3d611c" />

## 5. Promp Unit Test

### 1. Escribir /unittest y darle clic
<img width="451" height="43" alt="image" src="https://github.com/user-attachments/assets/eefbd3a2-ac31-4378-83c8-98bb005b664f" />

### 2. Saldra una ventana en la parte superior para enviarle un parametro que es el path del archivo que se quiere hacer pruebas unitarias 

#### Obtener el Path en VSC, dar click derecho sobre el archivo
<img width="382" height="484" alt="image" src="https://github.com/user-attachments/assets/dba59630-65d6-4a8d-8cfd-60db246faf6c" />

#### Usar el Path copiado en el parametro requerido
<img width="618" height="115" alt="image" src="https://github.com/user-attachments/assets/52eed0f9-ddb3-483f-a45c-9ca5b17724ba" />

### 3. Se obtendra el promp y se enviara al agente
<img width="305" height="347" alt="image" src="https://github.com/user-attachments/assets/867b2b4a-5198-43b2-a857-ab4f8d751e05" />

## Estructura del Proyecto

- `src/` - Código fuente principal
  - `index.ts` - Punto de entrada del servidor
  - `doc/` - Documentación interna
  - `prompts/` - Prompts y utilidades para generación de código y validaciones
  - `util/` - Utilidades varias
- `build/` - Archivos compilados y documentación generada
- `package.json` - Dependencias y scripts de npm
- `tsconfig.json` - Configuración de TypeScript
