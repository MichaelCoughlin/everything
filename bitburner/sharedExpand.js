many = false
id = null
if ( args.length > 0){
    id = args[0]
    //if ( args[0] == 'many' ){
    //    many = true
    //}
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

second = ['zer0', 
           'max-hardware', 
           'iron-gym',
           'phantasy', 
           'silver-helix', 'omega-net','crush-fitness', 'johnson-ortho', 'the-hub']

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


if ( ! id ) {
    if ( hackingLevel < 60 ){
        id = 'first'
    } else if ( hackingLevel < 300 ) {
        id = 'second'
    } else if ( hackingLevel < 400 ) {
        id = 'third'
    } else if ( hackingLevel < 490 ) {
        id = 'fourth'
    } else if ( hackingLevel < 777 ) {
        id = 'fifth'
    } else if ( hackingLevel < 825 ) {
        id = 'sixth'
    } else if ( hackingLevel < 893 ) {
        id = 'seven'
    } else if ( hackingLevel < 925 ) {
        id = 'eight'
    } else if ( hackingLevel < 1011 ) {
        id = 'nine'
    } else if ( hackingLevel < 1138 ) {
        id = 'ten'
    } else {
        id = 'eleven'
    }
}

if ( id == 'many') {
    multiplier = 6
    targets = first.concat( second).concat( third ).concat( fourth )
} else if ( id == 'first' ){
    targets = first
} else if ( id == 'second' ){
    targets = second
} else if ( id == 'third' ){
    targets = third
} else if ( id == 'fourth' ){
    targets = fourth
} else if ( id == 'fifth' ){
    targets = fifth
} else if ( id == 'sixth' ){
    targets = sixth
} else if ( id == 'seven' ){
    targets = seven
} else if ( id == 'eight' ){
    targets = eight
} else if ( id == 'nine' ){
    targets = nine
} else if ( id == 'ten' ){
    targets = ten
} else if ( id == 'eleven' ){
    targets = eleven
} else if ( id == 'omnitek' ){
    targets = omnitek
} else if ( id == 'banda' ){
    targets = banda
} else if ( id == 'sigma' ){
    targets = sigma
} else if ( id == 'blade' ){
    targets = blade
} else if ( id == 'ecorp' ){
    targets = ecorp
} else if ( id == 'megacorp' ){
    targets = megacorp
} else if ( id == 'fulcrumassets' ){
    targets = fulcrumassets
} else {
    targets = [id]
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
