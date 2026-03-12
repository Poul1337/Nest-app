import { User } from "../../users/entities/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FriendRequestEnum } from "../enums/friend-request.enum";

@Entity({ name: "friend_request" })
export class FriendRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  senderId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "receiver_id" })
  receiverId: User;

  @Column({
    type: "enum",
    enum: FriendRequestEnum,
    default: FriendRequestEnum.PENDING,
  })
  status: FriendRequestEnum;
}
