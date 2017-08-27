
/*
    This decorator need to be added to every handler class
    with appriopriate message (command or query) class.
*/
import { Cqrs } from "../cqrs/Cqrs";

export function AssignMessageToMessageHandler(messageClass: any)
{
    return function (messageHandlerClass)
    {
        Cqrs.RegisterMessageHandler(messageClass.name, messageHandlerClass);
    }
}