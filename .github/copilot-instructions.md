# Copilot Instructions for AI Agents in the `mcp` Codebase

## Overview
This project implements a prompt server for the Model Context Protocol (MCP), focused on serving and managing prompt templates for code generation and related tasks. The codebase is TypeScript-first, with build output in `build/`. Prompts are modular and organized for easy extension.

## Architecture & Key Components
- **Entry Point:** `src/index.ts` initializes an MCP server using `@modelcontextprotocol/sdk`, exposing prompt capabilities via the `PROMPTS` object.
- **Prompt Definitions:**
  - Main prompt registry: `src/prompts/prompts.ts` and `src/prompts/unittest/prompt_unit_test.ts`.
  - Prompts are grouped by domain (e.g., unit tests) and exported for server use.
  - Prompts include metadata (name, description, arguments) and a `prompt` string (often in Spanish for unit tests).
- **Build Output:** Compiled JS is in `build/`, mirroring the `src/` structure. Do not edit build files directly.
- **Prompt Server:** Uses `@modelcontextprotocol/sdk/server` and exposes prompt APIs. Handlers for listing and retrieving prompts are in `src/index.ts`.

## Developer Workflows
- **Build:**
  - Run `npm run build` to compile TypeScript to `build/`.
- **Add/Edit Prompts:**
  - Add new prompt modules under `src/prompts/` or subfolders.
  - Register new prompts in `src/prompts/prompts.ts`.
  - For unit test prompts, see `src/prompts/unittest/prompt_unit_test.ts` for Spanish-language templates.
- **Testing:**
  - No explicit test runner is defined; add tests as needed.
- **Run Server:**
  - The main binary is `build/index.js` (see `bin` in `package.json`).

## Project Conventions
- **Prompt Structure:** Each prompt is an object with `name`, `description`, `arguments`, and (optionally) a `prompt` template.
- **Language:** Some prompts (notably unit test generation) are in Spanish; maintain language consistency when adding new prompts.
- **TypeScript Only:** All source code is in TypeScript. Use ES2022+ features and Node16 modules.
- **No direct editing of build output.**

## Integration Points
- **External SDK:** Relies on `@modelcontextprotocol/sdk` for server and transport logic.
- **Prompt Expansion:** To add new prompt types, create a new file in `src/prompts/` and register it in the main prompt registry.

## Example: Adding a New Prompt
1. Create a new file (e.g., `src/prompts/my_prompt.ts`).
2. Define the prompt object with required metadata and template.
3. Import and add it to `src/prompts/prompts.ts`.

## Key Files & Directories
- `src/index.ts` — MCP server setup and prompt API handlers
- `src/prompts/prompts.ts` — Main prompt registry
- `src/prompts/unittest/prompt_unit_test.ts` — Unit test prompt templates (Spanish)
- `package.json` — Build and binary config

---
If any conventions or workflows are unclear, please provide feedback for further clarification.
