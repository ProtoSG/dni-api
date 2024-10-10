import express from 'express';
import dniRouter from './routes/dni.route';
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());

app.get('/', (_, res) => {
  res.json({ message: 'Hola mundo' });
})

app.use('/api/buscar-dni', dniRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
