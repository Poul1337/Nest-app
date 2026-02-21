import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LogInDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail(undefined, { message: "email must be a valid email address" })
  email: string;

  @ApiProperty({ example: "Haslo123!" })
  @IsString()
  password: string;
}
