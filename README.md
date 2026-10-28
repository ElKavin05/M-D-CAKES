# M&D Cakes · Propuesta comercial de landing page

Muestra de diseño y presentación comercial para **M&D Cakes**, pastelería artesanal de pasteles personalizados en Pacora, Panamá. Proyecto desarrollado como propuesta de CirenCore, pendiente de aprobación por parte del negocio.

---

## Ejecución y vista previa local

La carpeta publicable y autocontenida es `dist/`. Para iniciar la vista previa local:

```bash
# Desde la carpeta del proyecto sites/md-cakes:
python -m http.server 5190 --bind 127.0.0.1 --directory dist
```

Luego abre en tu navegador:
[http://127.0.0.1:5190](http://127.0.0.1:5190)

---

## Estructura de archivos

```
sites/md-cakes/
├── dist/                          # Carpeta publicable (archivos estáticos finales)
│   ├── index.html                 # Marcado semántico y accesible con noindex
│   ├── style.css                  # Estilos responsivos, paleta artesanal y variables
│   ├── app.js                     # Búsqueda, filtros, carrusel, modal y WhatsApp
│   └── assets/                    # Recursos visuales (logo y fotografías autorizadas)
├── .gitignore                     # Exclusiones de control de versiones
└── README.md                      # Documentación canónica del sitio
```

---

## Identidad visual y dirección de diseño

- **Estética:** Pastelería artesanal cálida, limpia, con fotografía y detalles protagonistas, espacios amplios y tipografía cuidada.
- **Paleta de colores (provisional para muestra, a conciliar con el logo final):**
  - Fondo base: Crema cálida (`--cream`: `#fdf8f3`)
  - Tinta de texto: Marrón cacao artesanal (`--cocoa`: `#4a2c1a`)
  - Acento primario: Rosa pétalo pastelero (`--rose`: `#c8748a`)
  - Fondos secundarios: Rosa blush (`--blush`: `#f5e8e8`)
  - Acento cálido: Dorado horneado (`--gold`: `#b8895a`)
  - Texto secundario: Muted cálido (`--muted`: `#8a6858`)
  - Líneas y bordes: Arena suave (`--line`: `#ede0d8`)
  - Fondo de tarjetas: Papel marfil (`--paper`: `#fff9f5`)
- **Tipografía:**
  - Títulos expresivos: *Cormorant Garamond* (Google Fonts)
  - Textos y lectura: *DM Sans* (Google Fonts)
  - Alternativas locales de respaldo: Georgia, system-ui, sans-serif.

---

## Canales y enlaces de contacto

- **WhatsApp empresarial:** `+507 6179-5457` (`https://wa.me/50761795457?text=...`)
- **Instagram oficial:** [https://www.instagram.com/md.cakespty/](https://www.instagram.com/md.cakespty/)
- **Ubicación:** Pacora, Panamá (sin geolocalización inventada ni dirección aproximada).

---

## WhatsApp y construcción de mensajes

Todos los botones y enlaces codifican el texto mediante `encodeURIComponent`. Los mensajes se estructuran de forma contextual:

1. **General (Hero, Cierre, Cabecera y Flotante):**
   > `Hola, M&D Cakes. Vi su página y me gustaría consultar por un pastel personalizado.`
2. **Contextual por diseño (Tarjetas y Modal):**
   > `Hola, M&D Cakes. Vi el diseño "[Nombre]" ([Categoría]) en su página y me gustaría consultarlo.`  
   *(Incluye notas opcionales si el visitante las completó)*
3. **Módulo de consulta ("Prepara tu consulta"):**
   Construye un mensaje limpio incluyendo únicamente los campos que el usuario completó:
   - Referencia o diseño
   - Fecha deseada
   - Cantidad aproximada de personas
   - Idea de personalización

El visitante siempre inicia el contacto voluntariamente; no se realizan envíos automáticos ni se capturan datos sensibles.

---

## Procedencia de recursos e imágenes

- **Logo:** Se incluye una composición vectorial SVG referencial en la cabecera a la espera de integrar el archivo oficial entregado por el cliente.
- **Fotografías:** Composiciones ilustrativas vectoriales identificadas explícitamente como **referenciales**. No se emplearon imágenes de stock ficticias ni generaciones engañosas que pretendan hacerse pasar por trabajos reales de M&D Cakes.
- **Instagram verificado:** La cuenta `@md.cakespty` es el canal de referencia pública; se debe solicitar autorización previa antes de descargar e incorporar fotografías directas en el catálogo definitivo.

---

## Datos pendientes de confirmar con el cliente

Antes de pasar a producción o publicar en un dominio definitivo:
1. **Logo oficial en alta resolución:** Incorporar el archivo gráfico original y reajustar los tonos exactos si difieren de la muestra.
2. **Fotografías reales autorizadas:** Selección de 6 a 12 creaciones destacadas con sus descripciones precisas.
3. **Catálogo de sabores y rellenos:** Listado oficial de bizcochos, cremas y coberturas disponibles.
4. **Condiciones de entrega / retiro:** Puntos de entrega en Pacora o cobertura de envíos hacia la ciudad.
5. **Tiempos mínimos de anticipación:** Plazos requeridos para agendar pedidos ordinarios o de alta complejidad.
6. **Políticas de confirmación y abono:** Porcentaje de anticipo y métodos de pago aceptados para coordinar por WhatsApp.

---

## Alcance del proyecto

Landing page estática optimizada para exploración visual y derivación directa a WhatsApp. No contiene pasarelas de pago, bases de datos en servidor, carritos de compra ni CRM. Se mantiene con etiqueta `noindex` hasta la aprobación expresa de M&D Cakes.
