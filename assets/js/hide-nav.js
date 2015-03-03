var navbarVisible = true;

$('.navbar-toggle').on('click', function(e) {
    if(navbarVisible) {
	$('#navigation')
	    .removeClass('col-xs-12 col-sm-4 col-lg-3')
	    .addClass('hidden');
	$('#content')
	    .removeClass('col-xs-12 col-sm-8 col-lg-9')
	    .addClass('col-xs-12 col-sm-12 col-lg-12');
	navbarVisible = false;
    } else {
	$('#navigation')
	    .removeClass('hidden')
	    .addClass('col-xs-12 col-sm-4 col-lg-3');
	$('#content')
	    .removeClass('col-xs-12 col-sm-12 col-lg-12')
	    .addClass('col-xs-12 col-sm-8 col-lg-9');
	navbarVisible = true;
    }
});

// reposition menu on tiny screens
var content = $("#main").children()[0];
var navigation = $("#main").children()[1];
var w = $(window).width();

if (w < 768)
    swap_columns();

function swap_columns() {
    var w = $(window).width();
    if (w < 768) {
	$("#main").html(navigation);
	$("#main").append(content);
    } else {
	$("#main").html(content);
	$("#main").append(navigation);
    }
}

$(window).resize(function() {
    swap_columns();
});
