/*--Start-- Manage Account Views*/
function __taggbox__manage_account_view(accountType) {
    if (accountType == 'login') {
        let __taggbox__account_error = document.querySelector("#__taggbox__account_error");
        __taggbox__account_error.style.display = 'none';
        let __taggbox__account_tab_view = document.querySelector("#__taggbox__account_tab_view");
        __taggbox__account_tab_view.style.display = 'block';
        let __taggbox__account_register = document.querySelector("#__taggbox__account_register");
        __taggbox__account_register.classList.remove('active');
        let __taggbox__account_login = document.querySelector("#__taggbox__account_login");
        __taggbox__account_login.classList.add('active');
        let __taggbox__account_login_view = document.querySelector("#__taggbox__account_login_view");
        __taggbox__account_login_view.style.display = 'block';
        let __taggbox__account_register_view = document.querySelector("#__taggbox__account_register_view");
        __taggbox__account_register_view.style.display = 'none';

        /*let __taggbox__account_forgot_password_view = document.querySelector("#__taggbox__account_forgot_password_view");
         __taggbox__account_forgot_password_view.style.display = 'none';*/

    } else if (accountType == 'register') {
        let __taggbox__account_error = document.querySelector("#__taggbox__account_error");
        __taggbox__account_error.style.display = 'none';
        let __taggbox__account_tab_view = document.querySelector("#__taggbox__account_tab_view");
        __taggbox__account_tab_view.style.display = 'block';
        let __taggbox__account_register = document.querySelector("#__taggbox__account_login");
        __taggbox__account_register.classList.remove('active');
        let __taggbox__account_login = document.querySelector("#__taggbox__account_register");
        __taggbox__account_login.classList.add('active');
        let __taggbox__account_login_view = document.querySelector("#__taggbox__account_login_view");
        __taggbox__account_login_view.style.display = 'none';
        let __taggbox__account_register_view = document.querySelector("#__taggbox__account_register_view");
        __taggbox__account_register_view.style.display = 'block';
        /*let __taggbox__account_forgot_password_view = document.querySelector("#__taggbox__account_forgot_password_view");
         __taggbox__account_forgot_password_view.style.display = 'none';*/
    } else if (accountType == 'forgotPassword') {
        let __taggbox__account_error = document.querySelector("#__taggbox__account_error");
        __taggbox__account_error.style.display = 'none';
        let __taggbox__account_tab_view = document.querySelector("#__taggbox__account_tab_view");
        __taggbox__account_tab_view.style.display = 'none';
        let __taggbox__account_login_view = document.querySelector("#__taggbox__account_login_view");
        __taggbox__account_login_view.style.display = 'none';
        let __taggbox__account_register_view = document.querySelector("#__taggbox__account_register_view");
        __taggbox__account_register_view.style.display = 'none';
        /* let __taggbox__account_forgot_password_view = document.querySelector("#__taggbox__account_forgot_password_view");
         __taggbox__account_forgot_password_view.style.display = 'block';*/
    } else {

    }
}
/*--End-- Manage Account Views*/

/*--Start-- Manage Other Plugin Account Popup*/
function __taggbox__manage_other_plugin_account(otherPluginInstallStatus, pluginUrl, existingPluginUser, otherPluginInstallUrl) {
    let elemHTML = `<div id="__taggbox__upgrade_plan_overlay" style="left:0;position:fixed;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999;"></div>`;
    elemHTML = `${elemHTML}<div class="__taggbox__popupwrap __taggbox__popup_xl">`;
    elemHTML = `${elemHTML}<button onclick="__taggbox__hide_other_plugin_account_popup_close();" type="button" class="__taggbox__closebtn"></button>`;
    elemHTML = `${elemHTML}<div class="__taggbox__popupinn">`;
    elemHTML = `${elemHTML}<div class="__taggbox__header"><h2>Taggbox & Tagembed Are Now One 🤝</h2></div>`;
    elemHTML = `${elemHTML}<hr class="__taggbox__horizontaborder">`;
    elemHTML = `${elemHTML}<div class="__taggbox__formwbody">`;
    elemHTML = `${elemHTML}<div class="__taggbox__formwrow">`;
    elemHTML = `${elemHTML}<p style="text-align: center;"> You already have an account on <strong style="text-transform: capitalize;">${existingPluginUser}</strong> Plugin. Install and Use the same credentials to log in Or to continue sign up with a different email.</p>`;
    elemHTML = `${elemHTML}</div></div>`;
    elemHTML = `${elemHTML}<div class="__taggbox__btnwrap text-center">`;

    if (otherPluginInstallStatus) {
        elemHTML = `${elemHTML}<a href="${otherPluginInstallUrl}" style=""  class="__taggbox__okaybtn">Login</a>`;
    } else {
        elemHTML = `${elemHTML}<a href="${pluginUrl}" target="_blank" style=""  class="__taggbox__okaybtn">Install <strong style="text-transform: capitalize;">${existingPluginUser}</strong>  Plugin</a>`;
    }
    elemHTML = `${elemHTML}</div>`;
    elemHTML = `${elemHTML}</div></div>`;
    let __taggbox__other_plugin_popup = document.getElementById("__taggbox__other_plugin_popup");
    __taggbox__other_plugin_popup.innerHTML = elemHTML;
    __taggbox__other_plugin_popup.style.display = "block";
}
function __taggbox__hide_other_plugin_account_popup_close() {
    let __taggbox__other_plugin_popup = document.querySelector("#__taggbox__other_plugin_popup")
    __taggbox__other_plugin_popup.style.display = "none";
}

