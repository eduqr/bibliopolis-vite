# bibliopolis-vite

## :book: Instalación
1) Clona el proyecto en la ruta de tu elección
```bash
git clone https://github.com/eduqr/bibliopolis-vite.git
```

2) Entra a la carpeta
```bash
cd bibliopolis-vite/
```

3) Abre el proyecto en vscode
```bash
code .
```
## :wrench: Configuración
1) Abre una terminal en vscode
* Teclados en español: <kbd>Ctrl</kbd> + <kbd>ñ</kbd>
* Teclados en inglés: <kbd>Ctrl</kbd> + <kbd>`</kbd>

2) Instala las dependencias del proyecto
```bash
npm install
```

3) Inicia el servidor de desarrollo
```bash
npm run dev
```

## :writing_hand: Inicio de sesión
Para poder usar Bibliopolis es necesario autenticarse por medio de un OTP (One Time Password) que se envía a tu correo electrónico. Bibliopolis cuenta con un modo para bibliotecarios y otro para estudiantes.

### Bibliotecario
1) Agrega un nuevo bibliotecario a la tabla `Librarians`
```sql
INSERT INTO librarians (name, lastname, email, rol_id) VALUES
('TuNombre', 'TuApellido', 'TuCorreo', 1);
```
2) En el login, ingresa el correo registrado y pega el OTP obtenido para iniciar como bibliotecario.

### Estudiante
1) Agrega un nuevo estudiante a la tabla `Students`
```sql
INSERT INTO students (id, name, lastname, email, career_id) VALUES
('ID', 'TuNombre', 'TuApellido', 'TuCorreo', 1);
```
2) En el login, ingresa el correo registrado y pega el OTP obtenido para iniciar como estudiante.

## :warning: Consideraciones
* Es importante que tengas acceso al correo proporcionado pues ahí es donde se enviará el OTP.
* El ID (matrícula) del estudiante está conformada por 9 dígitos.
* Solo se aceptan correos con dominio `@gmail.com`, `@outlook.com` o `@upqroo.edu.mx`.

## :question: Soporte
Si tienes problemas o preguntas, por favor abre un issue en el repositorio.
