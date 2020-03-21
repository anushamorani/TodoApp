
$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

setTimeout(function() {
    $('.alert').fadeOut('fast');
}, 3000);
