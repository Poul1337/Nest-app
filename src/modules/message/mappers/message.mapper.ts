import { v4 as uuidv4 } from "uuid";
import { CreateMessageDto } from "../dto/create-message.dto";
import { Message } from "../entities/message.entity";
import { User } from "src/modules/users/entities/users.entity";

export class MessageMapper {
  static toEntity(createMessageDto: CreateMessageDto, sender: User): Message {
    const { message, receiver } = createMessageDto;

    const entityMessage = new Message();

    const uuid = uuidv4();

    entityMessage.id = uuid;
    entityMessage.receiver = receiver;
    entityMessage.sender = sender;

    return entityMessage;
  }
}