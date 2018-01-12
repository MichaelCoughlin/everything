id = null
if ( args.length > 0){
    id = args[0]
} 

maxMoney = null
if ( args.length > 1){
    maxMoney = args[1]
}

hackingLevel = getHackingLevel()

multiplier = 64


// What number of ports can we take
programs = [ 'BruteSSH.exe',
             'FTPCrack.exe',
             'relaySMTP.exe',
             'HTTPWorm.exe',
             'SQLInject.exe',
             'DeepscanV1.exe',
             'DeepscanV2.exe']

ports = 0;
scripts = ls('home')
for( i=0;i<programs.length;++i){
    program = programs[i]
    if ( scripts.indexOf( program ) > -1 ){
        ports += 1
    } 
}

if ( id ) {
    targets = [id]
} else {
    candidates = [
        //['foodnstuff', 1, 0],
        'harakiri-sushi',
        'nectar-net',
        'phantasy',
        'the-hub',
        'rho-construction',
        'zb-def',
        'global-pharm',
        'omnitek',
        'b-and-a',
        'megacorp'
    ]
    targets = ['foodnstuff']
    for( i=0;i<candidates.length;++i){
        candidate = candidates[i]
        requiredPorts = getServerNumPortsRequired(candidate)

        if ( requiredPorts > ports ){
            break
        }

        requiredLevel = getServerRequiredHackingLevel(candidate)
        if ( hackingLevel < requiredLevel ){
            break
        }

        targets = [candidate]
    }
   
    // server needs the correct name
    id = targets[0]
    
    tprint('About to farm ' + targets)
}



totalProcesses = targets.length * multiplier


home = false

costPerGB = 50000

money = getServerMoneyAvailable('home') 
if ( maxMoney && maxMoney < money ){
    money=maxMoney
}

memory = 1024
memory = 128
memory = 32
cost = memory * costPerGB

if ( cost > money ){
    home = true
    //memory = 1024 * 8
    memory = 124000
    name = 'home'
} else {
    while ( cost * 2 < money ){
        memory = memory * 2
        cost = memory * costPerGB
    }
    unit = 'GB'
    count = memory
    if (count>= 1024){
        count = count / 1024
        unit = 'TB'
    }
    if (count>= 1024){
        count = count / 1024
        unit = 'PB'
    }
    if (count>= 1024){
        count = count / 1024
        unit = 'EB'
    }
    if (count>= 1024){
        count = count / 1024
        unit = 'ZB'
    }
    name = 'swarm_shared' + '_' + count + unit

    if ( id ){
        name += '_' + id
    }
}



tprint( name )

if ( serverExists( name ) ){
    if ( name != 'home' ){
        tprint('Server already exists, killing all threads: ' + name)
        killall( name )
    }
} else {
    tprint('purchasing: ' + name +',' +memory)
    purchased = purchaseServer( name, memory )
    tprint('purchased: ' + purchased)
}


extract = 'extract.script'
grow = 'grow.script'

if ( name != 'home' ){
    scp(extract, name)
    scp(grow, name)
}

targetProcesses = totalProcesses / targets.length;
memoryPerTarget = memory / targets.length;

for( i =0;i<targets.length;++i){
    target = targets[i]

    //run('provisionServer.script', 1, name, target, targetProcesses, memoryPerTarget )
    run('provisionBalance.script', 1, name, target )
    
}
