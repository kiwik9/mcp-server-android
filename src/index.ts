import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { z } from "zod";
import prompUnitTest from "./prompts/unit_test/generate_kotlin_unit_test.js";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import getDocumentationFile from "./util/filesUtils.js";
import promptInstallApp from "./prompts/build_app.js";
import promptGenerateCommit from "./prompts/unit_test/generate_commit.js";

const server = new McpServer({
    name: "android-mcp",
    version: "1.0.0"
});

server.registerPrompt(
    "unit-test",
    {
        title: "Generador de pruebas unitarias en Kotlin",
        description: "Genera un archivo de prueba unitaria en Kotlin a partir de un archivo fuente.",
        argsSchema: {
            urlPath: z.string().describe("Ruta del archivo fuente para generar la prueba unitaria"),
        }
    },
    ({ urlPath }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: prompUnitTest(urlPath)
                }
            }
        ]
    })
);

server.registerPrompt(
    "generate-commit",
    {
        title: "Creación de mensajes de commit",
        description: "Genera un mensaje de commit a partir de archivos fuente.",
        argsSchema: { }
    },
    ({ }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: promptGenerateCommit()
                }
            }
        ]
    })
);


server.registerPrompt(
    "install-app",
    {
        title: "Instalador de aplicaciones Android",
        description: "Genera un script para instalar una aplicación Android en un emulador.",
        argsSchema: { }
    },
    ({ }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: promptInstallApp()
                }
            }
        ]
    })
);

server.registerResource(
    "unit-test-guidelines-doc",
    "doc://generate-unit-test",
    {
  title: "Guía para generar pruebas unitarias en Kotlin",
        description: "Documento de buenas prácticas y requisitos para generar pruebas unitarias en Kotlin.",
        mimeType: "text/markdown"
    },
    async (uri) => {
        const info = readFileSync(getDocumentationFile("generate-unit-test.md"), "utf-8");
        return {
            contents: [{
                uri: uri.href,
                text: info
            }]
        };
    }
);

server.registerResource(
    "commit-message-guidelines-doc",
    "doc://commit-message-guidelines",
    {
        title: "Guía de mensajes de commit",
        description: "Documento de buenas prácticas y requisitos para mensajes de commit.",
        mimeType: "text/markdown"
    },
    async (uri) => {
        const info = readFileSync(getDocumentationFile("commit-message-guidelines.md"), "utf-8");
        return {
            contents: [{
                uri: uri.href,
                text: info
            }]
        };
    }
);

server.registerTool(
    "get-document",
    {
        title: "Obtiene el documento del mcp",
        description: "Obtiene un documento del MCP por su URI.",
        inputSchema: {
            uri: z.string().describe("URI del documento a obtener, por ejemplo: doc://generate-unit-test")
        }
    },
    async ({ uri }) => {
        let fileName = null;
        if (uri.startsWith("doc://")) {
            const docName = uri.replace("doc://", "");
            fileName = `${docName}.md`;
        } else if (uri.startsWith("doc://")) {
            const docName = uri.replace("doc://", "");
            fileName = `${docName}.md`;
        } else {
            fileName = uri;
        }
        const fileContent = readFileSync(getDocumentationFile(fileName), "utf-8");
        return {
            content: [{
                type: "text",
                text: fileContent
            }]
        };
    }
);


server.registerTool(
        "boot-android-emulator",
    {
        title: "Bootea un emulador de Android",
        description: "Lista los emuladores disponibles y bootea uno especificado por nombre.",
        inputSchema: {
            avdName: z.string().describe("Nombre del AVD a bootear. Si no se especifica, se lista la AVDs disponibles.")
        }
    },
    async ({ avdName }) => {
        const { execSync, spawn } = await import("child_process");
        let output = "";
        let emulatorPath = "/Users/jperez/Library/Android/sdk/emulator/emulator";
        if (!avdName || avdName.trim() === "") {
            try {
                output = execSync(`${emulatorPath} -list-avds`).toString();
            } catch (err) {
                output = "No se pudo listar los AVDs. Verifica la instalación del emulador.";
            }
        } else {
            try {
                spawn(emulatorPath, ["-avd", avdName, "-no-snapshot-save"], {
                    detached: true,
                    stdio: "ignore"
                }).unref();
                output = `Emulador ${avdName} lanzado en segundo plano.`;
            } catch (err) {
                console.error("Error al bootear el emulador:", err);
                output = "Error al bootear el emulador. Asegúrate de que el nombre del AVD sea correcto y que el emulador esté instalado.";
            }
        }
        return {
            content: [{
                type: "text",
                text: output
            }]
        };
    }
);

server.registerTool(
    "validate-android-env",
    {
        title: "Valida configuración de entorno Android",
        description: "Verifica si 'emulator' y 'adb' están disponibles en el PATH y listos para usarse.",
        inputSchema: {},
    },
    async () => {
        const { execSync } = await import("child_process");
        let emulatorOk = false;
        let adbOk = false;
        let emulatorPath = "";
        let adbPath = "";
        let errors = [];
        try {
            emulatorPath = execSync("which emulator").toString().trim();
            emulatorOk = !!emulatorPath;
        } catch {
            errors.push("'emulator' no está en el PATH");
        }
        try {
            adbPath = execSync("which adb").toString().trim();
            adbOk = !!adbPath;
        } catch {
            errors.push("'adb' no está en el PATH");
        }
        return {
            content: [{
                type: "text",
                text: `emulator: ${emulatorOk ? 'OK' : 'NO ENCONTRADO'}${emulatorPath ? ' (' + emulatorPath + ')' : ''}\nadb: ${adbOk ? 'OK' : 'NO ENCONTRADO'}${adbPath ? ' (' + adbPath + ')' : ''}\n${errors.length ? '\nErrores:\n' + errors.join('\n') : ''}`
            }]
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server is running and listening for requests...");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});