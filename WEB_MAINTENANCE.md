# La Tegala Escénica · continuidad de la web

Actualizado: 1 de octubre de 2026.

## Objetivo
Web oficial de la Asociación Cultural La Tegala Escénica, Teguise (Lanzarote).
URL pública: https://lategala.github.io/LaTegalaSite/

## Arquitectura
- Inicio
- Espectáculos
  - La Parte Que Falta
  - ¡Qué Diablos!
  - Ligazón
  - Caleidoscopio
- Formación
  - Escuela de Teatro de Haría
  - Escuela de Teatro La Graciosa
  - Antonio Orellana · Dramaturgia · Dirección · Cursos monográficos · Acceso a Arte Dramático
- La Tegala
- Documentación / Centro profesional
- Actualidad / Prensa
- Contacto

## Identidad y experiencia
- Interfaz general oscura, sobria y teatral.
- Rojo corporativo + dorado/marrón sutil + azul oceánico en estados interactivos.
- Formación usa orientación cromática sutil:
  - Haría: azul.
  - La Graciosa: turquesa/celeste.
  - Antonio Orellana: verdemar.
  - Espectáculos: dorado.
- Los títulos de obras aparecen en cursiva.
- Espectáculos se presentan 2 × 2 en escritorio y en una columna en móvil.
- La navegación mantiene una referencia visual del área en la que se encuentra el usuario.

## Inicio
- Identidad: Asociación Cultural / Compañía Teatral, Lanzarote.
- Creación / Teatro / Formación en líneas separadas.
- Lema: “Historias que encuentran refugio en escena.”
- Recursos para programadores sin repetir el encabezado.
- Frases teatrales rotatorias; hover azul oceánico y cambio periódico.
- Sin retrato protagonista de Antonio en la primera vista.
- Origen corporativo: fundada en 2024 en Teguise, Lanzarote.

## SEO
- Canonical URLs.
- Meta description, robots, Open Graph y datos estructurados.
- Sitemap y robots.txt.
- Palabras/entidades objetivo: La Tegala Escénica, La Tegala, Tegala, asociación cultural, Lanzarote, teatro, Teguise, artes escénicas, formación teatral.
- El posicionamiento orgánico depende del rastreo e indexación de los buscadores y no puede garantizarse por una fecha concreta.

## Escuela de Teatro de Haría
- Inicio curso 2026–2027: 19 de octubre de 2026.
- Trabajo: interpretación, improvisación, voz, cuerpo y dramaturgia.
- Archivo visual simplificado: “Clases y entrenamiento” / “Muestras y montajes”.
- Videoteca identificada cuando existe información segura:
  - El Sueño de una Noche de Verano — 2025.
  - La Rosa de Papel — 2024.
  - La Cabeza del Bautista — 2024.
  - A solas con la verdad — 2025.
  - El Pastor Bromista — Escuela Aspercán + Escuela de Haría.
  - Caleidoscopio I/II/III — 2024.
  - Ligazón — 2024.
  - Promo documental CantaHaría — 2022.
  - Promo Ícaro — 2020.
- Trayectoria incluye Entremeses de Cervantes, La Principita, Finaos, Ligazón, Caleidoscopio, Valle-Inclán, Karl Valentin Bar, A solas con la verdad, El Sueño de una Noche de Verano y De IMPROviso.

## ¡Qué Diablos!
- Estreno previsto: 30 octubre 2026, 18:00, Teatro Hermanas Manuela y Esperanza Espínola, Teguise.
- Cartel definitivo: `assets/uploads/images/cartel-que-diablos.jpg`.
- En portada aparece detrás del bloque del próximo estreno con un 40 % de opacidad (60 % de transparencia).
- Fotografías oficiales: `que-diablos-01.jpg` a `que-diablos-05.jpg`, con crédito José David García, ampliación y descarga individual.
- Dossier artístico completo para web: `downloads/uploads/dossier-que-diablos.pdf`.
- Ficha artística/técnica y rider parcial enlazados desde el centro profesional.
- La página distingue expresamente el rider parcial del rider completo.
- El antiguo archivo `assets/public-qd.jpg`, que correspondía a un cartel de Escénica y no a ¡Qué Diablos!, se elimina del sitio.

## Actualización de contenidos
El contenido dinámico está separado del diseño:
- data/actualidad.json
- data/trayectoria.json
- data/videos.json
- data/galerias.json
- data/documentos.json
- data/settings.json

El archivo .pages.yml define un gestor de contenidos compatible con Pages CMS para noticias, trayectoria, vídeos, galerías, documentos y datos generales.

## Regla para futuras conversaciones
No reconstruir la web desde cero. Leer primero este archivo y el estado actual de la rama main del repositorio lategala/LaTegalaSite. Mantener la estética, arquitectura, descargas y sistema de contenidos. Antes de publicar: crear rama, validar, revisar enlaces/JSON/JavaScript y fusionar a main solo tras validación correcta.
