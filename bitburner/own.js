// Own
host = args[0]

requiredPorts = getServerNumPortsRequired(host)

// open ports
scripts = ls( 'home' )
ports = 0
if ( scripts.indexOf('BruteSSH.exe') > -1 ){
    brutessh(host)
    ports +=1
    if ( scripts.indexOf('FTPCrack.exe') > -1 ){
        ftpcrack(host)
        ports +=1

        if ( scripts.indexOf('relaySMTP.exe') > -1 ){
            relaysmtp(host)
            ports +=1

            if ( scripts.indexOf('HTTPWorm.exe') > -1 ){
                httpworm(host)
                ports +=1
                    if ( scripts.indexOf('SQLInject.exe') > -1 ){
                        sqlinject(host)
                        ports +=1
                    }
            }
        }
    }
}

if ( ports >= requiredPorts ){
    // get access
    nuke( host )
    print('Access granted?' + hasRootAccess(host))
} else {
    print('Failed to access?' + hasRootAccess(host))
}
