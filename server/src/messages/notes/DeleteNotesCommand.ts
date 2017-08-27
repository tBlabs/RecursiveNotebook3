import { IsUUID } from 'validator.ts/decorator/Validation';
 import { injectable } from 'inversify';
import { guid } from "../../types";
import { AddToMessagesProvider } from "../../decorators/AddToMessagesProvider";

@AddToMessagesProvider()
@injectable()
export class DeleteNotesCommand
{
    @IsUUID()
    public id: guid;
}