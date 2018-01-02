
foodnstuff='foodnstuff'
stripMineScript ='stripMine.script'
ownScript ='own.script'
home = 'home'

farmScript='sharedExpand.script'


run('ownAll.script', 1)

// hack foodnstuff

hasRootAccess(foodnstuff)
run(ownScript, 1 foodnstuff)
while (!hasRootAccess( foodnstuff )){
    sleep( 1000 )
}

run(stripMineScript, 1, foodnstuff)
run(stripMineScript, 1, home, foodnstuff)

// drain iron-gym
run(stripMineScript, 1, home, ironGym)
// drain silver-helix
run(stripMineScript, 1, home, silverHelix)

// farm phantasy
