/*
  YouTube 隐藏 Shorts / 禁止 Shorts
  Shadowrocket JS Script
*/

let obj = JSON.parse($response.body);

// ✅ 删除首页的 Shorts 流（shelfRenderer）
if (obj?.contents?.twoColumnBrowseResultsRenderer?.tabs) {
    let tabs = obj.contents.twoColumnBrowseResultsRenderer.tabs;
    tabs.forEach(t => {
        let section = t.tabRenderer?.content?.richGridRenderer?.contents;
        if (section) {
            t.tabRenderer.content.richGridRenderer.contents =
                section.filter(item => !item.richSectionRenderer || 
                    !/shorts/i.test(JSON.stringify(item)));
        }
    });
}

// ✅ 删除底部导航栏里的 Shorts 按钮
if (obj?.contents?.singleColumnBrowseResultsRenderer) {
    let items = obj.contents.singleColumnBrowseResultsRenderer?.tabs;
    if (items) {
        obj.contents.singleColumnBrowseResultsRenderer.tabs =
            items.filter(i => !/Shorts/i.test(JSON.stringify(i)));
    }
}

// ✅ 防止 API 再推送 Shorts 元数据
if (obj?.microformat) {
    delete obj.microformat.shortVideoData;
}

// ✅ 删除所有与 Shorts 相关 metadata
function purge(obj) {
    if (!obj) return;
    if (typeof obj === "object") {
        for (let key in obj) {
            if (/short/i.test(key)) delete obj[key];
            else purge(obj[key]);
        }
    }
}
purge(obj);

$done({ body: JSON.stringify(obj) });