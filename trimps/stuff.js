
var latestMouseMove = Date.now();

document.addEventListener('mousemove', function(event){
    latestMouseMove = Date.now();
});

var selectorContent = function( selector ){
    var element = document.querySelector( selector );
    if ( element && element.offsetParent ){
        return element.textContent;
    }
    return null;
};

var andThen = function( next ){
    setTimeout( next, 50 );
};


var clickSelector = function( selector ){
    var button = document.querySelector( selector );
    if ( button && button.offsetParent ){
        button.click();
        console.log('Bought ' + selector);
        return true;
    }
    return null;
};


var click = function( item ){
    var selector = '#' + item + '.thingColorCanAfford';
    return clickSelector( selector );
}

var buyWithLimit = function( item, limit ){
    var owned = selectorContent( '#' + item + 'Owned' );
    owned = owned && parseInt(owned, 10 )
    if (! owned || owned < limit){
        click( item );
    }
}


var selectorContains = function( selector, text ){
    var content = selectorContent( selector );
    return content && content.indexOf( text ) > -1;
}

var selectorAsInt = function( selector){
    var owned = selectorContent( selector );
    return (owned && parseInt( owned, 10 )) || 0;
};

var getWorldNumber = function(){
    return selectorAsInt('#worldNumber');
}




var getTimeToFill = function(){
    var timeString  = selectorContent('#trimpsTimeToFill');
    if ( timeString ){
        var parts = timeString.split(' ');
        var timePart = parts[parts.length -2];
        return Number(timePart);
    }
}

buyHousing = false
buyHousing = true

//var buyStorage = function( ){
var buyBuildings = function(){
    // #foodBar.percentColorYellow 
    // #foodBar.percentColorRed 
        // click('Forge') || 
        // click('Barn') || 
        // click('Shed') ||
        click('Warpstation') ||
        (buyHousing && (document.querySelector('#Collector') ?
            buyWithLimit('Collector',100) :
            ( buyWithLimit('Gateway',90) || 
              buyWithLimit('Resort',90) || 
              buyWithLimit('Hotel',90) || 
              buyWithLimit('Mansion',90) ||
              buyWithLimit('House',90) || 
              buyWithLimit('Hut',90)  
            ))) ||
              click('Tribute') || 
              (getTimeToFill() > 4.2 && buyWithLimit('Nursery',1450))   || 
/*
*/
        click('Gym');

    upgradeWarpStation();

    andThen( allocateWorkers );
}

var lastStation = 0;
var nextStationDelayMinutes = 5;

var upgradeWarpStation = function(){
    var warpstations = selectorAsInt('#WarpstationOwned');
    //if ( warpstations > 6 ){
    var now = Date.now();
    // don't upgarde station for at least n minutes
    if ( now - lastStation < nextStationDelayMinutes * 60 * 1000 ){
    // if ( now - lastStation < 15 * 60 * 1000 ){
    //if ( now - lastStation < 45 * 60 * 1000 ){
        return;
    }

    if ( warpstations > 25 ){
    //if ( warpstations > 8 ){
        lastStation = now;

        clickSelector('#Gigastation');
        setTimeout( function(){
            if ( selectorContains( '#tooltipDiv', 'Gigastation') ){
                clickSelector('#confirmTooltipBtn');
            }
        }, 1000);
    }
}


var pauseAutomation = false;
var allocateWorkers = function(){
    if ( pauseAutomation ){
        andThen( allocateWorkers );
        return;
    }
    
    var maxTimeToFill = 10
    //if (getTimeToFill() < maxTimeToFill && document.querySelector( '#Geneticist.thingColorCanAfford')){
        //&&  click('Geneticist'))
        // meh, just call the methods directly
    //    addGeneticist( 1 )
    //}

    if ( !(  click('Explorer') || click('Trainer') ) ){
        var num = Math.random();
        
        if ( num < .3 ){
            click('Farmer')
        } else if ( num < .6 ){
            click('Lumberjack')
        } else if ( num < .9 ){
            click('Miner')
        } else {
            click('Scientist')
        }
    }

    //andThen( buyUpgrades );
    andThen( buyBuildings );
}

