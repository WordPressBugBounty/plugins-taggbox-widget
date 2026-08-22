/*--Start-- Get Social Accounts*/
window.addEventListener ? window.addEventListener("load", __taggbox__get_theme, false) : window.attachEvent && window.attachEvent("onload", __taggbox__get_theme);
function __taggbox__get_theme() {
    let widgetId = document.querySelector("#__taggbox__widgets");
    if (!widgetId)
        return;
    widgetId = widgetId.selectedOptions[0];
    widgetId = widgetId.value.split('#')[0];
    let __taggbox__theme = document.querySelector("#__taggbox__theme");
    let __taggbox__toast = new TaggboxToast;
    let formData = new FormData();
    formData.append('action', 'taggbox_data');
    formData.append('widgetId', widgetId);
    formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
    formData.append('__taggbox__ajax_action', '__taggbox__get_themes');
    __taggbox__open_loader();
    fetch(__taggbox__ajax_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        __taggbox__close_loader();
        if (response.status == true) {
            let elemHTML = "";
            if (typeof response.data !== 'undefined' && response.data.length > 0) {
                for (let index in response.data) {
                    elemHTML = `${elemHTML}<li>`;
                    elemHTML = `${elemHTML}<label class="${response.data[index].active == 1 ? "__taggbox__themeactive" : ""} ">`;
                    elemHTML = `${elemHTML}<span class="__taggbox__theme-img">`;
                    /*elemHTML = `${elemHTML}<img src="${__taggbox__plugin_url_for_js}assets/images/theme/themeThumb${__taggbox__escapeAttr(response.data[index].themeId)}.png" alt="modern fall" />`;*/
                    elemHTML = `${elemHTML}<img class="lazyload" src="${__taggbox__plugin_url_for_js}assets/images/blur-img.gif" data-src="${__taggbox__plugin_url_for_js}assets/images/theme/themeThumb${__taggbox__escapeAttr(response.data[index].themeId)}.png" alt="theme-image" />`;
                    elemHTML = `${elemHTML}</span>`;
                    elemHTML = `${elemHTML}<span class="__taggbox__themename"> ${__taggbox__escapeText(response.data[index].name)} </span>`;
                    elemHTML = `${elemHTML}<input type="radio" data-taggbox-action="edit-theme" data-taggbox-theme-id="${__taggbox__escapeAttr(__taggbox__validId(response.data[index].themeId))}" class="__taggbox__theme_radio_button"  name="themeId" value="${__taggbox__escapeAttr(response.data[index].themeId)}" ${response.data[index].active == 1 ? "checked" : ""}  />`;
                    elemHTML = `${elemHTML}</label>`;
                    elemHTML = `${elemHTML}</li>`;
                }
            }
            __taggbox__setSafeHtml(__taggbox__theme, elemHTML);
            /* The theme radio buttons carry their id in a data attribute and are wired up here. */
            __taggbox__theme.querySelectorAll('[data-taggbox-action="edit-theme"]').forEach(function (r) {
                r.addEventListener('click', function () { __taggbox__editTheme((this.getAttribute('data-taggbox-theme-id') || "")); });
            });
            __taggbox__image__lazy_loading()/*Image Lazy Loader*/
        } else {
            if (response.hasOwnProperty("message")) {
                __taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
            } else {
                __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
            }
        }
    }).catch((error) => {
        console.log(error);
        __taggbox__close_loader();
        __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
    });
}
/*--End-- Get Social Accounts*/
/*--Start--Image Lazy Loadin*/
function __taggbox__image__lazy_loading() {
    let images = document.querySelectorAll(".lazyload");
    __taggbox__lazyload(images);
}
/*--End--Image Lazy Loadin*/
/*--Start--Edit Theme*/
function __taggbox__editTheme(__taggbox__theme_id) {
    let __taggbox__widget_id = document.querySelector("#__taggbox__widgets").selectedOptions[0];
    __taggbox__widget_id = __taggbox__widget_id.value.split('#')[0];
    let __taggbox__toast = new TaggboxToast;
    if (!__taggbox__widget_id || !__taggbox__theme_id)
        return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
    let formData = new FormData();
    formData.append('action', 'taggbox_data');
    formData.append('widgetId', __taggbox__widget_id);
    formData.append('themeId', __taggbox__theme_id);
    formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
    formData.append('__taggbox__ajax_action', '__taggbox__edit_themes');
    __taggbox__open_loader();
    fetch(__taggbox__ajax_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        return response.json();
    }).then(response => {
        __taggbox__close_loader();
        if (response.status == true) {
            __taggbox__toast.success({ message: "Theme Updated.", position: '__taggbox__is-top-right' });
        } else {
            if (response.hasOwnProperty("message")) {
                __taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
            } else {
                __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
            }
        }
    }).catch((error) => {
        console.log(error);
        __taggbox__close_loader();
        __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
    });

}
/*--End--Edit Theme*/