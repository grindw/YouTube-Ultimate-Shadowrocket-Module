/*
 YouTube 强制最高画质：4K + HDR + 60fps
 Shadowrocket JS Script
*/

let body = JSON.parse($response.body);

// 强制优先高质量 HDR
if (body?.streamingData?.adaptiveFormats) {
    body.streamingData.adaptiveFormats.forEach(format => {
        if (format.qualityLabel) {
            format.targetQuality = "hd2160";  // 4K
        }
        if (format.fps) {
            format.fps = 60; // 强制 60fps
        }
        // 启用 HDR 标记
        if (format.colorInfo) {
            format.colorInfo.transferCharacteristics = "HDR";
        }
    });
}

// 通用画质锁定
if (body?.playbackQuality) {
    body.playbackQuality = {
        "max": "hd2160",
        "min": "hd720"
    };
}

$done({ body: JSON.stringify(body) });