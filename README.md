#  Descripción Markdown Links 

Esta es  una herramienta que  usa [Node.js](https://nodejs.org/), lee y analiza archivos
en formato `Markdown` para verificar los links que contienen y determinar cuáles
están rotos o ya no son válidos.

## Introducción

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con
el sistema operativo, sistema de archivos, redes, etc...

## Consideraciones generales

Esta librería está implementada en JavaScript y se ejecuta con
Node.js.

## Parte obligatoria

Módulo instalable via `npm install <github-user>/md-links`. Este módulo
incluye tanto un ejecutable (_archivo cli_) que podemos invocar en
la línea de comando como una interfaz que podemos importar con `require`
para usarlo programáticamente.

### JavaScript API

El módulo puede importarse en otros scripts de Node.js y ofrece la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo. Si la ruta pasada es relativa, se resuelve como relativa al directorio desde donde se invoca node - _currentworking directory_.

- `options`: Un objeto con la siguiente propiedad:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. (tipo de dato booleano)

##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.

- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

```

### CLI (Línea de comando)

El ejecutable se puede ejecutar de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
Status: 200 OK https://nodejs.org/en/ -- ruta del archivo: /some/example.md 

```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo y la linea donde aparece, así como
también el texto que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
antonella@antonella-N552VW:~/Escritorio/proyectos/scl-2018-01-FE-markdown/src/js$ node mdLinks.js README.md --validate
cantidad de archivos en el directorio: > 3
{ Status: '200 OK https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg -- ruta del archivo: /home/antonella/Escritorio/proyectos/scl-2018-01-FE-markdown/src/js' }
{ Status: '200 OK https://nodejs.org/en/ -- ruta del archivo: /home/antonella/Escritorio/proyectos/scl-2018-01-FE-markdown/src/js' }
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

## Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.

### Función que extrae links
```javascript
//Es necesario que instales marked como dependencia de tu proyecto
//npm install --save marked
const Marked = require('marked');

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
      });
  };
  Marked(markdown, {renderer: renderer});

  return links;
};
```


