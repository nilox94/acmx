import * as assert from "assert";

import * as vscode from "vscode";
import { newArena, ATTIC, TESTCASES, upgradeArena, pathToStatic, testCasesName } from "../../core";
import { existsSync } from "fs";
import { join } from "path";
import { runWithTemporaryPath } from "../testUtils";

const CONTEST = join(pathToStatic(), 'testData', 'exampleContest');

suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");

    test("New Arena", () => {
        runWithTemporaryPath((path: string) => {
            newArena(path);
            assert.ok(existsSync(join(path, "sol.cpp")));
            assert.ok(existsSync(join(path, ATTIC)));
            assert.ok(existsSync(join(path, TESTCASES)));
        });
    });

    test("Upgrade Arena", function () {
        runWithTemporaryPath((path: string) => {
            newArena(path);
            upgradeArena(path);

            assert.ok(existsSync(join(path, "gen.py")));
            assert.ok(existsSync(join(path, "brute.cpp")));
        });
    });

    test("Parse Test Cases", function () {
        let path = join(CONTEST, 'A');
        let result = testCasesName(path);
        let target = ["0", "1", "2"];

        assert.equal(result.length, target.length);
        result.sort();

        for (let i = 0; i < 3; ++i) {
            assert.equal(target[i], result[i]);
        }
    });
});
