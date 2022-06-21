import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes/index.js';

const app = express();
const port = 3000;
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/live-check', (req, res) => {
   console.log('Info. Got live check request');
   this.ololo();
   res.sendStatus(200);
});


// show how to add v1 prefix
app.use('/v1',routes);

app.use(function (err, req, res, next) {
   res.status(err.status || 500);
   console.error('%s %d %s', req.method, res.statusCode, err.message);
   res.json({
       error: err.message
   });
   return;
});

app.listen(port, () => console.log(`TODO app listening on port ${port}!`));