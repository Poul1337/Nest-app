import { FriendRequest } from "../entities/friend-request.entity";
import { v4 as uuidv4 } from "uuid";
import { FriendRequestEnum } from "../enums/friend-request.enum";
import { User } from "../../users/entities/users.entity";
import { FriendRequestResponseDto } from "../dto/friend-request-response.dto";

export class FriendsMapper {
  static toEntity(sender: User, receiver: User): FriendRequest {
    const friendRequest = new FriendRequest();

    const uuid = uuidv4();

    friendRequest.id = uuid;
    friendRequest.receiver = receiver;
    friendRequest.sender = sender;
    friendRequest.status = FriendRequestEnum.PENDING;

    return friendRequest;
  }

  static toResponseDto(friendRequest: FriendRequest): FriendRequestResponseDto {
    return {
      id: friendRequest.id,
      sender: {
        id: friendRequest.sender.id,
        firstName: friendRequest.sender.firstName,
        lastName: friendRequest.sender.lastName,
      },
      status: friendRequest.status,
    };
  }
}
