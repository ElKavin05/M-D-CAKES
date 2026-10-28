# Verificación · 28/10/2026

Vista local en navegador integrado, servidor estático en puerto 5190.

| Antes | Después | Verificación |
| --- | --- | --- |
| Hero móvil empieza por imagen grande | Mensaje y acciones antes de imagen | Inspección visual a 320, 360, 390, 768 y 1440 px; sin overflow horizontal |
| Navegación móvil oculta | Menú desplegable con Escape | Apertura y cierre comprobados |
| Empty visible con resultados | hidden tiene prioridad | Tres diseños iniciales, filtro Bodas con uno, búsqueda sin resultados y recuperación comprobados |
| Tarjeta botón contiene otros botones | Botón de imagen independiente | Enter abre diálogo, Escape cierra |
| Formulario desconectado de galería | Personalizar esta idea precarga referencia y notas | Enlace contextual comprobado |
| Sin vista previa ni reinicio | Vista previa, reset inmediato, validación nativa | Mensaje con fecha, 25 personas y texto con &; reset elimina detalles; cantidad -1 inválida |
| Carrusel automático, transiciones generales | Navegación manual, propiedades explícitas, movimiento reducido | Revisión de código y renderizado; sin temporizador |

JavaScript: `node --check dist/app.js` correcto. `git diff --check` correcto. Consola del navegador sin errores capturados. Recursos de imagen cargados. No se enviaron mensajes de WhatsApp.

Detector Impeccable ejecutado una vez: texto pequeño corregido; cursiva editorial conservada como identidad existente; padding comprobado en navegador.

No verificado: Safari/Firefox, lector de pantalla real, dispositivos físicos, modo de movimiento reducido emulado, animación al 10% de velocidad, portapapeles con permisos denegados y publicación en hosting. No se atribuye a esta revisión una auditoría integral de accesibilidad.

Capturas actuales: preview-desktop-v2.jpg y preview-mobile-v2.jpg. Fotografías heredadas, referenciales, con procedencia pendiente de documentar.
