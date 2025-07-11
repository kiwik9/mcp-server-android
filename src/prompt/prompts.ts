const PROMPTS = {
    "generate-feature-clean-architecture": {
        name: "generate-feature-clean-architecture",
        description: "Generar los componentes de un feature siguiendo Clean Architecture en Android",
        arguments: [
            {
                name: "module-directory",
                description: "Nombre del directorio del módulo feature en Android",
                required: true
            },
            {
                name: "documentation-directory",
                description: "Nombre del directorio de documentación del proyecto",
                required: true
            }
        ]
    }
};

export default PROMPTS