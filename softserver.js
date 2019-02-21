const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');

const softserver = express();

softserver.use(express.json());
softserver.use(helmet());


softserver.use(upperCheck());

// GONNA STUFF MY ENDPOINTS HERE...
softserver.get('/', (req,res) => {
    res.send(`<h2>Looks like you made it</h2>
        <h2>Look How Far We've Come Together</h2>`);
});

//----- USERS ENDP's
softserver.get('/users', async (reck, rez) => {
    try{
        const thing = await userDB.get(reck.query);
        rez.status(200).json(thing);
    }
    catch (errerz) {
        console.log(errerz);
        rez.status(500).json({
            disIssaMessage: "You ain\n't got nothin... ",
        })
    }
});


softserver.post('/users', async (rec, rez) => {
    try{
        const widget = await userDB.insert(rec.body);
        rez.status(201).json(widget)
    }
    catch{
        rez.status(500).json({ mess:'You Fool of a Took !!!'})
    }
});

softserver.delete('/users/:id', async (rec, rex) => {
    try {
        var something = await userDB.remove(rec.params.id);
        if (something) {
            console.log(something);
            rex.status(200).json({ randomtext: 'Balrog is dead,yo!'});
        } 
        else {
            console.log(something);
            rex.status(404).json({ morerandomtext: 'No Balrog here...'});
        }
        }
        catch{
            rez.status(500).json({ mess:'You Fool of a Took !!!'})
        } 

})

softserver.put('/users/:id', async (rec, rez) => {
    try {
        let tom = await userDB.update(rec.params.id, rec.body);
        if (tom) {
            rez.status(200).json({rando: "Updated the Elven Language"});
        }
        else {
            rez.status(404).json({rando2: "No Ring Here. Only Golum"});
        }
    }
    catch{
        rez.status(500).json({ mess:'You Fool of a Took !!!'})
    }
})

softserver.get('/users/:id/posts', async (rec, rez) => {
    try {
        var Pompom = await userDB.getUserPosts(rec.params.id);
        if (Pompom) {
            rez.status(200).json({ Pompom, successIt: "Heyo Captain Jack"})
        }
        else {
            rez.status(404).json({rando2: "No Ring Here. Only Golum"});
        }
    }
    catch {
        rez.status(500).json({ mess:'You Fool of a Took !!!'})
    };

})






//-----POST ENDPs here...

softserver.get('/posts', async (reck, rez) => {
    try{
        const thing = await postDB.get(reck.query);
        rez.status(200).json(thing);
    }
    catch (errerz) {
        console.log(errerz);
        rez.status(500).json({
            disIssaMessage: "You ain\n't got nothin... ",
        })
    }
});


softserver.post('/posts', async (rec, rez) => {
    try{
        const widget = await postDB.insert(rec.body);
        rez.status(201).json(widget)
    }
    catch{
        rez.status(500).json({ mess:'You Fool of a Took !!!'})
    }
});

softserver.delete('/posts/:id', async (rec, rex) => {
    try {
        var something = await postDB.remove(rec.params.id);
        if (something) {
            console.log(something);
            rex.status(200).json({ randomtext: 'Balrog is dead,yo!'});
        } 
        else {
            console.log(something);
            rex.status(404).json({ morerandomtext: 'No Balrog here...'});
        }
        }
        catch{
            rez.status(500).json({ mess:'You Fool of a Took !!!'})
        } 

})

softserver.put('/posts/:id', async (rec, rez) => {
    try {
        let tom = await postDB.update(rec.params.id, rec.body);
        if (tom) {
            rez.status(200).json({rando: "Updated the Elven Language"});
        }
        else {
            rez.status(404).json({rando2: "No Ring Here. Only Golum"});
        }
    }
    catch{
        rez.status(500).json({ mess:'You Fool of a Took !!!'})
    }
})


//GONNA STUFF MY FUNCTIONS HERE...


function upperCheck ()  {
    return function(req, res, next) {
      let uName = req.headers.name;
        
      if (uName.toUpperCase() === uName) {
        next();
      } else {
        res.status(403).json('Oh Noeseseseses!')
      }
      
    }
  }


module.exports = softserver;