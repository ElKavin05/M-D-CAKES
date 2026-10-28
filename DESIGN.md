# M&D Cakes · Diseño

Refinamiento de la identidad existente: pastelería editorial cálida, fotografía protagonista y consulta directa. Modo: Persuade.

## Sistema
Crema #fcfaf8, cacao #5c321e, texto secundario #765747, azul de acción #2c6377, azul oscuro #204b5a, rosa #c996a5 y superficies #f8eef1 / #edf5f7. Cormorant Garamond en titulares; DM Sans en lectura; se conservan las fuentes originales.

Hero con mensaje antes de la imagen en móvil; marco arqueado estable, sin deformación al pasar el cursor. Galería editorial con desplazamientos verticales solo en escritorio. Formulario de dos columnas en escritorio y una en móvil. Controles táctiles de 44px o más.

## Movimiento
CSS para estados y diálogo (250ms), 150ms para respuesta de controles; curva cubic-bezier(.22,1,.36,1). Cambio de fotografía con Web Animations API, sin temporizador. Movimiento reducido desactiva transiciones y animaciones, incluido scroll suave. No se necesita GSAP para esta escala de interacción.

## Decisiones de revisión
Se mantiene la serif en cursiva por ser parte de la identidad artesanal existente. Los avisos del detector sobre ella son excepciones deliberadas. Espaciado horizontal definido con --gutter (20–80px), verificado en navegador; no se eliminó ante avisos heurísticos de padding. Se corrigieron los tamaños menores de 12px.

## Recursos
Se conservan logo y tres JPG existentes. Imágenes referenciales; procedencia y autorización pendientes de documentar. No se añadieron promesas, precios, testimonios ni fotografías atribuidas al negocio.
