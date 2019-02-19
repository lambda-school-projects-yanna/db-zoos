const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true, // needed for sqlite
};

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

/* =============== Zoos endpoints ================ */


//  ============== GET Endpoints 

server.get('/api/zoos/', async (req, res) => {
  try {
    const zoos = await db('zoos')
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json(error)
  }
});

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos')
    .where({ id: req.params.id })
    .first()
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json(error)
  }
});

//  ============== POST Endpoint

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into("zoos")
    .then( zoo => {
      res.status(201).json(zoo)
    })
    .catch(() => {
      res.status(500).json({error: "we encountered an error"})
    })
});

//  ============== DELETE Endpoint

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({id: req.params.id})
  .del()
  .then(() => {
    res.status(200).json({message: "zoo deleted"})
  })
  .catch(() => {
    res.status(500).json({error: "error"})
  })
});

//  ============== PUT Endpoint

server.put('/api/zoos/:id', async (req, res) => {
  try {
    const count = await db('zoos')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const zoo = await db('zoos')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

/* =============== Bears endpoints ================ */

//  ============== GET Endpoints 

server.get('/api/bears/', async (req, res) => {
  try {
    const bears = await db('bears')
    res.status(200).json(bears);
  } catch (error) {
    res.status(500).json(error)
  }
});

server.get('/api/bears/:id', async (req, res) => {
  try {
    const bear = await db('bears')
    .where({ id: req.params.id })
    .first()
    res.status(200).json(bear);
  } catch (error) {
    res.status(500).json(error)
  }
});

//  ============== POST Endpoint

server.post('/api/bears', (req, res) => {
  const bear = req.body;
  db.insert(bear)
    .into("bears")
    .then( bear => {
      res.status(201).json(bear)
    })
    .catch(() => {
      res.status(500).json({error: "we encountered an error"})
    })
});

//  ============== DELETE Endpoint

server.delete('/api/bears/:id', (req, res) => {
  db('bears')
  .where({id: req.params.id})
  .del()
  .then(() => {
    res.status(200).json({message: "bear deleted"})
  })
  .catch(() => {
    res.status(500).json({error: "error"})
  })
});

//  ============== PUT Endpoint

server.put('/api/bears/:id', async (req, res) => {
  try {
    const count = await db('bears')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const bear = await db('bears')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(bear);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n **** Web API Listening on http://localhost:${port} **** \n`);
});
