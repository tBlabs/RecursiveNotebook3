import { Cqrs } from './../cqrs/Cqrs';
import { container } from "../inversify.config";

export function AddToMessagesProvider()
{
    return function (messageClass)
    {
       let cqrs: Cqrs = container.get<Cqrs>(Cqrs);

       cqrs.RegisterMessage(messageClass.name, messageClass);
    }
}