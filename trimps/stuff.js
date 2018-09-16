
var latestMouseMove = Date.now();

var secondsSinceLatestMouseMove = function(){
    var now = Date.now();
    return (now - latestMouseMove ) / 1000;
};


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
var selectorContains = function( selector, text ){
    var content = selectorContent( selector );
    return content && content.indexOf( text ) > -1;
}

var andThen = function( next, delay ){
    var after = function(){

        if (pauseAutomation || secondsSinceLatestMouseMove < 10){
            andThen(next);
        } else {
            next();
        }
    };
    setTimeout( after, delay || 50 );
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
        buyWithLimit('Warpstation',(zoneNumber && zoneNumber < 210) ? 200 : 260) ||
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
              // (getTimeToFill() > 28.2 && buyWithLimit('Nursery',650))   || 
              // (getTimeToFill() > 28.2 && buyWithLimit('Nursery',600))   || 
/*
*/
        click('Gym');

    upgradeWarpStation();

    andThen( allocateWorkers );
}

var lastStation = 0;
var nextStationDelayMinutes = 5;
nextStationDelayMinutes = 2;
nextStationDelayMinutes = 1;

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

    // if ( !(  click('Explorer') || click('Trainer') || click('Magmamancer') ) ){
    if ( !(  click('Explorer') || buyWithLimit('Trainer', 1300) || click('Magmamancer') ) ){
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


var zoneStartTime = Date.now();
var zoneNumber = 0

var secondsInZone = function(){
    return (Date.now() - zoneStartTime)/ 1000;
};

var isZone = () => {
    var worldName = document.querySelector( '#worldName' );
    return worldName && (worldName.textContent == 'Zone' || worldName.textContent.indexOf('Spire') > -1);
};

var updateWorldInfo = () => {
    if ( isZone() ){
        var worldNumber = document.querySelector( '#worldNumber' );
        var number = parseInt(worldNumber && worldNumber.textContent, 10);

        if (number && number != zoneNumber){
            zoneNumber = number;
            zoneStartTime = Date.now();
        }
    }
    setTimeout(updateWorldInfo, 1000);
};


//var runMap = function(){}
mapsPaused = false;
var runTheMap = function(){
    updateWorldInfo();

    // don't do any map stuff if the mouse is moving
    var now = Date.now();
    if ( ( now - latestMouseMove ) < 10000 ||  mapsPaused ){
        setTimeout( runTheMap, mapDelay );
        return;
    }

    var worldNumber = document.querySelector( '#worldNumber' );
    var is200 = worldNumber && worldNumber.textContent == '200';
    var is229 = worldNumber && worldNumber.textContent == '229';


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
    if ( !isMapList && isZone() && getWorldNumber() > 151 || ((getWorldNumber() % 20) === 19)){

        var selector = '#mapBonus';
        var mapBonus = document.querySelector( selector );

        if ( mapBonus && 
             mapBonus.offsetParent &&
             mapBonus.textContent === '' ) {

            // TODO clic the abandon soliders button if it's one of the special zones
            clickSelector( '#mapsBtn:not(.shrinkBtnText) #mapsBtnText' );
         
        }
        console.log( mapBonus.textContent )
    }

    setTimeout( function(){
        var mapLevel = document.querySelector('#mapLevelInput');
        var existingMaps = 0;
        if(mapLevel && mapLevel.value){
            var maps = document.querySelectorAll('.thingOwned.mapLevel');
            maps.forEach((map) => {
                if (map.textContent === 'Level ' + mapLevel.value){
                    existingMaps += 1;
                }
            });
        }

        var createButton = document.querySelector('#mapCreateBtn');
        if ( existingMaps > 2 ){
            clickSelector( '#selectMapBtn' );
        } else if ( createButton && createButton.offsetParent ){
            setTimeout( function(){

                // clickSelector('#mapLevelContainer .incrementBtn');
                clickSelector('#mapCreateBtn');
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
        target = 2;

        if ( owned && owned < target ){
            clickSelector('#equipmentHere #' + equipment + '.thingColorCanAfford');
        }
//Dagger Numeral
    });

    setTimeout( buySomeEquipment, 10000 );
};


var clearMaps = () => {
    var maps = document.querySelectorAll('.thingOwned.mapLevel');
    maps.forEach((map) => {
        map.click();

        clickSelector('#recycleMapBtn');
    });

}

var allowSetFormation = true;
var setFormationFunc = () => {
    if(allowSetFormation && document.querySelector('#formation0.formationStateEnabled')){
        clickSelector('#formation4');
    }

    setTimeout( setFormationFunc, 60 * 1000 );
}


MAP_FOREVER = '.settingBtn0';
MAP_ITEMS = '.settingBtn2';
MAP_ANY = '.settingBtn3';

TOGGLE_REPEAT = '#togglerepeatUntil';


// Click the button until 
var setRepeatUntilFunc = function(text){
    if (!selectorContains( TOGGLE_REPEAT, 'Repeat')){
        return false;
    }
    for(var i=0;i<6;++i){
        if (!selectorContains( TOGGLE_REPEAT, text)){
            clickSelector(TOGGLE_REPEAT);
        }
    }
    return true;
};

var isOmnipotrimp = () => {
    return selectorContains('#badGuyName', 'Omnipotrimp');
}

var isCorruptedCell = () => {
    return !! document.querySelector('#badGuyName .Corruption');
}
var isVoidMap = () => {
    return !!document.querySelector('.voidCell');
}

var MINUTES_OF_FARMING = 40;
MINUTES_OF_FARMING = 15;

var ignoreZone = -1;

var suppressItems = false;

var magmaMode = false;

var START_ANY = 231;
var START_FARMING = 299;
var REALLY_FARM = 320;

var updateRepeatSetting = () => {

    if ( !zoneNumber || zoneNumber === ignoreZone ){
    // } else if (secondsInZone() > 4 * 60 * 60) {
        // stuck in zone?
    
    } else if ( zoneNumber === 300 ||zoneNumber === 299 ||zoneNumber === 199 || zoneNumber === 200 ){
        // SPIRE

        // double dmg
        clickSelector('#formation2');

        var secondsOfFarming = MINUTES_OF_FARMING * 60;
        if (zoneNumber >= 299 ){
            // farm muchly for second spire
            secondsOfFarming = 60 * 60 * 8;
        }

        if (isZone() && (zoneNumber >= 299)) {
            clickSelector('#formation1');
        } else {
            // Double Damage + Farm
            clickSelector('#formation2');
        }


        if (secondsInZone() > secondsOfFarming) {
            // Scrying + back to world
            setRepeatUntilFunc('Any');
        } else {
            // Double Damage + Farm
            setRepeatUntilFunc('Forever');
        }

    //     setRepeatUntilFunc('Forever');
    // } else if ( zoneNumber === 228 || zoneNumber === 229 ){
    //} else if ( zoneNumber === 199 || 
    //            zoneNumber === 200 || 
    //            zoneNumber >= 228){
    } else if ( zoneNumber < START_ANY && ! suppressItems ){
        setRepeatUntilFunc('Items');
    } else if (zoneNumber > START_FARMING){

        var secondsOfFarming = MINUTES_OF_FARMING * 60;
        // secondsOfFarming = 4 * 60 * 60;
        if (zoneNumber > REALLY_FARM){
            secondsOfFarming = 40 * 60;
        } else if (zoneNumber === 299){
            secondsOfFarming = 4 * 60 * 60;
        }

        var farmOverrides = {};
        farmOverrides[299] = 60 * 60 * 4;
        farmOverrides[300] = 60 * 60 * 4;
        // farmOverrides[229] = 60 * 60 * 4;
        secondsOfFarming = farmOverrides[zoneNumber] || secondsOfFarming;
        var minutesOfFarming = secondsOfFarming * 60;
        var minutesInZone = secondsInZone() * 60;

        var stuckAfterFarming = minutesInZone > minutesOfFarming + 30 * 60;

        if (isZone() && (zoneNumber % 100) != 0) {
            // if (stuckAfterFarming && (isOmnipotrimp() || isCorruptedCell())){
            // }
            if (false){
                // Health
                clickSelector('#formation1');
            } else {
                // Scrying
                clickSelector('#formation4');
            }
        } else {
            // Double Damage + Farm
            clickSelector('#formation2');
        }

        // MAGMA
        if (secondsInZone() > secondsOfFarming) {
            // Scrying + back to world
            setRepeatUntilFunc('Any');
        } else {
            // Double Damage + Farm
            setRepeatUntilFunc('Forever');
        }
    } else if (zoneNumber > 298){
        setRepeatUntilFunc('Any');

        if (isZone()) {
            // scrying
            clickSelector('#formation4');
        }else {
            // double dmg
            clickSelector('#formation2');
        }

    } else {
        setRepeatUntilFunc('Any');

        // scrying
        clickSelector('#formation4');
    }

    // andThen( updateRepeatSetting, 30 * 1000 );
    andThen( updateRepeatSetting, 1 * 1000 );
};

var getFuelInfo = function() {
    $('#generatorFuelOwned').textContent
};



//andThen


setFormationFunc()
//buyUpgrades()
buyBuildings()
buySomeEquipment()
runTheMap()
updateWorldInfo();
updateRepeatSetting();


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

// ArtisanistryOwned
// ArtisanistryPrice


