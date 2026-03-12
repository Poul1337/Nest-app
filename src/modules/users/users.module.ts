import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashService } from "../../common/services/hash.service";
import { UsersEntity } from "./entities/users.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [HashService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
