require('dotenv').config();

console.log('SEPOLIA_RPC_URL =', process.env.SEPOLIA_RPC_URL || '<missing>');
console.log('PRIVATE_KEY set? ', !!process.env.PRIVATE_KEY);
