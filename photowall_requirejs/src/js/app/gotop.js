define(['jquery'], function() {
    function goTop($ct) {
        this.ct = $ct;
        this.target = $(
            '<div class="box">\
             <span class = "top text"> Top </span>\
             <span class = "icon-font top icon">&#xe62c;</span>\
             </div>');
        this.init();
    }

    goTop.prototype = {
        init: function() {
            this.createNode();
            this.bindEvent();
        },

        createNode: function() {
            let cur = this;
            cur.target.hide()
            cur.ct.append(cur.target);
        },

        bindEvent: function() {
            let cur = this;
            $(window).scroll(function() {
                if ($(window).scrollTop() > 300) {
                    cur.target.show()
                } else {
                    cur.target.hide()
                }
            })

            cur.target.click(function() {
                $(window).scrollTop(0);
            })

            /*jquery.hover()绑定两个函数，同时指定hover及离开的效果*/
            cur.target.hover(
                function() {
                    $(this).find('.top')
                        .css('background-color', '#f10215')
                    $(this).find('.text')
                        .css('opacity', '1')
                        .animate({
                            right: '80px',
                        }, 'normal');
                },
                function() {
                    $(this).find('.top')
                        .css('background-color', '#7a6e6e')
                    $(this).find('.text')
                        .animate({
                            right: '-80px',
                        }, 'normal')
                        .css('opacity', '0')
                }
            )
        }
    }

    return goTop;
});