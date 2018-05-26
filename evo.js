<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/synaptic/1.1.4/synaptic.min.js"></script>
<script>
var c1D = null;
var c2D = null;

var img1 = null;
var img2 = null;

var modColor = function(r, g, b) {
    var r = Math.floor(Math.random() * 8);
    if (r >= 4) r = Math.random() * 256;
    r -= 4;
    if (r >= 2) g = Math.random() * 256;
    r -= 2;
    if (r >= 1) b = Math.random() * 256;
    return [r, g, b];
}

var randomiseImage = function(i, m) {
    var d = i.data;
    var r = null;
    for (var y = 0; y < 128; y++) {
        for (var x = 0; x < 128; x++) {
            if (Math.random() >= (1 / m)) continue;
            r = modColor(d[(x + y * 128) * 3], d[(x + y * 128) * 3 + 1], d[(x + y * 128) * 3 + 2]);
            for (let j = 0; j < 3; j++) d[(x + y * 128) * 3 + j] = r[j];
        }
    }
};

var disp = function() {
    c1D.putImageData(img1, 0, 0);
    c2D.putImageData(img2, 0, 0);
};

document.addEventListener("load", function() {
    c1D = document.getElementById("c1").getContext("2d");
    img1 = c1D.createImageData(128, 128);
    randomiseImage(img1, 1);
    c2D = document.getElementById("c2").getContext("2d");
    img2 = c2D.createImageData(128, 128);
    randomiseImage(img2, 1);
    disp();
});

function update(isFirst) {
    var dF = (isFirst ? img1 : img2).data;
    var dT = (isFirst ? img2 : img1).data;
    for (var i = 0; i < dF.length; i++) dT[i] = dF[i];
    randomiseImage(isFirst ? img2 : img1, 40);
    disp();
};
</script>
</head>
<body>
    <canvas id="c1" height=128 width=128></canvas>
    <canvas id="c2" height=128 width=128></canvas>
<br>
    <button onclick="update(true)">Option #1</button>
    <button onclick="update(false)">Option #2</button>
</body>
</html>
