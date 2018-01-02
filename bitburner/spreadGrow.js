// Grow
target = args[0]

maxMoney = getServerMaxMoney(target)

while( true ){
    // attempt to evenly distribute the grows
    growTime = getGrowTime(target)
    sleep( Math.random() * ( growTime * 1000 ) )
    grow( target )
}
