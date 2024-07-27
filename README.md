# Clippic
Extensión simple de Chrome, recorta muchas selecciones y muévelas al portapapeles o guárdalas como HTML, TXT, con o sin URL.
Trabajo en progreso...
## ¿Cómo probarlo?
Ve al menú de extensiones, luego activa el "developers mode" y elige "load unpacked".

## Creación de una Extension de Chrome 
Estructura de una extensión Chrome:
1. manifest.json Este fichero define lo siguiente: 
    -Versión del propio archico manifest.json 
    -Nombre y versión de la extensión.
    -Descripción de lo que hace la extensión.
    -Permisos requeridos
    -Scripts que se ejecutan (background scripts, content scripts) 
    -Browser action or page action 
    -Iconos
2. Script en segundo plano (p. ej., background.js) Este script se ejecuta en segundo plano y administra el comportamiento de la extensión. Puede escuchar eventos del navegador e interactuar con otras partes de la extensión.
3. Scripts de contenido (p. ej., content.js) Estos scripts se ejecutan en el contexto de las páginas web. Pueden leer y modificar el contenido de las páginas que visita el usuario.
4. HTML emergente (p. ej., popup.html) Este es el archivo HTML para la ventana emergente de la extensión, que aparece cuando el usuario hace clic en el ícono de la extensión en la barra de herramientas.
5. Script emergente (p. ej., popup.js) Este archivo JavaScript controla el comportamiento de la ventana emergente.
6. Íconos Las extensiones de Chrome generalmente incluyen íconos en varios tamaños (16x16, 48x48 y 128x128 píxeles) para diferentes contextos.
Componentes opcionales:
7. Página de opciones Una página HTML que permite a los usuarios configurar los ajustes de la extensión.
8. Archivos CSS Para diseñar la ventana emergente y la página de opciones.
El archivo manifest.json une todos estos componentes y especifica qué scripts deben ejecutarse y dónde y a qué recursos debe acceder la extensión.
Estructura de directorio típica para una extensión de Chrome:
mi_extension/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── options.html (opcional)
├── options.js (opcional)
├── styles.css (opcional)
│
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
