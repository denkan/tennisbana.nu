const path = require('path');
const fs = require('fs');
const cp = require('child_process');

/**
 * Make sure SDK from backend is generated:
 * 1) Check if already installed or should install
 * 2) Generate sdk folder/files
 * 3) Clean up un-used files 
 */
function initSdk() {

    const args = process.argv.slice(2);
    const doCheck = !!args.find(arg => arg.toLowerCase() === '--check');

    const rootPath = path.resolve(__dirname, '../');
    const sdkPath = path.resolve(rootPath, './_shared/sdk');

    const requiredContentInFolder = ['models', 'lb.config.ts'];

    const isInstalled = fs.existsSync(sdkPath) && fs.readdirSync(sdkPath)
        .filter(f => requiredContentInFolder.indexOf(f) >= 0)
        .length === requiredContentInFolder.length;



    if (doCheck && isInstalled) {
        // do not install - only clean up
        return _cleanUp();
    }

    // install and then clean up
    console.warn('SDK not installed! Installing...');
    _installSdk(_cleanUp);


    /**
     * Install SDK folder by executing `npm run setup:sdk` from repo root
     * @param {function} _callback 
     */
    function _installSdk(_callback) {
        const terminal = require('child_process').spawn('bash', [], { cwd: rootPath });

        terminal.stdout.setEncoding('utf-8');
        terminal.stdout.on('data', function (data) {
            console.log(data);
            if (('' + data).trim() == 'Enjoy!!!') {
                __installCompleted();
            }
        });

        terminal.stderr.setEncoding('utf-8');
        terminal.stderr.on('data', function (data) {
            console.log(data);
        });

        terminal.on('exit', function (code) {
            //console.log('child process exited with code ' + code);
        });

        terminal.stdin.write('fireloop sdk');
        const tappingEnter = setInterval(() => terminal.stdin.write('\n'), 1000);

        function __installCompleted() {
            __killTerminal();
            _callback && _callback();
        }

        function __killTerminal() {
            clearInterval(tappingEnter);
            terminal.kill();
        }
    }

    /**
     * Remove all content except requiredContentInFolder
     * @param {function} _callback 
     */
    function _cleanUp(_callback) {
        fs.readdirSync(sdkPath)
            .filter(f => requiredContentInFolder.indexOf(f) < 0)
            .forEach(__deleteFileOrFolder);

        __writeNeededFiles(_callback);

        function __deleteFileOrFolder(fpath) {
            if (fpath.substring(0, sdkPath.length) !== sdkPath) {
                fpath = path.join(sdkPath, fpath);
            }
            if (!fs.existsSync(fpath)) return;

            const stats = fs.lstatSync(fpath);

            if(stats.isFile()) {
                console.log('Deleting file:', fpath);
                fs.unlinkSync(fpath)
            } else { 
                fs.readdirSync(fpath).forEach(f => __deleteFileOrFolder(path.join(fpath, f)));
                console.log('Deleting folder:', fpath);
                fs.rmdirSync(fpath);
            }
        }

        function __writeNeededFiles(__callback) {
            console.log('Write file: index.ts');
            fs.writeFileSync(path.join(sdkPath,'index.ts'), 'export * from "./models/index";');
            
            __callback && __callback();
        }
    }
}

//module.exports = initSdk;

if (!module.loaded) {
    initSdk();
}

