name = args[0]
target = args[1]
targetProcesses = args[2]

if ( args.length > 3 ){
    memoryRemaining = args[3]
} else {
    memoryRemaining = getServerRam(name)[0]
}


print('MemoryPerTarget ' + memoryRemaining)


extract = 'extract.script'
grow = 'grow.script'

extractRam = getScriptRam( extract, name)
growRam = getScriptRam( grow, name)

// ensure we have enough memory for 1 thread
machineProcessLimit = Math.floor(memoryRemaining / Math.max( extractRam, growRam ))
targetProcesses = Math.min( machineProcessLimit, targetProcesses )

// max number of threads to allow the server to thrive
threadLimit = 50
requiredLevel = getServerRequiredHackingLevel(target)
if ( requiredLevel > 100 ) {
    threadLimit = requiredLevel / 2
}

print('Thread limit ' + threadLimit)


// Create extract processes
extractRamAllocation= memoryRemaining / 4; 
extractProcessesAllocation = targetProcesses / 4; 


print('Extract Ram Allocation: ' + extractRamAllocation)
print('Extract Processes Allocation: ' + extractProcessesAllocation)

ramPerExtract = extractRamAllocation / extractProcessesAllocation
threads = Math.floor( ramPerExtract / extractRam )


print('Ram Per Extract: ' + ramPerExtract)
print('Threads: ' + threads)

for(j=0;j<extractProcessesAllocation;++j){
    // Don't want to starve the servers
    if ( threads > threadLimit ){
        threads = threadLimit
    }

    print('Execing: ' + extract + ' ' + name + ' ' + threads + ' ' +target)

    ran = exec(extract, name, threads, target, j)
    if ( ! ran ){
        tprint(ramPerExtract + ',' + extractRam + ' ' + threads)
        tprint(extract + ' ' + name + ' ' + threads + ' ' + target + ' ' + j + ' ' + ran)
    }
}

// Create grow processes
growRamAllocation= memoryRemaining - extractRamAllocation
growProcessesAllocation = targetProcesses - extractProcessesAllocation

ramPerGrow = growRamAllocation / growProcessesAllocation
threads = Math.floor( ramPerGrow / growRam )


for(j=0;j<growProcessesAllocation;++j){

    ran = exec(grow, name, threads, target, j)
    if ( ! ran ){
        tprint(ramPerGrow + ',' + growRam + ' ' + threads)
        tprint(grow + ' ' + name + ' ' + threads + ' ' + target + ' ' + j + ' ' + ran)
    }
}
tprint('Completed provisioning ' + name + ' ' + target)
