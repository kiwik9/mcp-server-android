
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

function getDocumentationFile(filePath: string): string {
    // Calcula la ruta absoluta a build/doc/ desde la ubicación real del archivo fuente
    const currentDir = dirname(fileURLToPath(import.meta.url));
    // Sube dos niveles (src/util -> src -> mcp) y entra a build/doc
    return resolve(currentDir, "../../build/doc/", filePath);
}

export default getDocumentationFile;