
// Clean old servers

while(true){
    maxRam=1024
    servers = getPurchasedServers(true)

    for( i =0;i<servers.length;++i){
        server = servers[i]

        ram = getServerRam(server)[0]
        maxRam = Math.max( ram, maxRam )
    }

    nextRam = maxRam * 2
    
    nextCost = nextRam * 50000

    currentFunds = getServerMoneyAvailable('home')

    if ( currentFunds > nextCost ){
        tprint('Have enough for the next server! ' + round(currentFunds/1000000) 
                                                   + ' > ' + round(nextCost/1000000) )

        //run('cleanOld.script',1)

        //run('own.script',1, target)
        run('sharedExpand.script',1)
    } else {
        tprint('Do not have enough for the next server! ' + round(currentFunds/1000000) 
                                                   + ' < ' + round(nextCost/1000000) )
    }
    run('purchasePrograms.script',1)
    sleep( 15000 )

    run('ownAll.script',1)
    sleep( 45000 )

}
