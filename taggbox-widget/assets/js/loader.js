let __taggboxLoaderImageCustomPath = __taggbox__pluginLoaderImageUrlObj.__taggbox__pluginLoaderImageUrl + 'assets/images/loader.gif';
if (typeof __taggbox__plugin_url_for_js != "undefined") {
    __taggboxLoaderImageCustomPath = __taggbox__plugin_url_for_js + 'assets/images/loader.gif';
}
function __taggbox__open_loader(text = '', loaderImage = '') {
    text = (text) ? text : 'Please Wait...';
    loaderImage = (loaderImage) ? loaderImage : __taggboxLoaderImageCustomPath;
    document.body.style.cursor = "wait";
    /* Built with DOM methods so no markup is produced from the arguments. */
    let overlay = document.createElement('div');
    overlay.setAttribute('id', '__taggbox__loader');
    overlay.className = '__taggbox__loader-overlay';
    let inner = document.createElement('div');
    inner.className = '__taggbox__loader';
    let image = document.createElement('img');
    image.setAttribute('src', loaderImage);
    inner.appendChild(image);
    inner.appendChild(document.createElement('br'));
    inner.appendChild(document.createTextNode(text));
    overlay.appendChild(inner);
    document.body.appendChild(overlay);
}
function __taggbox__close_loader() {
    document.body.style.cursor = "auto";
    let elem = document.querySelector('#__taggbox__loader');
    elem.remove();
}