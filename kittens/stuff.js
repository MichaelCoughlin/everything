let allowPraise = true;
let praise = () => {
    if (allowPraise) {
        $('#fastPraiseContainer a').click();
    }
    
    setTimeout(praise, 5 * 60 * 1000);
};
praise();

var tradeRelics = () =>{
    document.querySelectorAll('.trade-race').forEach((race) => {
        if (race.textContent.indexOf('relic')>-1){
            const tradeButton = race.querySelector('.trade a');
            if(tradeButton){
                tradeButton.click();
            }
        }
    });
}

var loop = () => {
    tradeRelics();
    setTimeout(loop, 60 * 1000);
}
loop()
