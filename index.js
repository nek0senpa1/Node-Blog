require('dotenv').config();


const server = require ('./softserver.js');


const portyPort = process.env.PORT || 5000;

server.listen(portyPort, ( ) => {
    console.log(`Heyo Captain Jack, Checking Stuff on the ${portyPort} Rack!`)
})