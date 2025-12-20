import { test, expect } from '@playwright/test';
import { generateTokenInvalidLoginPasswordCombination, generateTokenInvalidPassword  } from '../../../testData/credentials';
import { passwordRandom, usernameRandom } from '../../../helper/randomizers';



for (const { testName, data, expected } of generateTokenInvalidLoginPasswordCombination) {
  test(testName, async ({ request }) => {
    const response = await request.post('/Account/v1/GenerateToken', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(400);
    expect(body).toEqual(expected);

  });
}

for(const {testName, data, expected} of generateTokenInvalidPassword) {
  test(testName, async ({request}) =>{
    const response = await request.post('/Account/v1/GenerateToken', {
      headers: {
        accept: 'application/json', 
        'Content-Type': 'application/json',
      },
      data,
    });
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(body).toEqual(expected);
  });
}

// test.describe.serial('Check generated token and attempts to generate it with combinations of invalid credentials', () => {
//     let userId: string;
//     let token: string;
  
//     const credentials = {
//       userName: usernameRandom(8),
//       password: passwordRandom(8),
//     };
//     console.log('Random set of credentials for tests:', credentials);
  
//     test.beforeAll(async ({ request }) => {
//       await test.step('Create user', async () => {
//       const response = await request.post(
//         '/Account/v1/User',
//         { data: credentials }
//       );
//         const body = await response.json();
//         console.log(body);
//         expect(response.status()).toBe(201);
//         userId = body.userID;
//       });
//     });
//   });

