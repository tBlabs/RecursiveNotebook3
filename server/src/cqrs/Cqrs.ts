import { LoginQueryHandler } from './../handlers/auth/LoginQueryHandler';
import { ICommandHandler } from './ICommandHandler';
import { container } from "../inversify.config";
import { Context } from "../framework/Context";
import { HandlerException } from "../framework/HandlerException";
import { CqrsException } from "./CqrsException";
import { IQueryHandler } from "./IQueryHandler";

export class Cqrs
{
    private static messageHandlers = {};

    public static PrintMessagesHandlers()
    {
        console.log("Handlers: ", this.messageHandlers);
    }

    public static RegisterMessageHandler(name: string, klass: any)
    {
        this.messageHandlers[name] = klass; // collection['messageName'] = messageClass
        container.bind(klass).toSelf();
    }

    public static ResolveMessageHandler(name): any//IMessageHandler
    {
        let messageName = Object.keys(this.messageHandlers).find(i => i === name);

        if (messageName === undefined) throw new CqrsException(`Could not find handler for message "${ name }".`);

        return container.get(this.messageHandlers[messageName]);// as IMessageHandler;
       // return container.get(LoginQueryHandler) as IMessageHandler;
    }

    public static async Execute(messagePackage: any, context: Context): Promise<any>
    {
        // try // without it we will get UnhandledPromiseRejectionWarning
        // {
            let messageName = Object.keys(messagePackage)[0]; // First key is a message class name
            let messageBody = messagePackage[messageName]; // Value of first key is message class body/properties

            console.log("Handling " + messageName + "...");
            console.log('with message:', messageBody);

           let messageHandler: any = this.ResolveMessageHandler(messageName);
         //   let messageHandler = container.get(LoginQueryHandler);
           return await messageHandler.Handle(messageBody, context);
            //   let h = new LoginQueryHandler(null, null);
            //   return await h.Handle(null, null);
        // }
        // catch (ex) // Handle() returns a Promise, that's why exception need to be rethrowed! (without it we will get UnhandledPromiseRejectionWarning)
        // {
        //     console.log("[Cqrs catch]: ",ex);
            
        //      throw ex;
        //     //throw new CqrsException(ex);
        // }
    }
}

