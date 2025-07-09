import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import PROMPTS from "./prompt/prompts.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
    ListPromptsRequestSchema,
    GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";


const server = new Server({
    name: "promp-server-android",
    version: "1.0.0"
}, {
    capabilities: {
        prompts: {

        }
    }
});

server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
        prompts: Object.values(PROMPTS)
    };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const prompt = PROMPTS[request.params.name as keyof typeof PROMPTS];

    if (!prompt) {
        throw new Error(`Prompt not found: ${request.params.name}`);
    }

    if (request.params.name === "git-commit") {
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Generate a concise but descriptive commit message for these changes:\n\n${request.params.arguments?.changes}`
                    }
                }
            ]
        };
    }

    if (request.params.name === "explain-code") {
        const language = request.params.arguments?.language || "Unknown";
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Explain how this ${language} code works:\n\n${request.params.arguments?.code}`
                    }
                }
            ]
        };
    }

    if (request.params.name === "test-prompt") {
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `return lorem + ${request.params.arguments?.name}`
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