# dabetai API - Backend Principal

API REST para la plataforma de monitoreo de diabetes que conecta pacientes, médicos y modelos de inteligencia artificial.

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.x-red?logo=nestjs" alt="NestJS version">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript version">
  <img src="https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma" alt="Prisma version">
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" alt="PostgreSQL version">
  <img src="https://img.shields.io/badge/JWT-Auth-green?logo=jsonwebtokens" alt="JWT Authentication">
</p>

## � Documentación de la API

La API incluye documentación automática con Swagger UI y Scalar:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **Scalar UI**: `http://localhost:3000/api/scalar`

<p align="center">
  <img src="./assets/swagger-preview.png" alt="Swagger UI" width="400"/>
  <img src="./assets/scalar-preview.png" alt="Scalar UI" width="400"/>
</p>

## 🏥 ¿Qué es dabetai API?

**dabetai API** es el backend central de la plataforma integral para el monitoreo de diabetes que incluye:

- **API REST** (esta): backend principal para todos los servicios
- **App móvil**: para pacientes, monitoreo y predicciones
- **App web**: para médicos, seguimiento de pacientes
- **API de IA**: predicción de complicaciones diabéticas

La API maneja la autenticación, gestión de usuarios (pacientes y médicos), almacenamiento de datos médicos y comunicación con los modelos de IA para **retinopatía, nefropatía, neuropatía y pie diabético**.

---

## ✨ Funcionalidades

🔐 **Autenticación JWT** - registro y login de usuarios con roles (paciente, médico, admin)  
� **Gestión de usuarios** - CRUD completo para pacientes y médicos  
� **Datos médicos** - almacenamiento de información de diabetes y comorbilidades  
� **Registro en 2 pasos** - cuenta básica + completar perfil médico  
� **Documentación automática** - Swagger UI y Scalar para testing de APIs  
🛡️ **Seguridad robusta** - hash de contraseñas, validación de datos y tokens seguros  
�️ **Base de datos relacional** - PostgreSQL con Prisma ORM  
📈 **Estadísticas** - endpoints para métricas de pacientes y médicos

---

## 🛠 Tecnologías

- **NestJS** - Framework backend escalable y modular
- **TypeScript** - Tipado estático para mayor robustez
- **Prisma ORM** - Gestión de base de datos type-safe
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación con tokens seguros
- **Swagger/OpenAPI** - Documentación automática de APIs
- **bcrypt** - Hash seguro de contraseñas
- **class-validator** - Validación de datos de entrada

---

## ⚡ Instalación rápida

### Prerrequisitos

- **Node.js** (v18 o superior)
- **PostgreSQL** (v14 o superior)
- **npm** o **yarn**

### Pasos

1. **Clonar repositorio**

```bash
git clone https://github.com/chrisdev-ts/dabetai-api.git
cd dabetai-api
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar base de datos**
   Crea `.env` en la raíz:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/dabetai_db"
JWT_SECRET="tu_jwt_secret_super_seguro"
NODE_ENV="development"
```

4. **Ejecutar migraciones de Prisma**

```bash
npx prisma migrate dev
npx prisma generate
```

5. **Iniciar servidor**

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000`

### 📚 Acceder a la documentación

- **Swagger UI**: `http://localhost:3000/api/docs`
- **Scalar UI**: `http://localhost:3000/api/scalar`

---

## 🏗 Ecosistema dabetai: nuestros repositorios

dabetai está compuesto por múltiples repositorios especializados:

| Repositorio                                                             | Propósito                   | Estado           |
| ----------------------------------------------------------------------- | --------------------------- | ---------------- |
| **[dabetai-mobileapp](https://github.com/Fermin-Cardenas/dabetai-mobileapp)** | App para pacientes          | ✅ En desarrollo |
| **[dabetai-webapp](https://github.com/chrisdev-ts/dabetai-webapp)**     | App web para médicos        | ✅ En desarrollo |
| **[dabetai-aiapi](https://github.com/aleor25/dabetai-aiapi)**           | API de IA y predicciones    | ✅ En desarrollo |
| **[dabetai-aimodels](https://github.com/chrisdev-ts/dabetai-aimodels)** | Modelos de machine learning | ✅ En desarrollo |
| **[dabetai-landing](https://github.com/chrisdev-ts/dabetai-landing)**   | Página de aterrizaje        | ✅ En desarrollo |
| **dabetai-api**                                                         | API principal del backend   | ✅ En desarrollo |

---

## 🤝 Colaboración interna

Seguimos convenciones específicas para mantener consistencia - consulta [CONTRIBUTING.MD](CONTRIBUTING.MD).

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Consulta [LICENSE](LICENSE) para más detalles.
