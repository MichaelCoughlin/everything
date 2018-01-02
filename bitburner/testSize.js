// empty 1.4GB

target = args[0]
while( true){
    weaken(target)
}



//.15 for a grow, weaken
grow()
weaken()
// .1 for hack
hack()

// .1GB for an if
if( true ){
}

// .2GB for a while
while(true){
    while(true){}
}

// 1.7 for while(true){ hack}
while(true){
    hack()
}

// 1.75 for while(true){ grow or weaken}

// getGrowTime 0.05
growTime = getGrowTime(target)
/*


*/
    sleep( Math.random() * ( growTime * 1000 ) )
    sleep( Math.random() * ( growTime * 1000 ) )
    sleep( Math.random() * ( growTime * 1000 ) )
    grow( target )

/*
*/
