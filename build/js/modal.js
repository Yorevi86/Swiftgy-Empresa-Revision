$(".switch-links a").click((function(i){i.preventDefault(),$(this).parent().children().removeClass("switch-active"),$(this).addClass("switch-active");var t=$(this).parent().parent().children();t.not(":first").hide(),t.eq($(this).index()+1).show()}));
//# sourceMappingURL=modal.js.map
