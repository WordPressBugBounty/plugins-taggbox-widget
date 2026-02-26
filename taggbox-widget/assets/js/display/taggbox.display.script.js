/*--Start-- Manage  Widget Display Preview According Device*/
/*var __taggbox__display_preview_loader = document.querySelector("#__taggbox__display_preview_loader");*/
function __taggbox__displayPreview(__taggbox__display_preview_new_class) {
    let __taggbox__widget_display_preview_id = document.querySelector("#__taggbox__widget_display_preview_id");
    let __taggbox__display_preview_old_class = __taggbox__widget_display_preview_id.className;
    if (__taggbox__display_preview_old_class == __taggbox__display_preview_new_class)
        return;
    __taggbox__widget_display_preview_id.classList.remove(__taggbox__display_preview_old_class);
    __taggbox__widget_display_preview_id.classList.add(__taggbox__display_preview_new_class);
    document.querySelector("#" + __taggbox__display_preview_old_class).classList.remove('__taggbox__previewactive');
    document.querySelector("#" + __taggbox__display_preview_new_class).classList.add('__taggbox__previewactive');
    /*Refresh Change Iframe According Device */
    __taggbox__changeIfrmSrc();
}
/*--End-- Manage  Widget Display Preview According Device*/
/*--Start--Manage Widget Display  Preview According Widget*/
window.addEventListener ? window.addEventListener("load", __taggbox__changeIfrmSrc, false) : window.attachEvent && window.attachEvent("onload", __taggbox__changeIfrmSrc);
function __taggbox__changeIfrmSrc() {
    /*if (!__taggbox__display_preview_loader) return; __taggbox__display_preview_loader.style.display = 'block'; */
    let widgetData = document.querySelector("#__taggbox__widgets");
    if (widgetData) {
        let __taggbox__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        document.querySelector("#__taggbox__widget_display_preview_id").innerHTML = `<iframe id="__taggbox__display_ifrm" width="100%" height="100%" src="${__taggbox__plugin_react_url + __taggbox__widgetId}?editor=1" title="Taggbox" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    /*Close  Loader After 5 Second*/
    /*setTimeout(function () {__taggbox__display_preview_loader.style.display = 'none'}, 2000);*/
}
/*--End--Manage Widget Display  Preview According Widget*/

/*--Start--Manage Embed Code Acording Widget*/
window.addEventListener ? window.addEventListener("load", __taggbox__manageEmbedCode, false) : window.attachEvent && window.attachEvent("onload", __taggbox__manageEmbedCode);
function __taggbox__manageEmbedCode() {
    let __taggbox__html_embed_code = document.querySelector("#__taggbox__html_embed_code");
    let __taggbox__iframe_embed_code = document.querySelector("#__taggbox__iframe_embed_code");
    let widgetData = document.querySelector("#__taggbox__widgets");
    if (widgetData) {
        let __taggbox__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        __taggbox__html_embed_code.value = `<div class="taggbox" style="width:100%;height:100%;overflow:auto;" data-widget-id="${__taggbox__widgetId}"></div>`;
        __taggbox__iframe_embed_code.value = `<iframe src="${__taggbox__plugin_react_url + __taggbox__widgetId}" tyle="width:100%;height:100%;overflow:auto;border:none;"></iframe>`;
    }
}
/*--End--Manage Embed Code Acording Widget*/
/*--Start-- Expand Full Screen*/
function __taggbox__openFullscreen() {
    var __taggbox__widgetDisplayPreview = document.getElementById("__taggbox__widget_display_preview_id");
    if (__taggbox__widgetDisplayPreview.requestFullscreen) {
        __taggbox__widgetDisplayPreview.requestFullscreen();
    } else if (__taggbox__widgetDisplayPreview.webkitRequestFullscreen) {
        __taggbox__widgetDisplayPreview.webkitRequestFullscreen();
    } else if (__taggbox__widgetDisplayPreview.msRequestFullscreen) {
        __taggbox__widgetDisplayPreview.msRequestFullscreen();
    }
}
/*--End-- Expand Full Screen*/
