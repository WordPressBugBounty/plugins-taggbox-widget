/*--Start-- Generate Random String*/
function generateRandomString(length) {
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
        let __taggbox__start = generateRandomString(10);
        let __taggbox__end = generateRandomString(10);
        let __taggbox__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        let __taggbox__moderation_url_param = __taggbox__widgetId + '-' + __taggbox__start + '-' + __taggbox__user_id + '-' + __taggbox__end;
        document.querySelector("#__taggbox__widget_filter_section_id").innerHTML = `<iframe src="${__taggbox__plugin_server_url}Moderation/index/${__taggbox__moderation_url_param}" title="Tagembed" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
}
/*--End--Manage Widget Display  Preview According Widget*/
