import { closeSync, existsSync, openSync, writeSync } from "fs";
import tmp = require("tmp");
import rimraf = require("rimraf");
import { SiteDescription, Problem, Contest } from "../types";

/**
 * Recursive remove
 */
export function recursiveRemoveDirectory(path: string) {
    if (existsSync(path)) {
        rimraf.sync(path);
    }
}

export function writeFile(path: string, content: string) {
    let currentFd = openSync(path, "w");
    writeSync(currentFd, content);
    closeSync(currentFd);
}

export function runWithTemporaryPath(callback: (path: string) => void) {
    tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
        if (err) {
            throw err;
        }

        callback(path);

        recursiveRemoveDirectory(path);
        cleanupCallback();
    });
}

export const MOCK_SITE = new SiteDescription(
    "personal",
    "Not a site. Custom problems and contest.",
    "Contest name",
    "Problem name",
    async numProblems => {
        let total = Number.parseInt(numProblems);

        let problems = [];

        for (let i = 0; i < total; i++) {
            problems.push(new Problem(`P${i + 1}`, `P${i + 1}`, ["0\n", "2\n", "9\n"], ["2\n", "4\n", "11\n"]));
        }

        return new Contest("MockSite", problems);
    },
    async problemId => {
        return new Problem(problemId, problemId, ["0\n", "2\n", "9\n"], ["2\n", "4\n", "11\n"]);
    }
);