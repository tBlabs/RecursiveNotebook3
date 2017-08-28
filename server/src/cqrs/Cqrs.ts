import { GetNotesQuery } from './../messages/notes/GetNotesQuery';
import { Validator } from 'validator.ts/Validator';
import { LoginQueryHandler } from './../handlers/auth/LoginQueryHandler';
import { ICommandHandler } from './ICommandHandler';
import { container } from "../inversify.config";
import { Context } from "../framework/Context";
import { Exception } from "../exceptions/Exception";
import { ExceptionCode } from "../shared/errors/ExceptionCode";
import { ValidationErrorInterface } from "validator.ts/ValidationErrorInterface";

export class Cqrs
{
    private static _messages = {};
    private static _messageHandlers = {};

    public static PrintMessagesAndTheirHandlers() 
    {
        console.log("Messages:", Object.keys(this._messages).toString());
        console.log("Handlers:", this._messageHandlers);
    }

    public static RegisterMessage(name: string, klass: any)
    {
        this._messages[name] = klass;
        container.bind(klass).toSelf();
    }

    public static RegisterMessageHandler(name: string, klass: any)
    {
        this._messageHandlers[name] = klass; // collection['messageName'] = messageClass
        container.bind(klass).toSelf();
    }

    public static ResolveMessage(messageName): any
    {
        let msgName = Object.keys(this._messages).find(i => i === messageName);

        if (msgName === undefined) 
        {
            console.log(`Can not find message "${ messageName }"`);

            throw new Exception(ExceptionCode.CanNotResolveMessage);
        }

        return container.get(this._messages[msgName]);
    }

    public static ResolveMessageHandler(messageName): any
    {
        let msgName = Object.keys(this._messageHandlers).find(i => i === messageName);

        if (msgName === undefined) 
        {
            console.log(`Can not find handler for message "${ messageName }"`);

            throw new Exception(ExceptionCode.CanNotResolveMessageHandler);
        }

        return container.get(this._messageHandlers[msgName]);
    }

    public static MixMessages(target: Object, source: Object): Object
    {
        for (let p in source)
        {
            target[p] = source[p];
        }

        return target;
    }

    public static async Execute(messagePackage: Object, context: Context): Promise<any>
    {
        let messageName: string = Object.keys(messagePackage)[0]; // First key is a message class name
        let messageBody: Object = messagePackage[messageName]; // Value of first key is message class body/properties

        console.log("Handling " + messageName + "...");
        console.log('with body:', messageBody);

        let resolvedMessage: any = this.ResolveMessage(messageName);
        let message: Object = Cqrs.MixMessages(resolvedMessage, messageBody); // Copy oryginal message props to resolved message

        // Validation
        let validator: Validator = new Validator(); // TODO: move to IoC
        let errors: ValidationErrorInterface[] = validator.validate(message);

        if (errors.length != 0) 
        {
            console.log('Message validation errors:', errors);

            throw new Exception(ExceptionCode.ValidationProblem);
        }

        let messageHandler: any = this.ResolveMessageHandler(messageName);

        return await messageHandler.Handle(message, context);
    }
}

