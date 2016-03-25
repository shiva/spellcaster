define(function (require) {
    var print = require('print');

    return {
        setupSets: function(callback) {                        
            loadSetData(function(data){
                data.reverse()
                callback(data)
            })
        },

        setupCards: function(sets, callback) {
            loadCardData(function(data) {
                found_cards = []

                if (!sets) {
                    sets = ['OGW']
                }

                sets.forEach(function(item){
                    c = getAllCardsInSet(item, data)
                    if (c) {
                        found_cards = found_cards.concat(c)
                    }    
                })
                
                callback(found_cards)
            })
        },
    };
});

function getAllCardsInSet (setid, sets) {
    var cards = []
    var set = {}
    set = sets[setid]
    if (!set) {
        return null
    }

    set.cards.forEach(function(item, index, theArray) {     
        item.rtype = item.types.join(", ")

        if (item.colors) {
            item.rcolor = item.colors.join(", ")
        }               

        item.setname = set.name
        theArray[index] = item
    })

    return set.cards
}

function getSetByName(set_name, sets) {
    var key
    for (key in sets) {
        s = sets[key]
        if (s.name === set_name) {
            return s
        }
    }

    return null
}

function loadSetData(callback) {
    get_json("http://mtgjson.com/json/SetList.json", callback)
}

function loadCardData(callback){
    get_json("http://mtgjson.com/json/AllSets.json", callback)    
}

function get_json(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        error: function() {
            callback();
        },
        success: function(data) {
            callback(data);
        }
    });
}