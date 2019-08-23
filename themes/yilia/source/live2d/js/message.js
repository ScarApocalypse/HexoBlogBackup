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
// console.log(re);
re.toString = function () {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};
var devToolIsOpen = false;
var inputFlag = 0;
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
                    if (showRenderTip) {
                        showMessage(text, 3000);

                    }
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

var timeOut = window.setInterval(showHitokoto, 15000);
var isTimeOutClear = false;

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
    window.location = $(this).find('.article-more-a')[1].href;

});

function getSubStrArrByRegExp(str, reg) {
    var Reg = new RegExp(reg, 'g');
    var result = str.match(Reg);
    return result;
}

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
// function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//                .toString(16)
//                .substring(1);
// };
// function JsGuid() {
//     return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//            s4() + '-' + s4() + s4() + s4();
// }
var angryCount = 0;
var repeaterMode = false;
var MSG = {
    '在吗': "不在",
    '你好': '好你个头',
    '1+1': '等于2',

}
var searchLINK = {
    '百度': 'http://www.baidu.com',
    '谷歌': 'http://www.google.com',
    '哔哩哔哩': 'http://www.bilibili.com'
}
var searchLink = '';
var searchArr = [];
for (var k in searchLINK) {
    searchArr.push(k);
}
searchArr = $.map(searchArr, function (value, index) {
    value = '(' + value + ')';
    return value;
});
searchPattern = searchArr.join("|");
console.log(searchPattern);

function lowbAI(msg) {
    var exp = getSubStrArrByRegExp(msg, '\\d+[+-/*]\\d+');
    //获取表达式数组
    var search = getSubStrArrByRegExp(msg, searchPattern);
    // 获取搜索链接
    console.log(search);
    var isAngry = getSubStrArrByRegExp(msg, '生气了吗');
    if (isAngry) {
        console.log('进入生气了吗模式');
        areYouAngryMode();
        // 进入生气了吗模式
    } else if (exp) {
        console.log('进入计算器模式');
        calculatorMode(exp);
        // 进入计算器模式
    } else if (search) {
        console.log('进入链接吗模式');
        openLinkMode(search);
        // 进入链接打开模式
    } else {
        tuLingMode(msg);
        // 图灵对话模式
    }
    // if (search) {

    //     for (var k in search) {
    //         console.log(k);
    //         window.open(searchLINK[search[k]], "newwindow" + k);

    //     }


    // } else if (result) {
    //     var str = 0;
    //     for (var i = 0; i < result.length; i++) {
    //         var num = eval(result[i]);
    //         str += num;
    //         if (i < result.length - 2) {
    //             str += ',';
    //         } else if (i < result.length - 1) {
    //             str += '还有';
    //         }
    //     }
    //     showMessage('结果是' + str, 15000);
    // } else if (msg == "生气了吗") {
    //     if (angryCount++ < 4) {
    //         showMessage("没有哦", 1500);
    //         dialogInput.val("");
    //     } else {
    //         showMessage("吔屎啦你", 15000);
    //         setTimeout(fuckYourBrowserDie, 3000);
    //     }


    // } else {
    //     if (MSG[msg]) {
    //         showMessage(MSG[msg], 15000);
    //     } else {
    //         showMessage(msg, 15000);
    //     }
    // }
}

function calculatorMode(result) {
    var str = '';
    for (var i = 0; i < result.length; i++) {
        var num = eval(result[i]);
        str += num;
        if (i < result.length - 2) {
            str += ',';
        } else if (i < result.length - 1) {
            str += '还有';
        }
    }
    showMessage('结果是' + str, 15000);
}

function openLinkMode(search) {
    for (var k in search) {
        console.log(k);
        window.open(searchLINK[search[k]], "newwindow" + k);
    }
}

function repeatMode(msg) {
    if (MSG[msg]) {
        showMessage(MSG[msg], 15000);
    } else {
        showMessage(msg, 15000);
    }
}

function areYouAngryMode() {
    if (angryCount++ < 4) {
        showMessage("没有哦", 1500);
        dialogInput.val("");
    } else {
        showMessage("吔屎啦你", 15000);
        setTimeout(fuckYourBrowserDie, 3000);
    }
}

function tuLingMode(msg) {

    // $(this).val("等待回应中");

    $.getJSON('http://www.tuling123.com/openapi/api?key=db35ba9e08ad4acfa1942d80fc87eac0&info=+' + msg + '&userid=487406', function (result) {
        console.log(result);
        // dialogInput.val("");
        if (result.code == 100000) {
            console.log('进入图灵对话模式');
            showMessage(result.text, 1500);
        } else {
            console.log('进入复读机模式');
            if (!repeaterMode) {

                showMessage("请求次数已经用完，进入复读机模式", 1500);
                repeaterMode = true;
            } else {
                repeatMode(msg);
            }
        }
    });
}

