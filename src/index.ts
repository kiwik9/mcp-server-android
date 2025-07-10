import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import PROMPTS_REQ from "./prompts/unit_test/request/prompts_req.js";
import PROMPTS_RES from "./prompts/unit_test/response/prompt_unit_test_res.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
    ListPromptsRequestSchema,
    GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import prompUnitTest from "./prompts/unit_test/generate_kotlin_unit_test.js";
import { ca } from "zod/v4/locales";


const server = new Server({
    name: "promp-server-android",
    version: "1.0.0"
}, {
    capabilities: {
        prompts: PROMPTS_REQ
    }
});

server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
        prompts: Object.values(PROMPTS_REQ)
    };
});


server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const promptList = Object.entries(PROMPTS_RES).map(([name, value]) => ({ name, ...value }));
    const name = request.params.name
    const prompt = promptList.find(p => p.name === name);

    if (!prompt) {
        throw new Error(`Prompt not found: ${request.params.name}`);
    }

    if (request.params.name === "generate-unit-test") {
        let filePath = request.params.arguments?.["file-directory"] || "";
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: prompUnitTest(filePath)
                    }
                }
            ]
        };
    }
    throw new Error("Prompt implementation not found");
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server is running and listening for requests...");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});