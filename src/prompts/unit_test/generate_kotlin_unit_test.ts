
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export default function prompUnitTest(filePath: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const docPath = path.resolve(__dirname, '../doc/generate-unit-test.md');
    let fileContent = '';
    try {
        fileContent = fs.readFileSync(docPath, 'utf-8');
    } catch (e) {
        fileContent = '';
        console.error('Error reading documentation file:', e);
    }

    const prompt = `
Eres un experto desarrolador senior en desarrollo y pruebas unitarias para Android con kotlin.

Tu tarea es generar un archivo de pruebas unitarias en **Kotlin** para el archivo que te estan compartiendo en un path.

${filePath ? 'el archivo a analizar es: ' + filePath : 
`Si el archivo filePath no es un archivo que encuentres como agente del proyecto 
    preguntale el path del url y en caso no lo encuentres hazle saber al usuario que necesitas el path una vez que te lo pase continua con los pasos.
`}

    ${fileContent ? ` 
        Ten encuenta esta documentacion para hacer un buen test
    --- INICIO DE DOCUMENTACIÓN CON CÓDIGO ---
${fileContent}
--- FIN DE DOCUMENTACIÓN ---
    `: ""}

Cada pregunta que hagas al usuario debe ser clara y directa, y debes hacerla una por una, una vez que recibas la respuesta continua con el siguiente paso. hasta que generes el archivo final.


IMPORTANTE:
Antes de generar los tests, lee la definición completa de cada clase de modelo y asegúrate de que todas las instancias creadas en los tests incluyan todos los parámetros requeridos por su constructor.

Si algún parámetro no es relevante para el test, usa valores dummy válidos.
No asumas valores por defecto siempre pon todos los parametros que requiere el constructor de la clase.
Si no puedes leer la definición de la clase, pregunta al usuario por la firma completa antes de generar los tests.


1. **Analiza el archivo cuidadosamente y todos sus import que tenga y sus constructores.**

2. **Haz preguntas necesarias al usuario antes de comenzar**, como:
   - ¿Hay algún caso de uso o comportamiento esperado específico que no sea obvio en el código?

Una vez respondidas estas preguntas:

3. Genera pruebas unitarias siguiendo **buenas prácticas**:
   - Usa el patrón **Arrange - Act - Assert**.
   - Mantén nombres claros y expresivos en los test.
   - Separa los casos positivos, negativos y bordes.
   - Usa mocks o spies solo donde sea necesario.
   - Asegúrate de cubrir la lógica del archivo original de forma significativa.
   - Asegúrate de que todas las instancias de clases usen todos los parámetros requeridos por su constructor, usando valores dummy si es necesario.

4. Valida que todas los objetos que crees o funciones que utilices tengan todos los parametros necesarios para eso debes escanear
   todas las importaciones de la clase a la que le haras pruebas para validar.

5. Al final, **genera el contenido del archivo de prueba** completo en un archivo kotlin de pruebas en su lugar correcto dependiendo si es una prueba
unitaria o prueba de ui.

`;

    return prompt;
}