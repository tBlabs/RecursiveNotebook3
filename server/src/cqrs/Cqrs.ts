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
    private static _messageHandlers = {};

    public static PrintMessagesHandlers()
    {
        console.log("Handlers: ", this._messageHandlers);
    }

    public static RegisterMessageHandler(name: string, klass: any)
    {
        this._messageHandlers[name] = klass; // collection['messageName'] = messageClass
        container.bind(klass).toSelf();
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

    public static async Execute(messagePackage: any, context: Context): Promise<any>
    {
        let messageName = Object.keys(messagePackage)[0]; // First key is a message class name
        let messageBody = messagePackage[messageName]; // Value of first key is message class body/properties

        console.log("Handling " + messageName + "...");
        console.log('with message:', messageBody);

        let validator: Validator = new Validator();//TODO: move to IoC
        let errors: ValidationErrorInterface[] = validator.validate(messageBody);

        

        if (errors.length != 0) 
        {
            console.log('Validation errors:', errors);

            throw new Exception(ExceptionCode.ValidationProblem, errors);

            //     let message = `Field "${ errors[0].errorName }" of value ${ errors[0].value } is wrong`;
        }
        else console.log();
        

        let messageHandler: any = this.ResolveMessageHandler(messageName);

        return await messageHandler.Handle(messageBody, context);
    }
}

