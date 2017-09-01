import { Container } from 'inversify';
import { Cqrs } from './cqrs/Cqrs';
import { Validator } from 'validator.ts/Validator';
import { INotesRepo } from './repositories/INotesRepo';
import { AuthService } from "./services/AuthService";
import { NotesRepo } from "./repositories/NotesRepo";
import { Database } from "./database/Database";


const container = new Container();

// decorate(injectable(), Validator);
// container.bind<Validator>(Validator).toSelf(); // or as an alternative use: decorate(injectable(), Validator);
//    or
container.bind<Validator>(Validator).toConstantValue(new Validator()); // or as an alternative use: decorate(injectable(), Validator);

container.bind<Cqrs>(Cqrs).toSelf().inSingletonScope();
container.bind<Database>(Database).toSelf();
container.bind<INotesRepo>("INotesRepo").to(NotesRepo);
container.bind<AuthService>(AuthService).toSelf();

export { container };