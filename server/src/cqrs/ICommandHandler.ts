import { Context } from "../framework/Context";

export interface ICommandHandler extends IMessageHandler
{
    Handle(command: any, context: Context): void;
}