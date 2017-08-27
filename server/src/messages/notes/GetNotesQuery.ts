import { injectable } from 'inversify';
import { IsUUID } from 'validator.ts/decorator/Validation';
import { guid } from "../../types";
import { AddToMessagesProvider } from "../../decorators/AddToMessagesProvider";

@AddToMessagesProvider()
@injectable()
export class GetNotesQuery
{
    @IsUUID()
    public parentId: guid;
}