require('dotenv').config();
const { utils } = require('ethers');

const a = process.env.FLASHLOAN_ADDRESS;

console.log('RAW      =', JSON.stringify(a));
console.log('LEN      =', a ? a.length : 'null');

try {
  const trimmed = (a || '').trim().replace(/\r$/, ''); // strip any trailing \r
  console.log('TRIMMED  =', trimmed);
  console.log('LEN_TRIM =', trimmed.length);
  const ok = utils.isAddress(trimmed);
  console.log('isAddress=', ok);
  if (ok) console.log('getAddress=', utils.getAddress(trimmed));
} catch (e) {
  console.error('getAddress ERROR:', e.message);
}
