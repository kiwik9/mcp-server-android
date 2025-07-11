import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import PROMPTS from "./prompt/prompts.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { generateRestMethod } from "./prompt/cleanArchitecture/prompt_generate_rest_method.js";
import { generateModelPrompt } from "./prompt/cleanArchitecture/prompt_generate_model_service.js";
import { generateRepositoryPrompt } from "./prompt/cleanArchitecture/prompt_generate_repository.js";
import { generateUseCasePrompt } from "./prompt/cleanArchitecture/prompt_generate_use_case.js";

import {
    ListPromptsRequestSchema,
    GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const ANDROID_PROJECT_PATH = process.env.ANDROID_PROJECT_PATH;

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

    if (request.params.name === "generate-feature-clean-architecture") { 
        const modulePath = request.params.arguments?.["module-directory"] ?? "Unknown";
        const documentationPath = request.params.arguments?.["documentation-directory"] ?? "Unknown";
        let promptRestMethod = generateRestMethod(modulePath, documentationPath);
        let promptModel = generateModelPrompt(modulePath, documentationPath);
        let promptRepository = generateRepositoryPrompt(modulePath, documentationPath);
        let promptUseCase = generateUseCasePrompt(modulePath);
        return {
            messages: [
                {
                    role: "android-developer-expert",
                    content: {
                        type: "text",
                        text: promptModel
                    }
                },
                {
                    role: "android-developer-expert",
                    content: {
                        type: "text",
                        text: promptRestMethod
                    }
                },
                {
                    role: "android-developer-expert",
                    content: {
                        type: "text",
                        text: promptRepository
                    }
                },
                {
                    role: "android-developer-expert",
                    content: {
                        type: "text",
                        text: promptUseCase
                    }
                }
            ]
        };
    }

    if (!ANDROID_PROJECT_PATH) {
        console.error("ANDROID_PROJECT_PATH environment variable is not set");
        process.exit(1);
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