import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashService } from "../../common/services/hash.service";
import { UsersEntity } from "./entities/users.entity";
import { UsersMapper } from "./mappers/users.mapper";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [HashService, UsersMapper, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
