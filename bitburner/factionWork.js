//checkFactionInvitations() 
//joinFaction(name)

//workForFaction(factionName, workType) 
//getFactionRep(factionName) 


//getOwnedAugmentations
//getAugmentationsFromFaction(
//purchaseAugmentation(factionName, augName)


//installAugmentations
//
factions = [//['NiteSec', 50000],
 //['The Black Hand', 125000],
 ['The Black Hand', 500],
 ['BitRunners',875000]
 ]

workType = 'Hacking Contracts'

for(i=0;i<factions.length;++i){
    factionName = factions[i][0]
    targetRep = factions[i][1]

    while( true ){
        workForFaction(factionName, workType) 


        rep = getFactionRep(factionName) 
        print(factionName + ' ' + rep + ' / ' + targetRep)
        if ( rep > targetRep ){
            break
        }
        //sleep(10 * 60 * 1000)
        sleep(60 * 1000)
    }
}


