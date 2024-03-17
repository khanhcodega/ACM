$(document).ready(function (index) {

    $('.btn-type').each(function () {
        $(this).click((event) => {
            const type = $(this).attr('data-type');
            $('.btn-type').removeClass('active');
            $(this).addClass('active');
            $('form').attr('action', `/manager/create?type=${type}`)

            $.ajax({
                url: '',
                type: 'GET',
                data: { type: type },
                success: function (response) {
                    // console.log($(response).find('.pagination').attr('total-page'))
                    

                    $('.crud .contentWrapper').each((index, element) => {
                        initTarea()
                        const correspondingElement = $(response)
                            .find('.contentWrapper')
                            .eq(index);
                        $(element).html(correspondingElement.html());
                        initTarea()
    
                    });                  
                },
                error: function (error) {
                    console.log(error);
                },
            });
        });
    });

    $('.btn-get').each(function () {
        const type = $(this).attr('data-type');
        $(this).click((event) => {
            $('.btn-get').removeClass('active');
            $(this).addClass('active');

            $.ajax({
                url: '',
                type: 'GET',
                data: { type: type },
                success: function (response) {
                    // console.log($(response).find('.pagination').attr('total-page'))
                    
                    $('.crud h3').text($(response).find('.crud h3').text())
                    // console.log()
                    $('.crud .contentWrapper').each((index, element) => {
                        const correspondingElement = $(response)
                            .find('.contentWrapper')
                            .eq(index);
                        $(element).html(correspondingElement.html());
                    });
                    const currentPage = parseInt(
                        $(response).find('.pagination').attr('current-page'),
                    );
                    const totalPage = parseInt(
                        $(response).find('.pagination').attr('total-page'),
                    );
                    $('.pagination').html(
                        paginationFunction(totalPage, currentPage),
                    );
                    const dataType = $(response)
                        .find('thead')
                        .attr('data-type');
                    // console.log(dataType);

                    $('.crud .btn-edit').each((index, element) => {
                        const correspondingElement = $(response)
                            .find('.btn-edit')
                            .eq(index);
                        $(element).attr(
                            'href',
                            correspondingElement.attr('href') +
                            `?type=${dataType}`,
                        );
                    });
                    $('.crud .btn-delete').each((index, element) => {
                        const correspondingElement = $(response)
                            .find('.btn-delete')
                            .eq(index);
                        $(element).attr(
                            'href',
                            correspondingElement.attr('href') +
                            `${dataType}`,
                        );
                        btnDelete()

                    });
                },
                error: function (error) {
                    console.log(error);
                },
            });
        });
    });

    const modal = $('#id01');
    btnDelete()


    $('.modal').click(function (event) {
        if (!$(event.target).closest('.modal-content').length) {
            modal.removeClass('open');
        }
    });

    $('.deletebtn').click((event) => {
        const action = $('.modal-content').attr('action');
    });

    $('.cancelbtn').click((event) => {
        modal.removeClass('open');
    });

    const htmlContent = $('#mytextarea').val();
    const $html = $('<div>').html(htmlContent);
    $html.find('img').each(function () {
        const src = $(this).attr('src');
        $(this).attr('src', 'https://acmjinzai.com/' + src);
    });
    const modifiedHtmlContent = $html.html();
    $('#mytextarea').val(modifiedHtmlContent);

    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const slug = parts.slice(0, -1).join('/');

    if (currentUrl == '/manager/createView') {
        $('.footer').addClass('close-element');
        // $('.header').addClass('close-element');
        $('.contact').addClass('close-element');
    }

    $('.tox').change(function () {
        $('.content-editor').height(
            $('.content-editor').height() + $('.tox .tox-tinymce').height(),
        );
        console.log($('.content-editor').height());
    });

    $('a.navbar-link').each(function () {
        const nav = $(this).attr('href');

        if (nav === currentUrl || nav === slug) {
            $(this).closest('.navbar-item').addClass('active');
        }
    });

    $('.navbar-menu').click(function () {
        $('.navbar-list').toggleClass('open');

        // console.log(this)
        document.addEventListener('click', function (event) {
            const nav = $('.header');
            if (!nav.is(event.target) && !nav.has(event.target).length) {
                $('.navbar-list').removeClass('open');
            }
        });
    });

    $('[data-order]').each(function () {
        // console.log($(this).attr('data-order'));
        if ($(this).attr('data-order') % 2 != 0) {
            $(this).addClass('bg-grl');
        }
    });

    $('.owl-carousel').owlCarousel({
        margin: 10,
        loop: true,
        // autoWidth: true,
        items: 3,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });

    $('.news-wrap-p img').each(function () {
        const currentSrc = $(this).attr('src');
        const addUrl = 'https://acmjinzai.com/';

        if (currentSrc !== undefined && currentSrc !== '') {
            // Thêm chuỗi ajax vào src
            $(this).attr('src', addUrl + currentSrc);
        }
    });





    // const currentPage = parseInt($('.pagination').attr('current-page'));
    // const totalPage = parseInt($('.pagination').attr('total-page'));
    const currentPage = parseInt($('.pagination').attr('current-page'));
    const totalPage = parseInt($('.pagination').attr('total-page'));
    $('.pagination').html(paginationFunction(totalPage, currentPage));

    // Sau khi tạo ra các nút phân trang, gắn sự kiện click vào chúng
    $('.pagination').on('click', 'li.btn', function (event) {
        event.preventDefault();

        const pageNumber = parseInt($(this).find('a').attr('page-number'));
        const dataType = $('.pagination').attr('data-type');
        const url = dataType
            ? `?page=${pageNumber}&type=${dataType}`
            : `?page='${pageNumber}`;

        $.ajax({
            type: 'GET',
            url: '?page=' + pageNumber + '&type=' + dataType,
            success: function (response) {
                $('.contentWrapper').each((index, element) => {
                    const correspondingElement = $(response)
                        .find('.contentWrapper')
                        .eq(index);
                    $(element).html(correspondingElement.html());
                });

                $('.pagination').html(
                    paginationFunction(totalPage, pageNumber),
                );
            },
            error: function (err) {
                console.error('Error:', err);
            },
        });
    });
    initTarea()
    
    function btnDelete() {
        $('.btn-delete').each(function () {
            $(this).click((event) => {
                event.preventDefault();
                modal.addClass('open');
                const id = $(this).attr('href');
                const name = $(this).attr('data-name');
    
                $('.modal-content').attr('action', `/manager/${id}&_method=DELETE`);
                $('.modal-content  p').text(
                    `Bạn có chắc chắn muốn xóa bài viết ${name} không ?`,
                );
            });
        });
    }
});

