import {createRemoteJWKSet,jwtVerify} from 'jose';
import {HttpError} from './validation.mjs';
const keysets=new Map();
export async function authorize(request,env){
 const team=env.ACCESS_TEAM_DOMAIN,aud=env.ACCESS_AUD;
 if(!team||!aud||!env.STAFF_EMAILS)throw new HttpError(503,'Staff access has not been configured.');
 if(!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(team))throw new HttpError(503,'Staff access configuration is invalid.');
 const token=request.headers.get('Cf-Access-Jwt-Assertion');if(!token)throw new HttpError(401,'Sign in through the staff access page.');
 try{
  if(!keysets.has(team))keysets.set(team,createRemoteJWKSet(new URL(`https://${team}/cdn-cgi/access/certs`)));
  const {payload}=await jwtVerify(token,keysets.get(team),{issuer:`https://${team}`,audience:aud,algorithms:['RS256'],requiredClaims:['exp','iat','sub','email']});
  const email=String(payload.email).toLowerCase();
  if(!env.STAFF_EMAILS.split(',').map(s=>s.trim().toLowerCase()).includes(email))throw Error();
  return email;
 }catch{throw new HttpError(403,'This account does not have access to the quote inbox.');}
}
