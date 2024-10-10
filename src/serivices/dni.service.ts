import { chromium } from 'playwright';
import type { Dni } from '../models/dni.model';

interface getDniResponse {
  success: boolean,
  data?: Dni,
  error?: string
}

export const getDni = async (dni: string): Promise<getDniResponse> => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://eldni.com/pe/buscar-datos-por-dni');

    await page.click('#dni');
    await page.keyboard.type(dni);

    await page.click("#btn-buscar-datos-por-dni")

    // Esperar a que cargue los valores de los campos
    await page.waitForSelector("#completos");
    await page.waitForSelector("#nombres");
    await page.waitForSelector("#apellidop");
    await page.waitForSelector("#apellidom");

    // Obtener los valores de los campos
    const nombre_completo = await page.inputValue("#completos");
    const nombres = await page.inputValue("#nombres");
    const apellido_paterno = await page.inputValue("#apellidop");
    const apellido_materno = await page.inputValue("#apellidom");

    await browser.close();

    const data: Dni = {
      numero: dni,
      nombre_completo,
      nombres,
      apellido_paterno,
      apellido_materno
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { success: false, error: 'Error al obtener datos' };
  }
}
