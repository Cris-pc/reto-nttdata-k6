### Instrucciones de Ejecución
1. *Requisitos previos*:
   - Asegúrate de tener k6 instalado. La versión utilizada es k6 v0.44.1.
   - Asegúrate de tener todos los archivos necesarios en el mismo directorio: reto-Nttdata-Performance.js, users.csv en la carpeta data, readme en el proyecto raiz, se adjunta las conclusiones conclusiones.txt.

2. *Ejecutar el script*:
   - Navega al directorio donde están ubicados los archivos.
   - Ejecuta el siguiente comando en la terminal:
     
     k6 run script.js

3. *Ejecutar el script en el git hub action*:
   - descargate el repositorio con un git clone
   - realiza o agrega un cambio comentario en el test reto-Nttdata-Performance.js o en el yml k6-test.yml
   - agrega el cambio y procede a pushear a main
   - se ejecutara el test en el ci/cd de github
     

3. *Resultados*:
   - Al finalizar la ejecución en el github action, revisa el artefacto en el action, y se visualizara el reporte.