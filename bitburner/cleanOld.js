// Clean old servers

servers = getPurchasedServers(true)

maxRam = 1

for( i =0;i<servers.length;++i){
    server = servers[i]

    ram = getServerRam(server)[0]
    maxRam = Math.max( ram, maxRam )
}
for( i =0;i<servers.length;++i){
    server = servers[i]

    ram = getServerRam(server)[0]
    ramRatio = ram / maxRam

    print( server)
    print( '  ' + server + ' ' + ram + ' ' +  ramRatio)

//    getScriptIncome([scriptname], [hostname/ip], [args...])
//    getScriptExpGain([scriptname], [hostname/ip], [args...])

    if ( ramRatio < .001){
        tprint( '  Cleanup: ' + server )
        killall( server )
        deleteServer( server )
    } else {
        print( '  Safe: ' + server )
    }
}

