# Agente de preguntas libres

Esta ampliación está preparada para conectar un modelo mediante la API Responses de OpenAI. **No está activada** hasta configurar y alojar este servicio. GitHub Pages sirve los archivos de la web; este proceso Node debe ejecutarse aparte, detrás de HTTPS.

El agente anterior permanece en `js/agente.js`, con sus clasificaciones, relaciones y recuentos. El botón «Desconectar» recupera ese modo. El nuevo servicio solo lee datos: no tiene herramientas para editar entradas, borrar imágenes ni publicar cambios.

## Puesta en marcha

1. Usa Node.js 22 o posterior. No se necesitan paquetes externos.
2. Configura secretos en el entorno del servidor: `OPENAI_API_KEY`, `OPENAI_MODEL` (un modelo de tu cuenta compatible con Responses, herramientas y salida estructurada) y `AGENT_ACCESS_TOKEN` (contraseña aleatoria de al menos 32 caracteres). No guardes estos valores en GitHub ni en JavaScript público. `AGENT_ACCESS_TOKEN` es una contraseña de acceso propia, **no** la clave de OpenAI.
3. Configura `ALLOWED_ORIGIN=https://julioalmendras53.github.io`. `PORT` vale 8787 y `HOST` vale 127.0.0.1 por defecto; ajusta `HOST` si tu plataforma requiere otra interfaz.
4. Ejecuta `node agente-servidor/server.mjs` detrás de un proxy HTTPS que limite solicitudes y tamaño de cuerpo. Para una sola instancia se admiten hasta 10 consultas por minuto y 2 simultáneas. En un despliegue con varias instancias, aplica los límites en el proxy compartido. Configura también presupuesto/límites en la cuenta del proveedor.
5. Cambia únicamente `endpoint` en `js/agente-config.js` a la URL HTTPS de ese servicio, terminada en `/ask`. No añadas credenciales a la URL.
6. En la web, abre «Conexión del agente» e introduce la contraseña de acceso. Se conserva en memoria hasta cerrar la página. Las preguntas se siguen escribiendo en la misma barra con `?`.

No publiques el servicio sin autenticación. La clave de OpenAI nunca llega al navegador. Las consultas enviadas al modelo pueden generar cargos de API; el plan de ChatGPT no configura este servicio.

## Datos y respuestas

Cada pregunta envía una instantánea de las entradas que la web tiene cargadas: texto, categorías, indicadores de medios, personas etiquetadas, familias, temas e historia. No envía archivos de imagen o video ni imágenes personales guardadas en el navegador. Las entradas nuevas se incorporan al recargar la web; sus categorías y familias necesitan las mismas etiquetas que usa el diccionario actual.

El modelo interpreta preguntas abiertas y dispone de una herramienta que calcula filtros y recuentos sin ejecutar código generado. Las definiciones, categorías y etiquetas existentes se conservan. Puede comparar significados y proponer redacciones, pero esas propuestas no se guardan automáticamente. Los resultados enlazan lemas existentes. Una respuesta de un modelo puede equivocarse; cuando falten datos debe indicarlo. No se promete una respuesta correcta a toda pregunta imaginable.

Límites actuales: 400 entradas, 300 kB por solicitud, 30 acepciones por entrada, 2000 caracteres por pregunta, cuatro rondas de modelo. No hay memoria entre preguntas ni búsqueda externa automática. Las fechas históricas se limitan a las fuentes del grafo. `store:false` desactiva el almacenamiento de respuestas de la API; se aplican igualmente las políticas de datos del proveedor.

## Comprobación

Ejecuta `node --test tests/*.test.mjs` desde la raíz del proyecto. Las pruebas usan un proveedor simulado y no consumen API. Antes de dar por activado el agente, prueba la conexión real con una pregunta nueva y una consulta conocida, confirma sus recuentos y comprueba el retorno al modo anterior. La prueba con un modelo real queda pendiente mientras falten alojamiento y credenciales.

Referencias oficiales: [Responses API](https://developers.openai.com/api/reference/overview) y [herramientas de función](https://developers.openai.com/api/docs/guides/function-calling).
