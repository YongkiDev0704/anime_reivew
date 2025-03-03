export type Resolver<Arguments, Returns, Parent = any> = {
  (
    parent: Parent,
    args: Arguments,
    ctx: GraphqlContext,
    info: GraphQLResolveInfo
  ): Promise<Returns>;
};

export type GraphqlContext = {
  req: express.Request & {
    userAgent: string;
  };
};
