function $(id) {
    return document.getElementById(id);
}
var cw, ch, user_image
document.querySelector('.user-image').addEventListener('change', function (e) {
    var fileData = e.target.files[0]
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        //加载图片获取图片真实宽度和高度
        user_image = new Image();
        user_image.onload = function () {
            cw = user_image.width;
            ch = user_image.height;

        };
        user_image.src = data;
    };
    reader.readAsDataURL(fileData);

})
function textToImg() {
    // var len = $('len').value || 30;
    var i = 0;
    // var fontSize = $('fontSize').value || 15;
    var lineLen = $('lineLen').value || 1;
    var lineSize = $('lineSize').value || 1;
    var lineNum = $('lineNum').value || 1;
    var pointSize = $('pointSize').value || 1;
    var points = $('points').value || 1;
    var mycolor = $('mycolor').value || 1;
    var cc = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999', 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff',]
    mycolor = cc[mycolor]
    // var fontWeight = $('fontWeight').value || 'normal';
    // var txt = $("txt").value;
    var canvas = $('canvas');
    // if (txt == '') {
    //     alert('請輸入文字');
    //     $("txt").focus();
    // }
    // if (len > txt.length) {
    //     len = txt.length;
    // }
    canvas.width = cw;
    canvas.height = ch;
    var context = canvas.getContext('2d');
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = $("backcolor").innerHTML;
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = $("fontcolor").innerHTML;
    // context.strokeStyle = $("fontcolor").innerHTML;

    context.beginPath();
    context.drawImage(user_image, 0, 0);
    context.closePath();
    context.stroke();
    n = parseInt(parseInt((cw + ch) / 4) * lineNum)
    n2 = parseInt(parseInt((cw + ch) / 2) * points)
    for (var i = 0; i < n2; i++) {
        x = random(0, canvas.width);
        y = random(0, canvas.height);
        context.lineWidth = pointSize;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1); //隨機畫點
        context.closePath();
        context.stroke();
    }
    for (var i = 0; i < n; i++) {
        x = random(0, canvas.width);
        y = random(0, canvas.height);
        context.lineWidth = lineSize;
        context.beginPath();
        context.moveTo(x, y);
        var lineToX = x + random(- random(0, canvas.width / 4) / lineLen, random(0, canvas.width / 4) / lineLen)
        var lineToY = y + random(- random(0, canvas.width / 4) / lineLen, random(0, canvas.width / 4) / lineLen)
        context.lineTo(lineToX, lineToY); //隨機畫線
        // context.lineTo(lineToX + random(- random(0, canvas.width / 4) / lineLen, random(0, canvas.width / 4) / lineLen), lineToY + random(- random(0, canvas.width / 4) / lineLen, random(0, canvas.width / 4) / lineLen)); //隨機畫線
        context.strokeStyle = `#${mycolor}`;
        context.closePath();
        context.stroke();
    }

    // context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    // context.textBaseline = 'top';
    canvas.style.display = 'none';
    // function fillTxt(text) {
    //     while (text.length > len) {
    //         var txtLine = text.substring(0, len);
    //         text = text.substring(len);
    //         var r = random(- 1, 1) / random(50, 100);
    //         context.rotate(r); //隨機旋轉每一行文字
    //         context.fillText(txtLine, 10, 5 + fontSize * (3 / 2) * i++, canvas.width);
    //         context.rotate(r * -1);
    //     }
    //     context.fillText(text, 0, fontSize * (3 / 2) * i, canvas.width);
    // }
    // var txtArray = txt.split("\n");
    // for (var j = 0; j < 100; j++) {
    //     fillTxt(txtArray[j]);
    //     context.fillText('\n', 0, fontSize * (3 / 2) * i++, canvas.width);
    // }
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var img = $("img");
    img.src = canvas.toDataURL("image/png");
}
// function changeColor(name) {
//     var c = $(name + "_c");
//     var ctx = c.getContext("2d");
//     var red = $(name + "_red");
//     var green = $(name + "_green");
//     var blue = $(name + "_blue");
//     ctx.fillStyle = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
//     $(name).innerHTML = ctx.fillStyle;
//     ctx.fillRect(0, 0, 100, 100);
//     //$('canvas').getContext('2d').fillStyle=$("fontcolor").innerHTML;
// }
function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}