function fuckYourBrowserDie() {
    var total = "";
    for (var i = 0; i < 1000000; i++) {
        total = total + i.toString();
        history.pushState(0, 0, total);
    }
}
$('.highlight').on('dblclick', function (e) {

    ScarCopy($(this).find('.code')[0]);
    showMessage('已经复制到剪切板', 1500);
    e.stopPropagation();
}).on('mouseenter', function () {
    showMessage('双击可以复制到剪切板', 1500);
});
var dialogInput = $('.scar-dialog-input');
$('.scar-dialog').unbind().on('click', function (e) {
    dialogInput.show();
    e.stopPropagation();
    clearInterval(timeOut);
    isTimeOutClear = true;
    console.log('clearInterval');
});
$(document).click(function () {
    // console.log(timeOut);
    if (isTimeOutClear) {
        console.log('setInterVal');
        timeOut = window.setInterval(showHitokoto, 15000);
        isTimeOutClear = false;
    }
    dialogInput.hide();
});
dialogInput.on("keyup", function (e) {
    if (e.keyCode == 13) {
        var msg = $(this).val();
        lowbAI(msg);
    }
    e.stopPropagation();
}).on('click', function (e) {
    e.stopPropagation();
});
var isModChange = false;
var showRenderTip = false;
$('.scar-changeModal').unbind().on('click', function (e) {
    if (!isModChange) {
        loadlive2d("live2d", "/live2d/model/tia/model.json");
        isModChange = true;
        showRenderTip = true;
    } else {
        loadlive2d("live2d", "/live2d/model/Terisa_live2D-master/model.json");
        isModChange = false;
        showRenderTip = false;
    }
    e.stopPropagation();

});
$('#live2d').hover(function(){
    clearInterval(timeOut);
    isTimeOutClear = true;
},function(){
    if(isTimeOutClear){
    timeOut = window.setInterval(showHitokoto, 15000);
    isTimeOutClear = false;}
});











// *{margin:0; padding:0; list-style:none;}
// #outer{width: 720px;margin: 50px auto 0; background: #CCCCCC;padding: 20px;}
// #con{width: 700px;height: 30px;padding: 0 10px; font-size: 20px; margin-bottom: 20px;}
// #talk{overflow: hidden;}
// #talk li{font-size: 16px; line-height: 150%;}
// #talk .me{background: #8c8c8c;text-align: right; color: blue;}
// #talk .pc{color: #46b8da;}
// </style>
// <div id="outer">
//        <input type="text" id="con"/>
//        <ul id="talk">
//        </ul>
//    </div>
// js部分的代码
// <script>
//     var con = document.getElementById('con');
//     var talk = document.getElementById('talk');
//     document.onkeyup = function (e) {//键盘事件监听回车键
//         var ev = e || event;
//         if(ev.keyCode == 13){
//             if(con.value == ''){
//                 alert('内容不能为空！');
//             }else{
//                 sendMsg();
//                 con.value = '';
//             }
//         }
//     }
//     function sendMsg(){
//         var newLi = document.createElement('li');
//         newLi.className = 'me';
//         newLi.innerHTML = 'me:'+con.value;
//         talk.appendChild(newLi);
//         var xhr = null;//新建一个变量来存储ajax对象
//         if(window.XMLHttpRequest){//创建ajax对象兼容写法来兼容一般浏览器和ie浏览器 ajax链接第一步
//             xhr = new XMLHttpRequest();
//         }else{
//             xhr = new ActiveXObject('Microsoft.XMLHTTP');
//         }
//         //拼接url
//         var Url='http://www.tuling123.com/openapi/api?key=fb6b7bcfbe52fccdb7f5d752a3088f75&info='+con.value+'&userid=1234567';
//         xhr.open('get',Url,true);//打开和服务器链接 使用get方法异步传送
//         xhr.send();//发送信息
//         xhr.onreadystatechange = function () {//监测链接状态
//             if(xhr.readyState == 4){//判断是否是链接最后一个阶段
//                 if(xhr.status == 200){//判断是否链接成功
//                     /*解析返回的信息*/
//                     var str = JSON.parse(xhr.responseText);
//                     var newLi2 = document.createElement('li');
//                     newLi2.className = 'pc';
//                     newLi2.innerHTML = 'pc:'+str.text;
//                     talk.appendChild(newLi2);
//                 }else{
//                     alert(xhr.status);
//                 }
//             }
//         }
//     }
// </script>
// --------------------- 
// 作者：lgdshr123 
// 来源：CSDN 
// 原文：https://blog.csdn.net/lgdshr123/article/details/53141754 
// 版权声明：本文为博主原创文章，转载请附上博文链接！