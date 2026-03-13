import { User } from "src/modules/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "receiver_id" })
  receiver: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
