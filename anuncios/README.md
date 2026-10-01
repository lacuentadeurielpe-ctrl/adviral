# Anuncios de testeo — Perú, venta low ticket por WhatsApp

12 anuncios de imagen (3 productos × 4 ángulos) en 1080×1350 (4:5, feed de FB/IG), hechos con las **páginas reales** de cada PDF.
Pensados para **tráfico caliente**: personas que ya interactuaron con la página o el IG, que vieron videos, que escribieron al WhatsApp o que visitaron la landing. Por eso van directo a la oferta, al precio y a resolver objeciones.

- `png/`: imágenes listas para subir
- `html/`: fuente de cada imagen
- `generar.js`: vuelve a generar todo.
- `producto/`: páginas de los PDF convertidas a imagen. **No se sube al repo** (está en `.gitignore`) para no publicar tu producto. Para regenerar:
  `pdftoppm -png -r 150 Expediente_Barranco_JUEGO.pdf producto/juego` (y lo mismo con `kit` y `planner`), luego `NODE_PATH=$(npm root -g) node generar.js`

> Las imágenes **no muestran precio**: el precio se da en la conversación de WhatsApp.

**Cuidado con los spoilers del juego:** los anuncios solo muestran la portada, "El caso", "Los sospechosos" y las pruebas 01–02. Las pruebas 03, 05, 06, 08 y 09 y las pistas de ayuda delatan al culpable, así que no las uses en anuncios ni en historias.

---

## Producto 1 — Expediente Barranco (juego de misterio)

| Archivo | Ángulo | Texto principal (copy) | Título |
|---|---|---|---|
| `juego-1-el-caso.png` | Gancho del caso: curiosidad y escenario limeño | La Galería Salas de Barranco celebraba 25 años. A las 11:10 p. m., Rodrigo Salas apareció muerto en su oficina, junto a un pisco sour a medio tomar. La familia dice que fue un infarto. La necropsia dice cianuro. 5 sospechosos, 12 pruebas y todos mienten en algo. ¿Te animas a resolverlo esta noche? 🔎 | ¿Quién mató a Rodrigo Salas? |
| `juego-2-cita-en-casa.png` | Plan de pareja / cita en casa | Plan para este sábado: pisco sour, canchita y un asesinato que resolver 🍸🕵️ Expediente Barranco tiene un modo pareja: son compañeros detectives con 90 minutos en el reloj. Sin niñera, sin tráfico y sin cuenta de restaurante. | La cita en casa que no es Netflix |
| `juego-3-que-incluye.png` | Qué incluye (páginas reales) | Esto es lo que recibes: el caso con los datos clave de la noche, 5 sospechosos con su declaración, 12 pruebas para recortar (informes, chats, registros, recibos…), la hoja de acusación, pistas de ayuda por si se traban y la solución en un archivo aparte, para que nadie la vea antes de tiempo. Se imprime a color o en blanco y negro. | El expediente completo |
| `juego-4-como-funciona.png` | Objeción: cómo lo recibo | ¿Lo quieres para hoy? 1) Nos escribes. 2) Yapeas o plineas. 3) En minutos te llega el expediente en PDF y la solución en otro archivo. Imprimes, recortas las pruebas y empiezan. Sirve para una cita en pareja, una reunión con amigos (de 1 a 6 detectives) o un cumpleaños. | Lo pides hoy, lo juegas hoy |

Extra para el copy: un escape room para 4 personas puede salir S/ 200 o más, con taxi incluido, y este caso lo juega todo el grupo en casa. Úsalo como segunda línea en cualquiera de los 4 anuncios.

## Producto 2 — Juega y Avanza (kit de actividades)

