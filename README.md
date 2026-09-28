# La Tegala Escénica · web 2026

Sitio estático oficial de **La Tegala Escénica** · Tahiche · Teguise · Lanzarote.

## Arquitectura

La web separa diseño, contenido y archivos para que las actualizaciones habituales no obliguen a editar HTML.

- `index.html` · portada
- `espectaculos.html` · catálogo
- `formacion.html` · escuelas y servicios profesionales
- `quienes.html` · La Tegala + Antonio Orellana
- `documentacion.html` · centro profesional
- `actualidad.html` · actualidad y prensa
- `contacto.html` · contacto y solicitudes
- `style.css` + `site.js` · sistema visual y comportamiento compartido
- `data/` · contenidos recurrentes editables
- `.pages.yml` · configuración del gestor visual Pages CMS
- `assets/uploads/images/` · fotografías gestionadas desde el CMS
- `downloads/uploads/` · PDFs y ZIP profesionales gestionados desde el CMS

## Contenido editable sin tocar código

- `data/actualidad.json` · noticias, entrevistas y prensa
- `data/trayectoria.json` · actuaciones e hitos
- `data/videos.json` · videotecas
- `data/galerias.json` · fotografías, créditos, orden y descarga
- `data/documentos.json` · dossiers, riders, guías, fichas y otros recursos
- `data/settings.json` · correo, teléfono, redes y localización

Los registros admiten estado publicado/borrador cuando corresponde. El contenido principal se redacta en español y puede incorporar EN / FR / DE / IT sin duplicar las páginas.

## Descargas

Los recursos profesionales disponibles ofrecen acceso directo a **ver** y/o **descargar**. Las fotografías pueden incorporar una versión web y un original de descarga. Los recursos que aún no existen se muestran como *En preparación* y nunca como enlaces rotos.

## Estadísticas

El contador es invisible para los visitantes. El panel interno no está enlazado desde la web ni incluido en el sitemap:

`panel-lategala-8f4a2.html`

No es una zona autenticada: la protección consiste en no publicitar su dirección. Si se necesitara privacidad fuerte, deberá sustituirse por un panel con autenticación.

## Validación automática

Cada cambio de la rama de reconstrucción pasa una revisión automática que comprueba:

- archivos principales;
- enlaces y recursos locales;
- anclas internas;
- IDs duplicados;
- imágenes sin texto alternativo;
- JSON de contenidos;
- sintaxis JavaScript;
- exclusión del panel interno del sitemap.

Solo tras superar la validación se genera el ZIP de entrega como artefacto de GitHub Actions.

## Publicación

Producción prevista: **GitHub Pages · rama `main` · raíz del repositorio**.

La reconstrucción se desarrolla de forma aislada en `rebuild-2026` hasta completar la revisión final y no modifica la web pública antes de la aprobación.
