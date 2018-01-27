/*
*/
purchaseTor()

programs = [ 'BruteSSH.exe',
             'FTPCrack.exe',
             'relaySMTP.exe',
             'HTTPWorm.exe',
             'SQLInject.exe',
             'DeepscanV1.exe',
             'DeepscanV2.exe']

scripts = ls('home')

for( i=0;i<programs.length;++i){
    program = programs[i]
    if ( scripts.indexOf( program ) == -1 ){
        print('Purchasing: ' + program);
        purchaseProgram(program)
    } 
}
