import { closeSync, existsSync, openSync, writeSync } from "fs";
import tmp = require("tmp");
import rimraf = require("rimraf");

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
