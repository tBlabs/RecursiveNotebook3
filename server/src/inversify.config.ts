import { INotesRepo } from './repositories/INotesRepo';
import { Container } from 'inversify';
import { AuthService } from "./services/AuthService";
import { NotesRepo } from "./repositories/NotesRepo";
import { Database } from "./database/Database";


const container = new Container();

container.bind<Database>(Database).toSelf();
container.bind<INotesRepo>("INotesRepo").to(NotesRepo);
container.bind<AuthService>(AuthService).toSelf();


export { container };