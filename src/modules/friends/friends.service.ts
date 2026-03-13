import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { FriendRequestEnum } from "./enums/friend-request.enum";
import { FriendRequest } from "./entities/friend-request.entity";
import { FriendsMapper } from "./mappers/friends.mappers";
import { FriendRequestResponseDto } from "./dto/friend-request-response.dto";
import { FriendResponseDto } from "../users/dto/friend-response.dto";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    private readonly usersService: UsersService,
  ) {}

  async getFriendsList(id: string): Promise<FriendResponseDto[]> {
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
      where: {
        receiver: { id: userId },
        status: FriendRequestEnum.PENDING,
      },
      relations: ["sender"],
    });

    return (receivedList ?? []).map((request) =>
      FriendsMapper.toResponseDto(request),
    );
  }

  async rejectInvitation(invitationId: string, userId: string): Promise<void> {
    const invitation = await this.friendRequestRepository.findOne({
      where: {
        id: invitationId,
        status: FriendRequestEnum.PENDING,
      },
      relations: ["receiver"],
    });

    if (!invitation) throw new NotFoundException("Invitation not found");

    if (invitation.receiver.id !== userId) {
      throw new ForbiddenException(
        "You can only reject invitations sent to you",
      );
    }

    invitation.status = FriendRequestEnum.REJECTED;
    await this.friendRequestRepository.save(invitation);
  }

  async acceptInvitation(invitationId: string, userId: string): Promise<void> {
    const invitation = await this.friendRequestRepository.findOne({
      where: {
        id: invitationId,
        status: FriendRequestEnum.PENDING,
      },
      relations: ["receiver", "sender"],
    });

    if (!invitation) throw new NotFoundException("Invitation not found");

    if (invitation.receiver.id !== userId) {
      throw new ForbiddenException(
        "You can only accept invitations sent to you",
      );
    }

    invitation.status = FriendRequestEnum.ACCEPTED;
    await this.friendRequestRepository.save(invitation);
    await this.usersService.addToFriends(userId, invitation.sender.id);
  }
}
