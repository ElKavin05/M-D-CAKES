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

- **Estética:** Pastelería artesanal cuidada, cálida, con contrastes de alta gama entre azul cerceta, rosa oro y marrón chocolate.
- **Paleta oficial extraída directamente del logo:**
  - **Azul Cerceta / Teal (`--teal`: `#3E829A`):** Color protagonista de las iniciales caligráficas "M&D". Brinda sofisticación y frescura.
  - **Teal profundo (`--teal-dark`: `#2C6377`):** Usado para estados de interacción, foco y contraste alto.
  - **Rosa Oro / Glitter Rose (`--rose`: `#C996A5`):** Tono extraído del aro circular texturizado que enmarca la marca.
  - **Marrón Chocolate / Cacao (`--cocoa`: `#5C321E`):** Extraído directamente de la palabra "Cakes" para títulos y textos con calidez de repostería.
  - **Rojo Cereza / Berry (`--berry`: `#D91D4A`):** Acento festivo y vibrante derivado de la cereza y cobertura del pastelito sobre la marca.
  - **Fondo Crema Seda (`--cream`: `#FCFAF8`):** Fondo base luminoso y acogedor.
  - **Fondo de Tarjetas (`--paper`: `#FFFFFF`):** Blanco nítido para destacar fotografías y productos.
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

- **Logo oficial mejorado:** Procesado en alta resolución (600x600 px) con recorte elíptico antialiasing para eliminar artefactos y fondos, guardado en `dist/assets/logo.png` con canal alfa transparente.
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
