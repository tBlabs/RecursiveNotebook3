
/*
    This decorator need to be added to every handler class
    with appriopriate message (command or query) class.
*/
import { Cqrs } from "../cqrs/Cqrs";
import { container } from "../inversify.config";

export function AssignMessageToMessageHandler(messageClass: any)
{
    return function (messageHandlerClass)
    {
       let cqrs: Cqrs = container.get(Cqrs);

       cqrs.RegisterMessageHandler(messageClass.name, messageHandlerClass);
    }
}