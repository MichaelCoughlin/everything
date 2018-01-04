target = null
hosts = null

if ( args.length > 1 ){
    hosts = [args[0]]
    target = args[1]
} else if ( args.length > 0 ){
    target = args[0]
} else {
    targetSelf = true
    target = 'self'
}

hostList = [['foodnstuff',
  'sigma-cosmetics',
  'joesguns',
  'nectar-net',
  'hong-fang-tea',
  'harakiri-sushi'],
 ['neo-net', 'CSEC', 'zer0', 'max-hardware', 'iron-gym'],
 ['phantasy',
  'silver-helix',
  'omega-net',
  'avmnite-02h',
  'crush-fitness',
  'johnson-ortho',
  'the-hub'],
 ['comptek',
  'I.I.I.I',
  'netlink',
  'rothman-uni',
  'catalyst',
  'summit-uni',
  'rho-construction',
  'millenium-fitness'],
 ['aevum-police',
  'run4theh111z',
  '.',
  'syscore',
  'alpha-ent',
  'snap-fitness',
  'lexo-corp',
  'unitalife',
  'zb-def',
  'global-pharm',
  'applied-energetics',
  'nova-med',
  'univ-energy'],
 ['zb-institute',
  'solaris',
  'vitalife',
  'zeus-med',
  'microdyne',
  'titan-labs',
  'galactic-cyber',
  'icarus',
  'helios',
  'deltaone',
  'aerocorp',
  'defcomm',
  'taiyang-digital',
  'The-Cave',
  'omnitek',
  'omnia',
  'infocomm',
  'powerhouse-fitness',
  'stormtech',
  '4sigma',
  'blade',
  'b-and-a',
  'fulcrumtech',
  'clarkeinc',
  'nwo',
  'megacorp',
  'kuai-gong',
  'ecorp']]

if ( !hosts ){
    hosts = hostList[0]

    scripts = ls( 'home' )

    ports = 0
    if ( scripts.indexOf('BruteSSH.exe') > -1 ){
        hosts = hosts.concat( hostList[ ++ ports ] )
        if ( scripts.indexOf('FTPCrack.exe') > -1 ){
            hosts = hosts.concat(  hostList[++ ports ] )

            if ( scripts.indexOf('relaySMTP.exe') > -1 ){
                hosts = hosts.concat(  hostList[++ ports ] )

                if ( scripts.indexOf('HTTPWorm.exe') > -1 ){
                    hosts = hosts.concat(  hostList[++ ports ] )

                    if ( scripts.indexOf('SQLInject.exe') > -1 ){
                        hosts = hosts.concat(  hostList[++ ports ] )
                    }
                }
            }
        }
    }

    print(hosts.length + ' available with requiring less than ' + ports + ' ports')
}


// choose target
if ( ! target ){
    bestTarget = null
    mostMoney = 0

    hackingLevel = getHackingLevel()

    for( i=0;i<hosts.length;++i){
        target = hosts[i]

        if ( ! hasRootAccess(target ) ){
            continue
        }

        requiredLevel = getServerRequiredHackingLevel(target)
        if ( requiredLevel > hackingLevel ){
            continue
        }

        available  = getServerMoneyAvailable(target)
        if ( available > mostMoney ){
            bestTarget = target
            mostMoney = available
        }
    }

    target = bestTarget
    print('Target is: ' + target + ' with ' + round(mostMoney/1000000))
    print(' ')
}

// farm target
for( i=0;i<hosts.length;++i){
    host = hosts[i]

    if ( ! hasRootAccess(host ) ){
        continue
    }

    if ( targetSelf ){
        target = host
    }

    extract = 'simpleExtract.script'
    if ( host == 'home' ){
        rams = getServerRam( host )
        ram = rams[0]
        used = rams[1]

        ram = ram - used - 40
    } else {
        killall( host )

        scp(extract, host)

        for ( j=0;j<10;++j){
            rams = getServerRam( host )
            ram = rams[0]
            used = rams[1]
            if ( used == 0 ){
                break
            }
            
            sleep( 2000 )
        }
    }

    extractRam = getScriptRam( extract, host)
    threads = Math.floor( ram / extractRam )
    if ( threads == 0 ){
        continue
    }

    ran = exec(extract, host, threads, target)
    print('started simple extract on ' + target)
}
