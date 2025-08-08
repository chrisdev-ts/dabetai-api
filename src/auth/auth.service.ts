import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BasicRegisterDto } from './dto/basic-register.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { User } from '../../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user
    const user = await this.usersService.create({
      ...registerDto,
      role: 'USER' as any,
    });

    // Generate JWT token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        role: user.role,
      },
    };
  }

  async registerPatient(registerPatientDto: RegisterPatientDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(
      registerPatientDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create patient user with all medical information
    const user = await this.usersService.createPatient({
      ...registerPatientDto,
      role: 'PATIENT' as any,
    });

    // Generate JWT token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        role: user.role,
        diabetesType: user.diabetesType,
        diagnosisYear: user.diagnosisYear,
        hasHypertension: user.hasHypertension,
        birthDate: user.birthDate,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Validate user credentials
    const user = await this.usersService.validatePassword(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id, role: user.role };
    console.log('Generating JWT with payload:', payload);
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        role: user.role,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validatePassword(email, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async basicRegister(basicRegisterDto: BasicRegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(
      basicRegisterDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user with basic information
    const user = await this.usersService.createBasicUser({
      ...basicRegisterDto,
      role: 'PATIENT' as any,
    });

    // Generate JWT token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        role: user.role,
        isProfileComplete: false, // Indica que falta completar el perfil
      },
    };
  }

  async completeProfile(
    userId: string,
    completeProfileDto: CompleteProfileDto,
  ) {
    // Update user with medical information
    const user = await this.usersService.completeUserProfile(
      userId,
      completeProfileDto,
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        role: user.role,
        diabetesType: user.diabetesType,
        diagnosisYear: user.diagnosisYear,
        hasHypertension: user.hasHypertension,
        birthDate: user.birthDate,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        isProfileComplete: true,
      },
    };
  }
}
