import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendRequest } from "./entities/friend-request.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { FriendRequestDto } from "./dto/friend-request.dto";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    private readonly usersService: UsersService,
  ) {}

  async sendInvitation(friendRequestDto: FriendRequestDto): Promise<void> {
    const { receiverId } = friendRequestDto;

    const receiver = await this.usersService.findUserById(receiverId);

    if (!receiver) throw new NotFoundException("User not found");

    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: receiverId },
    });

    if (friendRequest) throw new ConflictException("Invitation already sent");

    
  }
}
