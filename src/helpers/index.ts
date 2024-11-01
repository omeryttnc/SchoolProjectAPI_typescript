import crypto from 'crypto';
// import { secretdata } from '../../etc/secrets/secretdata';

export const random=()=> crypto.randomBytes(128).toString('base64');
export const authentication = (salt:string,password:string)=>{
    const secKey = process.env.SECKEY || "Selam12_Nasil-34"
    return crypto.createHmac('sha256',[salt,password].join('/')).update(secKey).digest('hex')
}