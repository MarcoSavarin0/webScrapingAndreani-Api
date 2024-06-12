import express from 'express';
import cors from 'cors';
import { enviosCosto } from './andreaniScraping.js';
const app = express();
app.use(cors());

app.get('/costos', async (req, res) => {
    let {cpDestino, valor} = req.query;
    
    try {
        if (!cpDestino || !valor || valor < 2001 ) {
            res.send("Error: cpDestino y valor no son válidos");
            return;
        }
        cpDestino = cpDestino.replace(/\s/g, '');
        valor = valor.replace(/\s/g, '');
        enviosCosto(cpDestino,valor).then(result => {
            res.send(result);
        });
    } catch (error) {
        res.send("Error: cpDestino o valor no es válido");
        return;
    }
});

app.listen(4000, () => {
  console.log('Example app listening on port 3000!');
});