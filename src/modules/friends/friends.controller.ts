import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { FriendsService } from "./friends.service";
import { FriendRequestResponseDto } from "./dto/friend-request-response.dto";
import { FriendResponseDto } from "../users/dto/friend-response.dto";

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
    type: [FriendResponseDto],
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  getFriendsList(@CurrentUser("id") id: string): Promise<FriendResponseDto[]> {
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
    type: [FriendRequestResponseDto],
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  getReceivedInvitations(
    @CurrentUser("id") id: string,
  ): Promise<FriendRequestResponseDto[]> {
    return this.friendsService.getReceivedFriendRequests(id);
  }

  @Patch("reject/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Reject friend invitation",
  })
  @ApiResponse({
    status: 204,
    description: "Invitation rejected",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  rejectInvitation(
    @CurrentUser("id") userId: string,
    @Param("id") invitationId: string,
  ) {
    return this.friendsService.rejectInvitation(invitationId, userId);
  }

  @Patch("accept/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Accept friend invitation" })
  @ApiParam({ name: "id", description: "Invitation UUID" })
  @ApiResponse({
    status: 204,
    description: "Invitation accepted",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden (not the receiver)" })
  @ApiResponse({ status: 404, description: "Invitation not found" })
  acceptInvitation(
    @CurrentUser("id") userId: string,
    @Param("id") invitationId: string,
  ) {
    return this.friendsService.acceptInvitation(invitationId, userId);
  }
}
