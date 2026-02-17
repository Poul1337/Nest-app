import { UserResponseDto } from "../dto/users.dto";
import { UsersEntity } from "../entities/users.entity";

export class UsersMapper {
  static toResponseDto(entity: UsersEntity): UserResponseDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      dateOfBirth: entity.dateOfBirth,
      email: entity.email,
      login: entity.login,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
