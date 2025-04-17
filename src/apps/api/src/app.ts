import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { getMongoDBConnection, PORT } from "@pnani/core";

import { typeDefs, resolvers } from "./graphql";
import { GraphqlContext } from "./graphql/types";
import { tmdbRouter } from "./rest/tmdb";

(async () => {
  await getMongoDBConnection();

  const app = express();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer<GraphqlContext>({ schema });

  await server.start();
  
  app.use(
    cors({
      origin: [
        "http://localhost:3000",                          
        "https://your-project-name.vercel.app",          
      ],
      credentials: true,
    })
  );  app.use(express.json());
  
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphqlContext> => {
        return { req };
      },
    })
  );

  app.use("/api", tmdbRouter);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
    console.log(`🌐 REST API: http://localhost:${PORT}/api/landing-animes`);
  });
})();
