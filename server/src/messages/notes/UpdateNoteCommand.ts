import { IsUUID } from 'validator.ts/decorator/Validation';
import { injectable } from 'inversify';
import { guid } from "../../types";
import { AddToMessagesProvider } from "../../decorators/AddToMessagesProvider";

@AddToMessagesProvider()
@injectable()
export class UpdateNoteCommand
{
    @IsUUID()
    public id: guid;

    @IsUUID()
    public parentId: guid;

    public title: string;
    
    public content: string;
}