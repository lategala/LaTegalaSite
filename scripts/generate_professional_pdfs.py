from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import mm

OUT=Path("downloads/uploads"); OUT.mkdir(parents=True,exist_ok=True)
RED=colors.HexColor("#c92c31"); GOLD=colors.HexColor("#a88342"); DARK=colors.HexColor("#191919"); MID=colors.HexColor("#666666")
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name="BrandX",fontName="Helvetica-Bold",fontSize=9,leading=11,textColor=RED,spaceAfter=8,alignment=TA_CENTER))
styles.add(ParagraphStyle(name="TitleX",fontName="Helvetica-Bold",fontSize=25,leading=28,textColor=DARK,spaceAfter=7,alignment=TA_CENTER))
styles.add(ParagraphStyle(name="SubX",fontName="Helvetica",fontSize=10.5,leading=14,textColor=MID,spaceAfter=14,alignment=TA_CENTER))
styles.add(ParagraphStyle(name="H2X",fontName="Helvetica-Bold",fontSize=12.5,leading=15,textColor=DARK,spaceBefore=7,spaceAfter=6))
styles.add(ParagraphStyle(name="BodyX",fontName="Helvetica",fontSize=9.5,leading=13,textColor=DARK,spaceAfter=5))
styles.add(ParagraphStyle(name="SmallX",fontName="Helvetica",fontSize=8.5,leading=11,textColor=MID))

def footer(canvas,doc):
    canvas.saveState(); canvas.setStrokeColor(colors.HexColor("#dddddd")); canvas.line(18*mm,13*mm,192*mm,13*mm)
    canvas.setFont("Helvetica",7.5); canvas.setFillColor(MID); canvas.drawCentredString(105*mm,8.5*mm,"lategalaescenica@gmail.com · 605 447 210 · Lanzarote"); canvas.restoreState()

def make(filename,title,sub,sections,notice=None):
    doc=SimpleDocTemplate(str(OUT/filename),pagesize=A4,rightMargin=18*mm,leftMargin=18*mm,topMargin=16*mm,bottomMargin=18*mm,title=title,author="La Tegala Escénica")
    story=[Paragraph("LA TEGALA ESCÉNICA · LANZAROTE",styles["BrandX"]),Paragraph(title,styles["TitleX"]),Paragraph(sub,styles["SubX"])]
    for h,b in sections: story += [Paragraph(h,styles["H2X"]),Paragraph(b,styles["BodyX"])]
    if notice:
        story += [Spacer(1,6),Table([[Paragraph(notice,styles["SmallX"])]],colWidths=[174*mm],style=[("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#f5f1e8")),("BOX",(0,0),(-1,-1),0.5,GOLD),("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)])]
    doc.build(story,onFirstPage=footer,onLaterPages=footer)

make("ficha-artistica-tecnica-la-parte-que-falta.pdf","La Parte Que Falta","Ficha artística y técnica · 55 min · familiar 6+ · escolar 8–12",[
("FICHA ARTÍSTICA","<b>Narrador y voces (off)</b><br/>Jesús Alves Reguera · Antonio Orellana<br/><br/><b>Manipuladores</b><br/>Agustín Salvago · J. Carlos Sánchez · Antonella Siano · Fefa Toledo"),
("FICHA TÉCNICA","<b>Diseño y construcción de marionetas</b> · José Antonio Reguera<br/><b>Atrezzo / escenografía</b> · Nadezhda Neyra Cano<br/><b>Música</b> · Alba Rapela · IA generation<br/><b>Sonidos “Lanzarote”</b> · Antonio Orellana<br/><b>Costura</b> · Mª Antonia Landa<br/><b>Diseño gráfico</b> · Daniel García<br/><b>Fotografía</b> · Felipe de la Cruz"),
("PRODUCCIÓN Y DIRECCIÓN","<b>Producción</b> · Asociación Cultural LA TEGALA ESCÉNICA<br/><b>Dirección y adaptación</b> · ANTONIO ORELLANA")])

make("ficha-artistica-tecnica-que-diablos.pdf","¡Qué Diablos!","Teatro de raíces para marionetas y actores · 50 min · familiar 6–99 · escolar 8–12",[
("EQUIPO ARTÍSTICO","<b>Manipuladores de marionetas y actores</b><br/>Fefa Toledo · Ilona Yavorskaya · Agustín Salvago · J. Carlos Sánchez<br/><br/><b>Ayudantía de dirección</b> · Fefa Toledo<br/><b>Dramaturgia y dirección</b> · Antonio D. Orellana<br/><b>Obra original</b> · Antonio Daniel García Orellana"),
("EQUIPO TÉCNICO","<b>Marionetas</b> · José A. Reguera · Paco Orejón Valentí<br/><b>Máscaras</b> · Agustín Salvago<br/><b>Atrezzo / escenografía</b> · Antonio Orellana<br/><b>Coreografía</b> · Ilona Yavorskaya<br/><b>Música / diseño sonoro</b> · IA generation · recursos libres<br/><b>Vestuario</b> · Yolanda Arriaga · Mª Antonia Landa<br/><b>Iluminación y técnico en gira</b> · Antonio D. Orellana<br/><b>Vídeo de acogida</b> · Julio Herrera<br/><b>Fotografía</b> · José David García"),
("PRODUCCIÓN","<b>Producción ejecutiva y distribución</b> · Asociación Cultural LA TEGALA ESCÉNICA<br/><br/><b>Estreno</b> · 30 de octubre de 2026 · Teatro Hermanas Manuela y Esperanza Espínola · Teguise")])

make("rider-iluminacion-pagina-disponible-que-diablos.pdf","¡Qué Diablos!","Rider técnico de iluminación · documentación parcial",[
("ESTADO DEL DOCUMENTO","El material facilitado identifica una <b>“Página 3 · Equipamiento + plano lumínico”</b> de un rider técnico de iluminación. Las páginas anteriores del rider completo no se encuentran entre los archivos disponibles para esta versión de la web."),
("USO PROFESIONAL","Esta ficha se ofrece únicamente como constancia de documentación técnica parcial. <b>No sustituye al rider completo</b>. La implantación definitiva deberá cerrarse con el responsable técnico del espacio y actualizarse cuando La Tegala Escénica disponga del documento completo.")
],notice="<b>IMPORTANTE:</b> documentación parcial. No se han añadido equipos, potencias, canales ni necesidades técnicas que no estén respaldadas por el material facilitado.")
