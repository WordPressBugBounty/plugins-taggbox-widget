let __taggboxLoaderImageCustomPath = __taggbox__pluginLoaderImageUrlObj.__taggbox__pluginLoaderImageUrl + 'assets/images/loader.gif';
if (typeof __taggbox__plugin_url_for_js != "undefined") {
    __taggboxLoaderImageCustomPath = __taggbox__plugin_url_for_js + 'assets/images/loader.gif';
}
function __taggbox__open_loader(text = '', loaderImage = '') {
    text = (text) ? text : 'Please Wait...';
    loaderImage = (loaderImage) ? loaderImage : __taggboxLoaderImageCustomPath;
    document.body.style.cursor = "wait";
    let elem = document.createElement('div');
    elem.innerHTML = '<div id="__taggbox__loader" class="__taggbox__loader-overlay"><div class="__taggbox__loader"><img src="' + loaderImage + '"/><br/>' + text + '</div></div>';
    document.body.appendChild(elem.firstChild);
}
function __taggbox__close_loader() {
    document.body.style.cursor = "auto";
    let elem = document.querySelector('#__taggbox__loader');
    elem.remove();
}