function initTarea() {

    tinymce.init({
        selector: 'textarea',
        plugins:
            'preview powerpaste casechange searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample advtable table charmap pagebreak nonbreaking anchor advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter permanentpen pageembed linkchecker emoticons export',
        height: '700px',
        toolbar_sticky: true,
        icons: 'thin',
        autosave_restore_when_empty: true,
        content_style: `
            body {
                background: #fff;
            }

            @media (min-width: 840px) {
                html {
                    background: #eceef4;
                    min-height: 100%;
                    padding: 0 .5rem
                }

                body {
                    background-color: #fff;
                    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
                    box-sizing: border-box;
                    margin: 1rem auto 0;
                    max-width: 820px;
                    min-height: calc(100vh - 1rem);
                    padding:4rem 6rem 6rem 6rem
                }
            }
        `,
        toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) =>
            respondWith.string(() =>
                Promise.reject('See docs to implement AI Assistant'),
            ),
    });
}
function paginationFunction(totalPage, pageNumber) {
    let beforePage = Math.max(pageNumber - 1, 1),
        afterPage = Math.min(pageNumber + 1, totalPage);
    let listTag = '';

    if (pageNumber > 1) {
        listTag += `<li class="prev btn" onclick="paginationFunction(${totalPage}, ${pageNumber - 1})">
        <a page-number="${pageNumber - 1}"><span>&laquo;</span></a></li>`;
    }

    if (pageNumber > 2) {
        listTag += `<li class="btn" onclick="paginationFunction(${totalPage}, 1)">
         <a page-number="1"><span>1</span></a></li>`;
        if (pageNumber > 3) {
            listTag += `<li class="dots"><span>...</span></li>`;
        }
    }

    if (totalPage >= 4) {
        if (pageNumber == totalPage) {
            beforePage = Math.max(totalPage - 3, 1);
        } else if (pageNumber == totalPage - 1) {
            beforePage = Math.max(totalPage - 4, 1);
        }
        if (pageNumber == 1) {
            afterPage = Math.min(4, totalPage);
        } else if (pageNumber == 2) {
            afterPage = Math.min(5, totalPage);
        }
    }

    for (let index = beforePage; index <= afterPage; index++) {
        if (totalPage < index || index < 1) {
            continue;
        }

        let active = pageNumber === index ? 'active' : '';
        listTag += `<li class="btn" onclick="paginationFunction(${totalPage}, ${index})"> <a  class=" ${active}" page-number="${index}"><span>${index}</span></a></li>`;
    }

    if (pageNumber < totalPage - 1) {
        if (pageNumber < totalPage - 2) {
            listTag += `<li class="dots"><span>...</span></li>`;
        }
        listTag += `<li class="btn" onclick="paginationFunction(${totalPage}, ${totalPage})"> <a page-number="${totalPage}"><span>${totalPage}</span></a></li>`;
    }

    if (pageNumber < totalPage) {
        listTag += `<li class="next btn" onclick="paginationFunction(${totalPage}, ${pageNumber + 1})">
        <a page-number="${pageNumber + 1}"><span>&raquo;</span></a></li>`;
    }

    return listTag;
}
