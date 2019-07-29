function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function () {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};
var devToolIsOpen = false;
$(document).on("keyup", function (event) {
    console.log(event.keyCode);
    if (event.keyCode == 123) {
        showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
        if (!devToolIsOpen) {
            devToolIsOpen = true;
        } else {
            devToolIsOpen = false;
        }

    }
});

$('.header-smart-menu').find('a').eq(0).on('click', function () {
    scarInputText = $('.search-ipt').val();
    scarInputText = scarInputText.slice(1);
    console.log(scarInputText);
    if (scarInputText) {
        showMessage('正在查看标签为<span style="color:#0099cc;">「 ' + scarInputText + ' 」</span>的文章', 5000);
    } else {
        showMessage('正在查看所有文章', 5000);
    }
});
$('.article-tag-list-item').find('.js-tag').on('click', function () {
    if ($(this).text() == '崩坏3') {
        showMessage('难道你也是空中劈叉的清洁工?', 5000);
    } else {
        showMessage('正在查看标签为<span style="color:#0099cc;">「 ' + $(this).text() + ' 」</span>的文章', 5000);
    }

});
// $('.article-tag-list-item').on('mouseenter',function(){
//     var tagText=$.trim($(this).text());

//     console.log(tagText);
//     hideMessage(3000);
//     showMessage('要察看有关'+tagText+"的文章吗", 5000);

// });

$('.search-li').on('mouseenter', function (e) {
    console.log(1);
    var tagText = $.trim($(this).text());
    console.log(tagText);
    showMessage('要察看有关' + tagText + "的文章吗", 5000);
    event.stopPropagation();
});
$(document).on('copy', function () {
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
});

function initTips() {
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result) {
            $.each(result.mouseover, function (index, tips) {
                $(tips.selector).mouseover(function () {
                    var text = tips.text;
                    if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.renderTip({
                        text: $(this).text()
                    });
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips) {
                $(tips.selector).click(function () {
                    var text = tips.text;
                    if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.renderTip({
                        text: $(this).text()
                    });
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function () {
    var text;

    if (document.referrer == '') {
        console.log(1);
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        // text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        text = '欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        // var now = (new Date()).getHours();
        // if (now > 23 || now <= 5) {
        //     text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
        // } else if (now > 5 && now <= 7) {
        //     text = '早上好！一日之计在于晨，美好的一天就要开始了！';
        // } else if (now > 7 && now <= 11) {
        //     text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        // } else if (now > 11 && now <= 14) {
        //     text = '中午了，工作了一个上午，现在是午餐时间！';
        // } else if (now > 14 && now <= 17) {
        //     text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        // } else if (now > 17 && now <= 19) {
        //     text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
        // } else if (now > 19 && now <= 21) {
        //     text = '晚上好，今天过得怎么样？';
        // } else if (now > 21 && now <= 23) {
        //     text = '已经这么晚了呀，早点休息吧，晚安~~';
        // } else {
        //     text = '嗨~ 快来逗我玩吧！';
        // }

        // var domain = referrer.hostname.split('.')[1];
        // if (domain == 'baidu') {
        //     text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        // }else if (domain == 'so') {
        //     text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        // }else if (domain == 'google') {
        //     text = '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        // }
    } else {
        console.log(2);
        var location = window.location.href.split('/').length;
        // if (window.location.href == `${home_Path}`)
        if (location <= 4) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了！';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        } else {

            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>' + '<br>右下角可以察看目录';
        }
    }
    showMessage(text, 5000);
})();

window.setInterval(showHitokoto, 15000);

function showHitokoto() {
    $.getJSON('https://sslapi.hitokoto.cn/', function (result) {
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout) {
    if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout) {
    $('.message').stop().css('opacity', 1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d() {
    $('.hide-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    })
}
initLive2d();
$('.article').hover(function () {
    // console.log(1);
    var location = window.location.href.split('/').length;
    if (location <= 4) {

        var title = $(this).find('.article-title').text();
        // console.log(title);
        var text = '双击阅读<span style="color:#0099cc;">「 ' + title + ' 」</span>';
        showMessage(text, 1500);

    }
    $(this).css({
        'background': 'rgba(255,255,255,1)'
    });
}, function () {
    // console.log(2);
    var location = window.location.href.split('/').length;

    $(this).css({
        'background': 'rgba(255,255,255,.75)'
    });


}).on('dblclick', function () {
    console.log(1);
    window.location = $(this).find('.article-more-a')[0].href;

});

function ScarCopy(obj) {
    var text = obj;
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        alert("none");
    }
    document.execCommand('Copy', 'false', null);
}



$('.highlight').on('dblclick', function (e) {

    ScarCopy($(this).find('.code')[0]);
    showMessage('已经复制到剪切板', 1500);
    e.stopPropagation();
}).on('mouseenter', function () {
    showMessage('双击可以复制到剪切板', 1500);
});
