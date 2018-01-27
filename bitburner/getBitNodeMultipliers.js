multipliers = getBitNodeMultipliers()

keys = [
'ServerMaxMoney',
'ServerStartingMoney',
'ServerGrowthRate',
'ServerWeakenRate',
'ServerStartingSecurity',
'ManualHackMoney',
'ScriptHackMoney',
'CompanyWorkMoney',
'CrimeMoney',
'HacknetNodeMoney',
'CompanyWorkExpGain',
'ClassGymExpGain',
'FactionWorkExpGain',
'HackExpGain',
'CrimeExpGain',
'FactionWorkRepGain',
'FactionPassiveRepGain',
'AugmentationRepCost',
'AugmentationMoneyCost'
]

for (i=0;i<keys.length;++i){
    key = keys[i]
    print( key + ' : ' + multipliers[key] )
}
