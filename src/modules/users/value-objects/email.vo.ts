import { BadRequestException } from "@nestjs/common";

const EMAIL_REGEX = /^[\w.+%-]+@([\w-]+\.)+[\w-]{2,63}$/;

export class EmailVO {
  private constructor(private readonly value: string) {}

  static create(email: string): EmailVO {
    const trimmed = email?.trim() ?? "";
    if (!trimmed) {
      throw new BadRequestException("Email must be in proper format");
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      throw new BadRequestException("Email must be in proper format");
    }
    return new EmailVO(trimmed);
  }

  getValue(): string {
    return this.value;
  }
}
