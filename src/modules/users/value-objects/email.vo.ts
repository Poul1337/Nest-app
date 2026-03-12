import { BadRequestException } from "@nestjs/common";

const EMAIL_REGEX = /^[\w.+%-]+@([\w-]+\.)+[\w-]{2,63}$/;

export class EmailVO {
  private constructor(private readonly value: string) {}

  static create(email: string): EmailVO {
    const trimmed = email?.trim().toLocaleLowerCase() ?? "";
    if (!trimmed) {
      throw new BadRequestException("Email must be in proper format");
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      throw new BadRequestException("Email must be in proper format");
    }
    return new EmailVO(trimmed);
  }

  isEqual(other: EmailVO | string): boolean {
    const otherValue = typeof other === "string" ? other : other.getValue();
    return this.value === otherValue;
  }

  getValue(): string {
    return this.value;
  }
}
