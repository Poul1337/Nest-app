import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "user@example.com", required: false })
  @IsOptional()
  @IsEmail(undefined, { message: "email must be a valid email address" })
  email?: string;

  @ApiProperty({ example: "NewPass123!", required: false })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password?: string;
}
