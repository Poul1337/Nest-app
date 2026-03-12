import { Module } from "@nestjs/common";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";
import { FriendRequest } from "./entities/friend-request.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest])],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
