export function passwordRandom(length: number): string {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*';
  const allChars = letters + digits + symbols;

  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  const passwordChars = [
    getRandomChar(letters),
    getRandomChar(digits),
    getRandomChar(symbols),
  ];

  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(getRandomChar(allChars));
  }

  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join('');
}

export function usernameRandom(length : number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        username += chars[randomIndex];
    }
    return username;
}
