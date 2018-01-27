//checkFactionInvitations() 
//joinFaction(name)

//workForFaction(factionName, workType) 
//getFactionRep(factionName) 


//getOwnedAugmentations
//getAugmentationsFromFaction(
//purchaseAugmentation(factionName, augName)


//installAugmentations


factionReputationAugs = ['Social Negotiation Assistant (S.N.A)','ADR-V1 Pheromone Gene']

hackingAugs = ['BitWire',
// 'Synaptic Enhancement Implant',
 'Cranial Signal Processors - Gen I',
 'NeuroFlux Governor',
// 'Neurotrainer I',
// 'Wired Reflexes',
// 'Speech Processor Implant',
// 'Nuoptimal Nootropic Injector Implant',
// 'Speech Enhancement',
// 'ADR-V1 Pheromone Gene',
// 'Social Negotiation Assistant (S.N.A)',
 'Artificial Synaptic Potentiation',
 'Neural-Retention Enhancement',
 'Embedded Netburner Module',
 'Cranial Signal Processors - Gen II',
 'Neurotrainer II']

owned = getOwnedAugmentations(true)

factions = ['CyberSec','Tian Di Hui', 'NiteSec', 'Aevum']

queued = []

for (i=0;i<factions.length;++i){
    faction = factions[i]
    factionRep = getFactionRep(faction) 

    print( faction + ' ' + factionRep + ';' )
    augmentations = getAugmentationsFromFaction( faction )
    for (j=0;j<augmentations.length;++j){
        augmentation = augmentations[j]
        cost = getAugmentationCost(augmentation) 
        if ( cost[0] > factionRep ){
            continue;
        }
        if ( owned.indexOf( augmentation ) > -1 ){
            continue
        }
        if ( queued.indexOf( augmentation ) > -1 ){
            continue
        }

        print( '   ' + augmentation + ',' + cost + '; '  )

        queued.push( augmentation )
    }
}
