import { Keypair } from "@stellar/stellar-sdk";
async function generateacc() {
  const kp = Keypair.random();
  const sec = kp.secret();
  const pub = kp.publicKey();
  console.log("sec:", sec);
  console.log("pbu:", pub);
}

// generateacc();
// async function fundacc(){
//     try{
//         console respo = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(process.env.PUBLIC_KEY)}`);
//         await  respo.json();
//         console.log('accc funded');
//     }
// }
