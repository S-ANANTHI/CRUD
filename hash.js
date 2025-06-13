import bcrypt from 'bcrypt';

const plainPassword = 'mike123'; 
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds).then(hash => {
  console.log('Hashed password:', hash);
}).catch(err => {
  console.error(err);
});
