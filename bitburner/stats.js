while(true){
    content = []
    
    print('stats')

    totalIncome = getScriptIncome()
    totalExp = getScriptExpGain()



    print('Total income:' + totalIncome)
    print('Total exp:' + totalExp)

    servers = getPurchasedServers(true)
    for( i =0;i<servers.length;++i){
        host = servers[i]

        print( '' )
        print( host )
        content.push('')
        content.push(host)

        ram = getServerRam( host )
        print('.    used ram: ' + round(100*ram[1]/ram[0]) + '%')
        

        //target = host.split('_')[ (host.split('_').length-1) ]
        parts = host.split('_')
        if ( parts.length < 4 ){
            continue
        }
        target = parts[3]

        maxMoney = getServerMaxMoney(target)
        money = getServerMoneyAvailable(target)


        security = getServerSecurityLevel(target)
        //getServerBaseSecurityLevel(hostname/ip)



        // split the server name to figure out who we're targeting
        // swarm_shared_512GB_zer0
        // spreadHack zer0 0
        // spreadGrow zer0 0

        serverIncome = 0
        serverExp = 0
        
        scripts = ['grow','weaken','hack','spreadGrow','spreadHack'
                    ,'extract','simpleExtract']

        for (j=0;j<scripts.length;++j){
            //script = 'spreadHack.script'
            script = scripts[j] + '.script'
            index = 0
            while( isRunning(script, host, target, index) ){
                income = getScriptIncome(script, host, target, index)
                exp = getScriptExpGain(script, host, target, index)

                //print('  income: ' + income )
                //print('  exp: ' + exp )
                serverIncome += income
                serverExp += exp
                index += 1
            }
        }
        print('.    security:  ' + round(security))
        print('.    money:     $' + round(money / 1000000)+'M / $'+
                                    round(maxMoney / 1000000)+'M    ' + round(100 * money / maxMoney ) +'%')

        content.push('.    security:  ' + round(security))
        content.push('.    money:     $' + round(money / 1000000)+'M / $'+
                                    round(maxMoney / 1000000)+'M    ' + round(100 * money / maxMoney ) +'%')



        if ( serverIncome > 0 || serverExp > 0  ){
            print('.    income:     $' + round(serverIncome) + ' ' + round(100*serverIncome / totalIncome[0])+ '%')
            print('.    exp:        ' + round(serverExp) + ' ' + round(100*serverExp / totalExp)+ '%')

            print('.    income/GB:  $' + round(serverIncome / ram[0] ))

            print('.    exp/GB:     ' + round(serverExp / ram[0]))

            content.push('.    income:     $' + round(serverIncome) + ' ' + round(100*serverIncome / totalIncome[0])+ '%')
            content.push('.    exp:        ' + round(serverExp) + ' ' + round(100*serverExp / totalExp)+ '%')

            content.push('.    income/GB:  $' + round(serverIncome / ram[0] ))
            content.push('.    exp/GB:     ' + round(serverExp / ram[0]))
            cost = ram[0] * 50000
            if ( serverIncome > 1 ){
                secondsToBuy = round(cost / serverIncome)
                print('.    seconds to buy:     ' + secondsToBuy)
                content.push('.    seconds to buy:     ' + secondsToBuy)
            }
        }
        

        
    }
    clear('stats.txt')
    for( line=0;line<content.length;++line){
        
        write('stats.txt', content[line] +'  ____\r\n', 'a')
    }


}
