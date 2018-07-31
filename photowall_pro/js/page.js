function Pagenition(opt) {
    this.init(opt);
}

Pagenition.prototype = {
    init: function(opt) {
        if (opt) {
            $.extend(this, opt);
        }
        this.ct.html('');
        this.pagesPerGroup = Math.ceil(this.totalLength / this.pageGroup);
        this.curPageGroup = 1;
        this.render();
        this.bind();
    },

    render: function() {
        this.ct.hide();
        let $ul = $('<ul>');
        $ul.addClass('pagination');
        let html = '<li class="pre">&laquo;</li>';
        for (let i = (this.curPageGroup - 1) * this.pagesPerGroup + 1; i < this.curPageGroup * this.pagesPerGroup + 1; i++) {
            if ((this.curPageGroup - 1) * this.pagesPerGroup + 1 === i) {
                html += '<li class="pages active" data-page=' + i + '>' + i + '</li>';
            } else {
                html += '<li class="pages" data-page=' + i + '>' + i + '</li>';
            }
        }
        html += '<li class="next">&raquo;</li>';
        $ul.append(html);
        this.ct.append($ul);
        this.pageIdx = 0;
    },

    bind: function() {
        let _this = this;

        $(window).scroll(function() {
            if ($(window).scrollTop() > 150) {
                _this.ct.show();
            }
        })

        let $pages = _this.ct.find('li.pages');
        $pages.bind('click', function() {
            $pages.removeClass('active');
            _this.pageIdx = $pages.index($(this));
            $(this).addClass('active');
			/*使用传入的对象做上下文*/
            _this.onSelect.call(_this.textObj, parseInt($(this).attr('data-page')));
        })

        let $next = _this.ct.find('.next');
        $next.bind('click', function() {
            $(window).scrollTop(0);
            let curPageNum = parseInt($($pages[_this.pageIdx]).attr('data-page'))
                /*翻到下一页，需重新渲染标签号*/
            if (0 === curPageNum % _this.pagesPerGroup) {
                if (curPageNum < _this.totalLength) {
                    /*传入的对象为上下文*/
                    _this.onSelect.call(_this.textObj, curPageNum + 1);
                    _this.curPageGroup++;
                    for (let i = (_this.curPageGroup - 1) * _this.pagesPerGroup + 1, j = 0; j < _this.pagesPerGroup; i++, j++) {
                        $($pages[j]).html(i).attr('data-page', i);
                    }
                    $pages.removeClass('active');
                    $($pages[0]).addClass('active');
                    _this.pageIdx = 0;
                } else if (curPageNum === _this.totalLength) {
                    return;
                }
            } else {
                /*传入的对象为上下文*/
                _this.onSelect.call(_this.textObj, curPageNum + 1);
                _this.pageIdx++;
                console.log('2222:' + _this.pageIdx)
                $pages.removeClass('active');
                $($pages[_this.pageIdx]).addClass('active');
            }

        })

        let $pre = _this.ct.find('.pre');
        $pre.bind('click', function() {
            $(window).scrollTop(0);
            let curPageNum = parseInt($($pages[_this.pageIdx]).attr('data-page'))

            if (1 === curPageNum % _this.pagesPerGroup) {
                if (curPageNum > 1) {
                    _this.onSelect.call(p1, curPageNum - 1);
                    _this.curPageGroup--;
                    for (let i = (_this.curPageGroup - 1) * _this.pagesPerGroup + 1, j = 0; j < _this.pagesPerGroup; i++, j++) {
                        $($pages[j]).html(i).attr('data-page', i);
                    }
                    $pages.removeClass('active');
                    $($pages[_this.pagesPerGroup - 1]).addClass('active');
                    _this.pageIdx = _this.pagesPerGroup - 1;

                } else if (curPageNum === 1) {
                    return;
                }

            } else {
                /*传入的对象为上下文*/
                _this.onSelect.call(_this.textObj, curPageNum - 1);
                // if ()
                _this.pageIdx--;
                $pages.removeClass('active');
                $($pages[_this.pageIdx]).addClass('active');
            }

        })
    }

}