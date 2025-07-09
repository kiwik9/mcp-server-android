const PROMPTS = {
    "git-commit": {
        name: "git-commit",
        description: "Generate a Git commit message",
        arguments: [
            {
                name: "changes",
                description: "Git diff or description of changes",
                required: true
            }
        ]
    },
    "explain-code": {
        name: "explain-code",
        description: "Explain how code works",
        arguments: [
            {
                name: "code",
                description: "Code to explain",
                required: true
            },
            {
                name: "language",
                description: "Programming language",
                required: false
            }
        ]
    },

    "text-prompt": {
        name: "test-prompt",
        description: "return ever lorem",
        arguments: [
            {
                name: "name",
                description: "return lorem + name",
                required: true
            }
        ]
    }
};

export default PROMPTS