// Clean old servers

servers = getPurchasedServers(true)

maxRam = 0

for( i =0;i<servers.length;++i){
    server = servers[i]

    ram = getServerRam(server)
    maxRam = Math.max( ram, maxRam )
}
for( i =0;i<servers.length;++i){
    server = servers[i]

    ram = getServerRam(server)
    ramRatio = ram / Maxram

    tprint( server, ram,  ramRatio)

//    getScriptIncome([scriptname], [hostname/ip], [args...])
//    getScriptExpGain([scriptname], [hostname/ip], [args...])

    if ( ramRatio < .001){
        tprint( 'Cleanup: ' + server )
        //killall( server )
        //deleteServer( server )
    } else {
        tprint( 'Safe: ' + server )
    }
}
