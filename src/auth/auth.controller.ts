import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BasicRegisterDto } from './dto/basic-register.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registro completo de usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'cuid_example',
          email: 'usuario@ejemplo.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          secondLastName: 'González',
          role: 'USER',
        },
      },
    },
  })
  @ApiConflictResponse({ description: 'El usuario ya existe' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: 'Registro básico (Paso 1 de 2)',
    description:
      'Crea una cuenta básica con información personal mínima. Perfecto para el onboarding en dos pasos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Cuenta básica creada exitosamente',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'cuid_example',
          email: 'paciente@ejemplo.com',
          firstName: 'María',
          lastName: 'García',
          secondLastName: 'López',
          role: 'PATIENT',
          isProfileComplete: false,
        },
      },
    },
  })
  @ApiConflictResponse({ description: 'El email ya está registrado' })
  @Post('register/basic')
  async basicRegister(@Body() basicRegisterDto: BasicRegisterDto) {
    return this.authService.basicRegister(basicRegisterDto);
  }

  @ApiOperation({ summary: 'Registro completo de paciente' })
  @ApiResponse({
    status: 201,
    description:
      'Paciente registrado exitosamente con información médica completa',
  })
  @ApiConflictResponse({ description: 'El paciente ya existe' })
  @Post('register/patient')
  async registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    return this.authService.registerPatient(registerPatientDto);
  }

  @ApiOperation({
    summary: 'Completar perfil médico (Paso 2 de 2)',
    description:
      'Agrega información médica completa al perfil del usuario. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil médico completado exitosamente',
    schema: {
      example: {
        user: {
          id: 'cuid_example',
          email: 'paciente@ejemplo.com',
          firstName: 'María',
          lastName: 'García',
          secondLastName: 'López',
          role: 'PATIENT',
          diabetesType: 'TYPE_2',
          diagnosisYear: 2020,
          hasHypertension: false,
          birthDate: '1990-03-20T00:00:00.000Z',
          gender: 'FEMALE',
          height: 165,
          weight: 70.5,
          isProfileComplete: true,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT inválido o expirado' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch('complete-profile')
  async completeProfile(
    @Request() req,
    @Body() completeProfileDto: CompleteProfileDto,
  ) {
    return this.authService.completeProfile(
      req.user.userId,
      completeProfileDto,
    );
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'cuid_example',
          email: 'usuario@ejemplo.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          secondLastName: 'González',
          role: 'PATIENT',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Obtener perfil del usuario autenticado',
    description: 'Retorna la información del usuario basada en el token JWT',
  })
  @ApiResponse({
    status: 200,
    description: 'Información del usuario',
    schema: {
      example: {
        userId: 'cuid_example',
        email: 'usuario@ejemplo.com',
        role: 'PATIENT',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT inválido o expirado' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
