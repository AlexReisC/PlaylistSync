import Fastify from 'fastify'
import appRoutes from './routes';

const fastify = Fastify({logger: true});

fastify.register(appRoutes);

export default fastify;