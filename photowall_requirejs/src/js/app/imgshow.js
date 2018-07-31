define(['jquery'], function() {
    function ImgShow($ct) {
        this.init($ct, '');
        this.bind();
        //this.start();
    }

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

    ImgShow.prototype = {
        init: function($ct, keyword) {
            // console.log('111');
            // console.log(keyword)
            this.curPage = 1;
            this.perPageCount = 48;
            this.$mainNode = $ct;
            // console.log(this.$mainNode)
            //this.mainNodeWidth = parseFloat(this.$mainNode.width());
            this.rowTotalWidth = 0;
            this.rowBaseHeight = 200;
            this.rowList = [];
            this.$searchInput = $('#img-search');
            this.keyword = keyword;
            // console.log(this.keyword);
            // console.log('222');
            this.isDataArrive = true;

            // this.$mainNode.html('');
            this.start(this.curPage);
        },

        bind: function() {
            let _this = this;
            $(window).resize(
                throttle(function() {
                    console.log('resize~~~~')
                    _this.render(_this);
                }, 200)
            )

        },

        start: function(page) {
            // console.log(this.$mainNode)
            //this.$mainNode.html('');
            if (!this.isDataArrive) {
                return;
            }
            if (this.isDataArrive) {
                // this.mainNodeWidth = parseFloat(this.$mainNode.width());
                this.getData(this.keyword, page, this.render);
                this.isDataArrive = false
            }
        },

        getData: function(keyword, page, callBack) {
            let _this = this;
            $.ajax({
                url: 'https://pixabay.com/api/',
                dataType: 'jsonp',
                data: {
                    key: '8521696-ba89fe471d953cc300d05b61a',
                    q: keyword,
                    image_type: 'photo',
                    page: page,
                    per_page: _this.perPageCount
                }
            }).done(function(ret) {
                if (ret) {
                    _this.curPageData = ret;
                    callBack(_this)
                        //curPage++;
                } else {
                    console.log("errors")
                }
            })
        },

        render: function(photoObj) {
            //需传入创建的对象PhotoShow，否则此处的this为window
            let _this = photoObj;
            // console.log('render~~~~')
            // console.log(_this)
            //在data到达后，render时跳转到搜索栏位置，再清空mainnode
            let positionY = $('.inputSearch').position().top;
            // console.log('------:' + positionY);
            $(window).scrollTop(positionY);


            _this.$mainNode.html('');
            _this.mainNodeWidth = parseFloat(_this.$mainNode.width());
            // console.log('-----:' + _this.mainNodeWidth)
            _this.isDataArrive = true
            _this.curPageData.hits.forEach(function(imgInfo) {
                // console.log(imgInfo)
                let rowHeight;
                imgInfo.ratio = imgInfo.webformatWidth / imgInfo.webformatHeight;
                imgInfo.imgWidthShow = imgInfo.ratio * _this.rowBaseHeight;
                if (imgInfo.imgWidthShow + _this.rowTotalWidth <= _this.mainNodeWidth) {
                    _this.rowList.push(imgInfo);
                    _this.rowTotalWidth += imgInfo.imgWidthShow;
                } else {
                    rowHeight = (_this.mainNodeWidth / _this.rowTotalWidth) * _this.rowBaseHeight;
                    _this.layOut(rowHeight);
                    _this.rowList = [imgInfo];
                    _this.rowTotalWidth = imgInfo.imgWidthShow;
                }
            });
        },

        layOut: function(rowHeight) {
            let _this = this;
            _this.rowList.forEach(function(imgInfo) {
                // console.log(imgInfo.tag)
                let $figureNode = $('<figure></figure>');
                let $imglink = $('<a>');
                let $imgNode = $('<img >');
                // $imgNode.src = imgInfo.webformatURL;
                $imgNode.attr({
                    src: imgInfo.webformatURL,
                    alt: imgInfo.tags,
                    title: imgInfo.tags
                });
                $imglink.attr({
                    href: imgInfo.pageURL,
                    target: "view-window"
                });
                $imglink.append($imgNode);
                $figureNode.append($imglink);
                $figureNode.css('width', rowHeight * imgInfo.ratio);
                $figureNode.css('height', rowHeight);
                _this.$mainNode.append($figureNode);
            })
        }
    }

    return ImgShow;
});