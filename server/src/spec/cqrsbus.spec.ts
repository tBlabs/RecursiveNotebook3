// import { Context } from "../framework/Context";
// import { Cqrs } from "../cqrs/cqrs";

// describe('Cqrs Bus', () =>
// {
//    it('should ...', async (done) =>
//    {
//        //let packageAsString = '{ "UserRegisterQuery": { "email": "u3", "password": "pass" } }';
//        // let packageAsString = '{ "LoginQuery": { "email": "tB", "password": "pass" } }';
//        // let packageAsString = '{ "AddNoteCommand": { "id": "12345678-1234-1234-1234-123456789012", "parentId": "00000002-0000-0000-0000-000000000000", "title": "note title", "content": "tab content" } }';
//        let packageAsString = '{ "UpdateNoteCommand": { "id": "8574c9e6-a4b9-4b4a-3165-1d2f21061df9", "parentId": "ad39954b-3ea9-2c68-244d-a58ae1eee927", "title": "new title", "content": "new content" } }';
//        //   let packageAsString = '{ "GetNotesQuery": { "parentId": "00000001-0000-0000-0000-000000000000" } }';


//        let context: Context = new Context();
//        context.user.id = "575af61d-6ff2-40b2-8afa-b295d2a4e489";
//        context.user.claims.canReadNote = true;
//        context.user.claims.canAddNote = true;
//        context.user.claims.canChangeNote = true;

//        try
//        {
//            let messagePackage = JSON.parse(packageAsString);
//            let result = await Cqrs.Execute(messagePackage, context);
//            console.log(result);

//            done();
//        }
//        catch (error)
//        {
//            console.log(error);
//        }      
//    });
// });
