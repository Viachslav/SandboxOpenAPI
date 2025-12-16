import {usernameRandom, passwordRandom} from '../helper/randomizers';

const emptyString = ``;
const validPassword = passwordRandom(8);
const validLogin = usernameRandom(8);
const rensponseMessage = { code: '1200', message: 'UserName and Password required.' };

export const credentialsInvalidLoginPasswordCombination =
[
    {
    testName : `POST /User Create user with empty payload @negative`,
    expected: rensponseMessage,
    data: {}
    },     
    {
    testName : `POST /User Create user without payload  @negative`,
    expected: rensponseMessage,
    data: undefined,
    },     
    {
    testName : `POST /User Create user with empty username @negative`,
    expected: rensponseMessage,
    data: {
                userName: emptyString,
                password: validPassword
            }
    },     
    {
    testName : `POST /User Create user with empty password @negative`,
    expected: rensponseMessage,
    data: {
            userName: validLogin,
            password: emptyString
            }
    },     

];

export const credentialsInvalidnPassword =
[

]