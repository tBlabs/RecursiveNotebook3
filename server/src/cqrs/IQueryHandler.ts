import { Context } from "../framework/Context";

export interface IQueryHandler extends IMessageHandler
{
    Handle(query: any, context: Context): Promise<any>;
}