/* kartu.js : membuat video loop (6 detik, 9:16, pas untuk Story/Status) kartu undangan langsung di browser.
   Kalau browser tidak bisa merekam video, otomatis jadi gambar PNG. Dipakai oleh index.html dan share.html.
   Tidak butuh library atau server. */
(function () {
  'use strict';

  var INK = '#2c4a7c', SOFT = '#4f6b9c', BLUE_DEEP = '#6aaae6', SKY1 = '#bfe0f8', SKY2 = '#e8f4fd';
  var WHITE = '#ffffff', BUTTER = '#ffe29a', PINK = '#ffc9dc', LILAC = '#d6c8f5', MINT = '#c4ecd9', EDGE = '#c3dff6';
  var FD = '"Fredoka","Trebuchet MS",system-ui,sans-serif';
  var FB = '"Nunito",system-ui,-apple-system,"Segoe UI",sans-serif';
  var W = 440, OUT_W = 1080, S = OUT_W / W, MIN_H = 1920 / S;
  var BASE_NAME = 'undangan-tiup-lilin';

  var ICONS = {
  "candle": "<ellipse cx=\"24\" cy=\"42\" rx=\"14\" ry=\"3.5\" fill=\"#fff\"/><rect x=\"17\" y=\"21\" width=\"14\" height=\"21\" rx=\"3\" fill=\"#fff\"/><path d=\"M17 29 l14 -4 M17 36 l14 -4\" stroke-width=\"2\" opacity=\".5\"/>",
  "tv": "<path d=\"M18 12 L13 5 M30 12 L35 5\"/><rect x=\"5\" y=\"12\" width=\"38\" height=\"27\" rx=\"7\" fill=\"#9ccbf2\"/><rect x=\"10\" y=\"17\" width=\"28\" height=\"17\" rx=\"4\" fill=\"#fff\" stroke-width=\"2\"/><polygon points=\"21,21 21,30 29,25.5\" fill=\"#ffc9dc\" stroke-width=\"2\"/><path d=\"M14 39 v4 M34 39 v4\"/>",
  "game": "<rect x=\"4\" y=\"14\" width=\"40\" height=\"23\" rx=\"11.5\" fill=\"#d6c8f5\"/><rect x=\"11\" y=\"23\" width=\"12\" height=\"4.5\" rx=\"2\" fill=\"#fff\" stroke-width=\"2\"/><rect x=\"14.8\" y=\"19.5\" width=\"4.5\" height=\"12\" rx=\"2\" fill=\"#fff\" stroke-width=\"2\"/><circle cx=\"31\" cy=\"23\" r=\"2.8\" fill=\"#ffc9dc\" stroke-width=\"2\"/><circle cx=\"37\" cy=\"28.5\" r=\"2.8\" fill=\"#ffe29a\" stroke-width=\"2\"/>",
  "bear": "<circle cx=\"11\" cy=\"12\" r=\"6.5\" fill=\"#ffe29a\"/><circle cx=\"37\" cy=\"12\" r=\"6.5\" fill=\"#ffe29a\"/><circle cx=\"24\" cy=\"26\" r=\"17\" fill=\"#ffe29a\"/><ellipse cx=\"24\" cy=\"32\" rx=\"7.5\" ry=\"5.5\" fill=\"#fff\" stroke-width=\"2\"/><circle cx=\"17.5\" cy=\"24\" r=\"1.8\" fill=\"#2c4a7c\" stroke=\"none\"/><circle cx=\"30.5\" cy=\"24\" r=\"1.8\" fill=\"#2c4a7c\" stroke=\"none\"/><ellipse cx=\"24\" cy=\"29.5\" rx=\"2.6\" ry=\"1.9\" fill=\"#2c4a7c\" stroke=\"none\"/><circle cx=\"13\" cy=\"31\" r=\"3\" fill=\"#ffc9dc\" stroke=\"none\" opacity=\".9\"/><circle cx=\"35\" cy=\"31\" r=\"3\" fill=\"#ffc9dc\" stroke=\"none\" opacity=\".9\"/>",
  "corn": "<ellipse cx=\"24\" cy=\"21\" rx=\"9.5\" ry=\"16.5\" fill=\"#ffe29a\"/><g fill=\"#fff\" stroke=\"none\" opacity=\".75\"><circle cx=\"20\" cy=\"11\" r=\"1.8\"/><circle cx=\"28\" cy=\"11\" r=\"1.8\"/><circle cx=\"18\" cy=\"18\" r=\"1.8\"/><circle cx=\"24\" cy=\"18\" r=\"1.8\"/><circle cx=\"30\" cy=\"18\" r=\"1.8\"/><circle cx=\"18\" cy=\"25\" r=\"1.8\"/><circle cx=\"24\" cy=\"25\" r=\"1.8\"/><circle cx=\"30\" cy=\"25\" r=\"1.8\"/><circle cx=\"21\" cy=\"32\" r=\"1.8\"/><circle cx=\"27\" cy=\"32\" r=\"1.8\"/></g><path d=\"M24 45 C9 41 7 29 13 21 C17 31 21 37 24 45Z\" fill=\"#c4ecd9\"/><path d=\"M24 45 C39 41 41 29 35 21 C31 31 27 37 24 45Z\" fill=\"#c4ecd9\"/>",
  "marsh": "<path d=\"M6 43 L35 12\" stroke=\"#b98a5a\" stroke-width=\"3.5\"/><rect x=\"25\" y=\"4\" width=\"18\" height=\"14\" rx=\"5.5\" fill=\"#fff\" transform=\"rotate(-8 34 11)\"/><rect x=\"15\" y=\"17\" width=\"18\" height=\"14\" rx=\"5.5\" fill=\"#ffe6ee\" transform=\"rotate(-8 24 24)\"/><circle cx=\"21\" cy=\"24\" r=\"1.3\" fill=\"#2c4a7c\" stroke=\"none\"/><circle cx=\"28\" cy=\"23\" r=\"1.3\" fill=\"#2c4a7c\" stroke=\"none\"/>",
  "cup": "<rect x=\"27\" y=\"2\" width=\"5\" height=\"18\" rx=\"2.5\" fill=\"#ffc9dc\" transform=\"rotate(14 29 11)\"/><rect x=\"9\" y=\"17\" width=\"30\" height=\"6\" rx=\"3\" fill=\"#fff\"/><path d=\"M12 23 H36 L33 43 a2 2 0 0 1 -2 1.8 H17 a2 2 0 0 1 -2 -1.8Z\" fill=\"#9ccbf2\"/><path d=\"M15 30 H33\" stroke=\"#fff\" stroke-width=\"2.5\" opacity=\".7\"/><rect x=\"18\" y=\"33\" width=\"6\" height=\"6\" rx=\"2\" fill=\"#fff\" stroke-width=\"2\" transform=\"rotate(-10 21 36)\"/><circle cx=\"29\" cy=\"37\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/>",
  "snack": "<circle cx=\"14\" cy=\"17\" r=\"6.5\" fill=\"#ffe29a\"/><circle cx=\"24\" cy=\"12\" r=\"7.5\" fill=\"#ffe29a\"/><circle cx=\"34\" cy=\"17\" r=\"6.5\" fill=\"#ffe29a\"/><path d=\"M9 21 H39 L36 44 H12Z\" fill=\"#fff\"/><path d=\"M17 21 L16 44 M24 21 V44 M31 21 L32 44\" stroke=\"#ffc9dc\" stroke-width=\"4.5\"/><path d=\"M9 21 H39 L36 44 H12Z\" fill=\"none\"/>",
  "shirt": "<path d=\"M16 6 L5 13 L10 24 L16 21 V43 H32 V21 L38 24 L43 13 L32 6 C30 11 18 11 16 6Z\" fill=\"#fff\"/><path d=\"M20 8 C22 12 26 12 28 8\" stroke-width=\"2\"/><path d=\"M24 28 c-2.2 -2.4 -5 .2 -2.8 2.8 l2.8 2.4 l2.8 -2.4 c2.2 -2.6 -.6 -5.2 -2.8 -2.8z\" fill=\"#ffc9dc\" stroke-width=\"2\"/>",
  "jeans": "<path d=\"M13 5 H35 L38 44 H26.5 L24 21 L21.5 44 H10 Z\" fill=\"#8fc3f0\"/><path d=\"M13 11 H35\" stroke-width=\"2\"/><path d=\"M15.5 15 q4.5 5 8 0\" stroke-width=\"2\"/><path d=\"M24 11 V21\" stroke-width=\"2\" stroke-dasharray=\"2 3\"/><path d=\"M14 40 H21 M27 40 H34\" stroke-width=\"2\" stroke-dasharray=\"2 3\" opacity=\".6\"/>",
  "star": "<polygon points=\"24,3 29.5,17.5 45,18.3 32.9,28 37,43 24,34.5 11,43 15.1,28 3,18.3 18.5,17.5\" fill=\"#ffe29a\"/><circle cx=\"19.5\" cy=\"23\" r=\"1.9\" fill=\"#2c4a7c\" stroke=\"none\"/><circle cx=\"28.5\" cy=\"23\" r=\"1.9\" fill=\"#2c4a7c\" stroke=\"none\"/><path d=\"M21 27.5 q3 3 6 0\" stroke-width=\"2\"/><circle cx=\"16\" cy=\"27\" r=\"2.3\" fill=\"#ffc9dc\" stroke=\"none\"/><circle cx=\"32\" cy=\"27\" r=\"2.3\" fill=\"#ffc9dc\" stroke=\"none\"/>"
};

  function fnt(weight, size, fam) { return weight + ' ' + size + 'px ' + fam; }

  /* ---------- helper gambar ---------- */
  function rr(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function box(c, x, y, w, h, r, fill, shadow, off) {
    if (shadow) { rr(c, x, y + off, w, h, r); c.fillStyle = shadow; c.fill(); }
    rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill();
  }
  function txt(c, s, x, y, font, color, align) {
    c.font = font; c.fillStyle = color; c.textAlign = align || 'left'; c.textBaseline = 'alphabetic'; c.fillText(s, x, y);
  }
  function wrap(c, s, font, maxW) {
    c.font = font;
    var words = s.split(' '), out = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (c.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else { cur = t; }
    });
    if (cur) out.push(cur);
    return out;
  }
  /* teks huruf besar dengan jarak antar huruf (tanpa bergantung pada ctx.letterSpacing) */
  function spaced(c, s, x, y, font, color, sp, center) {
    c.font = font; c.fillStyle = color; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    var total = 0, i;
    for (i = 0; i < s.length; i++) total += c.measureText(s[i]).width + sp;
    total -= sp;
    var cx = center ? x - total / 2 : x;
    for (i = 0; i < s.length; i++) { c.fillText(s[i], cx, y); cx += c.measureText(s[i]).width + sp; }
    return total;
  }
  /* t = detik, ph = fase (0..1) supaya tiap bintang berkelip di waktu berbeda */
  function sparkle(c, x, y, s0, color, t, ph) {
    var u = 0.5 - 0.5 * Math.cos(2 * Math.PI * (t / 3 + ph)), s = s0 * (0.5 + 0.5 * u);
    c.save(); c.globalAlpha = 0.45 + 0.55 * u;
    c.translate(x, y); c.rotate(25 * u * Math.PI / 180); x = 0; y = 0;
    var p = [[50, 0], [62, 38], [100, 50], [62, 62], [50, 100], [38, 62], [0, 50], [38, 38]];
    c.beginPath();
    p.forEach(function (q, i) { var px = x + q[0] / 100 * s - s / 2, py = y + q[1] / 100 * s - s / 2; if (i) c.lineTo(px, py); else c.moveTo(px, py); });
    c.closePath(); c.fillStyle = color; c.fill(); c.restore();
  }
  var NOW = 0;
  /* api lilin berkedip (ikon lilin digambar tanpa api, apinya digambar di sini) */
  function flame(c, x, y, s, t) {
    var f = s / 48, ph = ((x * 0.013 + y * 0.007) % 1 + 1) % 1;
    var fl = Math.sin(2 * Math.PI * (t / 1.5 + ph)) + 0.5 * Math.sin(2 * Math.PI * (t / 0.75 + ph * 2));
    c.save(); c.translate(x, y); c.scale(f, f);
    c.beginPath(); c.arc(24, 13, 11 + 2 * fl, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255,226,154,' + (0.28 + 0.1 * fl) + ')'; c.fill();
    c.translate(24, 21); c.rotate(fl * 2.5 * Math.PI / 180); c.scale(1 - 0.05 * fl, 1 + 0.1 * fl); c.translate(-24, -21);
    c.beginPath(); c.moveTo(24, 5); c.bezierCurveTo(30, 12, 31, 17, 24, 21); c.bezierCurveTo(17, 17, 18, 12, 24, 5); c.closePath();
    c.fillStyle = BUTTER; c.fill(); c.strokeStyle = INK; c.lineWidth = 2.5; c.lineJoin = 'round'; c.stroke();
    c.restore();
  }
  function ico(c, ic, name, x, y, s) {
    if (ic[name]) c.drawImage(ic[name], x, y, s, s);
    if (name === 'candle') flame(c, x, y, s, NOW);
  }

  /* konfeti jatuh pelan, posisinya berulang tiap 6 detik supaya video menyambung mulus */
  var CONF = (function () {
    var cols = [PINK, BUTTER, MINT, LILAC, '#9ccbf2', WHITE], a = [], i, r = 7;
    function rnd() { r = (r * 16807) % 2147483647; return r / 2147483647; }
    for (i = 0; i < 22; i++) a.push({ x: rnd(), ph: rnd(), cyc: rnd() < 0.5 ? 1 : 2, w: 4 + rnd() * 3, col: cols[i % cols.length], amp: 6 + rnd() * 10, sw: rnd(), rot: rnd() * 6.28, round: rnd() < 0.3 });
    return a;
  })();
  function confetti(c, H, vw, t) {
    CONF.forEach(function (p) {
      var u = (p.ph + p.cyc * t / 6) % 1, y = -14 + u * (H + 28);
      var x = -(vw - W) / 2 + p.x * vw + Math.sin(2 * Math.PI * (t / 3 + p.sw)) * p.amp;
      c.save(); c.translate(x, y); c.rotate(p.rot + 2 * Math.PI * p.cyc * t / 6 * 1.5); c.globalAlpha = 0.9; c.fillStyle = p.col;
      if (p.round) { c.beginPath(); c.arc(0, 0, p.w / 2, 0, Math.PI * 2); c.fill(); } else { rr(c, -p.w / 2, -p.w, p.w, p.w * 2, 1.5); c.fill(); }
      c.restore();
    });
  }

  /* chip berlapis (flow) : mengembalikan tinggi total */
  function chips(c, ic, list, x, y, w, bg, draw) {
    var cx = x, cy = y, h = 26, gap = 5, f = fnt(700, 12.5, FB);
    list.forEach(function (it) {
      c.font = f;
      var cw = c.measureText(it[1]).width + 37;
      if (cx > x && cx + cw > x + w) { cx = x; cy += h + gap; }
      if (draw) {
        rr(c, cx, cy, cw, h, 13); c.fillStyle = bg; c.fill();
        ico(c, ic, it[0], cx + 4, cy + 3, 20);
        txt(c, it[1], cx + 28, cy + 17.5, f, INK);
      }
      cx += cw + gap;
    });
    return cy + h - y;
  }

  /* kotak putih berisi judul dan baris ikon + teks */
  function rowsBox(c, ic, x, y, w, title, rows, forceH, draw) {
    var pad = 12, circ = 38, tw = w - pad * 2 - circ - 8, ty = y + pad + 14;
    var cy = y + pad + 26, i, total = pad + 26;
    if (draw) txt(c, title, x + pad, ty, fnt(700, 16, FD), INK);
    rows.forEach(function (r) {
      var sub = wrap(c, r.sub, fnt(600, 12, FB), tw);
      var rh = Math.max(circ, 16 + sub.length * 15);
      if (draw) {
        c.beginPath(); c.arc(x + pad + circ / 2, cy + circ / 2, circ / 2, 0, Math.PI * 2); c.fillStyle = r.bg; c.fill();
        ico(c, ic, r.icon, x + pad + 7, cy + 7, 24);
        txt(c, r.title, x + pad + circ + 8, cy + 13, fnt(700, 13, FB), INK);
        for (i = 0; i < sub.length; i++) txt(c, sub[i], x + pad + circ + 8, cy + 28 + i * 15, fnt(600, 12, FB), SOFT);
      }
      cy += rh + 8; total += rh + 8;
    });
    return total - 8 + pad;
  }

  /* ---------- seluruh poster ---------- */
  function paint(c, H, ic, g, topExtra, t, vw) {
    NOW = t; vw = vw || W;
    var X0 = 12, CW = 416, PAD = 18, IX = X0 + PAD, IW = CW - PAD * 2, cardY = 22;
    var cardH = H - cardY - 30, y, i;

    var bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, SKY1); bg.addColorStop(0.6, SKY2); bg.addColorStop(1, SKY2);
    c.fillStyle = bg; c.fillRect(-2 * W, 0, 5 * W, H);

    var cg = c.createLinearGradient(0, cardY, 0, cardY + cardH);
    cg.addColorStop(0, '#d5ebfb'); cg.addColorStop(1, '#eef7fe');
    box(c, X0, cardY, CW, cardH, 32, cg, EDGE, 8);

    /* bunting (dipotong mengikuti sudut kartu) */
    c.save(); rr(c, X0, cardY, CW, cardH, 32); c.clip();
    var sway = -1.2 * Math.cos(2 * Math.PI * t / 6) * Math.PI / 180;
    c.translate(X0 + CW / 2, cardY - 2); c.rotate(sway); c.translate(-(X0 + CW / 2), -(cardY - 2));
    c.translate(X0, cardY - 2); c.scale(CW / 600, CW / 600);
    c.beginPath(); c.moveTo(0, 6); c.quadraticCurveTo(300, 70, 600, 6);
    c.strokeStyle = SOFT; c.lineWidth = 2.5; c.lineCap = 'round'; c.stroke();
    [[42, 17, PINK], [102, 26, BUTTER], [162, 32, MINT], [222, 36, LILAC], [282, 37, WHITE], [342, 36, PINK], [402, 32, BUTTER], [462, 26, MINT], [522, 17, LILAC]].forEach(function (t) {
      c.beginPath(); c.moveTo(t[0], t[1]); c.lineTo(t[0] + 36, t[1]); c.lineTo(t[0] + 18, t[1] + 35); c.closePath();
      c.fillStyle = t[2]; c.fill(); c.strokeStyle = INK; c.lineWidth = 2.5; c.lineJoin = 'round'; c.stroke();
    });
    c.restore();
    var bottomBunting = cardY - 2 + 80 * CW / 600;

    /* bintang kecil dekoratif */
    sparkle(c, X0 + 9, bottomBunting + 16, 12, WHITE, t, 0);
    sparkle(c, X0 + CW - 74, bottomBunting + 40, 16, BUTTER, t, 0.5);
    sparkle(c, X0 + 8, bottomBunting + 150, 10, BUTTER, t, 0.25);
    sparkle(c, X0 + CW - 8, bottomBunting + 250, 12, WHITE, t, 0.75);
    sparkle(c, X0 + 8, bottomBunting + 440, 11, BUTTER, t, 0.4);

    /* header */
    y = bottomBunting + 10 + topExtra;
    spaced(c, 'UNDANGAN ULANG TAHUN', IX, y + 10, fnt(700, 11, FB), BLUE_DEEP, 1.76);
    var l1 = y + 10 + 12 + 34, l2 = l1 + 46, h1 = fnt(700, 37, FD);
    txt(c, 'Tiup Lilin di', IX, l1, h1, INK);
    c.font = h1;
    var pre = c.measureText('Bawah ').width, bw = c.measureText('Bintang').width;
    txt(c, 'Bawah', IX, l2, h1, INK);
    c.save(); c.translate(IX + pre - 5 + (bw + 10) / 2, l2 - 15); c.rotate((-2.5 + Math.sin(2 * Math.PI * t / 3 + 1)) * Math.PI / 180);
    box(c, -(bw + 10) / 2, -22, bw + 10, 44, 14, BUTTER, '#ffd36a', 4);
    c.restore();
    txt(c, 'Bintang', IX + pre, l2, h1, INK);
    var hp = 0.5 - 0.5 * Math.cos(2 * Math.PI * t / 3);
    c.save(); c.translate(IX + IW - 28, l1 - 6 - 9 * hp); c.rotate((-6 + 12 * hp) * Math.PI / 180);
    ico(c, ic, 'star', -26, -26, 52); c.restore();
    var sub = wrap(c, 'Tria, Mama, dan Papa merayakan ulang tahun bareng keluarga.', fnt(600, 14, FB), IW);
    var sy = l2 + 24;
    sub.forEach(function (s, k) { txt(c, s, IX, sy + k * 20, fnt(600, 14, FB), SOFT); });
    y = sy + (sub.length - 1) * 20 + 10 + g;

    /* tanggal, jam, tempat */
    var calW = 96, calH = 100, calX = IX + 4, rx = calX + calW + 22, rw = IX + IW - rx;
    var place = wrap(c, 'Kala Cemara, Greenforest Bandung', fnt(700, 15, FB), rw);
    var addr = wrap(c, 'Jl. Sersan Bajuri No.102, Cihideung, Parongpong, Kabupaten Bandung Barat', fnt(600, 12.5, FB), rw);
    var hR = 30 + place.length * 19 + 4 + addr.length * 17, hW = Math.max(calH, hR) + 8;
    c.save(); c.translate(calX + calW / 2, y + 4 + calH / 2); c.rotate((-3 + 1.6 * Math.sin(2 * Math.PI * t / 3)) * Math.PI / 180);
    box(c, -calW / 2, -calH / 2, calW, calH, 18, WHITE, EDGE, 5);
    c.save(); rr(c, -calW / 2, -calH / 2, calW, calH, 18); c.clip(); c.fillStyle = PINK; c.fillRect(-calW / 2, -calH / 2, calW, 22); c.restore();
    spaced(c, 'SABTU', 0, -calH / 2 + 15, fnt(700, 11, FB), INK, 1.76, true);
    txt(c, '24', 0, -calH / 2 + 22 + 48, fnt(700, 48, FD), INK, 'center');
    spaced(c, 'OKTOBER 2026', 0, calH / 2 - 9, fnt(700, 10, FB), SOFT, 1, true);
    c.restore();
    var ry = y + 4 + (hW - 8 - hR) / 2;
    txt(c, '15.00 WIB', rx, ry + 24, fnt(700, 24, FD), INK);
    c.font = fnt(700, 24, FD); var tw = c.measureText('15.00 WIB ').width;
    txt(c, 'sampai malam', rx + tw + 2, ry + 24, fnt(700, 13, FB), SOFT);
    place.forEach(function (s, k) { txt(c, s, rx, ry + 30 + 15 + k * 19, fnt(700, 15, FB), INK); });
    addr.forEach(function (s, k) { txt(c, s, rx, ry + 30 + place.length * 19 + 4 + 13 + k * 17, fnt(600, 12.5, FB), SOFT); });
    y += hW + g;

    /* tiga tanggal ulang tahun */
    var bdW = (IW - 20) / 3, bdH = 92;
    [['Tria', '20 Okt', PINK, '#ffacc8'], ['Mama', '3 Okt', MINT, '#9edcc0'], ['Papa', '24 Okt', LILAC, '#b8a6ea']].forEach(function (b, k) {
      var bx = IX + k * (bdW + 10), u = ((t % 3) - k * 0.3) / 0.8, hop = u > 0 && u < 1 ? -7 * Math.sin(Math.PI * u) : 0;
      c.save(); c.translate(0, hop);
      box(c, bx, y, bdW, bdH, 18, b[2], b[3], 4);
      ico(c, ic, 'candle', bx + bdW / 2 - 17, y + 8, 34);
      txt(c, b[0], bx + bdW / 2, y + 62, fnt(700, 18, FD), INK, 'center');
      txt(c, b[1], bx + bdW / 2, y + 80, fnt(700, 13, FB), INK, 'center');
      c.restore();
    });
    y += bdH + 4 + g;

    /* dress code + snack */
    var gw = (IW - 10) / 2;
    var dress = [
      { icon: 'shirt', bg: '#e8f4fd', title: 'Atasan putih', sub: 'kaos, kemeja, blus' },
      { icon: 'jeans', bg: '#d3e8fa', title: 'Bawahan jeans', sub: 'biru muda sampai tua' }];
    var snack = [
      { icon: 'snack', bg: '#e8f4fd', title: 'Snack', sub: 'Cireng, kentang goreng, sosis, dan lainnya' },
      { icon: 'cup', bg: '#d3e8fa', title: 'Minuman', sub: 'Jus, kopi, mojito, dan lainnya' }];
    var gh = Math.max(rowsBox(c, ic, 0, 0, gw, '', dress, 0, false), rowsBox(c, ic, 0, 0, gw, '', snack, 0, false));
    box(c, IX, y, gw, gh, 22, WHITE, EDGE, 5); rowsBox(c, ic, IX, y, gw, 'Dress code', dress, gh, true);
    box(c, IX + gw + 10, y, gw, gh, 22, WHITE, EDGE, 5); rowsBox(c, ic, IX + gw + 10, y, gw, 'Snack dan minuman', snack, gh, true);
    y += gh + 5 + g;

    /* acara sore + malam */
    var lw = (IW - 24 - 12) * 1.4 / 2.4, nw = IW - 24 - 12 - lw, p = 12;
    var sore = [['candle', 'Tiup lilin'], ['tv', 'Nonton'], ['game', 'Main games'], ['bear', 'Mainan anak']];
    var malam = [['corn', 'Bakar jagung'], ['marsh', 'Marshmallow']];
    var lh = 22 + chips(c, ic, sore, 0, 0, lw - 4, '', false);
    var nh = 10 + 22 + chips(c, ic, malam, 0, 0, nw - 20, '', false) + 10;
    var ph = Math.max(lh, nh) + p * 2;
    box(c, IX, y, IW, ph, 22, WHITE, EDGE, 5);
    txt(c, 'Sore', IX + p, y + p + 14, fnt(700, 16, FD), INK);
    c.font = fnt(700, 16, FD); var sw = c.measureText('Sore ').width;
    txt(c, 'mulai 15.00', IX + p + sw + 2, y + p + 14, fnt(700, 12, FB), SOFT);
    chips(c, ic, sore, IX + p, y + p + 22, lw - 4, SKY2, true);
    var ng = c.createLinearGradient(0, y + p, 0, y + ph - p); ng.addColorStop(0, '#bcd8f6'); ng.addColorStop(1, '#d8cdf3');
    var nx = IX + p + lw + 12;
    box(c, nx, y + p, nw, ph - p * 2, 16, ng);
    txt(c, 'Malam', nx + 10, y + p + 10 + 14, fnt(700, 16, FD), INK);
    chips(c, ic, malam, nx + 10, y + p + 10 + 22, nw - 20, 'rgba(255,255,255,.75)', true);
    sparkle(c, nx + nw - 16, y + p + 17, 11, WHITE, t, 0.1);
    sparkle(c, nx + nw - 14, y + ph - p - 9, 8, WHITE, t, 0.6);
    y += ph + 5 + g;

    /* penutup */
    var fl = wrap(c, 'Kakak, kakak ipar, dan para keponakan, ditunggu ya!', fnt(700, 17, FB), IW - 56);
    fl.forEach(function (s, k) { txt(c, s, IX, y + 14 + k * 22, fnt(700, 17, FB), INK); });
    var fy = y + 14 + (fl.length - 1) * 22 + 22;
    txt(c, 'Kabari Tria kalau bisa datang.', IX, fy, fnt(600, 13.5, FB), SOFT);
    var fh = 0.5 - 0.5 * Math.cos(2 * Math.PI * t / 3);
    c.save(); c.translate(IX + IW - 22, y + 30 - 8 * fh); c.rotate((6 - 12 * fh) * Math.PI / 180);
    ico(c, ic, 'star', -22, -22, 44); c.restore();
    confetti(c, H, vw, t);
    return fy + 4 + PAD;   /* bawah isi kartu */
  }

  /* ---------- pembuat PNG ---------- */
  function loadIcon(name) {
    return new Promise(function (res) {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="192" height="192" fill="none" stroke="' + INK +
        '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + '</svg>';
      var im = new Image();
      im.onload = function () { res(im); };
      im.onerror = function () { res(null); };
      im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }
  function loadFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var specs = [fnt(700, 20, '"Fredoka"'), fnt(700, 14, '"Nunito"'), fnt(600, 14, '"Nunito"')];
    var all = Promise.all(specs.map(function (s) { return document.fonts.load(s, 'Aa').catch(function () {}); }));
    return Promise.race([all, new Promise(function (r) { setTimeout(r, 4000); })]);
  }

  /* ---------- siapkan tata letak (sekali saja) ---------- */
  var prep = null;
  function prepare() {
    if (prep) return prep;
    prep = Promise.all([loadFonts()].concat(Object.keys(ICONS).map(loadIcon))).then(function (r) {
      var ic = {}; Object.keys(ICONS).forEach(function (k, i) { ic[k] = r[i + 1]; });
      /* ukur dulu supaya isi pasti muat, lalu sebar sisa ruang ke jarak antar bagian */
      var m = document.createElement('canvas').getContext('2d');
      var base = 14, need = paint(m, 3000, ic, base, 0, 0) + 30;
      /* kalau isi lebih tinggi dari 9:16 (misalnya font cadangan lebih lebar), seluruh kartu dikecilkan supaya tetap 9:16 */
      var H = Math.max(MIN_H, need), k = need > MIN_H ? MIN_H / need : 1;
      var extra = H - need, g = base + Math.min(extra / 6, 18), left = extra - (g - base) * 6;
      return { ic: ic, H: H, k: k, g: g, left: left };
    });
    prep.catch(function () { prep = null; });
    return prep;
  }
  function drawFrame(cv, P, t) {
    var c = cv.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
    var s = cv.width / W;
    c.scale(s * P.k, s * P.k);
    if (P.k < 1) c.translate((W / P.k - W) / 2, 0);
    paint(c, P.H, P.ic, P.g, Math.max(0, P.left) / 2, t, W / P.k);
  }

  /* ---------- gambar PNG (cadangan) ---------- */
  function makeImage() {
    return prepare().then(function (P) {
      var cv = document.createElement('canvas'); cv.width = OUT_W; cv.height = Math.round(MIN_H * S);
      drawFrame(cv, P, 1.5);
      return new Promise(function (res, rej) {
        cv.toBlob(function (b) { b ? res({ blob: b, kind: 'image', type: 'image/png', name: BASE_NAME + '.png' }) : rej(new Error('toBlob gagal')); }, 'image/png');
      });
    });
  }

  /* ---------- video loop ---------- */
  var DUR = 6, VID_W = 720;
  function pickType() {
    if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported || !HTMLCanvasElement.prototype.captureStream) return null;
    var list = ['video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
    for (var i = 0; i < list.length; i++) { if (MediaRecorder.isTypeSupported(list[i])) return list[i]; }
    return null;
  }
  function makeVideo(type) {
    return prepare().then(function (P) {
      var cv = document.createElement('canvas'); cv.width = VID_W; cv.height = Math.round(VID_W * 16 / 9);
      var stream = cv.captureStream(30), chunks = [], done = false;
      var rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 4000000 });
      var base = type.split(';')[0];
      return new Promise(function (res, rej) {
        function finish() { if (done) return; done = true; try { rec.stop(); } catch (e) {} }
        rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
        rec.onerror = function (e) { rej(e.error || new Error('rekam gagal')); };
        rec.onstop = function () {
          stream.getTracks().forEach(function (t) { t.stop(); });
          var b = new Blob(chunks, { type: base });
          if (!b.size) { rej(new Error('video kosong')); return; }
          res({ blob: b, kind: 'video', type: base, name: BASE_NAME + (base === 'video/mp4' ? '.mp4' : '.webm') });
        };
        var t0 = null;
        function frame(now) {
          if (done) return;
          if (t0 === null) t0 = now;
          var t = (now - t0) / 1000;
          if (t >= DUR) { drawFrame(cv, P, 0); setTimeout(finish, 120); return; }
          drawFrame(cv, P, t);
          requestAnimationFrame(frame);
        }
        drawFrame(cv, P, 0);
        rec.start();
        requestAnimationFrame(frame);
        setTimeout(finish, (DUR + 10) * 1000);   /* jaga-jaga kalau tab di latar belakang */
      });
    });
  }

  var cache = null;
  function make() {
    if (cache) return cache;
    var type = pickType();
    cache = (type ? makeVideo(type).catch(function () { return makeImage(); }) : makeImage());
    cache.catch(function () { cache = null; });
    return cache;
  }

  /* ---------- aksi ---------- */
  function save() {
    return make().then(function (r) {
      var a = document.createElement('a'), u = URL.createObjectURL(r.blob);
      a.href = u; a.download = r.name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
      return 'saved';
    });
  }
  /* hasil: 'shared' | 'saved' | 'cancel' */
  function share(text) {
    return make().then(function (r) {
      var f;
      try { f = new File([r.blob], r.name, { type: r.type }); } catch (e) { f = null; }
      if (f && navigator.canShare && navigator.canShare({ files: [f] })) {
        return navigator.share({ files: [f], title: 'Tiup Lilin di Bawah Bintang', text: text || '' })
          .then(function () { return 'shared'; }, function (err) { return err && err.name === 'AbortError' ? 'cancel' : save(); });
      }
      return save();
    });
  }

  window.Kartu = { make: make, save: save, share: share, DURATION: DUR };
})();
