define(['jquery', 'carousel', 'gotop', 'imgshow', 'page'], function($, Carousel, Gotop, Imgshow, Page) {


    let p1 = new Imgshow($('.imgShow'));
    let pageselect = new Page({
        ct: $('.page-section'),
        totalLength: 50,
        pageGroup: 5,
        onSelect: p1.start,
        textObj: p1
    });

    function throttle(fn, delay) {
        var timer = null
        return function() {
            var context = this
            clearTimeout(timer)
            timer = setTimeout(function() {
                fn.apply(context, arguments);
            }, delay)
        }
    }

    let $searchInput = $('#img-search');
    let $go = $('#go');
    $go.click(
        throttle(function() {
            console.log($searchInput.val())
            p1.init($('.imgShow'), $searchInput.val());
            pageselect.init();
        }, 200)
    )

    $(window).resize(
        throttle(function() {
            p1.start(pageselect.pageIdx)
        }, 200)
    )

    let topButton = new Gotop($('.ct-go-top'));

    let headimgSrc = ['img/img1.jpg',
        'img/img2.jpg',
        'img/img3.jpg',
        'img/img4.jpg',
        'img/img5.jpg'
    ];
    // // let bgColor = ['#dfdfdc', '#142829', '#2b2e41', '#172838', '#172639'];
    // // let conMsg = [''];
    let ca = new Carousel($('.carousel'), headimgSrc);
});