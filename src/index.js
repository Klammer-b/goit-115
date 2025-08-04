import { initMongoDBConnection } from './db/initMongoDBConnection.js';
import { startServer } from './server.js';

await initMongoDBConnection();
startServer();
