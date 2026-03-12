import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashService } from "../../common/services/hash.service";
import { User } from "./entities/users.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CleanupUsersCron } from "./cron/cleanup-users.cron";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [HashService, UsersService, CleanupUsersCron],
  exports: [UsersService],
})
export class UsersModule {}