/*--End-- Manage Other Plugin Account Popup*/

/*--Start-- Register*/
var __taggbox__register_form = document.querySelector("#__taggbox__register_form");
if (__taggbox__register_form) {
    __taggbox__register_form.addEventListener("submit", function (event) {
        __taggbox__manage_account_view('register');
        let __taggbox__register_full_name_error = document.querySelector("#__taggbox__register_full_name_error");
        __taggbox__register_full_name_error.style.display = 'none';
        let __taggbox__register_email_id_error = document.querySelector("#__taggbox__register_email_id_error");
        __taggbox__register_email_id_error.style.display = 'none';
        let __taggbox__register_password_error = document.querySelector("#__taggbox__register_password_error");
        __taggbox__register_password_error.style.display = 'none';
        let __taggbox__register_contact_no_error = document.querySelector("#__taggbox__register_contact_no_error");
        __taggbox__register_contact_no_error.style.display = 'none';
        __taggbox__open_loader();
        let __taggbox__toast = new TaggboxToast;
        let formData = document.querySelector("#__taggbox__register_form")
        formData = new FormData(formData);
        formData.append('action', 'data');
        formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
        formData.append('__taggbox__ajax_action', '__taggbox__register');
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
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("accountAlreadyOtherPluginStatus")) {
                        if (response.data.accountAlreadyOtherPluginStatus == true)
                            __taggbox__manage_other_plugin_account(response.data.otherPluginInstallStatus, response.data.pluginUrl, response.data.existingPluginUser, response.data.otherPluginInstallUrl);
                    } else {
                        window.location.replace(response.data.redirectUrl);
                    }
                }
            } else {
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("fullName")) {
                        __taggbox__register_full_name_error.style.display = 'block';
                        __taggbox__register_full_name_error.textContent = response.data.fullName;
                    }
                    if (response.data.hasOwnProperty("emailId")) {
                        __taggbox__register_email_id_error.style.display = 'block';
                        __taggbox__register_email_id_error.textContent = response.data.emailId;
                    }
                    if (response.data.hasOwnProperty("password")) {
                        __taggbox__register_password_error.style.display = 'block';
                        __taggbox__register_password_error.textContent = response.data.password;
                    }
                    if (response.data.hasOwnProperty("contact_no")) {
                        __taggbox__register_contact_no_error.style.display = 'block';
                        __taggbox__register_contact_no_error.textContent = response.data.contact_no;
                    }
                    /*--End-- Manage Validation Error*/
                } else {
                    if (response.hasOwnProperty("message")) {
                        let __taggbox__account_error = document.querySelector("#__taggbox__account_error");
                        __taggbox__account_error.style.display = 'block';
                        __taggbox__account_error.textContent = response.message;
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
    });
}
/*--End-- Register*/
/*--Start-- Login*/
var __taggbox__login_form = document.querySelector("#__taggbox__login_form");
if (__taggbox__login_form) {
    __taggbox__login_form.addEventListener("submit", function (event) {
        __taggbox__manage_account_view('login');
        let __taggbox__login_email_id_error = document.querySelector("#__taggbox__login_email_id_error");
        __taggbox__login_email_id_error.style.display = 'none';
        let __taggbox__login_password_error = document.querySelector("#__taggbox__login_password_error");
        __taggbox__login_password_error.style.display = 'none';
        __taggbox__open_loader();
        let __taggbox__toast = new TaggboxToast;
        let formData = document.querySelector("#__taggbox__login_form")
        formData = new FormData(formData);
        formData.append('action', 'data');
        formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
        formData.append('__taggbox__ajax_action', '__taggbox__login');
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
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("accountAlreadyOtherPluginStatus")) {
                        if (response.data.accountAlreadyOtherPluginStatus == true)
                            __taggbox__manage_other_plugin_account(response.data.otherPluginInstallStatus, response.data.pluginUrl, response.data.existingPluginUser, response.data.otherPluginInstallUrl);
                    } else {
                        window.location.replace(response.data.redirectUrl);
                    }
                }
            } else {
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("emailId")) {
                        __taggbox__login_email_id_error.style.display = 'block';
                        __taggbox__login_email_id_error.textContent = response.data.emailId;
                    }
                    if (response.data.hasOwnProperty("password")) {
                        __taggbox__login_password_error.style.display = 'block';
                        __taggbox__login_password_error.textContent = response.data.password;
                    }
                } else {
                    if (response.hasOwnProperty("message")) {
                        let __taggbox__account_error = document.querySelector("#__taggbox__account_error");
                        __taggbox__account_error.style.display = 'block';
                        __taggbox__account_error.textContent = response.message;
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
    });
}
/*--End-- Login*/