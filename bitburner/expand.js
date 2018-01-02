

costPerGB = 50000

//targets = ['zer0','max-hardware','iron-gym','phantasy','silver-helix']
//targets = ['zer0','max-hardware']
targets = ['comptek']

//memory = 1024
//memory = 2048
memory = 32768 * 16

for( i =0;i<targets.length;++i){
    target = targets[i]

    name = 'swarm_' + target + '_' + memory

    if ( serverExists( name ) ){
        tprint('Server already exists: ' + name)
    } else {
        tprint('purchasing: ' + name +',' +memory)
        purchased = purchaseServer( name, memory )
        tprint('purchased: ' + purchased)
    }


    extract = 'extract.script'

    scp(extract, name)

    ram = getScriptRam( extract, name)

    threads = Math.floor( memory / ram )

    tprint(memory + ',' + ram + ' ' + threads)

    INSTANCES = 100
    for ( j =0;j<INSTANCES;++j){
        instance_threads = threads / INSTANCES;

        ran = exec(extract, name, instance_threads, target, j)
        //tprint(extract + ' ' + name + ' ' + threads + ' ' + target + ' ' + ran)
        tprint(extract + ' ' + name + ' ' + instance_threads + ' ' + target + ' ' + j + ' ' + ran)
    }

    
}
