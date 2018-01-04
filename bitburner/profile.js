// copy( $('.dialog-box-container').textContent)

host = args[0]


moneyM = round(getServerMoneyAvailable(host)/1000000)
maxMoneyM = round(getServerMaxMoney(host)/1000000)
growth = getServerGrowth(host)
requiredLevel = getServerRequiredHackingLevel(host)
hackTime = getHackTime(host)
growTime = getGrowTime(host)
weakenTime = getWeakenTime(host)
ram = getServerRam(host)[0]
root = hasRootAccess(host)
ports = getServerNumPortsRequired(host)
security = getServerSecurityLevel(host)



tprint(host)
tprint('  Available money: ' + moneyM)
tprint('  Max money:       ' + maxMoneyM)
tprint('  Growth:          ' + growth)
tprint('  Hacking Level:   ' + requiredLevel)
tprint('  Hacking Time:    ' + hackTime)
tprint('  Grow Time:       ' + growTime)
tprint('  Weaken Time:     ' + weakenTime)
tprint('  Ram:             ' + ram)
tprint('  Rooted:          ' + root)
tprint('  Ports:           ' + ports )
tprint('  Security:        ' + security )
tprint('')
tprint('  Ratio:           ' + round(maxMoneyM * 1000 / hackTime) )

