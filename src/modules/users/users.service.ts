import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { User } from "./entities/users.entity";
import { UsersMapper } from "./mappers/users.mapper";
import { HashService } from "../../common/services/hash.service";
import { PasswordVO } from "./value-objects/password.vo";
import { EmailVO } from "./value-objects/email.vo";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const emailVO = EmailVO.create(dto.email);
    const existing = await this.usersRepository.findOne({
      where: { email: emailVO.getValue() },
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

  async deleteUser(id: string, deleteDto: DeleteUserDto): Promise<void> {
    const { password } = deleteDto;
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException("User doesn't exist");

    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );
    if (!isPasswordCorrect) throw new UnauthorizedException("Invalid password");

    await this.usersRepository.softRemove(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const { email, password } = updateUserDto;

    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException("User not found");

    if (email) {
      const emailVO = EmailVO.create(email);
      if (emailVO.isEqual(user.email))
        throw new ConflictException("New email must be different from current");
      user.email = emailVO.getValue();
    }

    if (password) {
      const passwordVO = PasswordVO.create(password);
      const isSameAsCurrent = await this.hashService.compare(
        passwordVO.getValue(),
        user.password,
      );
      if (isSameAsCurrent)
        throw new ConflictException(
          "New password must be different from current",
        );
      user.password = await this.hashService.hash(passwordVO.getValue());
    }

    await this.usersRepository.save(user);
  }

  async cleanupSoftDeletedUsers(): Promise<void> {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("deleted_at IS NOT NULL")
      .andWhere("deleted_at <:time", { time: oneMinuteAgo })
      .execute();
  }
}
