$('.switch-links a').click(function(event){
    event.preventDefault();
    $(this).parent().children().removeClass('switch-active');
    $(this).addClass('switch-active');
    var $main = $(this).parent().parent().children();
    $main.not(':first').hide();
    $main.eq($(this).index()+1).show();
});