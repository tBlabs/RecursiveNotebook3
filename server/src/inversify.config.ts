import { Validator } from 'validator.ts/Validator';
import { Cqrs } from './cqrs/Cqrs';
import { INotesRepo } from './repositories/INotesRepo';
import { Container, decorate, injectable } from 'inversify';
import { AuthService } from "./services/AuthService";
import { NotesRepo } from "./repositories/NotesRepo";
import { Database } from "./database/Database";


const container = new Container();

container.bind<Validator>(Validator).toConstantValue(new Validator()); // or as an alternative use: decorate(injectable(), Validator);
container.bind<Cqrs>(Cqrs).toSelf().inSingletonScope();
container.bind<Database>(Database).toSelf();
container.bind<INotesRepo>("INotesRepo").to(NotesRepo);
container.bind<AuthService>(AuthService).toSelf();


export { container };