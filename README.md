# Notes-client

## 📜🖋️ Sumario

La Aplicación de Notas es una herramienta que te permite gestionar tus notas personales de manera eficiente. Utiliza la API de notes que permite a los usuarios tanto anónimos como registrados llevar un control completo de sus notas.

### Características clave:

**Registro y Autenticación:** Los usuarios pueden registrarse y autenticarse para acceder a sus notas de manera segura.
**Creación de Notas:** Crea nuevas notas fácilmente, asignándoles un título y contenido. **Inserción de Imágenes:** Añade imágenes a tus notas para enriquecer tu contenido y mejorar la expresión visual.
**Edición y Actualización:** Modifica tus notas existentes en cualquier momento, para mantener la información actualizada.
**Eliminación de Notas:** Elimina notas que ya no necesitas.
**Organización**: Crea, modifica o borra categorías para organizar tus notas de acuerdo a tus necesidades.
**Seguridad:** Tus notas pueden ser marcadas como públicas para que otros usuarios las vean, o privadas para mantener la privacidad de tu información personal. Además, tus notas privadas están protegidas mediante autenticación, asegurando que solo tú tengas acceso a ciertas notas.

## 🔗 Documentación

La documentación de este proyecto la podras encontrar en el siguiente enlace:https://github.com/GadorH/notes-client.git

## 💻 Tecnología

1.**React:** La interfaz de usuario de la aplicación se desarrolla con React, un potente y flexible framework de JavaScript que facilita la creación de componentes reutilizables y la gestión eficiente del estado.

2.**Vite:** Vite se utiliza como el bundler (empaquetador) y el servidor de desarrollo, permitiendo una carga rápida y una experiencia de desarrollo ágil.

3.**Material-UI:** La aplicación utiliza Material-UI para la gestión de estilos y componentes visuales. Esto garantiza una interfaz de usuario atractiva y coherente en toda la aplicación.

4.**TinyMCE:** Para enriquecer la experiencia de creación de notas, hemos incorporado TinyMCE, un editor de texto enriquecido que proporciona un cuadro de herramientas completo para formatear y editar el contenido de las notas, incluyendo la inserción de imágenes y otros elementos multimedia.

Estas tecnologías se combinan para ofrecer una aplicación con una interfaz atractiva y capacidades de edición avanzadas.

## 🚀🔥 Puesta a punto y ejecución

Para comenzar a utilizar la aplicación de Notas, necesitarás descargar dos repositorios: uno para el backend llamado api-notes y otro para el frontend llamado notes-client. Sigue estos pasos para poner en marcha la aplicación:

1.**Descargar los repositorios:** Primero, clona ambos repositorios en tu máquina local. Abre una terminal y ejecuta los siguientes comandos:
`git clone https://github.com/GadorH/api-notes.git.`
`git clone https://github.com/GadorH/notes-client.git`

2.**Instalar las dependencias:** Una vez que hayas descargado los repositorios, accede a cada uno de ellos y asegúrate de instalar las dependencias necesarias.
`cd api-notes`
`npm install`

`cd notes-client`
`npm install`

3.**Configurar variables de entorno:** La aplicación utiliza variables de entorno para configurar ciertos aspectos, como la conexión a la base de datos y la configuración de seguridad. En cada repositorio, encontrarás un archivo .env.example que puedes copiar y renombrar a `.env`

4.**Iniciar los Servidores:**
Una vez configuradas las variables de entorno, puedes iniciar los servidores para el backend y el frontend.

Para el Backend (api-notes): `npm start`
Para el Frontend (notes-client): `npm run dev`

5.**Registrarse y Autenticarse:**
Para aprovechar todas las funciones de la aplicación, regístrate como un usuario. Puedes hacerlo a través de la interfaz de registro proporcionada por la aplicación.

6.**Documentación Adicional:**
Si deseas obtener más información sobre cómo utilizar la API de Gestión de Notas y sus funciones, consulta la documentación proporcionada en el repositorio del backend api-notes. Allí encontrarás detalles sobre las rutas de la API, los endpoints disponibles y cómo interactuar con ella de manera efectiva.

## 👩🏻‍💻🧑🏻‍💻👩🏻‍💻Contribuyendo

### Metodología 📈

En la realización de este proyecto, hemos seguido una metodología colaborativa basada en la distribución equitativa de tareas y el uso de convenciones de commits.

El equipo de desarrollo estuvo compuesto por tres participantes que trabajaron de manera conjunta para contribuir al éxito del proyecto. Durante el desarrollo, hemos aplicado una metodología ágil que nos permitió realizar entregas incrementales y mantener una comunicación fluida entre los miembros del equipo.

Una de las prácticas clave que implementamos fue el uso de convenciones de commits, específicamente los Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/). Estas convenciones nos ayudaron a mantener un historial de commits consistente y bien estructurado, facilitando la colaboración y la comprensión de los cambios realizados en el proyecto.

Además, establecimos reuniones regulares para revisar y discutir el progreso del proyecto, así como para compartir ideas y solucionar posibles problemas. Durante estas reuniones, distribuimos las tareas de manera equitativa, aprovechando las fortalezas y habilidades individuales de cada miembro del equipo.

También utilizamos herramientas de control de versiones, como Git, para gestionar las actualizaciones y los commits realizados durante el desarrollo del proyecto. Esto nos permitió mantener un seguimiento preciso de los cambios y facilitó la colaboración en paralelo.

### Autores 🖋

<table>
<tbody>
<tr>
<td align="center">
<a href="https://github.com/martavalle95" rel="nofollow">
<img src="https://github.com/martavalle95.png" width="100px;" alt="" style="max-width: 100%;">
<br>
<sub><b>Marta Valledor</b></sub>
</a>
</td>
<td align="center">
<a href="https://github.com/Chazychast" rel="nofollow">
<img src="https://github.com/Chazychast.png" width="100px;" alt="" style="max-width: 100%;">
<br>
<sub><b>Adrián Fernández</b></sub>
</a>
</td>
<td align="center">
<a href="https://github.com/GadorH" rel="nofollow">
<img src="https://github.com/GadorH.png" width="100px;" alt="" style="max-width: 100%;">
<br>
<sub><b>Gádor Heras</b></sub>
</a>
</td>
</tr>
</tbody>
</table>
