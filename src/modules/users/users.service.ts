import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashService } from "../../common/services/hash.service";
import { CreateUserDto, UserResponseDto } from "./dto/users.dto";
import { UsersEntity } from "./entities/users.entity";
import { UsersMapper } from "./mappers/users.mapper";
import { EmailVO } from "./value-objects/email.vo";
import { PasswordVO } from "./value-objects/password.vo";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly hashService: HashService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const emailVO = EmailVO.create(dto.email);
    const passwordVO = PasswordVO.create(dto.password);

    const hashedPassword = await this.hashService.hash(passwordVO.getValue());
    const now = new Date();

    const user = this.usersRepository.create({
      ...dto,
      email: emailVO.getValue(),
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });

    const saved = await this.usersRepository.save(user);
    return UsersMapper.toResponseDto(saved);
  }
}
