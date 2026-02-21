import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "date_of_birth" })
  dateOfBirth: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Column({
    name: "deleted_at",
    type: "timestamptz",
    nullable: true,
  })
  deletedAt: Date | null;
}
