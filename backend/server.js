import app from './app.js'
import cors from '@fastify/cors'

const start = async () => {
    await app.register(cors, {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
	});

	try {
		await app.listen({ port: 3000 });
		console.log('Servidor Fastify rodando em http://localhost:3000');
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

start();