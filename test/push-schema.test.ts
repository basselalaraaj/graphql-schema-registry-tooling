import got from "got";
import { pushSchema } from "../src/push-schema";

jest.mock("got");

describe("push-schema", () => {
  it("should push schema to registry", async () => {
    (got.post as jest.Mock).mockReturnValueOnce({
      body: { data: { pushSchema: true } },
    });
    expect(await pushSchema("./test/mocks/schema.graphql")).toBeTruthy();
  });
  it("should throw error if pushing the schema fails", async () => {
    (got.post as jest.Mock).mockReturnValueOnce({
      body: { errors: ["fail"] },
    });
    await expect(
      pushSchema("./test/mocks/schema.graphql")
    ).rejects.toThrowError();
  });
});
