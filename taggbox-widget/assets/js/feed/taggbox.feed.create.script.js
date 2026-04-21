/*--Start--Create Feed*/
function __taggbox__create_feed(__taggbox__feed_data, useCommonInput = true) {
    let __taggbox__toast = new TaggboxToast;
    if (Object.keys(__taggbox__feed_data).length === 0)
        __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
    /*
     if (useCommonInput)
     __taggbox__feed_data.inputs = __taggbox__feed_data.inputs.concat([{label: 'Manually approve posts before making them public?', type: 'checkbox', name: 'moderation'}]);
     */
    __taggbox__feed_data.networkName = __taggbox__feed_data.networkId == 2 ? 'Instagram' : __taggbox__feed_data.networkName;
    __taggbox__dialog_form({
        popupSize: '__taggbox__popup_md', title: 'Create ' + __taggbox__feed_data.networkName + ' ' + __taggbox__feed_data.filterName + ' Feed',
        form: { method: 'post', buttonText: 'Create' },
        inputs: __taggbox__feed_data.inputs,
        cancelAction: function () {
            document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
            return;
        },
        action: function (event, formData) {
            let validationError = false;
            for (let index in __taggbox__feed_data.inputs) {
                if (!["text"].includes(__taggbox__feed_data.inputs[index].type))
                    continue;
                document.querySelector("#__taggbox__" + __taggbox__feed_data.inputs[index].name + "_error").style.display = 'none';
                if (formData.get(__taggbox__feed_data.inputs[index].name))
                    continue;
                document.querySelector("#__taggbox__" + __taggbox__feed_data.inputs[index].name + "_error").style.display = 'block';
                document.querySelector("#__taggbox__" + __taggbox__feed_data.inputs[index].name + "_error").textContent = "This field is required";
                validationError = true;
            }
            /*--Start--Search Facebook Page Validation*/
            if (__taggbox__feed_data.filterId == 8) {
                let __taggbox__facebook_search_page = document.getElementById('__taggbox__facebook_search_page').value;
                let __taggbox__facebookPage_error = document.getElementById('__taggbox__facebookPage_error');
                let __taggbox__search_option = document.getElementById('__taggbox__search_option');
                __taggbox__search_option.style.display = "none";
                __taggbox__facebookPage_error.textContent = "";
                if (__taggbox__facebook_search_page.length < 3) {
                    __taggbox__facebookPage_error.style.display = 'block';
                    __taggbox__facebookPage_error.textContent = "Enter Minimum 3 Characters";
                    return;
                }
            }
            /*--End--Search Facebook Page Validation*/
            if (validationError)
                return;
            __taggbox__open_loader();
            formData.append('action', 'taggbox_data');
            formData.append('widgetId', __taggbox__feed_data.widgetId);
            formData.append('widgetName', __taggbox__feed_data.widgetName);
            formData.append('networkId', __taggbox__feed_data.networkId);
            formData.append('networkName', __taggbox__feed_data.networkName);
            formData.append('filterId', __taggbox__feed_data.filterId);
            formData.append('filterName', __taggbox__feed_data.filterName);
            formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
            formData.append('__taggbox__ajax_action', '__taggbox__create_feed');
            fetch(__taggbox__ajax_url, {
                method: 'POST',
                headers: {
                    'x-requested-with': 'XMLHttpRequest',
                },
                body: formData,
            }).then(response => {
                return response.json();
            }).then(response => {
                if (response.status == true) {
                    document.querySelector('#__taggbox__dialog_form_id_').remove();
                    /* window.open(response.data.redirectUrl + '?__taggbox__feedData=' + response.data.__taggbox__feedData + '&__taggbox__requestCallBackUrl=' + response.data.__taggbox__requestCallBackUrl, '_self');*/
                    let __taggbox__Url = response.data.redirectUrl + '?__taggbox__feedData=' + response.data.__taggbox__feedData + '&__taggbox__requestCallBackUrl=' + response.data.__taggbox__requestCallBackUrl;
                    /*__tagmebed__openWindowPopup(__taggbox__Url);*/
                    if (!response.data.byapiCall) {
                        __tagmebed__openWindowPopup(__taggbox__Url);
                    } else {
                        /*--Start-- Feed Create By Api Call*/
                        fetch(__taggbox__Url, {
                            method: 'GET', /*headers: {'x-requested-with': 'XMLHttpRequest'},*/
                        }).then(response => {
                            return response.json();
                        }).then(response => {
                            if (response.head.status == true) {
                                __taggbox__close_loader();
                                location.reload();
                            } else {
                                __taggbox__close_loader();
                                return toastr['error']('Something went wrong. Please try after sometime');
                            }
                        }).catch((error) => {
                            console.log(error);
                            __taggbox__close_loader();
                            return toastr['error']('Something went wrong. Please try after sometime');
                        });
                    }
                    /*--End-- Feed Create By Api Call*/
                } else {
                    __taggbox__close_loader();
                    if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                        for (let key in response.data) {
                            if (response.data.hasOwnProperty(key)) {
                                document.querySelector("#__taggbox__" + key + "_error").style.display = 'block';
                                document.querySelector("#__taggbox__" + key + "_error").textContent = response.data[key];
                            }
                        }
                    } else {
                        if (response.hasOwnProperty("message")) {
                            __taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
                        } else {
                            __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
                        }
                    }
                }
            }).catch((error) => {
                console.log(error);
                __taggbox__close_loader();
                __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
            });
        }
    });
}
/*--End--Create Feed*/