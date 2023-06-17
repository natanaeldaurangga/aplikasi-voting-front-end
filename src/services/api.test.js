import { assert, describe, expect, test } from "vitest";
import { handleSubmit } from "../auth";
import { CandidateService, PollService, VoterService } from "./api.service";

describe("API Auth Test", () => {
    test("Login dengan username dan password", async () => {
        // const result = await handleSubmit("nael_dau", "Test1234");
        // TODO: Lanjut untuk bikin test tiap tiap end point dari backend laravelnya di sini
        console.log([{ nama: 'Nael', kelas: '1A' }, { nama: 'Ipen', kelas: '2B' }]);
        assert(true);
    });

    // test.only("Cek data dari getVoters", async () => {
    //     try {
    //         const result = await CandidateService.getCandidate(5, 1, 'candidates.name', 'desc', 'calon');
    //         console.log(result);// FIXME: kenapa ini undefined
    //         assert(true);
    //     } catch (error) {
    //         assert(false);
    //     }
    // });

});



