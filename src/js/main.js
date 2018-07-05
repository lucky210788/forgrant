$(function () {
    $('.for-scroll').on('click', function (e) {
        e.preventDefault();
        var l = $('#' + $(this).attr('data-scrol'));
        $('html, body').animate({
            scrollTop: l.offset().top
        }, 1200);
    });

    $(".textarea-block textarea").keyup(function (e) {
        $(this).height(15);
        $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
    });

    $('.rail-select').on('click', function (e) {
        var a = $(this).find('.select-side');
        a.toggleClass('rotate');
    });
});