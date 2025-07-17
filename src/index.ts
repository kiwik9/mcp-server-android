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
        let promptModel = generateModelPrompt(modulePath, documentationPath);
        promptModel = "Paso 1: " + promptModel;
        promptModel = promptModel.replace(/\s+/g, ' ').trim();
        let promptRestMethod = generateRestMethod(modulePath, documentationPath);
        promptRestMethod = "Paso 2: " + promptRestMethod;
        promptRestMethod = promptRestMethod.replace(/\s+/g, ' ').trim();
        let promptRepository = generateRepositoryPrompt(modulePath, documentationPath);
        promptRepository = "Paso 3: " + promptRepository;
        promptRepository = promptRepository.replace(/\s+/g, ' ').trim();
        let promptUseCase = generateUseCasePrompt(modulePath, documentationPath);
        promptUseCase = "Paso 4: " + promptUseCase;
        promptUseCase = promptUseCase.replace(/\s+/g, ' ').trim();
        let finalText = "Una vez completada la creación de los componentes, mostrar un mensaje de éxito, y mostrar en un listado la lista de los nombres de los componentes creados.";
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
                },
                {
                    role: "ios-developer-senior",
                    content: {
                        type: "text",
                        text: finalText
                    }
                }
            ]
        };
    }

    throw new Error("Prompt implementation not found");
});

if (!ANDROID_PROJECT_PATH) {
    console.error("ANDROID_PROJECT_PATH environment variable is not set");
    process.exit(1);
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server is running and listening for requests...");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});