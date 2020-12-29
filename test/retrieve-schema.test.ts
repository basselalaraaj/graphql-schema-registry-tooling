import got from "got";
import { retrieveSchemas } from "../src/retrieve-schema";

jest.mock("got");

describe("retrieve-schemas", () => {
  it("should retrieve schema from registry", async () => {
    (got.post as jest.Mock).mockReturnValueOnce({
      body: {
        data: {
          getAllSchemas: [
            {
              serviceName: "cart",
              serviceUrl: "http://cart-service",
              typeDefs: "type Query {\n  placeHolder: String\n}",
            },
          ],
        },
      },
    });
    expect(await retrieveSchemas()).toEqual([
      {
        serviceName: "cart",
        serviceUrl: "http://cart-service",
        typeDefs: "type Query {\n  placeHolder: String\n}",
      },
    ]);
  });
  it("should throw error if retrieving the schema fails", async () => {
    (got.post as jest.Mock).mockReturnValueOnce({
      body: { errors: ["fail"] },
    });
    await expect(retrieveSchemas()).rejects.toThrowError();
  });
});
