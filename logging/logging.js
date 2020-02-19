const moment = require('moment')

function LogLevel(levelInt, levelName) {
    this.levelInt = levelInt
    this.levelName = levelName
}

const LEVEL = {
    DEBUG: new LogLevel(0, 'DEBUG'),
    INFO: new LogLevel(1, 'INFO'),
    WARN: new LogLevel(2, 'WARN'),
    ERROR: new LogLevel(3, 'ERROR')
}

function Formater(stackName, moduleName, dateFormat) {
    dateFormat = dateFormat || 'YYYY-MM-DD HH:mm:ss Z'

    function formatMessage(args) {
        return args.map(it => {
            if (it instanceof Error) {
                return it.stack
            } else if (it && (typeof it === "object")) {
                return JSON.stringify(it)
            } else {
                return it
            }
        }).join(' ')
    }

    function formatLog(level, args) {
        var message = formatMessage(args)
        return `${moment().format(dateFormat)} | ${stackName} | ${moduleName} | level=${level.levelName} | ${message}`
    }

    return formatLog
}

class Logger {

    constructor(level, formater) {
        this.level = level
        this.formater = formater
    }

    debug(...args) {
        var level = LEVEL.DEBUG
        if(level.levelInt >= this.level.levelInt) {
            console.log(this.formater(level, args))
        }
    }

    info(...args) {
        var level = LEVEL.INFO
        if(level.levelInt >= this.level.levelInt) {
            console.info(this.formater(level, args))
        }
    }

    warn(...args) {
        var level = LEVEL.WARN
        if(level.levelInt >= this.level.levelInt) {
            console.warn(this.formater(level, args))
        }
    }

    error(...args) {
        var level = LEVEL.ERROR
        if(level.levelInt >= this.level.levelInt) {
            console.error(this.formater(level, args))
        }
    }

}

exports.Logger = Logger
exports.Formater = Formater
exports.LEVEL = LEVEL
