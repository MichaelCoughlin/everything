host = args[0]
target = args[1]

if ( ! hasRootAccess(target) ){
    run('own.script', 1, target )
    sleep( 20000 )
}



balanceScript = 'balance.script'

growScript = 'grow.script'
weakenScript = 'weaken.script'
hackScript = 'hack.script'

spreadGrowScript = 'spreadGrow.script'
spreadHackScript = 'spreadHack.script'

killall( host )

scp(balanceScript, 'home', host)
scp(growScript, 'home', host)
scp(weakenScript, 'home', host)
scp(hackScript, 'home', host)
scp(spreadGrowScript, 'home', host)
scp(spreadHackScript, 'home', host)

sleep(1000)

ran = exec(balanceScript, host, 1, target)

if ( ran ){
    tprint('Completed provisioning: ' + host + ' ' + target)
} else {
    tprint('Failed to provision: ' + host + ' ' + target)
}
