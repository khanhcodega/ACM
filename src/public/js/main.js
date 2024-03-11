$(document).ready(function () {
    var currentUrl = window.location.pathname;
    $('a.navbar-link').each(function () {
        if ($(this).attr('href') === currentUrl) {
            $(this).closest('.navbar-item').addClass('active');
        }
    });

    $('.navbar-menu').click(function () {
        $('.navbar-list').toggleClass('open');

        // console.log(this)
        document.addEventListener('click', function (event) {
            const nav = $('#header');
            if (!nav.is(event.target) && !nav.has(event.target).length) {
                $('.navbar-list').removeClass('open');
            }
        });
    });

    $('[data-order]').each(function () {
        console.log($(this).attr('data-order'));
        if ($(this).attr('data-order') % 2 != 0) {
            $(this).addClass('bg-grl');
        }
    });
});
