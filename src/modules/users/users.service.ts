import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersEntity } from "./entities/users.entity";
import { UsersMapper } from "./mappers/users.mapper";
import { HashService } from "src/common/services/hash.service";
import { PasswordVO } from "./value-objects/password.vo";
import { EmailVO } from "./value-objects/email.vo";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly hashService: HashService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const emailVO = EmailVO.create(dto.email);
    const existing = await this.usersRepository.findOne({
      where: [{ email: emailVO.getValue() }],
    });

    if (existing?.email === emailVO.getValue())
      throw new ConflictException("User with this email already exists");

    const passwordVO = PasswordVO.create(dto.password);
    const hashedPassword = await this.hashService.hash(passwordVO.getValue());
    const entity = UsersMapper.toEntity(dto, hashedPassword);

    const saved = await this.usersRepository.save(entity);
    return UsersMapper.toResponseDto(saved);
  }

  async findUserById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException("User doesn't exist");

    return UsersMapper.toResponseDto(user);
  }

  async deleteUser()
}
