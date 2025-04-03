import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { getMongoDBConnection, PORT } from "@pnani/core";

import { typeDefs, resolvers } from "./graphql";
import { GraphqlContext } from "./graphql/types";

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
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphqlContext> => {
        return { req };
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
  });
})();
