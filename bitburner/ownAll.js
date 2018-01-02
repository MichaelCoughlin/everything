toscan = ['home']
scanned = []

paths = 'hostPaths.txt'
clear(paths)

//unordered = 'hostsUnordered.txt'

//clear(unordered)
//write(unordered, 'Host,Hacking Level', 'a')

//fileList = 'fileList.txt'
//clear(fileList)


hostTuples = []

while( toscan.length > 0 ){
    host = toscan.pop()
    //tprint(host);
    print(host);

    // recursively run ourselves for parallelism

    if ( ! hasRootAccess(host) ){
        run('own.script', 1, host )
    }


    scanned.push( host )


    //tprint('  ' + count + ' / ' + ( scanned.length + toscan.length ));
    print('  ' + scanned.length + ' / ' + ( scanned.length + toscan.length ));

    requiredLevel = getServerRequiredHackingLevel(host)
    rls = '' + requiredLevel
    while ( rls.length < 5 ){
        rls = '0' + rls
    }
    //hostTuples.push( [requiredLevel, host ] )
    hostTuples.push( [rls, host ] )

    //write(unordered, host + ',' + requiredLevel + '\r\n', 'a');

    /*
    files = ls( host )
    if ( files.length > 0 ){
        write(fileList, host +' ' + files.join(', ') + '\r\n', 'a')

        for(f=0;f<files.length;++f){
            file = files[f]
            if ( file.indexOf('.lit') > 0 ){
                scp(file, host, 'home')
            }
        }
    }
    */

    hosts = scan( host, true )
    while( hosts.length > 0 ){
        next = hosts.pop()
        if ( scanned.indexOf( next ) > -1 || toscan.indexOf( next ) > -1 ) {
            continue
        }
        write(paths, next + '  ' + host + '\r\n', 'a')

        toscan.push( next )
    }
}
hosts = scanned

hostTuples.sort()
ordered = 'ordered.txt'
clear(ordered)

for(i=0;i<hostTuples.length;++i){
    info = hostTuples[i]
    write(ordered, info[0] + ' ' + info[1] + '\r\n', 'a')

//tprint('  Ratio:           ' + round(maxMoneyM * 1000 / hackTime) )

//root = hasRootAccess(host)


}
