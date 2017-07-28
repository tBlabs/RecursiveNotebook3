import { LoginQuery } from './../../messages/auth/LoginQuery';
import { LoginQueryHandler } from './../../handlers/auth/LoginQueryHandler';
import { Exception } from "../../exceptions/Exception";
import { ExceptionCode } from "../../shared/errors/ExceptionCode";

var object = {
    doSomething: function (v)
    {
        throw new Exception(ExceptionCode.ValidationProblem);
    }
};
class XXX
{
    async YYY(x: string): Promise<void>
    {
        if (1) throw new Exception(ExceptionCode.ValidationProblem);
    }
}

describe('toThrow', function ()
{
    it('checks that the expected exception was thrown by the actual', async function (done)
    {
        try
        {
            let xxx = new XXX();
            await xxx.YYY("asdf");
        }
        catch (ex)
        {
            expect(ex.code).toBe(ExceptionCode.ValidationProblem);
            done();
        }
    });
});
describe('LoginQueryHandler', () =>
{
    it('should fail on invalid input', async (done) =>
    {
        let loginQuery = new LoginQuery();
        loginQuery.email = 'mail_without_monkey';
        loginQuery.password = 'xD'; // too short password
        let loginQueryHandler = new LoginQueryHandler(null, null);

        try
        {
            await loginQueryHandler.Handle(loginQuery, null);
        }
        catch (ex)
        {
            expect(ex.code).toBe(ExceptionCode.ValidationProblem);
            done();
        }
    }); 
    
    it('should pass on valid input', async (done) =>
    {
        let loginQuery = new LoginQuery();
        loginQuery.email = 'mail@mail.com';
        loginQuery.password = 'password'; // too short password
        let loginQueryHandler = new LoginQueryHandler(null, null);

        try
        {
            await loginQueryHandler.Handle(loginQuery, null);
            expect(true).toBe(true);
            done();
        }
        catch (ex)
        {
          
        }
    });
});