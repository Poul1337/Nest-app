import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashService } from "../../common/services/hash.service";
import { UsersEntity } from "../users/entities/users.entity";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

const JwtFactory = (configService: ConfigService) => ({
  secret: configService.getOrThrow<string>("JWT_SECRET"),
  signOptions: {
    expiresIn: "1h" as const,
  },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: JwtFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [HashService, AuthService, JwtStrategy],
})
export class AuthModule {}
