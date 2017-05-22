$(document).ready(function () {
    $('.js-trigger').each(function () {
        $(this).on('click', function () {
            $(this).toggleClass('open')
                .siblings('.js-nav').toggleClass('open');
        });
    });
});