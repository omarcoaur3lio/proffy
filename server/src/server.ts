import express from 'express'
import cors from 'cors'
import routes from './routes';

const app = express();

app.use( cors() ); 

// Necessário para que o express entenda dados recebidos no formato JSON
app.use(express.json())
app.use(routes)


app.listen(3333);

