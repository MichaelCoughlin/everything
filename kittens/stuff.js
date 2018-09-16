let allowPraise = true;
let praise = () => {
    if (allowPraise) {
        document.querySelector('#fastPraiseContainer a').click();
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

var convert = () => {
    document.querySelectorAll('.res-row').forEach((row) => {
         ['steel', 'kerosene','alloy','eludium','thorium','beam','slab'].forEach((material) => {
        // ['steel', 'kerosene','alloy','thorium','beam','slab'].forEach((material) => {
        // ['steel', 'kerosene','thorium','beam','slab'].forEach((material) => {
            if (row.textContent.indexOf(material) > -1) {
                row.querySelectorAll('.craft-link').forEach((anchor) => {
                    if (anchor.textContent.indexOf('all') > -1 ) {
                        anchor.click();
                    }
                });
            }
        });
    });
};

var loop = () => {
    tradeRelics();
    convert();
    setTimeout(loop, 60 * 1000);
}
loop()



