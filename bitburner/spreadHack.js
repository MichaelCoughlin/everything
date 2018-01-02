// Extract
target = args[0]

maxMoney = getServerMaxMoney(target)

while( true ){
    available = getServerMoneyAvailable(target)

    hackingLevel = getHackingLevel()
    requiredLevel = getServerRequiredHackingLevel(target)

    //if ( hackingLevel * .95 > requiredLevel  &&
    if ( hackingLevel >= requiredLevel  &&
         available > maxMoney * .75 ){

        // distribute the hacks
        hackTime = getHackTime(target)
        sleep( Math.random() * ( hackTime * 1000 ) )

        hack( target )
    } else {
        grow( target )
    }
}
