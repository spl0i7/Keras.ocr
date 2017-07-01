let paint = false;
let clickX = [];
let clickY = [];
let context = document.getElementById('ocrCanvas').getContext('2d');
let canvas = $('#ocrCanvas');
canvas.mousedown(function (e){
    paint = true;
    addClick(e.offsetX, e.offsetY);
    redraw();
});
canvas.attr({
    "width": 256,
    "height": 256
});    
canvas.mousemove(function(e){
    if(paint){
        addClick(e.offsetX, e.offsetY);
        redraw();
    }
});
canvas.mouseup(cleanArray);
canvas.mouseleave(cleanArray);    


function redraw() {
    context.strokeStyle = '#fff';
    context.lineJoin = 'round';
    context.lineWidth = 12;
    context.beginPath();
    for(let i = 1 ; i < clickX.length; ++i){
        context.moveTo(clickX[i-1], clickY[i-1]);
        context.lineTo(clickX[i], clickY[i]);
    }
    context.closePath();
    context.stroke();
    }

function addClick(X,Y){
    clickX.push(X);
    clickY.push(Y);
}

function cleanArray() {
    paint = false;
    clickX = [];
    clickY = [];
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width(), canvas.height());
}
function predict(){
    $.ajax({
        url : '/predict',
        type: 'POST',
        data : JSON.stringify({
            image : canvas[0].toDataURL('image/jpeg')
        }),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
        success:function(data){
            if(data.success){
                $('.prediction').text(data.result);
            }
            else {
                $('.prediction').text('???');
            }
        }
    });
}