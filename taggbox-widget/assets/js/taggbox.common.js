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

/*--Start--Validation : Accept An Identifier Only When It Is Digits Only*/
/* Validation, as described in the WordPress security handbook : test the value against a
   known pattern and treat anything else as invalid. */
function __taggbox__isValidId(value) {
	return /^\d+$/.test(String(value === undefined || value === null ? "" : value).trim());
}
function __taggbox__validId(value) {
	return __taggbox__isValidId(value) ? String(value).trim() : "";
}
/*--End--Validation*/
/*--Start--Escaping : WordPress Core @wordpress/escape-html Package*/
/* wp.escapeHtml is shipped by WordPress core (script handle wp-escape-html).
   escapeHTML() is for text between tags, escapeAttribute() is for a double quoted attribute. */
function __taggbox__escapeText(value) {
	return window.wp.escapeHtml.escapeHTML(String(value === undefined || value === null ? "" : value));
}
function __taggbox__escapeAttr(value) {
	return window.wp.escapeHtml.escapeAttribute(String(value === undefined || value === null ? "" : value));
}
/*--End--Escaping*/
/*--Start--Sanitization : DOMPurify, Applied To Every Markup String Before It Reaches The DOM*/
/* Our own DOMPurify instance is captured as soon as this file loads, so a copy loaded
   later by another plugin can never replace the one this plugin uses. */
