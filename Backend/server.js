const http = require('http');
const app = require('./app');
//console.log(http) -- vas lister toutes les issues d'une requete API Rest http: code
app.set('port',process.env.PORT || 3000)
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);