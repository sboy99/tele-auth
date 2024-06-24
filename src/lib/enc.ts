// import { Api } from "telegram";
// import { computeCheck } from "telegram/Password";
// import CryptoJs from "crypto-js";

// export function decode(password: string, res: Api.account.Password) {
//   const result = res.toJSON();
//   const algo = result.currentAlgo?.toJSON();
//   const g = algo?.g;
//   const p = algo?.p;
//   const salt1 = algo?.salt1;
//   const salt2 = algo?.salt2;
//   const g_b = result?.srp_B;
//   const kArg= p?.toString('hex')
//   const k= H(  )
// }

// function H(data: string) {
//   return CryptoJs.SHA256(data).toString(CryptoJs.enc.Hex);
// }

// function SH(data: string, salt: string) {
//   return H(salt + data + salt);
// }

// function PH1(password: string, salt1: string, salt2: string) {
//   return SH(SH(password, salt1), salt2);
// }

// function Pbkdf2Sha512(password: string, salt: string, iterations: number) {
//   return CryptoJs.PBKDF2(password, CryptoJs.enc.Hex.parse(salt), {
//     keySize: 512 / 32,
//     iterations: iterations,
//     hasher: CryptoJS.algo.SHA512,
//   }).toString(CryptoJs.enc.Hex);
// }

// function PH2(password: string, salt1: string, salt2: string) {
//   const ph1 = PH1(password, salt1, salt2);
//   const pbkdf2Sha512 = Pbkdf2Sha512(ph1, salt1, 100000);
//   return SH(pbkdf2Sha512, salt2);
// }
