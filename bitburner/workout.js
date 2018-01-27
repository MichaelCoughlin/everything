gymName = 'Powerhouse Gym'

stats = ['str','dex','agi','def'];

while(true){
    for( i =0;i<stats.length;++i){
        gymWorkout(gymName, stats[i]);
        sleep(20000);
    }
}
