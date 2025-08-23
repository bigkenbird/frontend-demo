export function drawLineOnCanvas(canvas) {
    // 線條寬度
    const lineWidth = 3;
    // 線條兩端圓弧
    const lineCap = 'round';
    // 線條折角圓弧
    const lineJoin = 'round';
    const ctx = canvas.getContext('2d');
    // jpeg不支援透明背景需fill
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const hasTouchEvent = 'ontouchstart' in window;
    const downEvent = hasTouchEvent ? 'touchstart' : 'mousedown';
    const moveEvent = hasTouchEvent ? 'touchmove' : 'mousemove';
    const upEvent = hasTouchEvent ? 'touchend' : 'mouseup';
    let isActive = false;
    //起始點座標
    let x1 = 0;
    let y1 = 0;
    // 終點座標
    let x2 = 0;
    let y2 = 0;
    canvas.addEventListener(downEvent, (e) => {
        isActive = true;
        // 取得起點座標
        x1 = e.offsetX ? e.offsetX : Math.floor(e.touches[0].pageX);
        y1 = e.offsetY ? e.offsetY : Math.floor(e.touches[0].pageY);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
    });
    canvas.addEventListener(moveEvent, (e) => {
        if (!isActive)
            return;
        // 取得移動座標
        x2 = e.offsetX ? e.offsetX : Math.floor(e.touches[0].pageX);
        y2 = e.offsetY ? e.offsetY : Math.floor(e.touches[0].pageY);
        // 開始繪圖
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        // 更新起點座標
        x1 = x2;
        y1 = y2;
    });
    canvas.addEventListener(upEvent, () => {
        isActive = false;
    });
}
