import express, { type Response } from 'express'
import { chromium } from 'playwright';
import { getDni } from '../serivices/dni.service';
import * as dniServices from '../serivices/dni.service';

const router = express.Router()

interface BuscarDniParams extends Request {
  params: {
    dni: string
  }
}

router.get('/:dni', async (req: BuscarDniParams, res: Response) => {

  const dni = req.params.dni;

  if (!dni) {
    return res.status(400).json({ error: 'DNI es requerido' });
  }

  const data = await getDni(dni);

  if (data.success) {
    return res.json(data);
  }

  return res.status(400).json(data);
});

export default router;
