import { test, expect } from '@playwright/test';
import { credentialsInvalidLoginPasswordCombination, credentialsInvalidnPassword  } from '../../../testData/credentials';
import { timeCounter } from '../../../helper/timeCounter';
import {passwordRandom, usernameRandom} from '../../../helper/randomizers';

for (const { testName, data, expected } of credentialsInvalidLoginPasswordCombination) {
  test(testName, async ({ request }) => {
    const response = await request.post('/Account/v1/User', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toEqual(expected);

    console.log(body);
  });
}

// test('POST /User Create user via API @positive', async ({ request }) => {
//   const response = await request.post(
//     '/Account/v1/User',
//     {
//       headers: {
//         accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       data: {
//         userName: 'testUser12345',
//         password: 'Test@12345',
//       },
//     }
//   );

//   console.log(await response.json());
//   expect(response.status()).toBe(201);
//   const body = await response.json();

//   expect(body).toHaveProperty('userID');
//   expect(body).toHaveProperty('username', 'testUser12345');

  // const duration = timeCounter();
  // expect(response.status()).toBe(200);
  // expect(duration).toBeLessThan(500);
// });

