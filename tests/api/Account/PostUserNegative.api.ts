import { test, expect } from '@playwright/test';
import { credentialsInvalidLoginPasswordCombination, credentialsInvalidPassword  } from '../../../testData/credentials';


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

for(const {testName, data, expected} of credentialsInvalidPassword) {
  test(testName, async ({request}) =>{
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

