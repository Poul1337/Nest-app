import { User } from "../../users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
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
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "receiver_id" })
  receiver: User;

  @Column({
    type: "enum",
    enum: FriendRequestEnum,
    default: FriendRequestEnum.PENDING,
  })
  status: FriendRequestEnum;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;
}
