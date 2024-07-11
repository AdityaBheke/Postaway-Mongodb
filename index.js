import express from 'express';
import bodyParser from 'body-parser';

// Setup
const server = express();
server.use(bodyParser.json());

// Routes

server.get('/',(req,res)=>{
    res.send('Welcome to Postaway!');
})
server.use((req,res)=>{
    res.status(404).send('API not found.')
})

// Listen
server.listen(3100,()=>{
    console.log('Server is listening on port 3100');
})