import {usernameRandom, passwordRandom} from '../helper/randomizers';

const emptyString = ``;
const validPassword = passwordRandom(8);
const invalidPassword1Char = passwordRandom(1);
const invalidPassword7Chars = passwordRandom(7);
const validLogin = usernameRandom(8);
const rensponseMessage = { code: '1200', message: 'UserName and Password required.' };
const invalidPasswordWithoutLetters = '1234567!';
const invalidPasswordWithoutNumbers = 'AbcdEfg!';
const invalidPasswordWithoutChars = '1234Abcd';

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

export const credentialsInvalidPassword =
[
    {
    testName : `POST /User Create user with 1 char password length @negative`,
    expected: { code: `1300`, message: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.` },
    data: {
        userName: validLogin,
        password: invalidPassword1Char
    }
    },
    {
    testName : `POST /User Create user with 7 char password length @negative`,
    expected: { code: `1300`, message: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.` },
    data: {
        userName: validLogin,
        password: invalidPassword7Chars
    }
    },
    {
    testName : `POST /User Create user with incorrect password without letters @negative`,
    expected: { code: `1300`, message: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.` },
    data: { 
        userName: validLogin,
        password: invalidPasswordWithoutLetters
    }
    },
    {
    testName : `POST /User Create user with incorrect password without numbers @negative`,
    expected: { code: `1300`, message: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.` },
    data: { 
        userName: validLogin,
        password: invalidPasswordWithoutNumbers
    }
    },
    {
    testName : `POST /User Create user with incorrect password without special characters @negative`,
    expected: { code: `1300`, message: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.` },
    data: { 
        userName: validLogin,
        password: invalidPasswordWithoutChars
    }
    }
]