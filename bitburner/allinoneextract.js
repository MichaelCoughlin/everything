// Extract
target = args[0]

maxMoney = getServerMaxMoney(target)
minSecurity = getServerMinSecurityLevel(target)

while( true ){
    available = getServerMoneyAvailable(target)
    security = getServerSecurityLevel(target)

    action = Math.floor(Math.random() * 10)

    
    if ( action == 0 ){
        //if ( security > minSecurity * 1.1 ){
            weaken( target )
        //}
    } else if ( action == 1 ){
        hackingLevel = getHackingLevel()
        requiredLevel = getServerRequiredHackingLevel(target)

        if ( hackingLevel * .95 > requiredLevel  &&
             available > maxMoney * .9 ){
            hack( target )
        }
    } else {
        //available = getServerMoneyAvailable(target)

        //if ( available < maxMoney * .9 ){
            grow( target )
        //}
    }
    
}
