const { exec } = require('@dhis2/cli-helpers-engine')

const bootstrap = require('./bootstrap')
const getEnv = require('./env')

module.exports = paths => ({
    bootstrap: async (args = {}) => {
        await bootstrap(paths, args)
    },
    // link: async srcPath => {
    //   reporter.info('Linking app into appShell');
    //   await fs.symlink(srcPath, paths.shellApp);
    // },
    build: async () => {
        await exec({
            cmd: 'yarn',
            args: ['run', 'build'],
            cwd: paths.shell,
            env: getEnv(),
            pipe: true,
        })
    },
    start: async () => {
        await exec({
            cmd: 'yarn',
            args: ['run', 'start'],
            cwd: paths.shell,
            env: getEnv(),
            pipe: true,
        })
    },
    test: async () => {
        await exec({
            cmd: 'yarn',
            args: ['run', 'test', '--', '--watchAll', '--ci'],
            cwd: paths.shell,
            env: getEnv(),
            pipe: true,
        })
    },
})
