const fs = require('fs-extra')
const path = require('path')
const {
    ensureDirectoryExists,
    walkDirectory,
    arrayEqual,
} = require('./helpers')
const { reporter } = require('@dhis2/cli-helpers-engine')
const scanner = require('i18next-scanner')
const { i18nextToPot, gettextToI18next } = require('i18next-conv')

const extract = async ({ input, output }) => {
    ensureDirectoryExists(input)

    reporter.info(`> reading ${input}`)

    const files = walkDirectory(input)
    if (files.length === 0) {
        reporter.error(`Directory ${input} has no files to translate.`)
        process.exit(1)
    }

    var parser = new scanner.Parser({
        keepRemoved: false,
        keySeparator: false,
        sort: true,
    })

    reporter.info(`> parsing ${files.length} files`)

    files.forEach(filePath => {
        var contents = fs.readFileSync(filePath, 'utf8')
        parser.parseFuncFromString(contents).get()
    })

    var parsed = parser.get()
    var en = {}

    Object.keys(parsed.en.translation).forEach(str => (en[str] = ''))

    var targetPath = path.join(output, 'en.pot')

    if (fs.existsSync(targetPath)) {
        // validate, diff translation keys b/w en.pot vs now
        const content = fs.readFileSync(targetPath, 'utf8')
        const json = await gettextToI18next('en', content)

        var msgIds = Object.keys(en)
        var newMsgIds = Object.keys(JSON.parse(json))

        if (arrayEqual(newMsgIds, msgIds)) {
            console.log('> no i18n updates found.')
            console.log('> complete\n')
            return
        }
    }

    reporter.info(
        `> writing: ${Object.keys(en).length} language strings to ${targetPath}`
    )
    const result = await i18nextToPot('en', JSON.stringify(en))

    fs.ensureFileSync(targetPath)
    fs.writeFileSync(targetPath, result + '\n')
    reporter.info('> complete')
}

module.exports = extract