import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, UserResponseDto } from "../users/dto/users.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "User created",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Validation error" })
  registerUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.createUser(dto);
  }
}
