import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('dabetai API')
    .setDescription('API para la gestión de pacientes con diabetes - dabetai')
    .setVersion('1.0')
    .addTag('auth', 'Autenticación y registro de usuarios')
    .addTag('users', 'Gestión de usuarios')
    .addTag('patients', 'Gestión de pacientes')
    .addTag('doctors', 'Gestión de doctores')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI tradicional
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'DabetAI API Documentation',
    customfavIcon: 'https://swagger.io/favicon.ico',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  });

  // Scalar UI moderna
  app.use('/api/scalar', (req, res) => {
    const html = `
    <!doctype html>
    <html>
      <head>
        <title>DabetAI API - Scalar Documentation</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { margin: 0; }
        </style>
      </head>
      <body>
        <script
          id="api-reference"
          data-url="/api/docs-json"
          data-configuration='{"theme":"purple","hideDownloadButton":false,"searchHotKey":"k","showSidebar":true}'
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
      </body>
    </html>`;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 dabetai API running on: http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
  console.log(`✨ Scalar UI: http://localhost:${port}/api/scalar`);
}
bootstrap();
