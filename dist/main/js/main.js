$(document).ready(() => {
    $('.--js_dropdown').hover(
        function(){
            var isTarget = $(this).find('.--sub_drop')
            $(isTarget).addClass('active');
            var i = 0;
            let callOp = setInterval(function(){
                if(i < 1){
                    $(isTarget).attr('style', `opacity: ${i}`)
                    i += .3;
                }else{
                    $(isTarget).removeAttr('style');
                    $(isTarget).addClass('show');
                    clearInterval(callOp)
                }
            }, 50)
        },
        function(){
            var isTarget = $(this).find('.--sub_drop')
            $(isTarget).removeClass('active show');
        }
    )
})