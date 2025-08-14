import { getSpotifySongs } from "./controller";

export default async function appRoutes(fastify, options) {
    fastify.post('/api/convert-playlist', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    url: { type: 'string', minLength: 1 }
                },
                required: ['url']
            }
        }
    }, getSpotifySongs);
}