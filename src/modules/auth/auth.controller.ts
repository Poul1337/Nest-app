import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { LogInDto } from "./dto/log-in.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post("/register")
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

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Log in, get access token" })
  @ApiBody({ type: LogInDto })
  @ApiResponse({
    status: 200,
    description: "Returns JWT accessToken",
    schema: { type: "object", properties: { accessToken: { type: "string" } } },
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  login(@Body() dto: LogInDto) {
    return this.authService.login(dto);
  }
}
