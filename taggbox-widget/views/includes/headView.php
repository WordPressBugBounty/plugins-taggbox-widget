<?php
wp_enqueue_script('__jquery');
wp_enqueue_script('__taggbox__custom-js', TAGGBOX_PLUGIN_URL . '/assets/js/taggbox.common.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
wp_enqueue_script('__script-widget-js', TAGGBOX_PLUGIN_URL . '/assets/js/widget/taggbox.widget.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
$__taggbox__account_page = true; /* Use : Check User Token Valid Or Not */
$__taggbox__user_details = ___taggbox__user();
$__taggbox__active_widget_user_id = ___taggbox__activeWidgetUser();
$__taggbox__active_widget_user_name = !empty($__taggbox__user_details->name) ? $__taggbox__user_details->name : '';
$__taggbox__active_widget_user_email_id = !empty($__taggbox__user_details->email) ? $__taggbox__user_details->email : '';
$__taggbox__menus = ___taggbox__menus();
$__taggbox__active_menue_id = null;
$__taggbox__active_widget_id = ___taggbox__activeWidget();
$__taggbox__active_widget_id = !empty($__taggbox__active_widget_id) ? $__taggbox__active_widget_id : 0;
$__taggbox__widgets = ___taggbox__widgets();
$__taggbox__widgets_count = count($__taggbox__widgets); /* Use In Next And Back Button */
/* $__taggbox__collaborators = __taggbox__collaborator($__taggbox__user_details->userId); */
?>
<script type="text/javascript">
	var __taggbox__ajax_call_nones = "<?php echo esc_html(wp_create_nonce('__taggbox__ajax_call_security_nones')); ?>";
	var __taggbox__ajax_url = "<?php echo esc_html(admin_url('admin-ajax.php')); ?>";
	var __taggbox__plugin_server_url = "<?php echo esc_html(TAGGBOX_PLUGIN_SERVER_URL); ?>";
	var __taggbox__network_already_exist_auth = [];
	var __taggbox__plugin_url_for_js = "<?php echo esc_html(TAGGBOX_PLUGIN_URL); ?>";
	var __taggbox__plugin_react_url = "<?php echo esc_html(TAGGBOX_PLUGIN_REACT_URL); ?>";
	var __taggbox__user_id = "<?php echo esc_html(!empty($__taggbox__user_details->userId) ? $__taggbox__user_details->userId : ''); ?>";
</script>
<!--Start--Check User Access Token-->
<?php if (!empty($__taggbox__user_details)) : ?>
	<script>
		window.addEventListener ? window.addEventListener("load", __taggbox__check_user_token, false) : window.attachEvent && window.attachEvent("onload", __taggbox__check_user_token);

		function __taggbox__check_user_token() {
			let __taggbox__toast = new TaggboxToast;
			__taggbox__open_loader();
			let formData = new FormData();
			formData.append('action', 'data');
			formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
			formData.append('__taggbox__ajax_action', '__taggbox__check_user_token');
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
				if (response.status === true) {
					if (!response.data.head.status && response.data.head.code == 401)
						location.reload();
				} else {
					if (response.hasOwnProperty("message")) {
						__taggbox__toast.danger({
							message: response.message,
							position: '__taggbox__is-top-right'
						});
					} else {
						__taggbox__toast.danger({
							message: "Something went wrong. Please try after sometime",
							position: '__taggbox__is-top-right'
						});
					}
				}
			}).catch((error) => {
				console.log(error);
				__taggbox__close_loader();
				__taggbox__toast.danger({
					message: "Something went wrong. Please try after sometime",
					position: '__taggbox__is-top-right'
				});
			});
		}
		/*--End-- Check User Token*/
	</script>
<?php endif; ?>
<!--End--Check User Access Token-->
<!--End-- Manage Upgrade Plan Popup -->
<script>
	async function __taggbox__upgradePlan() {
		let __taggbox__overlay = document.querySelector("#__taggbox__upgrade_plan_overlay");
		if (__taggbox__overlay) __taggbox__overlay.style.display = 'block';
		let formData = new FormData();
		formData.append('action', 'data');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__check_plan_premium_feature');
		__taggbox__open_loader();
		let toast = new TaggboxToast();
		try {
			let response = await fetch(__taggbox__ajax_url, {
				method: 'POST',
				headers: {
					'x-requested-with': 'XMLHttpRequest'
				},
				body: formData,
			});
			let data = await response.json();
			__taggbox__close_loader();
			if (data.status === true) {
				if (data.data.premiumFeatureStatus === false) {
					if (__taggbox__overlay) __taggbox__overlay.style.display = 'none';
					return false;
				}
				let elemHTML = `
                <div class="__taggbox__popupwrap __taggbox__popup_xl" id="__taggbox__upgrade_plan_popup">
				<button onclick="__taggbox__hide_upgrade_plan_close();" type="button" class="__taggbox__closebtn"></button>
                <div class="__taggbox__popupinn">
				<div class="__taggbox__header">
				<h2>You've Discovered a Premium Feature!</h2>
				</div>
				<hr class="__taggbox__horizontaborder">
				<div class="__taggbox__formwbody">
				<div class="__taggbox__formwrow">
				<p>
				You've created a <strong>LinkedIn feed</strong>, which is not available in your free plan.
				To continue displaying content from this network, please upgrade your plan.
				</p>
				</div>
				</div>
				<div class="__taggbox__btnwrap text-center">
				<a style="background:#d63638;" onclick="__taggbox__menus('9')" class="__taggbox__okaybtn">
				Upgrade Plan
				</a>
				</div>
				<div style="background:#fdecee; border-top:1px solid #c3c4c7; padding:14px 18px; display:flex; justify-content:space-between; align-items:center;">
				<div style="display:flex; flex-direction:column;">
				<span style="font-size:16px; font-weight:700;">Prefer Not to Upgrade?</span>
				<span style="font-size:14px;">
				You can delete the (<span style="color:#6f42c1;">LinkedIn</span>) feed and choose a network included in the free plan.
				</span>
				</div>
				<button onclick="__taggbox__menus('2')" 
				style="background:#ffffff; border:1px solid #dcdcdc; padding:8px 16px; cursor:pointer;">
				Delete Feed
				</button>
				</div>
				</div>
				</div>
				`;
				document.getElementById("__taggbox__plan_upgrade_message").innerHTML = elemHTML;
				return true;
			} else {
				toast.danger({
					message: data.message || "Something went wrong. Please try after sometime",
					position: '__taggbox__is-top-right'
				});
				return false;
			}
		} catch (error) {
			console.error(error);
			__taggbox__close_loader();
			toast.danger({
				message: "Something went wrong. Please try after sometime",
				position: '__taggbox__is-top-right'
			});
			return false;
		}
	}

	function __taggbox__hide_upgrade_plan_close() {
		let __taggbox__upgrade_plan_popup = document.querySelector("#__taggbox__upgrade_plan_popup");
		if (__taggbox__upgrade_plan_popup) __taggbox__upgrade_plan_popup.style.display = 'none';
		let __taggbox__upgrade_plan_overlay = document.querySelector("#__taggbox__upgrade_plan_overlay");
		if (__taggbox__upgrade_plan_overlay) __taggbox__upgrade_plan_overlay.style.display = 'none';
	}
</script>
<!--End-- Manage Upgrade Plan Popup -->

<div id="__taggbox__plugin_upgrade_message"></div>
<div class="__taggbox__container">
	<div class="__taggbox__row">
		<div class="__taggbox__col __taggbox__col_12 __taggbox__widget">
			<div class="__taggbox__widget_inn">