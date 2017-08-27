import { injectable } from 'inversify';
import { guid } from "../../types";
import { IsUUID, NotEmpty } from "validator.ts/decorator/Validation";
import { AddToMessagesProvider } from "../../decorators/AddToMessagesProvider";

@AddToMessagesProvider()
@injectable()
export class AddNoteCommand
{
    @IsUUID()
    public id: guid;

    @IsUUID()
    public parentId: guid;

    @NotEmpty()
    public title: string;
}