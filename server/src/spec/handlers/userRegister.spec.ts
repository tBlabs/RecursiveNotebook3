// import { Context } from './../../framework/Context';
// import { AuthService } from './../../services/AuthService';
// import { UserRegisterQueryHandler } from './../../handlers/auth/UserRegisterQueryHandler';
// import { UserRegisterQuery } from "../../messages/auth/UserRegisterQuery";
// import { Database } from "../../database/Database";
// import { container } from "../../inversify.config";


// xdescribe('User Register Query Handler', () =>
// {
//     let userRegisterQuery: UserRegisterQuery = null;
//     let userRegisterQueryHandler: UserRegisterQueryHandler = null;
//     let database: Database = null;
//     let auth: AuthService = null;
//     let context: Context = null;

//     beforeEach(() =>
//     {
//         database = container.resolve(Database);
//         auth = new AuthService();
//         userRegisterQuery = new UserRegisterQuery();
//         userRegisterQueryHandler = new UserRegisterQueryHandler(database, auth);
//         context = new Context();
//     })

//     it('should register new user', async (done) =>
//     {
//         await database.Clean('users');

//         try
//         {
//             let jwt: string = await userRegisterQueryHandler.Handle(userRegisterQuery, context);
//             expect(jwt).toMatch(/[\w\d-]{10,200}\.[\w\d-]{10,500}\.[\w\d-]{10,200}/gm)
//         }
//         catch (error) { }

//         done();
//     });

//     it('should not register user again (email taken error)', async (done) =>
//     {
//         await database.Clean('users');

//         try
//         {
//             await userRegisterQueryHandler.Handle(userRegisterQuery, context);
//             await userRegisterQueryHandler.Handle(userRegisterQuery, context);
//         }
//         catch (ex)
//         {
//             // if (ex instanceof HandlerException)
//             // {
//             //     let e: HandlerException = ex as HandlerException;

//             //   //  expect(e.message).toBe("Email taken");
//             // }
//         }

//         done();
//     });
// })

