host = args[0]

if ( args.length > 1 ){
    target = args[1]
} else {
    target = host
}


extract = 'simpleExtract.script'
scp(extract, target)

extractRam = getScriptRam( extract, host)
ram = getServerRam( host )[0] - getServerRam( host )[1]
threads = Math.floor( ram / extractRam )

ran = exec(extract, host, threads, target)
tprint('started simple extract on ' + host + ' to farm ' + target)
