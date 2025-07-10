const UNIT_TEST_PROMPTS_RES = {
  "generate-unit-test": {
    description: "Flujo para generar una prueba unitaria: solicita el archivo y luego da la instrucción detallada.",
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: "¿Para qué archivo deseas generar pruebas unitarias? Por favor, proporciona la ruta o nombre del archivo."
        }
      },
      {
        role: "user",
        content: {
          type: "text",
          text: "module-directory"
        }
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: "Perfecto. Ahora generaré pruebas unitarias completas y profesionales para todas las funciones y clases públicas en el archivo proporcionado. Utilizaré Kotlin y JUnit. Consultaré el recurso local 'src/prompts/unit_test/doc/generate-unit-test.md' de este proyecto para seguir las mejores prácticas, estructura y metodologías recomendadas. Cubriré casos normales, casos límite, manejo de errores y ejemplos de uso real. Incluiré nombres descriptivos para las pruebas, comentarios claros y validaré tanto resultados como efectos secundarios."
        }
      }
    ]
  },
  "generate-unit-test-for-function": {
    description: "Flujo para generar pruebas unitarias para una función: solicita archivo y función, luego da la instrucción detallada.",
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: "¿En qué archivo se encuentra la función para la que deseas generar pruebas unitarias? Por favor, proporciona la ruta o nombre del archivo."
        }
      },
      {
        role: "user",
        content: {
          type: "text",
          text: "module-directory"
        }
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: "¿Cuál es el nombre de la función para la que deseas generar pruebas unitarias?"
        }
      },
      {
        role: "user",
        content: {
          type: "text",
          text: "function-name"
        }
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: "Perfecto. Ahora generaré pruebas unitarias detalladas y profesionales para la función indicada en el archivo proporcionado. Utilizaré Kotlin y JUnit. Consultaré el recurso 'generate-unit-test' para seguir la estructura y mejores prácticas recomendadas. Cubriré casos normales, casos límite, manejo de errores, entradas inválidas y ejemplos de uso real. Usaré nombres descriptivos, comentarios explicativos y validaré tanto el resultado como los efectos secundarios o excepciones."
        }
      }
    ]
  }
};

export default UNIT_TEST_PROMPTS_RES;
