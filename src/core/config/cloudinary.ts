import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

export let CloudinaryInstance: typeof cloudinary | null = null;

export function InitCloudinary(): void {
	console.log("=== INICIANDO CLOUDINARY ===");
	
	try {
		dotenv.config();
	} catch (err) {
		console.log(`Advertencia: No se pudo cargar .env: ${err}`);
	}

	const cloudName = process.env.CLOUDINARY_NAME;
	const apiKey = process.env.API_KEY;
	const apiSecret = process.env.API_SECRET;

	console.log(`CLOUDINARY_NAME: '${cloudName}'`);
	console.log(`API_KEY: '${apiKey}'`);
	console.log(`API_SECRET (primeros 5 chars): '${apiSecret?.substring(0, 5)}...'`);

	if (!cloudName || !apiKey || !apiSecret) {
		console.warn("⚠️ Advertencia: Cloudinary no está configurado. Las funciones de carga de imágenes no funcionarán.");
		console.warn("Configura las variables de entorno: CLOUDINARY_NAME, API_KEY, API_SECRET");
		return;
	}

	console.log("Creando instancia de Cloudinary...");
	
	cloudinary.config({
		cloud_name: cloudName,
		api_key: apiKey,
		api_secret: apiSecret
	});

	CloudinaryInstance = cloudinary;
	console.log("=== CLOUDINARY CONFIGURADO CORRECTAMENTE ===");
}
