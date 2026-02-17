import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Jan" })
  @IsString()
  @MinLength(1, { message: "firstName must not be empty" })
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: "Kowalski" })
  @IsString()
  @MinLength(1, { message: "lastName must not be empty" })
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: "1990-01-15" })
  @Type(() => Date)
  @IsDate({ message: "dateOfBirth must be a valid date" })
  dateOfBirth: Date;

  @ApiProperty({ example: "jan@example.com" })
  @IsEmail(undefined, { message: "email must be a valid email address" })
  email: string;

  @ApiProperty({ example: "janko" })
  @IsString()
  @MinLength(3, { message: "login must be at least 3 characters" })
  @MaxLength(50)
  login: string;

  @ApiProperty({ example: "Haslo123!", minLength: 8 })
  @IsString()
  @MinLength(8, { message: "password must be at least 8 characters" })
  @MaxLength(100)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  login?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password?: string;
}

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
