export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _Any: any;
  JSON: any;
  _FieldSet: any;
};






export type Query = {
  __typename?: 'Query';
  getSchema: Array<Schema>;
  getAllSchemas: Array<Schema>;
};


export type QueryGetSchemaArgs = {
  services: Array<Scalars['String']>;
};


export type SchemaInput = {
  serviceName: Scalars['String'];
  serviceUrl: Scalars['String'];
  typeDefs: Scalars['JSON'];
};


export type Mutation = {
  __typename?: 'Mutation';
  pushSchema: Scalars['Boolean'];
};


export type MutationPushSchemaArgs = {
  schemaInput: SchemaInput;
};

export type Schema = {
  __typename?: 'Schema';
  serviceName: Scalars['String'];
  serviceUrl: Scalars['String'];
  typeDefs: Scalars['JSON'];
};

