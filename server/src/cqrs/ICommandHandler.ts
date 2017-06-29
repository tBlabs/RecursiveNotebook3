import { Context } from "../framework/Context";

export interface ICommandHandler
{
    Handle(command: any, context: Context): void;
}