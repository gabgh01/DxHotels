# DX Hotels Playwright Testing

Este repositorio contiene pruebas automatizadas utilizando Playwright para la página de demostración de DX Hotels: [https://demos.devexpress.com/rwa/dxhotels/](https://demos.devexpress.com/rwa/dxhotels/).
Para ello se implementa playwright usando POM, para la reutilización de elementos y acciones que son recursivas como un login.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/gabgh01/DxHotels.git
   cd DxHotels
   ```
2. **Instala las dependencias:**
    ```bash
     npm install

    ```
## Estructura del Proyecto
 - **src/** Contiene toda la logica del proyecto las paginas, utilidades y modelos 
 - **test/** Contiene los archivos de ejecución de las pruebas
 - **src/pages** Contiene las clases POM del proyecto las cuales tienen la logica y las acciones a realizar en el sitio web a automatizar.
 - **src/models** Contiene las interfaces implementadas para poder tener un tipado y hacer el proyecto mantenible.
 - **src/utils** Contiene las clases utilitarias y transversales a todo el proyecto y cuya funcion es realizar funciones muy especificas como convertir texto a numero, manejo de formato de fechas y lectura de imagen para extraer texto.
 - **package.json** Archivo de configuración del proyecto con las dependencias y scripts.
 - **playwright.config.ts** archivo de configuración necesario para la ejecución de pruebas con playwright.

## Escenarios de pruebas
 el proyecto cuenta con los siguientes escenarios:
 - **login** el cual contiene el escenario de logueo exitoso y logueo fallido.
 - **hotel-reservation** el cual contiene el escenario de seleccion hotel registrando los datos de reserva, filtrando y seleccion de hotel de acuerdo a un modelo implementado.
   

## Ejecución de las Pruebas
 1. Para ejecutar las pruebas, utiliza el siguiente comando:
     ```javascript
      npx playwright test

    ```
2. Ejecucion modo visual:

    ```javascript
      npx playwright test --ui

    ```
3. ejecutar prueba especifica.
   ```javascript
     npx playwright test -g login.spec.ts

    ```
## Author

- [@Gabriel Galvan](https://github.com/gabgh01)



