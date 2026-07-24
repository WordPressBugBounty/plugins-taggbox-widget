/*--Start-- Manage Window Popup In New Tab*/
/*function __tagmebed__openWindowPopup(url, windowName = "Taggbox") {
 __tagmebed__window_popup = window.open(url, '_blank');
 __tagmebed__window_popup.focus();
 var __taggbox__window_pupup_timer = setInterval(function () {
 if (__tagmebed__window_popup.closed) {
 location.reload();
 clearInterval(__taggbox__window_pupup_timer);
 }
 }, 250);
 }*/
function __tagmebed__openWindowPopup(url, windowName = "Taggbox") {
	__tagmebed__window_popup = window.open(url, windowName, 'height=600,width=600,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
	var __taggbox__window_pupup_timer = setInterval(function () {
		if (__tagmebed__window_popup.closed) {
			location.reload();
			clearInterval(__taggbox__window_pupup_timer);
		}
	}, 250);
}
function __tagmebed__closeWindowPopup() {
	if (__tagmebed__window_popup)
		__tagmebed__window_popup.close();
}
/*--End-- Create And Manage Window Popup*/

/*--Start--Hide/Show Loader During Page Readay State*/
document.onreadystatechange = function () {
	if (document.readyState !== "complete") {
		__taggbox__open_loader();
	} else {
		__taggbox__close_loader();
	}
};
/*--End--Hide/Show Loader During Page Readay State*/

/*--Start-- Manage Response Message*/
window.addEventListener ? window.addEventListener("load", __taggbox__message, false) : window.attachEvent && window.attachEvent("onload", __taggbox__message);
function __taggbox__message() {
	let __taggbox__toast = new TaggboxToast;
	/*--Start-- Manage Redirect Url Error*/
	let urlSearchParams = new URLSearchParams(window.location.search);
	let __taggbox__message = Object.fromEntries(urlSearchParams.entries());
	/*--Start-- Manage Show Messaage According Time*/
	let getTime = new Date();
	getTime = getTime.getTime(); /*milliseconds*/
	getTime = Math.floor(getTime / 1000); /*seconds*/
	if (__taggbox__message.hasOwnProperty("status")) {
		if (__taggbox__message.status < getTime)
			return;
	}
	/*--End-- Manage Show Messaage According Time*/
	if (__taggbox__message.hasOwnProperty("__taggbox__message")) {
		if (__taggbox__message.hasOwnProperty("success")) {
			__taggbox__toast.success({ message: __taggbox__message.__taggbox__message.replace(/-/g, ' '), position: '__taggbox__is-top-right' });
		} else if (__taggbox__message.hasOwnProperty("info")) {
			__taggbox__toast.info({ message: __taggbox__message.__taggbox__message.replace(/-/g, ' '), position: '__taggbox__is-top-right' });
		} else if (__taggbox__message.hasOwnProperty("warning")) {
			__taggbox__toast.warning({ message: __taggbox__message.__taggbox__message.replace(/-/g, ' '), position: '__taggbox__is-top-right' });
		} else {
			__taggbox__toast.danger({ message: __taggbox__message.__taggbox__message.replace(/-/g, ' '), position: '__taggbox__is-top-right' });
		}
		/*--Start--Show Popup On Plan Upgrade Time*/
		if (__taggbox__message.hasOwnProperty("planName") && __taggbox__message.hasOwnProperty("amount") && __taggbox__message.hasOwnProperty("paymentId")) {
			let __taggbox__upgrade_account_popup = document.querySelector("#__taggbox__upgrade_account_popup");
			let elemHTML = `<div class="__taggbox__popupwrap __taggbox__popup_md">`;
			elemHTML = `${elemHTML}<button id="__taggbox__upgrade_account_popup_close_btn" onclick="__taggbox__hide_upgrade_account_popup();" type="button" class="__taggbox__closebtn"></button>`;
			elemHTML = `${elemHTML}<div class="__taggbox__popupinn">`;
			elemHTML = `${elemHTML}<div class="__taggbox__formwbody">`;
			elemHTML = `${elemHTML}<div class="__taggbox__thankyou">`;
			elemHTML = `${elemHTML}<img src="${__taggbox__plugin_url_for_js}assets/images/check-green.png" alt="check">`;
			elemHTML = `${elemHTML}<h2>Congratulations! <span>Your account has been upgraded</span></h2>`;
			elemHTML = `${elemHTML}<div class="__taggbox__plandetail">`;
			elemHTML = `${elemHTML}<div class="__taggbox__planbox">`;
			elemHTML = `${elemHTML}<p>Amount</p>`;
			elemHTML = `${elemHTML}<span>$${__taggbox__message.amount}</span>`;
			elemHTML = `${elemHTML}</div>`;
			elemHTML = `${elemHTML}<div class="__taggbox__planbox">`;
			elemHTML = `${elemHTML}<p>Payment Id</p>`;
			elemHTML = `${elemHTML}<span>${__taggbox__message.paymentId}</span>`;
			elemHTML = `${elemHTML}</div>`;
			elemHTML = `${elemHTML}<div class="__taggbox__planbox">`;
			elemHTML = `${elemHTML}<p>Plan</p>`;
			elemHTML = `${elemHTML}<span>${__taggbox__message.planName}</span>`;
			elemHTML = `${elemHTML}</div></div></div></div></div></div>`;
			__taggbox__upgrade_account_popup.innerHTML = elemHTML;
			__taggbox__upgrade_account_popup.style.display = "block";
		}
		/*--End--Show Popup On Plan Upgrade Time*/
	}
}
/*--End-- Manage Response Message*/
/*--Start--Manage Windiow Onload Function When Response Message Exist In Query String*/
function __taggbox__manageApiCall() {
	let urlSearchParams = new URLSearchParams(window.location.search);
	let __taggbox__message = Object.fromEntries(urlSearchParams.entries());
	if (__taggbox__message.hasOwnProperty("__taggbox__message"))
		return true
	return false;
}
/*--End--Manage Windiow Onload Function When Response Message Exist In Query String*/
/*--Start-- Logout*/
var __taggbox__logout = document.querySelector("#__taggbox__logout");
if (__taggbox__logout) {
	__taggbox__logout.addEventListener('click', function (event) {
		confirmDialog({ title: 'Yes, sign out', message: 'Are you sure! do you want to sign out?', buttonText: 'Sign Out', type: 'warning' }, function () {
			let formData = new FormData();
			formData.append('action', 'taggbox_data');
			formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
			formData.append('__taggbox__ajax_action', '__taggbox__logout');
			__taggbox__open_loader();
			let __taggbox__toast = new TaggboxToast;
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
					window.location.replace(response.data.redirectUrl);
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
		});
	});
}
/*--End-- Logout*/

/*--Start--Manage Taggbox Menue*/
function __taggbox__menus(__taggbox__menu_id, __taggbox__widgetId = null) {
	if (__taggbox__widgetId)
		__taggbox__manageActiveWidget(__taggbox__widgetId);
	__taggbox__open_loader();
	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('action', 'taggbox_data');
	formData.append('menueId', __taggbox__menu_id);
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__menue');
	fetch(__taggbox__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true) {
			return window.location.replace(response.data.redirectUrl);
			/*return window.location.href = response.data.redirectUrl;*/
		} else {
			__taggbox__close_loader();
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
/*--End--Manage Taggbox Menue*/
/*--Start-- Get Already Exist Auth*/
function __taggbox__get_already_exist_auth(__taggbox__network_id) {
	if (!__taggbox__network_id)
		return;
	let formData = new FormData();
	formData.append('networkId', __taggbox__network_id);
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__get_already_exist_auth');
	fetch(__taggbox__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true)
			__taggbox__network_already_exist_auth = response.data;
	});
}
/*Note : This Use For Merge Instagram 2/18*/
function __taggbox__get_already_exist_auth_new(__taggbox__network_id, __taggbox__feed_data) {
	if (!__taggbox__network_id)
		return;
	__taggbox__open_loader();
	let formData = new FormData();
	formData.append('networkId', __taggbox__network_id);
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__get_already_exist_auth');
	fetch(__taggbox__ajax_url, {
		method: 'POST',
		headers: { 'x-requested-with': 'XMLHttpRequest', },
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true) {
			__taggbox__network_already_exist_auth = response.data;
			__taggbox__createInstagramBusinessFeed(__taggbox__feed_data);
			__taggbox__close_loader();
		}
	});
}
/*--End-- Get Already Exist Auth*/
/*--Start-- Manage Active Widget*/
var __taggbox__widgets = document.querySelector("#__taggbox__widgets");
if (__taggbox__widgets) {
	__taggbox__widgets.addEventListener("change", function (event) {
		if (typeof __taggbox__get_theme !== 'undefined')
			__taggbox__get_theme(); /*Manage Widget Theme According Widget*/
		if (typeof __taggbox__changeIfrmSrc !== 'undefined')
			__taggbox__changeIfrmSrc(); /*Manage Widget Display Preview According Widget*/
		if (typeof __taggbox__manageShotrCode !== 'undefined')
			__taggbox__manageShotrCode(); /*Manage Short Code According Widget*/
		if (typeof __taggbox__manageEmbedCode !== 'undefined')
			__taggbox__manageEmbedCode(); /*Manage Embed Code According Widget*/
		if (typeof __taggbox__getFeed !== 'undefined')
			__taggbox__getFeed(); /*Get Feed According Widget*/
		if (typeof __taggbox__changeFilterIfrmSrc !== 'undefined')
			__taggbox__changeFilterIfrmSrc(); /*Mange Filter Section According Widget*/
		__taggbox__manageActiveWidget(); /*Manage Active Widget*/
		if (typeof __taggbox__getCustomizationOption !== 'undefined')/*Call Get Customization Options*/
			__taggbox__getCustomizationOption();
	});
}
function __taggbox__manageActiveWidget(__taggbox__widgetId = null) {
	if (!__taggbox__widgetId) {
		__taggbox__widgetId = document.querySelector("#__taggbox__widgets").selectedOptions[0];
		__taggbox__widgetId = __taggbox__widgetId.value.split('#')[0];
	}
	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__manage_active_widget');
	formData.append('widgetId', __taggbox__widgetId);
	if (__taggbox__loader_status)
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
		if (__taggbox__loader_status)
			__taggbox__close_loader();
		if (response.status == true) {
			/*--Start--Reload Page For Manage Active Class On Widget Page*/
			if (document.querySelector("#__taggbox__widgetbox0"))
				location.reload();
			/*--End--Reload Page For Manage Active Class On Widget Page*/
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
/*--End-- Manage Active Widget*/
/*--Start--Create Widget*/
var __taggbox__widget_create_form = document.querySelector("#__taggbox__widget_create_form");
if (__taggbox__widget_create_form) {
	__taggbox__widget_create_form.addEventListener("click", function (event) {
		__taggbox__dialog_form({
			popupSize: '__taggbox__popup_md', title: 'Create Widget',
			form: { method: 'post', buttonText: 'Create' },
			inputs: [{ label: 'Widget Name', type: 'text', name: 'name', placeholder: 'Enter your widget name e.g. mywidget' }, { label: 'Profanity Filter', type: 'checkbox', name: 'profanity' }],
			action: function (event, formData) {
				let __taggbox__name_error = document.querySelector("#__taggbox__name_error");
				__taggbox__name_error.style.display = 'none';
				if (!formData.get('name')) {
					__taggbox__name_error.style.display = 'block';
					__taggbox__name_error.textContent = "Widget name is required";
					return;
				}
				__taggbox__open_loader();
				let __taggbox__toast = new TaggboxToast;
				formData.append('action', 'taggbox_data');
				formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
				formData.append('__taggbox__ajax_action', '__taggbox__create_widget');
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
						document.querySelector('#__taggbox__dialog_form_id_').remove();
						if (response.data.hasOwnProperty("message")) {
							__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
						}
						window.location.replace(response.data.redirectUrl);
					} else {
						if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
							if (response.data.hasOwnProperty("name")) {
								__taggbox__name_error.style.display = 'block';
								__taggbox__name_error.textContent = response.data.name;
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
	});
}
/*--End--Create Widget*/
/*--Start--Manage Menue Hide Show In Mobile*/
function __taggbox__manageMenueHideShowInMobile() {
	let __taggbox__menulist = document.querySelector("#__taggbox__menulist");
	let __taggbox__burger = document.querySelector("#__taggbox__burger");
	if (__taggbox__menulist.style.display === "none") {
		__taggbox__menulist.style.display = "block";
		__taggbox__burger.classList.add("__taggbox__addclose");
	} else {
		__taggbox__menulist.style.display = "none";
		__taggbox__burger.classList.remove("__taggbox__addclose");
	}
}
/*--Start--Manage Menue Hide Show In Mobile*/
/*--Start--Manage Toggel On Press Space Button*/
function __taggbox__manageToggelOnPressSpace() {
	let taggboxConfirmDialog = document.querySelector("#taggboxConfirmDialog");
	if (taggboxConfirmDialog)
		return true;
	return false;
}
/*--End--Manage Toggel On Press Space Button*/
/*--Start-- Add And Update Connected Account*/
function __tageembed__addUpdateAndRefreshAccount(__taggbox__networkId, __taggbox__type, __taggbox__connected_account_id = null, __taggbox__feed_id = null, __taggbox__feed_filter_id = null, __taggbox__other_data = null) {
	if (__taggbox__networkId) {
		let __taggbox__toast = new TaggboxToast;
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__add_or_update_account');
		formData.append('type', __taggbox__type);
		formData.append('connectedAccountId', __taggbox__connected_account_id);
		formData.append('feedId', __taggbox__feed_id);
		formData.append('networkId', __taggbox__networkId);
		formData.append('filterId', __taggbox__feed_filter_id);
		formData.append('otherData', __taggbox__other_data);
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
			if (response.status == true) {
				/*window.open(response.data.redirectUrl + '?__taggbox__feedData=' + response.data.__taggbox__feedData + '&__taggbox__requestCallBackUrl=' + response.data.__taggbox__requestCallBackUrl, '_self');*/
				let __taggbox__Url = response.data.redirectUrl + '?__taggbox__feedData=' + response.data.__taggbox__feedData + '&__taggbox__requestCallBackUrl=' + response.data.__taggbox__requestCallBackUrl;
				__tagmebed__openWindowPopup(__taggbox__Url);

			} else {
				__taggbox__close_loader();
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
}
/*--End-- Add And Update Connected Account*/
/*--Start-- Manage Short Code*/
window.addEventListener ? window.addEventListener("load", __taggbox__manageShotrCode, false) : window.attachEvent && window.attachEvent("onload", __taggbox__manageShotrCode);
function __taggbox__manageShotrCode() {
	let widgetData = document.querySelector("#__taggbox__widgets");
	if (widgetData) {
		let __taggbox__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
		let __taggbox__shortCode = document.querySelector("#__taggbox__shortCode");
		if (__taggbox__shortCode)
			__taggbox__shortCode.innerHTML = `[taggbox widgetid="${__taggbox__widgetId}"]`;
	}
}
/*--Start--Copy Short Code*/
async function __taggbox__copyCodeEmbed(__taggbox__codeType, __taggbox__copyEmbedId) {
	let ___taggbox__shouldStop = await __taggbox__upgradePlan();
	if (___taggbox__shouldStop) return;
	let __taggbox__toast = new TaggboxToast;
	let __taggbox__copyEmbedCode = "";
	switch (__taggbox__codeType) {
		case "shortCode":
			__taggbox__copyEmbedCode = document.querySelector(`#${__taggbox__copyEmbedId}`).innerHTML;
			break;
		case "embedCode":
			__taggbox__copyEmbedCode = document.querySelector(`#${__taggbox__copyEmbedId}`).value;
			break;
	}
	navigator.clipboard.writeText(__taggbox__copyEmbedCode);
	__taggbox__toast.success({ message: 'copied', position: '__taggbox__is-top-right' });
}
/*--End--Copy Short Code*/

