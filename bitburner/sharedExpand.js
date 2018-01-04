id = null
if ( args.length > 0){
    id = args[0]
} 

maxMoney = null
if ( args.length > 1){
    maxMoney = args[1]
}

//targets = ['zer0','max-hardware','iron-gym','phantasy','silver-helix']
//targets = ['zer0','max-hardware']

hackingLevel = getHackingLevel()


//, 'comptek']


//totalProcesses = 256
//totalProcesses = 128
first = ['foodnstuff',
     'sigma-cosmetics',
     'joesguns',
     'nectar-net',
     'hong-fang-tea',
     'harakiri-sushi',
     'neo-net']

second = [ //'zer0', 
           //'max-hardware', 
           //'iron-gym',
           'phantasy', 
           //'silver-helix', 
           'omega-net'
           //,'crush-fitness', 'johnson-ortho'
          , 'the-hub']

third = ['comptek', 'netlink']

fourth = ['rothman-uni', 'summit-uni', 'catalyst', 'aevum-police']

fifth = ['rho-construction', // 476
         'millenium-fitness', 'alpha-ent', 'syscore', 'lexo-corp', 'zb-institute']

sixth = ['snap-fitness', // 777
         'microdyne',
         'unitalife',
         'univ-energy',
         'zb-def',
         'solaris',
         'zeus-med',
         'applied-energetics']

seven = ['global-pharm', // 825
         'nova-med',
         'titan-labs',
         'deltaone',
         'galactic-cyber',
         'vitalife',
         'icarus']

eight = ['taiyang-digital', // 893
         'infocomm',
         'helios',
         'omnia']

nine = [//'aerocorp', // 925
         'omnitek',
         //'defcomm',
         '4sigma',
         //'stormtech'
            ]

ten =  [ 'b-and-a', // 1011
         'blade']
         //'powerhouse-fitness',
eleven =['nwo', // 1138
         'megacorp',
         'kuai-gong',
         'ecorp',
         //'fulcrumtech'
            ]

omnitek =  [ 'omnitek']
banda = ['b-and-a']
blade = ['blade']
sigma =  [ '4sigma']
ecorp =  [ 'ecorp']
megacorp =  [ 'megacorp']
fulcrumassets = ['fulcrumassets']

multiplier = 64


if ( id ) {
    targets = [id]
} else {
    if ( hackingLevel < 60 ){
        targets = ['foodnstuff']
    } else if ( hackingLevel < 300 ) {
        targets = [ 'phantasy',
           //'silver-helix', 
           'omega-net' , 'the-hub']
        targets= ['the-hub']
    } else if ( hackingLevel < 490 ) {
        //targets = [ 'phantasy','the-hub','catalyst']
        targets = [ 'the-hub']
    } else if ( hackingLevel < 777 ) {
        targets = ['rho-construction']
           //, 'millenium-fitness', 'alpha-ent', 'syscore', 'lexo-corp', 'zb-institute']
    } else if ( hackingLevel < 825 ) {
        targets = ['rho-construction']
    } else if ( hackingLevel < 893 ) {
        targets = ['zb-def']
    } else if ( hackingLevel < 925 ) {
        targets = ['global-pharm']
    } else if ( hackingLevel < 1011 ) {
        targets = ['omnitek']
    } else if ( hackingLevel < 1138 ) {
        targets = ['b-and-a']
    } else {
        targets = ['megacorp']
    }

    // only choose the first one
    targets = [targets[0]]
    
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
