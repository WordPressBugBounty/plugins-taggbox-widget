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
            let __taggbox__networkSelect = document.getElementById("__taggbox__networks");
            let __taggbox__ph = document.createElement("option");
            __taggbox__ph.setAttribute("vlaue", ""); __taggbox__ph.textContent = "Select Network";
            __taggbox__networkSelect.replaceChildren(__taggbox__ph);
            for (let index in response.data)
                if (response.data[index].id != 2) {/*Note : This Use For Merge Instagram 2/18*/
                    let name = response.data[index].name;
                    if (response.data[index].id == 18) {
                        name = name.split(' ')[0];
                    }
                    let __taggbox__opt = document.createElement("option");
                    __taggbox__opt.setAttribute("value", response.data[index].id + "#" + response.data[index].name);
                    __taggbox__opt.textContent = " " + name;
                    __taggbox__networkSelect.appendChild(__taggbox__opt);
                }
            
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
                let __taggbox__fph = document.createElement("option");
                __taggbox__fph.setAttribute("vlaue", "-1"); __taggbox__fph.textContent = "Select Feed Filter";
                __taggbox__feed_filters.replaceChildren(__taggbox__fph);
                for (let index in response.data) {
                    let __taggbox__fo = document.createElement("option");
                    __taggbox__fo.setAttribute("value", response.data[index].id + "#" + response.data[index].name);
                    __taggbox__fo.textContent = " " + response.data[index].name;
                    __taggbox__feed_filters.appendChild(__taggbox__fo);
                }
                
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

