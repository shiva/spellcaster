define(function (require) {
    return {
        load: function (url, callback) {
            ret = null;
            $.getJSON(url, function(data) {
                callback(data)
            })
        },
    }
})

