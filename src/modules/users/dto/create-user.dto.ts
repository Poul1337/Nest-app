import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "test" })
  @IsString()
  @MinLength(1, { message: "firstName must not be empty" })
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: "user" })
  @IsString()
  @MinLength(1, { message: "lastName must not be empty" })
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: "1990-01-15" })
  @Type(() => Date)
  @IsDate({ message: "dateOfBirth must be a valid date" })
  dateOfBirth: Date;

  @ApiProperty({ example: "test@example.com" })
  @IsEmail(undefined, { message: "email must be a valid email address" })
  email: string;

  @ApiProperty({ example: "Pokemon1!", minLength: 8 })
  @IsString()
  @MinLength(8, { message: "password must be at least 8 characters" })
  @MaxLength(100)
  password: string;
}
