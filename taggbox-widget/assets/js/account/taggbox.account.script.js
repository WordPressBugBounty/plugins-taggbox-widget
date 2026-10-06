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
    elemHTML = `${elemHTML}<button data-taggbox-action="close-other-plugin" type="button" class="__taggbox__closebtn"></button>`;
    elemHTML = `${elemHTML}<div class="__taggbox__popupinn">`;
    elemHTML = `${elemHTML}<div class="__taggbox__header"><h2>Taggbox & Taggbox Are Now One 🤝</h2></div>`;
    elemHTML = `${elemHTML}<hr class="__taggbox__horizontaborder">`;
    elemHTML = `${elemHTML}<div class="__taggbox__formwbody">`;
    elemHTML = `${elemHTML}<div class="__taggbox__formwrow">`;
    elemHTML = `${elemHTML}<p style="text-align: center;"> You already have an account on <strong style="text-transform: capitalize;">${__taggbox__escapeText(existingPluginUser)}</strong> Plugin. Install and Use the same credentials to log in Or to continue sign up with a different email.</p>`;
    elemHTML = `${elemHTML}</div></div>`;
    elemHTML = `${elemHTML}<div class="__taggbox__btnwrap text-center">`;

    if (otherPluginInstallStatus) {
        elemHTML = `${elemHTML}<a href="${__taggbox__escapeAttr(otherPluginInstallUrl)}" style=""  class="__taggbox__okaybtn">Login</a>`;
    } else {
        elemHTML = `${elemHTML}<a href="${__taggbox__escapeAttr(pluginUrl)}" target="_blank" style=""  class="__taggbox__okaybtn">Install <strong style="text-transform: capitalize;">${__taggbox__escapeText(existingPluginUser)}</strong>  Plugin</a>`;
    }
    elemHTML = `${elemHTML}</div>`;
    elemHTML = `${elemHTML}</div></div>`;
    let __taggbox__other_plugin_popup = document.getElementById("__taggbox__other_plugin_popup");
    __taggbox__setSafeHtml(__taggbox__other_plugin_popup, elemHTML);
    __taggbox__other_plugin_popup.querySelectorAll('[data-taggbox-action="close-other-plugin"]').forEach(function (b) {
        b.addEventListener("click", __taggbox__hide_other_plugin_account_popup_close);
    });
    __taggbox__other_plugin_popup.style.display = "block";
}
function __taggbox__hide_other_plugin_account_popup_close() {
    let __taggbox__other_plugin_popup = document.querySelector("#__taggbox__other_plugin_popup")
    __taggbox__other_plugin_popup.style.display = "none";
}
/*--End-- Manage Other Plugin Account Popup*/

/*--Start-- Get Country Code For Register*/
window.addEventListener ? window.addEventListener("load", __taggbox__getCallingCode, false) : window.attachEvent && window.attachEvent("onload", __taggbox__getCallingCode);
function __taggbox__getCallingCode() {
    /*Manage Customizaton Section Hide Show*/
    let __taggbox__toast = new TaggboxToast;
    let formData = new FormData();
    formData.append('action', 'taggbox_data');
    formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
    formData.append('__taggbox__ajax_action', '__taggbox__getCallingCode');
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
            let callingCodes = response.data.callingCode;
            let select = document.getElementById("__taggbox__callingCode");
            callingCodes.forEach((callingCode, index) => {
                let option = document.createElement("option");
                option.value = callingCode.callingCode;
                option.textContent = `${callingCode.flag} ${callingCode.name} (${callingCode.callingCode})`;
                select.appendChild(option);
            });
            /*Keep "Select Country Code" placeholder selected by default*/
            select.value = "";
        }
    }).catch((error) => {
        console.log(error);
        __taggbox__close_loader();
        __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
    });
}
/*--End-- Get Country Code For Register*/

function __taggbox__get_timezone() {
    try {
        var __taggbox__timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return (typeof __taggbox__timezone === "string") ? __taggbox__timezone : "";
    } catch (__taggbox__error) {
        return "";
    }
}

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
        let __taggbox__register_calling_code_error = document.querySelector("#__taggbox__register_calling_code_error");
        __taggbox__register_calling_code_error.style.display = 'none';
        /*Country code is required when contact number is entered*/
        let __taggbox__register_contact_no = __taggbox__register_form.querySelector("[name='contact_no']").value.trim();
        let __taggbox__register_calling_code = __taggbox__register_form.querySelector("[name='calling_code']").value;
        if (__taggbox__register_contact_no !== "" && __taggbox__register_calling_code === "") {
            __taggbox__register_calling_code_error.style.display = 'block';
            __taggbox__register_calling_code_error.textContent = "Please select country code.";
            return;
        }
        __taggbox__open_loader();
        let __taggbox__toast = new TaggboxToast;
        let formData = document.querySelector("#__taggbox__register_form")
        formData = new FormData(formData);
        formData.append('action', 'taggbox_data');
        formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
        formData.append('__taggbox__ajax_action', '__taggbox__register');
        formData.append('timezone', __taggbox__get_timezone());
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
                    window.location.replace(response.data.redirectUrl);
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
                    if (response.data.hasOwnProperty("calling_code")) {
                        __taggbox__register_calling_code_error.style.display = 'block';
                        __taggbox__register_calling_code_error.textContent = response.data.calling_code;
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
        formData.append('action', 'taggbox_data');
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
                    window.location.replace(response.data.redirectUrl);
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
/*--Start-- Google Login*/
var __taggbox__google_login_buttons = document.querySelectorAll(".__taggbox__google_btn");
if (__taggbox__google_login_buttons.length) {
    __taggbox__google_login_buttons.forEach(function (__taggbox__google_login_button) {
        __taggbox__google_login_button.addEventListener("click", function () {
            let __taggbox__toast = new TaggboxToast;
            let formData = new FormData();
            formData.append('action', 'taggbox_data');
            formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
            formData.append('__taggbox__ajax_action', '__taggbox__google_auth_url');
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
                if (response.status == true && response.hasOwnProperty("data") && response.data.authUrl) {
                    window.location.href = response.data.authUrl;
                    return;
                }
                __taggbox__close_loader();
                __taggbox__toast.danger({ message: response.hasOwnProperty("message") ? response.message : "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
            }).catch((error) => {
                console.log(error);
                __taggbox__close_loader();
                __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
            });
        });
    });
}
/*--End-- Google Login*/

/*--Start-- Password Show/Hide Toggle*/
document.addEventListener("click", function (event) {
    let __taggbox__toggle = event.target.closest(".__taggbox__password_toggle");
    if (!__taggbox__toggle) return;
    event.preventDefault();
    let __taggbox__input = __taggbox__toggle.parentNode.querySelector("input");
    if (!__taggbox__input) return;
    let __taggbox__show = __taggbox__input.type === "password";
    __taggbox__input.type = __taggbox__show ? "text" : "password";
    __taggbox__toggle.classList.toggle("__taggbox__visible", __taggbox__show);
    __taggbox__toggle.setAttribute("aria-pressed", __taggbox__show ? "true" : "false");
    __taggbox__toggle.setAttribute("aria-label", __taggbox__show ? "Hide password" : "Show password");
    __taggbox__toggle.setAttribute("title", __taggbox__show ? "Hide password" : "Show password");
});
/*--End-- Password Show/Hide Toggle*/
