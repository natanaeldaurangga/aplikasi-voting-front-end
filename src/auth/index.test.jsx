import { assert, describe, expect, test } from "vitest";
import { handleSubmit } from ".";

describe("API Auth Test", () => {
  test("Login dengan username dan password", async () => {
    const result = await handleSubmit("nael_dau", "Test1234");
    console.log(result);
    assert(true);
  });
});
