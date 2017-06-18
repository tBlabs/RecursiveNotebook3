
/*
    This decorator need to be added to every handler class
    with appriopriate message (command or query) class.
*/
import { Cqrs } from "../cqrs/Cqrs";

export function AssignMessage(messageClass: any)
{
    return function (target)
    {
        Cqrs.RegisterMessageHandler(messageClass.name, target);
    }
}