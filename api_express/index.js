import { PSDB } from 'planetscale-node';
const app = require('express')();

const conn = new PSDB('main')

const { auth } = require('express-oauth2-jwt-bearer');

const a = auth({
    issuerBaseURL: 'https://dev-y8fahynx.us.auth0.com/',
    audience: 'https://vue-project-gerardfp.vercel.app/api'
  });

console.log("kakjds");
// var jwtCheck = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://dev-y8fahynx.us.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'https://vue-project-gerardfp.vercel.app/api',
//   issuer: 'https://dev-y8fahynx.us.auth0.com/',
//   algorithms: ['RS256']
// });

app.get('/api/addd', async (req,res) => {
    const {
        query: { contenido },
        authorization,
        method
    } = req
    console.log("kakaka");
    const [rows, fields] = await conn.query(`insert into comentarios(contenido) values ('${contenido}')`)
    res.end(rows);
});

module.exports = app;

// export default async function handler(req, res) {
//     const [rows, fields] = await conn.query(`insert into comentarios(contenido) values ('${contenido}')`)
//     res.send(rows);
// }