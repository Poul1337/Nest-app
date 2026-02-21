import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { UsersEntity } from "../entities/users.entity";
import { v4 as uuidv4 } from "uuid";
import { EmailVO } from "../value-objects/email.vo";

export class UsersMapper {
  static toResponseDto(entity: UsersEntity): UserResponseDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      dateOfBirth: entity.dateOfBirth,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(dto: CreateUserDto, hashedPassword: string): UsersEntity {
    const user = new UsersEntity();

    const now = new Date();
    const emailVO = EmailVO.create(dto.email);
    const uuid = uuidv4();

    user.id = uuid;
    user.email = emailVO.getValue();
    user.password = hashedPassword;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.dateOfBirth = dto.dateOfBirth;
    user.createdAt = now;
    user.updatedAt = now;
    user.deletedAt = null;

    return user;
  }
}
