import * as assert from "assert";

import * as vscode from "vscode";
import tmp = require("tmp");
import { newArena, ATTIC, TESTCASES } from "../../core";
import { existsSync } from "fs";
import { join } from "path";
import { recursiveRemoveDirectory } from "../test_utils";

suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");

    test("New Arena", () => {
        tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
            if (err) {
                throw err;
            }

            newArena(path);

            assert.ok(existsSync(join(path, "sol.cpp")));
            assert.ok(existsSync(join(path, ATTIC)));
            assert.ok(existsSync(join(path, TESTCASES)));

            recursiveRemoveDirectory(path);
            cleanupCallback();
        });
    });
});
