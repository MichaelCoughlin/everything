// copy( $('.dialog-box-container').textContent)

hackingLevel = getHackingLevel()
hostname = getHostname()

toscan = ['home']
scanned = []

hostTuples = []

//clear('hosts.txt');
//write('hosts.txt', 'Host,Max Money,Growth,Hacking Level,Hack Time,Grow Time,Weaken Time, RAM,Rooted,Ports Required, NEWLINE\r\n', 'a');


while( toscan.length > 0 ){
    host = toscan.pop()
    //tprint(host);
    //print(host);

    scanned.push( host )

    //tprint('  ' + count + ' / ' + ( scanned.length + toscan.length ));
    //print(host + '  ' + scanned.length + ' / ' + ( scanned.length + toscan.length ));
    requiredLevel = getServerRequiredHackingLevel(host)
    print('')
    print(host + '  ' + requiredLevel + ' ' + round(getServerMoneyAvailable(host) / 1000000))
    print('')

    /*
    print('  rooted: ' + hasRootAccess(host) )
    print('  serverGrowth: ' + getServerGrowth(host) )
    print('  maxMoney: $' + (getServerMaxMoney(host) / 1000000 ) + 'M' )
    print('  requiredLevel: ' + getServerRequiredHackingLevel(host) )
    print('  portsRequired: ' + getServerNumPortsRequired(host) )

    print('  hackTime: ' + getHackTime( host ) )
    print('  RAM: ' + getServerRam( host ) )
    */

    rls = '' + requiredLevel
    while ( rls.length < 5 ){
        rls = '0' + rls
    }

    line =             host + ',' +
                       round(getServerMoneyAvailable(host)/1000000) +',' +
                       round(getServerMaxMoney(host)/1000000) + ',' +
                       getServerGrowth(host) + ',' +
                       requiredLevel + ',' +
                       getHackTime(host) + ',' +
                       getGrowTime(host) + ',' +
                       getWeakenTime(host) + ',' +
                       getServerRam(host)[0] + ',' +
                       hasRootAccess(host) + ',' +
                       getServerNumPortsRequired(host) + ',' +
                       ' NEWLINE\r\n'

    hostTuples.push( [rls, line ] )


    //write('hosts.txt', line, 'a');


    hosts = scan( host, true )
    while( hosts.length > 0 ){
        next = hosts.pop()
        if ( scanned.indexOf( next ) > -1 || toscan.indexOf( next ) > -1 ) {
            continue
        }
        toscan.push( next )
    }
}

hostTuples.sort()


details = 'hostDetails.txt'
clear(details);
write(details, 'Host,Money,Max Money,Growth,Hacking Level,Hack Time,Grow Time,Weaken Time, RAM,Rooted,Ports Required, NEWLINE\r\n', 'a');

for(i=0;i<hostTuples.length;++i){
    info = hostTuples[i]
    write(details, info[1], 'a')
}


