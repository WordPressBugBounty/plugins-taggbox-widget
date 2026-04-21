/*--Start-- Get Network Source*/
window.addEventListener ? window.addEventListener("load", __taggbox__check_user_accout_status, false) : window.attachEvent && window.attachEvent("onload", __taggbox__check_user_accout_status);
function __taggbox__check_user_accout_status() {
    /*if (__taggbox__manageApiCall())
     return;*/
    /*Manage Widget Error*/
    let __taggbox__book_demo_free_btn = document.querySelector("#__taggbox__book_demo_free_btn");
    let __taggbox__book_demo_paid_btn = document.querySelector("#__taggbox__book_demo_paid_btn");

    let __taggbox__toast = new TaggboxToast;
    let formData = new FormData();
    formData.append('action', 'taggbox_data');
    formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
    formData.append('__taggbox__ajax_action', '__taggbox__check_user_accout_status');
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
            console.log(response);
            if (response.data.hasOwnProperty("accountStatus")) {
                if (response.data.accountStatus == "paid") {
                    __taggbox__book_demo_paid_btn.style.display = "inline-block";
                } else {
                    __taggbox__book_demo_paid_btn.style.display = "none";
                }
                if (response.data.accountStatus == "free") {
                    __taggbox__book_demo_free_btn.style.display = "inline-block";
                } else {
                    __taggbox__book_demo_free_btn.style.display = "none";
                }
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

