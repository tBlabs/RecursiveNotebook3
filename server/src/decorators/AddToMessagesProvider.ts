import { Cqrs } from './../cqrs/Cqrs';

export function AddToMessagesProvider()
{
    return function (messageClass)
    {
        Cqrs.RegisterMessage(messageClass.name, messageClass);
    }
}