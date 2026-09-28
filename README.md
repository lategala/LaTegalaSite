# La Tegala Escénica · web 2026

Sitio estático oficial de La Tegala Escénica (Lanzarote).

## Estructura
- `index.html`: portada
- `espectaculos.html`: catálogo
- `formacion.html`: escuelas y servicios profesionales
- `documentacion.html`: centro profesional
- `actualidad.html`: actualidad y prensa
- `data/`: contenidos editables sin tocar diseño
- `.pages.yml`: configuración de Pages CMS
- `assets/`: imágenes de web
- `downloads/`: documentos y fotografías descargables

## Actualización sencilla
Los contenidos recurrentes están separados del diseño:
- `data/actualidad.json`: noticias, entrevistas y prensa
- `data/trayectoria.json`: actuaciones e hitos
- `data/videos.json`: videotecas
- `data/settings.json`: datos generales

Pages CMS puede editar estos archivos y subir material a las carpetas configuradas en `.pages.yml`.

## Publicación
GitHub Pages · rama principal · raíz del repositorio.
