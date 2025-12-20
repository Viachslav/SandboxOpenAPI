import { test, expect } from '@playwright/test';
import { createUserInvalidLoginPasswordCombination, createUserInvalidPassword  } from '../../../testData/credentials';


for (const { testName, data, expected } of createUserInvalidLoginPasswordCombination) {
  test(testName, async ({ request }) => {
    const response = await request.post('/Account/v1/User', {
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

for(const {testName, data, expected} of createUserInvalidPassword) {
  test(testName, async ({request}) =>{
    const response = await request.post('/Account/v1/User', {
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