//gotoTab( 'buildings', buyStorage )
//    buyStorage();
//}




//var gotoTab = function( tabName, next ){ };



var buyUpgrades = function(){
    if( false && clickSelector('#upgradesHere .thingColorCanAfford.upgradeThing:not(#Gigastation)')){
        andThen( buyUpgrades, 2000 );
    } else {
        andThen( buyBuildings, 2000 );
    }
}

var mapDelay = 500;
//mapDelay = 15000;

//var runMap = function(){}
mapsPaused = false;
var runTheMap = function(){
    // don't do any map stuff if the mouse is moving
    var now = Date.now();
    if ( ( now - latestMouseMove ) < 10000 ||  mapsPaused ){
        setTimeout( runTheMap, mapDelay );
        return;
    }

    var worldName = document.querySelector( '#worldName' );
    var isZone = worldName && worldName.textContent == 'Zone';

    /*
    if ( isZone ){
        // more hp
        clickSelector('#formation1')
    } else {
        // more attack
        clickSelector('#formation0')
    }
    */
          

    var mapCreateButton = document.querySelector('#mapCreateBtn');
    var isMapList = mapCreateButton && mapCreateButton.offsetParent;
    if ( !isMapList && isZone && getWorldNumber() > 15 ){

        var selector = '#mapBonus';
        var mapBonus = document.querySelector( selector );

        if ( mapBonus && 
             mapBonus.offsetParent &&
             mapBonus.textContent === '' ) {

            clickSelector( '#mapsBtn:not(.shrinkBtnText) #mapsBtnText' );
         
        }
        console.log( mapBonus.textContent )
    }

    setTimeout( function(){
        var createButton = document.querySelector('#mapCreateBtn');
        if ( createButton && createButton.offsetParent ){
            setTimeout( function(){
                clickSelector( '#mapCreateBtn' );
                setTimeout( function(){
                    clickSelector( '#selectMapBtn' );

                    setTimeout( function(){
                        mapCreateButton = document.querySelector('#mapCreateBtn');
                        isMapList = mapCreateButton && mapCreateButton.offsetParent;

                        // something went wrong?
                        if ( isMapList ){
                            clickSelector( '#mapsBtn:not(.shrinkBtnText)' );
                        }
                    }, 500);
                }, 500);
            }, 500);
        }

        setTimeout( runTheMap, mapDelay );
    }, 500);
}

var buySomeEquipment = function(){
    if ( pauseAutomation ){
        andThen( buySomeEquipment );
        return;
    }


    ['Shield',
     'Dagger',
     'Boots',
     'Mace',
     'Helmet',
     'Polearm',
     'Pants',
     'Battleaxe',
     'Shoulderguards',
     'Greatsword',
     'Breastplate'].forEach( (equipment) => {
        var numeral = selectorContent( '#' + equipment + 'Numeral' );

        var owned = selectorContent( '#' + equipment + 'Owned' );
        owned = owned && parseInt(owned, 10 )

        console.log( equipment, numeral, owned );

        var target;//= 3;

        if ( !numeral || numeral === '' || ['I','II','III','IV'].indexOf( numeral ) > -1 ){
            target = 10;
        } else {
            target = 3;
        }

        if ( owned && owned < target ){
            clickSelector('#equipmentHere #' + equipment + '.thingColorCanAfford');
        }
//Dagger Numeral
    });

    setTimeout( buySomeEquipment, 10000 );
};






//buyUpgrades()
buyBuildings()
buySomeEquipment()
runTheMap()


units = {'k': 3,
'M': 6,
'B': 9,
'T': 12,
'Qa': 15,
'Qi': 18,
'Sx': 21,
'Sp': 24,
'Oc': 27,
'No': 30,
'Dc': 33,
'Ud': 36,
'Dd': 39,
'Td': 42,
'Qad': 45,
'Qid': 48,
'Sxd': 51,
'Spd': 54,
'Ocd': 57,
'Nod': 60,
'Vg': 63,
'Uvg': 66,
'Dvg': 69,
'Tvg': 72,
'Qavg': 75,
'Qivg': 78};


//mapBonus
