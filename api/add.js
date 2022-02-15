import { PSDB } from 'planetscale-node';

const conn = new PSDB('main')

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
//import { handleAuth } from "@auth0/nextjs-auth0";
//export default handleAuth();
//import { auth } from 'express-oauth2-jwt-bearer';
//const { auth } = require('express-oauth2-jwt-bearer');

// const a = auth({
//     issuerBaseURL: 'https://dev-y8fahynx.us.auth0.com/',
//     audience: 'https://vue-project-gerardfp.vercel.app/api'
//   });

export default withApiAuthRequired(async function handler(req, res) {    
    const [rows, fields] = await conn.query(`insert into comentarios(contenido) values ('${contenido}')`)
    res.send(rows);
});