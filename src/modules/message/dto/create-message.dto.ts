import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, MaxLength, MinLength } from "class-validator";
import { User } from "src/modules/users/entities/users.entity";

export class CreateMessageDto {
  @ApiProperty()
  @IsUUID()
  receiver: User;

  @ApiProperty()
  @MinLength(1, {
    message: "message must be at least 1 character long",
  })
  @MaxLength(255, {
    message: "message cant be longer than 255 characters",
  })
  message: string;
}
