import { guid } from "../../types";
import { IsUUID } from "validator.ts/decorator/Validation";

export class AddNoteCommand
{
    @IsUUID()
    public id: guid;

    @IsUUID()
    public parentId: guid;

    public title: string;
}