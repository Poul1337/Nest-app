import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponseDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  @ApiOperation({ summary: "Find user by id" })
  @ApiParam({ name: "id", description: "User UUID" })
  @ApiResponse({
    status: 200,
    description: "User found",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  getUserById(@Param("id") id: string): Promise<UserResponseDto> {
    return this.usersService.findUserById(id);
  }
}
