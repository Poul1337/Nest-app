import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { UsersService } from "../users/users.service";
import { FriendRequestEnum } from "./enums/friend-request.enum";
import { FriendRequest } from "./entities/friend-request.entity";
import { FriendsMapper } from "./mappers/friends.mappers";
import { FriendRequestResponseDto } from "./dto/friend-request-response.dto";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    private readonly usersService: UsersService,
  ) {}

  async getFriendsList(id: string): Promise<UserResponseDto[]> {
    return await this.usersService.getFriendsList(id);
  }

  async sendInvitation(senderId: string, receiverId: string): Promise<void> {
    const { sender, receiver } = await this.usersService.getSenderAndReceiver(
      senderId,
      receiverId,
    );

    const friendsList = await this.usersService.getFriendsList(senderId);

    const isReceiverInList = friendsList.some(({ id }) => id === receiverId);

    if (isReceiverInList)
      throw new ConflictException("User already in friends list");

    const existingRequest = await this.friendRequestRepository.findOne({
      where: [
        {
          sender: { id: sender.id },
          receiver: { id: receiver.id },
          status: FriendRequestEnum.PENDING,
        },
        {
          sender: { id: receiver.id },
          receiver: { id: sender.id },
          status: FriendRequestEnum.PENDING,
        },
      ],
    });

    if (existingRequest)
      throw new ConflictException(
        "Friend request already exists or is pending",
      );

    const request = FriendsMapper.toEntity(sender, receiver);
    await this.friendRequestRepository.save(request);
  }

  async getReceivedFriendRequests(
    userId: string,
  ): Promise<FriendRequestResponseDto[]> {
    const receivedList = await this.friendRequestRepository.find({
      where: { receiver: { id: userId } },
      relations: ["sender"],
    });

    return (receivedList ?? []).map((request) =>
      FriendsMapper.toResponseDto(request),
    );
  }
}