| Archivo | Ángulo | Texto principal (copy) | Título |
|---|---|---|---|
| `kit-1-materiales-caseros.png` | Sin gastar: materiales caseros | Ganchos de ropa, menestras, cinta masking, una manta… Con eso tienes 48 actividades sensoriales y motoras para niños de 2 a 8 años. Cada ficha te dice para qué sirve, qué necesitas y cómo se juega, con una versión más fácil y otra más difícil. Juego, no tarea. | 48 actividades con lo que ya tienes |
| `kit-2-plan-4-semanas.png` | Padres: "no sé qué hacer con él en casa" | "¿Qué hago hoy con él?" Ya no tienes que pensarlo. El plan de 4 semanas te dice qué 3 fichas tocan cada día: una de movimiento, una de manos y una de calma. Además, con el registro semanal anotas qué le gusta y qué le cuesta, y lo llevas a su profesor o terapeuta. | Su plan de 4 semanas, ya armado |
| `kit-3-que-incluye.png` | Qué incluye (6 áreas + 3 bonos) | 48 actividades en 6 áreas: motricidad fina, motricidad gruesa, exploración sensorial, calma y emociones, atención y planificación, y autonomía diaria. Incluye 3 bonos: registro semanal, plan de 4 semanas y kit de calma para la refri. Para mamás, papás, docentes y terapeutas. | Juega y Avanza: el kit completo |
| `kit-4-kit-de-calma.png` | Momento de dolor: el berrinche | Cuando llega el berrinche, tener un plan a la vista te cambia la tarde. El kit trae 6 estrategias de calma con dibujos, para recortar y pegar en la refri: sopla la vela, abrazo de oso, modo tortuga, agua fría, empuja la pared y tararea. Incluido con las 48 actividades. | Un kit de calma para la refri |

**Políticas de Meta y del propio kit:**
- No escribas "¿Tu hijo tiene autismo / TEA / retraso?". Meta rechaza los anuncios que dicen o sugieren una condición de la persona.
- No prometas resultados ("mejora el lenguaje", "se acaban los berrinches"). El kit se presenta como material de juego y estimulación, y lleva el aviso de que no reemplaza la terapia.
- Si en los anuncios hay fotos de niños, ten en cuenta que el kit avisa que los objetos pequeños (menestras, botones) no son para menores de 3 años.

## Producto 3 — Nuestro Gran Día (planner de boda)

| Archivo | Ángulo | Texto principal (copy) | Título |
|---|---|---|---|
| `planner-1-abrumada.png` | Dolor: sentirse abrumada (adaptación del gancho de Bliss & Bone) | Si estás organizando tu matrimonio y tienes notas en 4 chats, no sabes qué papeles pide la muni y ya perdiste la cuenta de lo que llevas gastado… para un momento. Nuestro Gran Día junta todo tu matrimonio en un solo lugar 💍 | Organiza tu matrimonio sin estrés |
| `planner-2-hecho-para-peru.png` | Diferencial: hecho para casarse en Perú | No es una plantilla gringa traducida 🇵🇪 Trae los trámites del civil (municipalidad) y del religioso (parroquia), el presupuesto en soles con adelantos y saldos, la hora loca, los padrinos y las canciones clave, y un cronograma del día para darle a cada proveedor. | Un planner para casarse en Perú |
| `planner-3-checklist.png` | Demostración: checklist mes a mes | ¿No sabes por dónde empezar? El checklist te dice qué hacer en cada etapa, desde 12 meses antes, y cierra con la recta final: 1 mes, 1 semana y 1 día antes. Hasta trae el kit de emergencia del día. Marca, avanza y deja de preguntarte "¿me estoy olvidando de algo?". | Qué hacer cada mes hasta tu boda |
| `planner-4-presupuesto.png` | Miedo a gastar de más | ¿Cuánto de tu presupuesto debería ir al catering? ¿Y a la foto? El planner trae el % guía de cada rubro para repartir tu presupuesto en soles sin adivinar, con columnas para el costo real, el adelanto, el saldo y la fecha de pago, y un 6 % reservado para imprevistos. | Reparte tu presupuesto sin adivinar |

Nota: el planner es un PDF imprimible. Por eso ningún anuncio dice que "calcula solo" ni que funciona en Google Sheets.

---

## Cómo montar el test

- **Estructura:** 1 campaña por producto con objetivo de mensajes y destino WhatsApp. 1 conjunto de anuncios con los 4 anuncios dentro, para que Meta reparta el presupuesto entre los ángulos.
- **Público caliente:** personas que interactuaron con la página de FB o IG (365 días), que vieron el 50 % de tus videos, que te escribieron por WhatsApp o Messenger y que visitaron la web. Si el público tiene menos de ~1 000 personas, súmale un público frío amplio de Perú.
- **Presupuesto:** S/ 20–30 diarios por producto durante 4–5 días antes de decidir.
- **Métrica de decisión:** costo por venta (anota cada venta del WhatsApp), no solo costo por mensaje. Apaga el ángulo más caro después de unas 3 000 impresiones y duplica el ganador.
- **Mensaje prellenado de WhatsApp:** uno distinto por anuncio (por ejemplo "Hola, quiero el Expediente Barranco – J2") para saber qué ángulo trajo cada venta.
