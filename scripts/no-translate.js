/*
 禁止自动翻译 + 隐藏翻译按钮
 Shadowrocket JS Script
*/

let data = JSON.parse($response.body);

// ✅ 删除自动翻译设置
if (data?.captions) {
    delete data.captions.translationLanguages;
    delete data.captions.defaultAudioTrackIndex;
}

// ✅ 删除字幕中的“自动翻译”
if (data?.playerOverlays?.playerOverlayRenderer?.decoratedPlayerBarRenderer) {
    try {
        let menu = data.playerOverlays.playerOverlayRenderer
            .decoratedPlayerBarRenderer.decoratedPlayerBarRenderer
            .buttonRenderer;
        if (menu?.menuRequest) {
            delete menu.menuRequest;
        }
    } catch (e) {}
}

// ✅ 删除视频面板里的翻译按钮
function removeTranslate(obj) {
    if (!obj) return;
    if (typeof obj === "object") {
        for (let k in obj) {
            if (/translate/i.test(k)) {
                delete obj[k];
            } else {
                removeTranslate(obj[k]);
            }
        }
    }
}
removeTranslate(data);

// ✅ 防止 YouTube 请求翻译字幕
if (data?.captions) {
    data.captions.playerCaptionsTracklistRenderer = {
        captionTracks: [],
        audioTracks: []
    };
}

$done({ body: JSON.stringify(data) });