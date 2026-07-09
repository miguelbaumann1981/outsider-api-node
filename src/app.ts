import { envs } from './config/envs';
import { MongoDatabase } from './data/mongo/mongo.database';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  // DDBB config
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // Server config
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
