/*--Start-- Get Network Source*/
window.addEventListener ? window.addEventListener("load", __taggbox__get_networks, false) : window.attachEvent && window.attachEvent("onload", __taggbox__get_networks);
function __taggbox__get_networks() {
    /*if (__taggbox__manageApiCall())
     return;*/
    /*Manage Widget Error*/
    let widgetData = document.querySelector("#__taggbox__widgets").selectedOptions[0];
    let __taggbox__toast = new TaggboxToast;
    let formData = new FormData();
    formData.append('action', 'taggbox_data');
    formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
    formData.append('__taggbox__ajax_action', '__taggbox__source_networks');
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
            let elemHTML = `<option vlaue="">Select Network</option>`;
            for (let index in response.data)
                if (response.data[index].id != 2) {/*Note : This Use For Merge Instagram 2/18*/
                    let name = response.data[index].name;
                    if (response.data[index].id == 18) {
                        name = name.split(' ')[0];
                    }
                    elemHTML = `${elemHTML}<option value="${response.data[index].id}#${response.data[index].name}"> ${name}</option>`;
                }
            document.getElementById("__taggbox__networks").innerHTML = elemHTML;
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
/*--End-- Get Network Source*/
/*--Start--Get Feed Filters*/
var __taggbox__networks = document.querySelector("#__taggbox__networks");
if (__taggbox__networks) {
    __taggbox__networks.addEventListener("change", function (event) {
        let __taggbox__account_error = document.querySelector("#__taggbox__feed_filter_row");
        __taggbox__account_error.style.display = 'none';
        let __taggbox__feed_filters = document.getElementById("__taggbox__feed_filters");
        __taggbox__feed_filters.innerHTML = '';
        let networkId = event.target.value.split('#')[0];
        let networkName = event.target.value.split('#')[1];
        if (!networkId || !networkName)
            return;
        /*Get Already Exist Auth For Create Feed*/
        __taggbox__get_already_exist_auth(networkId);
        let __taggbox__toast = new TaggboxToast;
        __taggbox__open_loader();
        let formData = new FormData();
        formData.append('networkId', networkId);
        formData.append('action', 'taggbox_data');
        formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
        formData.append('__taggbox__ajax_action', '__taggbox__get_network_filter');
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
                __taggbox__account_error.style.display = 'flex';
                let elemHTML = `<option vlaue="-1">Select Feed Filter</option>`;
                for (let index in response.data)
                    elemHTML = `${elemHTML}<option value="${response.data[index].id}#${response.data[index].name}"> ${response.data[index].name}</option>`;
                __taggbox__feed_filters.innerHTML = elemHTML;
            } else {
                __taggbox__account_error.style.display = 'none';
                if (response.hasOwnProperty("message")) {
                    __taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
                } else {
                    __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
                }
            }
        }).catch((error) => {
            console.log(error);
            __taggbox__close_loader();
            __taggbox__account_error.style.display = 'none';
            __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
        });
    });
}
/*--End--Get Feed Filters*/

