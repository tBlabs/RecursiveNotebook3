import { Context } from "../framework/Context";

export interface IQueryHandler
{
    Handle(query: any, context: Context): Promise<any>;
}