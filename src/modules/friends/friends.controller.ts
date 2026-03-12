import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { FriendsService } from "./friends.service";
import { FriendRequestResponse } from "./dto/friend-request-response.dto";

@ApiTags("friends")
@Controller("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get friends list" })
  @ApiResponse({
    status: 200,
    description: "List of friends",
    type: [UserResponseDto],
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  getFriendsList(@CurrentUser("id") id: string): Promise<UserResponseDto[]> {
    return this.friendsService.getFriendsList(id);
  }

  @Post("send/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Send friend request" })
  @ApiParam({ name: "id", description: "Receiver user UUID" })
  @ApiResponse({ status: 201, description: "Friend request sent" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({
    status: 409,
    description: "Already friends or request pending",
  })
  sendFriendRequest(
    @CurrentUser("id") senderId: string,
    @Param("id") receiverId: string,
  ): Promise<void> {
    return this.friendsService.sendInvitation(senderId, receiverId);
  }

  @Get("receivedInvitations")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get received friend requests",
  })
  @ApiResponse({
    status: 200,
    description: "List of friend requests where current user is receiver",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  getReceivedInvitations(
    @CurrentUser("id") id: string,
  ): Promise<FriendRequestResponse[]> {
    return this.friendsService.getReceivedFriendRequests(id);
  }
}
