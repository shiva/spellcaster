define(function (require) {
    var print = require('print');
    var model = require('./data');

    var $table = $('#card-table-1'),
        $btnLoad = $('#btn-load-data');        

    var $select = $('#select-sets').selectize({
		valueField: 'code',
		labelField: 'name',
		searchField: ['name']
	});

    var selectize = $select[0].selectize

    $btnLoad.click(function () {
    	model.setupCards(selectize.getValue(), function(cards) {
    		$table.bootstrapTable('load', cards);
    	})
    });



    selectize.load(function(callback) {
    	model.setupSets(callback)
    })
});

