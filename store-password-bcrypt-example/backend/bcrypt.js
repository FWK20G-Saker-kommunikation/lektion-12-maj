const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainPassword = 'pwd123';

/** Använder oss av callback-funktioner */
bcrypt.hash(plainPassword, saltRounds, (error, hash) => {
  console.log(hash);
  bcrypt.compare('pwd123', hash, (error, result) => {
    console.log('Password check is: ', result);
  });
});

/** Då Bcrypt använder sig av promise så kan vi använda async/await för att köra funktionerna
 * asynkront som i nedan exempel
 */
async function hashPassword() {
  const hashedPassword = await bcrypt.hash('chris123', saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const isTheSame = await bcrypt.compare(password, hash);
  return isTheSame;
}

async function checkPass() {
  const hashedPass = await hashPassword();
  const match = await comparePassword('chris123', hashedPass);
  console.log('Match:', match);
}

checkPass();

