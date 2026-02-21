import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashService } from "../../common/services/hash.service";
import { UsersEntity } from "../users/entities/users.entity";
import { LogInDto } from "./dto/log-in.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { EmailVO } from "../users/value-objects/email.vo";

export interface AccessTokenResponse {
  accessToken: string;
}

interface ValidatedUser {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: LogInDto): Promise<ValidatedUser> {
    const emailVO = EmailVO.create(dto.email);

    const user = await this.usersRepository.findOne({
      where: { email: emailVO.getValue() },
    });

    if (!user) throw new UnauthorizedException("User not found");
    if (user.deletedAt)
      throw new UnauthorizedException("User with this email is deleted");

    const isPasswordValid = await this.hashService.compare(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException("Invalid password");

    return { id: user.id, email: user.email };
  }

  async login(dto: LogInDto): Promise<AccessTokenResponse> {
    const user = await this.validateUser(dto);
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
