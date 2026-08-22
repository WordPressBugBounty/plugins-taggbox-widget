/*--Start--Edit Widget*/
function __taggbox__widgetEditForm(__taggbox__widget_id, __taggbox__widget_name) {
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__widget_id || !__taggbox__widget_name)
		return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	__taggbox__dialog_form({
		popupSize: '__taggbox__popup_md', title: 'Edit Widget',
		form: { method: 'post', buttonText: 'Rename' },
		inputs: [{ label: 'Widget Name', type: 'text', value: __taggbox__widget_name, name: 'name', placeholder: 'Enter your widget name e.g. mywidget' }],
		action: function (event, formData) {
			let __taggbox__name_error = document.querySelector("#__taggbox__name_error");
			__taggbox__name_error.style.display = 'none';
			if (__taggbox__widget_name === formData.get('name')) {
				__taggbox__name_error.style.display = 'block';
				__taggbox__name_error.textContent = "No Change.";
				return;
			}
			__taggbox__open_loader();
			formData.append('action', 'taggbox_data');
			formData.append('widgetId', __taggbox__widget_id);
			formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
			formData.append('__taggbox__ajax_action', '__taggbox__edit_widget');
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
}
/*--End--Edit Widget*/
/*--Start-- Update Status*/
function __taggbox__updateWidgetStauts(__taggbox__widget_id, count) {
	/*Manage Toggel Botton On Space*/
	if (__taggbox__manageToggelOnPressSpace())
		return;
	let __taggbox__widget = document.querySelector(`#widget-${count}`);
	let __taggbox__widget_status = __taggbox__widget.getAttribute('data-widgetStatus');
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__widget_id || !__taggbox__widget_status)
		return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*__taggbox__confirmDialog({title: 'Yes, update widget status', message: 'Are you sure! do you want to update widget status?', buttonText: 'Update', type: 'warning'}, function () {*/
	let formData = new FormData();
	formData.append('widgetId', __taggbox__widget_id);
	formData.append('status', __taggbox__widget_status);
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__update_widget_status');
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
			if (response.data.hasOwnProperty("message")) {
				__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
			}
			/*Manage Widget Status*/
			switch (__taggbox__widget_status) {
				case '0':
					__taggbox__widget.setAttribute("data-widgetStatus", '1');
					break;
				case '1':
					__taggbox__widget.setAttribute("data-widgetStatus", '0');
					break;
				default:
					break;
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
		/*});*/
	});
}
/*--End-- Update Status*/
/*--Start-- Delete Widget*/
function __taggbox__deleteWidget(__taggbox__widget_id, __taggbox__widgetbox_id) {
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__widget_id || !__taggbox__widgetbox_id)
		return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	__taggbox__confirmDialog({ title: 'Yes, delete widget', message: 'Are you sure! do you want to delete widget?', buttonText: 'Delete', type: 'danger' }, function () {
		let formData = new FormData();
		formData.append('widgetId', __taggbox__widget_id);
		formData.append('action', 'taggbox_data');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__delete_widget');
		__taggbox__open_loader();
		var __taggbox__toast = new TaggboxToast;
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
				document.querySelector('#' + __taggbox__widgetbox_id).remove();
				if (response.data.hasOwnProperty("message")) {
					__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
					window.location.reload();
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
	});
}
/*--End-- Delete Widget*/
/*--Start--Copy Short Code*/
async function __taggbox__copyToWidgetShortCode(text) {
	let ___taggbox__shouldStop = await __taggbox__upgradePlan();
	if (___taggbox__shouldStop) return;
	let __taggbox__toast = new TaggboxToast;
	navigator.clipboard.writeText(text);
	__taggbox__toast.success({ message: 'copied', position: '__taggbox__is-top-right' });
}
/*--End--Copy Short Code*/
