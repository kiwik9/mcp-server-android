import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { z } from "zod";
import prompUnitTest from "./prompts/unit_test/generate_kotlin_unit_test.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import getDocumentationFile from "./util/filesUtils.js";
import promptGenerateCommit from "./prompts/unit_test/generate_commit.js";
import prompPRValidator from "./prompts/unit_test/pr_validator.js";

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
    "pr-validator",
    {
        title: "Validación de Pull Requests",
        description: "Valida los cambios propuestos en un Pull Request.",
        argsSchema: { }
    },
    ({ }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: prompPRValidator()
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

server.registerResource(
    "pr-guidelines",
    "doc://pr-guidelines",
    {
        title: "Guía de Pull Requests",
        description: "Documento de buenas prácticas y requisitos para Pull Requests.",
        mimeType: "text/markdown"
    },
    async (uri) => {
        const info = readFileSync(getDocumentationFile("pr-guidelines.md"), "utf-8");
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

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server is running and listening for requests...");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});