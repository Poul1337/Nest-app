import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LogInDto {
  @ApiProperty({ example: "test1@example.com" })
  @IsEmail(undefined, { message: "email must be a valid email address" })
  email: string;

  @ApiProperty({ example: "Pokemon1!" })
  @IsString()
  password: string;
}
