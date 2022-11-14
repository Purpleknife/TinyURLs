
//Generate a random short URL:

export const generateRandomShortURL = () => {
  const random: string = Math.random().toString(36).substring(2,8); //Generate a random string of 6 characters.
  
  return `https://tiny.url/${random}`;
};