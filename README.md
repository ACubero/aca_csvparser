# Extensión para Edge: CSV Parser

Esta extensión para Microsoft Edge permite parsear archivos CSV (valores separados por comas) y mostrar los datos en una tabla dentro de un popup.  Ofrece una interfaz moderna y fácil de usar, con funciones de arrastrar y soltar, redimensionamiento y visualización en una nueva pestaña.

## Características

*   **Fácil de usar:**  Selecciona un archivo CSV mediante el botón o arrástralo y suéltalo directamente en la ventana de la extensión.
*   **Visualización clara:**  Los datos CSV se presentan en una tabla HTML, facilitando su lectura y análisis.
*   **Manejo de errores:**  La extensión muestra mensajes de error si el archivo no es un CSV válido, si está vacío o si hay problemas al leerlo.
*   **Compatible con diferentes formatos de línea:**  Maneja correctamente los finales de línea de Windows, Unix y Mac antiguos.
*   **Arrastrar y soltar (Drag and Drop):**  Permite arrastrar y soltar archivos CSV directamente en la ventana de la extensión.
*   **Redimensionamiento manual:**  La ventana de la extensión se puede redimensionar manualmente arrastrando desde la esquina inferior derecha.  El tamaño máximo está limitado al doble del tamaño inicial.
*   **Abrir en nueva pestaña:**  Un botón permite abrir la tabla parseada en una nueva pestaña del navegador, con estilos básicos para una correcta visualización.
*   **Diseño moderno:**  Interfaz de usuario moderna con una paleta de colores basada en el verde.
*   **Estructura de carpetas profesional:**  El código está organizado en carpetas para facilitar la escalabilidad y el mantenimiento.
*   **Codificación UTF-8:**  Soporte completo para caracteres especiales y acentos.

## Instalación

1.  **Descarga el código:** Descarga este repositorio como un archivo ZIP o clónalo usando Git:

    ```bash
    git clone https://github.com/ACubero/aca_csvparser.git
    ```

2.  **Carga la extensión en Edge:**
    *   Abre Microsoft Edge.
    *   Ve a `edge://extensions`.
    *   Activa el "Modo desarrollador" (Developer mode) en la esquina superior derecha.
    *   Haz clic en "Cargar desempaquetada" (Load unpacked).
    *   Selecciona la carpeta donde descargaste o clonaste el código de la extensión (la carpeta `csv-parser-extension`).

3.  **¡Listo!** La extensión debería aparecer en la barra de herramientas de Edge.

## Uso

1.  Haz clic en el icono de la extensión en la barra de herramientas.
2.  Tienes dos opciones para cargar un archivo CSV:
    *   **Botón "Seleccionar archivo CSV":**  Haz clic en el botón y elige el archivo CSV.
    *   **Arrastrar y soltar:**  Arrastra un archivo CSV desde tu explorador de archivos y suéltalo en el área designada dentro de la ventana de la extensión.
3.  Los datos del CSV se mostrarán en una tabla dentro del popup de la extensión.
4.  **Redimensionar:** Arrastra desde la esquina inferior derecha de la ventana de la extensión para cambiar su tamaño.
5.  **Abrir en nueva pestaña:** Haz clic en el botón "Abrir en Nueva Pestaña" para ver la tabla en una pestaña separada.

## Carpetas del proyecto

*   **`background/`:** Contiene el script de fondo (`background.js`).
*   **`images/`:** Contiene los iconos de la extensión (`icon16.png`, `icon48.png`, `icon128.png`).
*   **`popup/`:** Contiene los archivos para el popup:
    *   `popup.html`: Estructura HTML.
    *   `popup.js`: Lógica JavaScript.
    *   `styles.css`: Estilos CSS.
*   **`libs/`:** (Opcional) Para bibliotecas JavaScript de terceros (ej: Papa Parse).
*   **`manifest.json`:** Archivo de manifiesto de la extensión.
*   **`LICENSE.md`:** Licencia del proyecto.
*   **`README.md`:** Este archivo.

## Posibles Mejoras

*   **Usar una biblioteca de parsing CSV:** Integrar Papa Parse ([https://www.papaparse.com/](https://www.papaparse.com/)) para un manejo más robusto de archivos CSV complejos.
*   **Opciones de configuración:** Permitir configurar el delimitador, la codificación, etc.
*   **Filtrado y ordenamiento:** Añadir funciones para filtrar y ordenar los datos.
*   **Exportar datos:** Permitir exportar a otros formatos (JSON, Excel).
*   **Integración con la página actual:** Usar un "content script" para interactuar con la página web actual.

## Licencia

Este proyecto está bajo la Licencia MIT.  Consulta el archivo `LICENSE.md` para más detalles.