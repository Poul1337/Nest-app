import { BadRequestException } from "@nestjs/common";

const MIN_LENGTH = 8;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_DIGIT = /\d/;
const HAS_SPECIAL = /[^A-Za-z0-9]/;

export class PasswordVO {
  private constructor(private readonly value: string) {}

  static create(password: string): PasswordVO {
    const trimmed = password?.trim() ?? "";
    if (trimmed.length < MIN_LENGTH) {
      throw new BadRequestException("Password must be at least 8 characters");
    }
    if (!HAS_UPPERCASE.test(trimmed)) {
      throw new BadRequestException(
        "Password must contain at least one uppercase letter",
      );
    }
    if (!HAS_DIGIT.test(trimmed)) {
      throw new BadRequestException("Password must contain at least one digit");
    }
    if (!HAS_SPECIAL.test(trimmed)) {
      throw new BadRequestException(
        "Password must contain at least one special character",
      );
    }
    return new PasswordVO(trimmed);
  }

  getValue(): string {
    return this.value;
  }
}