var __taggbox__purifier = window.__taggbox__DOMPurify || window.DOMPurify;
function __taggbox__setSafeHtml(element, html) {
	if (!element) return;
	var __taggbox__sanitizer = __taggbox__purifier || window.__taggbox__DOMPurify || window.DOMPurify;
	if (!__taggbox__sanitizer || typeof __taggbox__sanitizer.sanitize !== "function") {
		/* Without the sanitizer nothing is rendered, so unsanitized markup can never reach the page. */
		element.textContent = "";
		return;
	}
	element.innerHTML = __taggbox__sanitizer.sanitize(String(html === undefined || html === null ? "" : html), { USE_PROFILES: { html: true } });
}
/*--End--Sanitization*/
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
		/* Every query string value is read through one trimmed lookup, so a key that arrives with
		   no value at all (&paymentId) counts as absent instead of printing a blank box. */
		let __taggbox__queryValue = function (key) {
			let __taggbox__raw = __taggbox__message[key];
			return String(__taggbox__raw === undefined || __taggbox__raw === null ? "" : __taggbox__raw).trim();
		};
		let __taggbox__planName = __taggbox__queryValue("planName");
		if (__taggbox__planName) {
			let __taggbox__upgrade_account_popup = document.querySelector("#__taggbox__upgrade_account_popup");
			/* The popup markup only exists on the upgrade screen, so nothing is built when it is absent. */
			if (!__taggbox__upgrade_account_popup) return;
			/* Built with DOM methods. The query string values are inserted as text
			   nodes only, so no markup can be produced from them. */
			let __taggbox__makeElement = function (tag, className) {
				let __taggbox__element = document.createElement(tag);
				if (className) __taggbox__element.className = className;
				return __taggbox__element;
			};
			let __taggbox__makePlanBox = function (label, value) {
				let __taggbox__box = __taggbox__makeElement("div", "__taggbox__planbox");
				let __taggbox__label = document.createElement("p");
				__taggbox__label.textContent = label;
				let __taggbox__value = document.createElement("span");
				__taggbox__value.textContent = (value === undefined || value === null) ? "" : String(value);
				__taggbox__box.appendChild(__taggbox__label);
				__taggbox__box.appendChild(__taggbox__value);
				return __taggbox__box;
			};
			let __taggbox__wrap = __taggbox__makeElement("div", "__taggbox__popupwrap __taggbox__popup_md");
			let __taggbox__closeBtn = __taggbox__makeElement("button", "__taggbox__closebtn");
			__taggbox__closeBtn.setAttribute("id", "__taggbox__upgrade_account_popup_close_btn");
			__taggbox__closeBtn.setAttribute("type", "button");
			__taggbox__closeBtn.addEventListener("click", __taggbox__hide_upgrade_account_popup);
			let __taggbox__inn = __taggbox__makeElement("div", "__taggbox__popupinn");
			let __taggbox__body = __taggbox__makeElement("div", "__taggbox__formwbody");
			let __taggbox__thankyou = __taggbox__makeElement("div", "__taggbox__thankyou");
			let __taggbox__checkImg = document.createElement("img");
			__taggbox__checkImg.setAttribute("src", __taggbox__plugin_url_for_js + "assets/images/check-green.png");
			__taggbox__checkImg.setAttribute("alt", "check");
			let __taggbox__heading = document.createElement("h2");
			__taggbox__heading.appendChild(document.createTextNode("Congratulations! "));
			let __taggbox__headingSpan = document.createElement("span");
			/* The popup repeats the message that came back in the query string, so an upgrade and a
			   downgrade each read correctly instead of both claiming an upgrade. */
			__taggbox__headingSpan.textContent = __taggbox__message.__taggbox__message.replace(/-/g, ' ');
			__taggbox__heading.appendChild(__taggbox__headingSpan);
			let __taggbox__detail = __taggbox__makeElement("div", "__taggbox__plandetail");
			/* A free plan costs nothing, so a missing or zero amount is left out rather than shown as $0. */
			let __taggbox__amount = __taggbox__queryValue("amount");
			let __taggbox__amountValue = Number(__taggbox__amount);
			if (__taggbox__amount && !(isFinite(__taggbox__amountValue) && 0 === __taggbox__amountValue))
				__taggbox__detail.appendChild(__taggbox__makePlanBox("Amount", "$" + __taggbox__amount));
			/* A downgrade carries no payment, so the payment id is shown only when one actually arrived. */
			let __taggbox__paymentId = __taggbox__queryValue("paymentId");
			if (__taggbox__paymentId)
				__taggbox__detail.appendChild(__taggbox__makePlanBox("Payment Id", __taggbox__paymentId));
			/* The free plan is the fallback every downgrade lands on, so naming it adds nothing. */
			if ("free" !== __taggbox__planName.toLowerCase())
				__taggbox__detail.appendChild(__taggbox__makePlanBox("Plan", __taggbox__planName));
			__taggbox__thankyou.appendChild(__taggbox__checkImg);
			__taggbox__thankyou.appendChild(__taggbox__heading);
			/* A free downgrade leaves out every detail, so the empty row is not added at all. */
			if (__taggbox__detail.hasChildNodes())
				__taggbox__thankyou.appendChild(__taggbox__detail);
			__taggbox__body.appendChild(__taggbox__thankyou);
			__taggbox__inn.appendChild(__taggbox__body);
			__taggbox__wrap.appendChild(__taggbox__closeBtn);
			__taggbox__wrap.appendChild(__taggbox__inn);
			__taggbox__upgrade_account_popup.replaceChildren(__taggbox__wrap);
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
		__taggbox__confirmDialog({ title: 'Yes, sign out', message: 'Are you sure! do you want to sign out?', buttonText: 'Sign Out', type: 'warning' }, function () {
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
			__taggbox__shortCode.textContent = `[taggbox widgetid="${__taggbox__widgetId}"]`;
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
			__taggbox__copyEmbedCode = document.querySelector(`#${__taggbox__copyEmbedId}`).textContent;
			break;
		case "embedCode":
			__taggbox__copyEmbedCode = document.querySelector(`#${__taggbox__copyEmbedId}`).value;
			break;
	}
	navigator.clipboard.writeText(__taggbox__copyEmbedCode);
	__taggbox__toast.success({ message: 'copied', position: '__taggbox__is-top-right' });
}
/*--End--Copy Short Code*/

