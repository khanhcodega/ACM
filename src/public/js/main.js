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

    const currentPage = parseInt($('.pagination').attr('current-page'));
    const totalPage = parseInt($('.pagination').attr('total-page'));

    $('.pagination').html(paginationFunction(totalPage, currentPage));
});

function paginationFunction(totalPage, pageNumber) {
    let beforePage = Math.max(pageNumber - 1, 1),
    afterPage = Math.min(pageNumber + 1, totalPage);
    let listTag = '';

    if (pageNumber > 1) {
        listTag += `<li class="prev btn" onclick="paginationFunction(${totalPage}, ${pageNumber - 1})">
        <a href="?page=${pageNumber - 1}"><span>&laquo;</span></a></li>`;
    }

    if (pageNumber > 2) {
        listTag += `<li class="btn" onclick="paginationFunction(${totalPage}, 1)">
         <a href="?page=1"><span>1</span></a></li>`;
        if (pageNumber > 3) {
            listTag += `<li class="dots"><span>...</span></li>`;
        }
    }

    if (pageNumber == totalPage) {
        beforePage = beforePage - 2;
    } else if (pageNumber == totalPage - 1) {
        beforePage = beforePage - 1;
    }

    if (pageNumber == 1) {
        afterPage = afterPage + 2;
    } else if (pageNumber == 2) {
        afterPage = afterPage + 1;
    }

    for (let index = beforePage; index <= afterPage; index++) {
        if (totalPage < index || index < 1) {
            continue;
        }

        let active = pageNumber === index ? 'active' : '';
        listTag += `<li class="btn" onclick="paginationFunction(${totalPage}, ${index})"> <a  class=" ${active}" href="?page=${index}"><span>${index}</span></a></li>`;
    }

    if (pageNumber < totalPage - 1) {
        if (pageNumber < totalPage - 2) {
            listTag += `<li class="dots"><span>...</span></li>`;
        }
        listTag += `<li class="btn" onclick="paginationFunction(${totalPage}, ${totalPage})"> <a href="?page=${totalPage}"><span>${totalPage}</span></a></li>`;
    }

    if (totalPage > pageNumber) {
        listTag += `<li class="next btn" onclick="paginationFunction(${totalPage}, ${pageNumber + 1})">
        <a href="?page=${pageNumber + 1}"><span>&raquo;</span></a></li>`;
    }

    return listTag;
}
