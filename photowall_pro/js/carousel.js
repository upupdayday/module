function imgPlay($ct, imgSrc) {
    this.$ct = $ct;
    this.imgSrc = imgSrc;
    this.init();
    this.bind();
}

imgPlay.prototype = {
    init: function() {
        let html1 = '';
        let html2 = '';
        let html3 = '';
        let $ul1 = $('<ul>');
        let $ul2 = $('<ul>');
        let $div = $('<div>');
        for (let i = 0; i < this.imgSrc.length; i++) {
            // html1 += '<li><a href="#"><img src="' + this.imgSrc[i] + '" alt=""></a></li>'
            html1 += '<li style="background-image:url(' + this.imgSrc[i] + ')"></li>'
            if (i === 0) {
                /*a 如果href不为空，点击时默认效果会跳至页面顶部，去掉*/
                html2 += '<li class="active"></li>';
            } else {
                html2 += '<li></li>';
            }
        }
        $ul1.append(html1);
        $ul1.addClass('img-ct clearfix');
        $ul2.append(html2);
        $ul2.addClass('menu');

        html3 = '<a  class="pre" ><</a>';
        $div.append(html3);
        $div.append($ul2);
        html3 = '<a class = "next" >> </a>';
        $div.append(html3);
        $div.addClass('wrap-menu');

        this.$ct.append($ul1);
        this.$ct.append($div);

        // this.$ct.append(html3);

        this.$imgCt = this.$ct.find('.img-ct');
        this.$imgs = this.$ct.find('.img-ct>li');
        /*用窗口的宽设置背景li的宽度*/
        this.imgWidth = $(window).width();
        /*要设置容器的高度*/
        this.$ct.height(this.imgWidth * 9 / 32);
        this.$imgs.width(this.imgWidth);
        this.imgCount = this.$imgs.length;
        this.$menu = this.$ct.find('.menu');
        this.$page = this.$ct.find('.menu>li');
        this.$playPre = this.$ct.find('.pre');
        this.$playNext = this.$ct.find('.next');
        this.imgIndex = 0;
        this.isAnimate = false;

        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())
        this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
        this.$imgCt.css({
            left: -this.imgWidth
        })


    },

    menuSelect: function(event) {
        let target = event.target
        let _this = this;
        /*确认点击在li上*/
        if (target.tagName.toLowerCase() === 'li') {
            /*原生JS对象用$包裹，转为jquery对象*/
            let $target = $(target)
            let cur = $target.index()
            if (cur < _this.imgIndex) {
                _this.playPre(_this.imgIndex - cur)

            } else if (cur > _this.imgIndex) {
                _this.playNext(cur - _this.imgIndex)
            }
        }
    },

    playNext: function(len) {
        let _this = this;
        if (_this.isAnimate) {
            return
        }
        _this.isAnimate = true;

        _this.$imgCt.animate({
                left: '-=' + _this.imgWidth * len
            }, function() {
                _this.imgIndex += len
                if (_this.imgIndex === _this.imgCount) {
                    _this.$imgCt.css({
                        left: -_this.imgWidth
                    })
                    _this.imgIndex = 0
                }

                _this.setPage()
                _this.isAnimate = false /*解锁需要在函数中*/
            })
            /*如在此处解锁，那回调函数没执行完就解锁了，没有起到限制作用*/
            /*isAnimate = false*/
    },

    playPre: function(len) {
        let _this = this;
        if (_this.isAnimate) {
            return
        }
        _this.isAnimate = true;

        _this.$imgCt.animate({
            left: '+=' + _this.imgWidth * len
        }, function() {
            _this.imgIndex -= len;
            if (_this.imgIndex < 0) {
                _this.$imgCt.css({
                    left: -_this.imgWidth * _this.imgCount
                })
                _this.imgIndex = _this.imgCount - 1
            }

            _this.setPage()
            _this.isAnimate = false
        })
    },

    setPage: function() {
        let _this = this;
        _this.$page.removeClass('active')
            .eq(_this.imgIndex).addClass('active')
    },

    bind: function() {
        let _this = this;
        _this.$menu.on('click', function(e) {
            _this.menuSelect(e);
        });
        _this.$playNext.on('click', function() {
            _this.playNext(1)
        });
        _this.$playPre.on('click', function() {
            _this.playPre(1)
        });
    }
}