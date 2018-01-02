host = getHostname()
target = args[0]

//balanceScript = 'balance.script'

growScript = 'grow.script'
weakenScript = 'weaken.script'
hackScript = 'hack.script'

spreadGrowScript = 'spreadGrow.script'
spreadHackScript = 'spreadHack.script'

//balanceMem = getScriptRam( balanceScript, host )
growMem = getScriptRam( growScript, host )
weakenMem = getScriptRam( weakenScript, host )
//hackMem = getScriptRam( hackScript, host )

spreadGrowMem = getScriptRam( spreadGrowScript, host )
spreadHackMem = getScriptRam( spreadHackScript, host )

print('balancing ' + target)

// 1. clean other processes
scriptKill(growScript, host)
scriptKill(weakenScript, host)
scriptKill(hackScript, host)

scriptKill(spreadGrowScript, host)
scriptKill(spreadHackScript, host)

sleep(2000) 

if ( host == 'host' ){
    // save some space to run programs by hand
    reservedRam = 100
} else {
    reservedRam = 0
}

// 2. allocate and start weakener
mems = getServerRam(host)
available = mems[0] - mems[1] - reservedRam




weakenThreads = Math.ceil( available / weakenMem / 5 ) 
run(weakenScript, weakenThreads, target)

// determine mode

maxMoney = getServerMaxMoney(target)
money = getServerMoneyAvailable(target)

// Grow Mode
if ( money < .9 * maxMoney ){
    print('Entering grow mode')

    // start growers
    mems = getServerRam(host)
    available = mems[0] - mems[1] - reservedRam
    threads = Math.floor( available / growMem ) 
    run(growScript, threads, target)

    while ( money < .9 * maxMoney ){
        money = getServerMoneyAvailable(target)
        sleep(10000)
    }
    // cleanup
    scriptKill(growScript, host)
    sleep(10000) 
}

// Farm Mode
if ( true ){
    print('Entering farm mode')

    // hacks
    mems = getServerRam(host)
    available = mems[0] - mems[1] - reservedRam
    hackAvailable = available / 2
    threads = Math.floor( hackAvailable / spreadHackMem ) 

    processes = Math.min( Math.ceil( threads/16 ), 64 )

    threadsPerProcess = threads/processes

    print('hackAvail: ' + hackAvailable)
    print('threads: ' + threads)
    print('processes: ' + processes)

    print('threadsPerProcess: ' + threadsPerProcess)
    for ( i=0;i<processes;++i){
        run(spreadHackScript, threadsPerProcess, target, i)
    }

    // grows
    sleep(5000) 
    mems = getServerRam(host)
    growAvailable = mems[0] - mems[1] - reservedRam
    threads = Math.floor( growAvailable / spreadGrowMem ) 

    processes = Math.min( Math.ceil( threads/16 ), 64 )
    threadsPerProcess = threads/processes
    for ( i=0;i<processes;++i){
        run(spreadGrowScript, threadsPerProcess, target, i)
    }
}

// Stripmine mode
