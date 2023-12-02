import bodyParser from 'body-parser';
import express, { Request, Response } from 'express'
import { engine } from 'express-handlebars';
import { createUrl, getUrl } from './service';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const basePath = process.env.BASE_PATH || 'http://localhost:3000/'

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', (req: Request, res: Response) => {
  res.render('home', {
    test: '123'
  });
})

app.post('/create', (req: Request, res: Response) => {
  const url = req.body.url
  const token = createUrl(url)
  const result = basePath + token

  res.render('create', {
    url: result
  });
})

app.get('/:token', (req: Request, res: Response) => {
  const token = req.params.token
  const url = getUrl(token)
  if (!url) {
    res.render('error');
    return
  }
  res.redirect(url)
})



app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
