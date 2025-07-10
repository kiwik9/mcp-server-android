const UNIT_TEST_PROMPTS_REQ = {
    "generate-unit-test": {
        name: "generate-unit-test",
        description: "Genera una prueba unitaria para el archivo",
        arguments: [
            {
                name: "file-directory",
                description: "Archivo para el que se generarán las pruebas unitarias",
                required: true
            },
        ],
    },
    "generate-unit-test-for-function": {
        name: "generate-unit-test-for-function",
        description: "Genera pruebas unitarias para una función específica en un archivo",
        arguments: [
            {
                name: "file-directory",
                description: "Archivo para el que se generarán las pruebas unitarias",
                required: true
            },
            {
                name: "function-name",
                description: "Función para la que se generarán las pruebas unitarias",
                required: true
            },
        ],
    }
};

export default UNIT_TEST_PROMPTS_REQ;
