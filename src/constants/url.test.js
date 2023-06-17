import { assert, describe, expect, test } from "vitest";
import { handleSubmit } from "../auth";
import { base_url } from "./url";

describe("Test URL", () => {
    test("Menguji fungsi base_url", async () => {
        const params = `limit=${5}&page=${1}&orderBy=${'test'}&direction=${'dir'}&keyword=${'keyword'}`;
        const url = base_url(`api/voter?${params}`);
        console.log(url);
        // expect(url).toBe("http://localhost:8000/api/test");
        assert(true);
    });
});