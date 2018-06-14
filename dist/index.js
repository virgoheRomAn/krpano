// 切换krpano场景
function krpanoLoadScene(seceneName) {
    document.getElementById("krpanoSWFObject").call("loadscene('" + seceneName + "')");
}

//krpano调用
function krpanoConsole(msg) {
    console.log(msg);
}

function showEwmFun() {
    $(".pop-ewm-box").fadeIn();
}

function showNavBox() {
    $(".header").addClass("active");
    $(".footer").addClass("active");
}

function showDialogFun(ele) {
    $(ele).fadeIn();
}

$(function () {
    var $tabNav = $(".tab-nav");
    var $tabCont = $(".tab-cont");
    var $footer = $(".footer");
    var $buildBox = $(".building-box");
    /**
     * 加载数据
     */
    $tabNav.find("a").each(function () {
        var id = $(this).attr("href");
        var result = window.buildData[id.split("#")[1]]["intro"];
        $(id).find(".menu-left,.cont").empty();
        result.forEach(function (k, v) {
            $(id).find(".menu-left").append('<a href="#' + k.name + '">' + k.name + '</a>');
            $(id).find(".cont").append('<div class="s-item" id="' + k.name + '">\
                                <label class="build-hxt"><img src="' + k["hxtImg"] + '"><a class="show-building-intro" href="#' + k["introImg"] + '"></a></label>\
                                <label class="build-img"><img src="' + k["mainImg"] + '"></label>\
                            </div>');
        });
        $(id).find(".menu-left a:eq(0)").addClass("active");
        $(id).find(".cont .s-item:eq(0)").addClass("active");
    });

    /**
     * 底部菜单
     * 四项切换
     */
    $footer.find("a").click(function () {
        var index = $(this).parents("li").index();

        if (index === 3) {
            krpanoLoadScene("scene_1");

            $buildBox.removeClass("active");
            $(".build-intro").hide();
        } else if (index === 0) {
            $buildBox.addClass("active");
        } else if (index === 1) {
            krpanoLoadScene("scene_2");

            $buildBox.removeClass("active");
            $(".build-intro").hide();
        } else if (index === 2) {
            $(".house-type").toggle();
            return false;
        }

        $(this).addClass("active").parents("li").siblings().find("a").removeClass("active");
    });


    $(".house-type a").click(function () {
        krpanoLoadScene("scene_home_1");

        $buildBox.removeClass("active");
        $footer.find("li:eq(2) a").addClass("active").parents("li").siblings().find("a").removeClass("active");
        $(".build-intro").hide();
        $(".house-type").hide();
    });

    /**
     * 户型鉴赏菜单切换
     * 高层，洋房，别墅
     */
    $tabNav.find("a").click(function () {
        var id = $(this).attr("href");
        $(this).addClass("active").siblings().removeClass("active");
        $tabCont.find(".item").hide();
        $(id).show();
    });

    /**
     * 户型分类
     * 各类户型
     */
    $(document).on("click touchend", ".menu-left a", function (e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).attr("href");
        $(id).addClass("active").siblings().removeClass("active");
    });

    /**
     * 显示户型详情
     */
    $(document).on("click touchend", ".show-building-intro", function () {
        var id = $(this).attr("href");
        var $intro = $(".build-intro");
        $intro.find("label img").attr("src", id.split("#")[1]);
        $intro.show();
    });
    $(document).on("click touchend", ".back-btn", function () {
        $(".build-intro").hide();
    });

    /**
     * 显示微信二维码
     */
    $(".nav a:eq(1)").click(function () {
        showEwmFun();
    });

    /**
     * 关闭弹窗
     */
    $(document).on("click touchend", ".pop-box", function (e) {
        if (!$(this).hasClass("pop-alert-box")) {
            e.stopPropagation();
            $(this).fadeOut(300);
        }
    });

    $(document).on("click touchend", ".pop-box img", function (e) {
        e.stopPropagation();
    });

    $(document).on("click touchend", ".pop-box a.sure-btn", function (e) {
        e.stopPropagation();
        $(this).parents(".pop-box").fadeOut(300);
    });
});