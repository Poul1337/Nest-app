import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UsersService } from "../users.service";

@Injectable()
export class CleanupUsersCron {
  constructor(private readonly userService: UsersService) {}

  @Cron("0 0 * * *")
  handleCleanup(): Promise<void> {
    return this.userService.cleanupSoftDeletedUsers();
  }
}
