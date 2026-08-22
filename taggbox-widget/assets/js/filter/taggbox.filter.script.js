/*--Start-- Generate Random String*/
function __taggbox__generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/*--End-- Generate Random String*/
/*--Start--Manage Widget Display  Preview According Widget*/
window.addEventListener ? window.addEventListener("load", __taggbox__changeFilterIfrmSrc, false) : window.attachEvent && window.attachEvent("onload", __taggbox__changeFilterIfrmSrc);
function __taggbox__changeFilterIfrmSrc() {
    let widgetData = document.querySelector("#__taggbox__widgets");
    if (widgetData) {
        let __taggbox__start = __taggbox__generateRandomString(10);
        let __taggbox__end = __taggbox__generateRandomString(10);
        let __taggbox__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        /* Validate before use : the widget id must be digits only. */
        if (!/^\d+$/.test(__taggbox__widgetId)) return;
        let __taggbox__moderation_url_param = __taggbox__widgetId + '-' + __taggbox__start + '-' + __taggbox__user_id + '-' + __taggbox__end;
        let __taggbox__filterFrame = document.createElement("iframe");
        __taggbox__filterFrame.setAttribute("src", __taggbox__plugin_server_url + "Moderation/index/" + __taggbox__moderation_url_param);
        __taggbox__filterFrame.setAttribute("title", "Taggbox");
        __taggbox__filterFrame.setAttribute("frameborder", "0");
        __taggbox__filterFrame.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        __taggbox__filterFrame.setAttribute("allowfullscreen", "");
        document.querySelector("#__taggbox__widget_filter_section_id").replaceChildren(__taggbox__filterFrame);
    }
}
/*--End--Manage Widget Display  Preview According Widget*/
