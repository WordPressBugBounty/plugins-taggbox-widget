<!--Start-- Upgrade Plan Overlay And Message-->
<div id="__taggbox__upgrade_plan_overlay" style="position:fixed;width:100%;height:100%;background:rgba(0,0,0,0.1);z-index:999;display:none;"></div>
<div id="__taggbox__plan_upgrade_message" class="__taggbox__plan_upgrade_message"></div>
<!--End-- Upgrade Plan Overlay And Message-->
<!--Start-- Call Tagembed Chat And Plugin Version Script After Login And Register-->
<?php if (!empty($__taggbox__user_details)) : ?>
	<script type="text/javascript">
		/*--Start-- Manage Intercom Chat And Setting Data */
		window.addEventListener ? window.addEventListener("load", __taggbox__getAndManageIntercomSetting, false) : window.attachEvent && window.attachEvent("onload", __taggbox__getAndManageIntercomSetting);

		function __taggbox__getAndManageIntercomSetting() {
			let formData = new FormData();
			formData.append('action', 'taggbox_data');
			formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
			formData.append('__taggbox__ajax_action', '__taggbox__get_and_manage_intercom_chat_setting');
			fetch(__taggbox__ajax_url, {
				method: 'POST',
				headers: {
					'x-requested-with': 'XMLHttpRequest'
				},
				body: formData,
			}).then(response => {
				return response.json();
			}).then(response => {
				if (response.status == true) {
					/*--Start--Manage Intercom Setting Data*/
					window.intercomSettings = {
						api_base: "https://api-iam.intercom.io",
						app_id: "veiaqij8",
						email: response.data.email,
						user_id: response.data.userId,
						user_hash: response.data.userHash,
						name: response.data.name,
					};
					/*--End--Manage Intercom Setting Data*/
					/*--Start--Manage Intercom Calling Script*/
					var w = window;
					var ic = w.Intercom;
					if (typeof ic === "function") {
						ic('reattach_activator');
						ic('update', w.intercomSettings);
					} else {
						var d = document;
						var i = function() {
							i.c(arguments);
						};
						i.q = [];
						i.c = function(args) {
							i.q.push(args);
						};
						w.Intercom = i;
						var l = function() {
							var s = d.createElement('script');
							s.type = 'text/javascript';
							s.async = true;
							s.src = 'https://widget.intercom.io/widget/veiaqij8';
							var x = d.getElementsByTagName('script')[0];
							x.parentNode.insertBefore(s, x);
						};
						if (document.readyState === 'complete') {
							l();
						} else if (w.attachEvent) {
							w.attachEvent('onload', l);
						} else {
							w.addEventListener('load', l, false);
						}
					}
					/*--End--Manage Intercom Calling Script*/
				}
			}).catch((error) => {
				console.log(error);
			});
		}
		/*--Start-- Open Intercom Chat*/
		document.addEventListener('click', function(e) {
			if (e.target.closest('.__taggbox__intercom_chat_btn')) {
				e.preventDefault();
				if (typeof window.Intercom === "function") {
					window.Intercom('show');
				} else {
					console.log('Intercom not loaded yet');
				}
			}
		});
		/*--End-- Open Intercom Chat*/
		/*--End-- Manage Intercom Chat And Setting Data */
		/*--Start-- Manage Hide And Show plugin Upgrade Message*/
		window.addEventListener ? window.addEventListener("load", __taggbox__plugin_version, false) : window.attachEvent && window.attachEvent("onload", __taggbox__plugin_version);

		function __taggbox__plugin_version() {
			let __taggbox__toast = new TaggboxToast;
			let formData = new FormData();
			formData.append('action', 'taggbox_data');
			formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
			formData.append('__taggbox__ajax_action', '__taggbox__plugin_version');
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
					if (response.data.installedPluginVersion != response.data.livePluginVersion) {
						let elemHTML = `<div class="__taggbox__popupwrap __taggbox__popup_md">`;
						elemHTML = `${elemHTML}<button onclick="__taggbox__hide_plugin_upgrade_message();" type="button" class="__taggbox__closebtn"></button>`;
						elemHTML = `${elemHTML}<div class="__taggbox__popupinn">`;
						elemHTML = `${elemHTML}<div class="__taggbox__header"><h2>Update Plugin For Free</h2></div>`;
						elemHTML = `${elemHTML}<hr class="__taggbox__horizontaborder">`;
						elemHTML = `${elemHTML}<div class="__taggbox__formwbody">`;
						elemHTML = `${elemHTML}<div class="__taggbox__formwrow">`;
						elemHTML = `${elemHTML}<p><strong> Note : </strong> There is a new version of Tagembed Widget available. <strong> ${response.data.livePluginVersion} </strong> is a recommended Update For Performance Improvements. </p>`;
						elemHTML = `${elemHTML}</div></div>`;
						elemHTML = `${elemHTML}<div class = "__taggbox__btnwrap text-center">`;
						elemHTML = `${elemHTML}<a style="background: #d63638;" href="${response.data.pluginUpgradeURL}" class="__taggbox__okaybtn">Update Plugin</a>`;
						elemHTML = `${elemHTML}</div></div></div>`;
						document.getElementById("__taggbox__plugin_upgrade_message").innerHTML = elemHTML;
					}
				} else {
					__taggbox__toast.danger({
						message: "Something went wrong. Please try after sometime",
						position: '__taggbox__is-top-right'
					});
				}
			}).catch((error) => {
				console.log(error);
				__taggbox__toast.danger({
					message: "Something went wrong. Please try after sometime",
					position: '__taggbox__is-top-right'
				});
			});
		}

		function __taggbox__hide_plugin_upgrade_message() {
			let __taggbox__plugin_upgrade_message = document.querySelector("#__taggbox__plugin_upgrade_message")
			__taggbox__plugin_upgrade_message.style.display = "none";
		}
		/*--End-- Manage Hide And Show plugin Upgrade Message*/
	</script>
<?php endif; ?>
<!--End-- Call Tagembed Chat And Plugin Version Script After Login And Register-->
</div>
</div>
<!--Start-- Manage Next And Back Button On All Pages  -->
<div id="__taggbox__next_and_back_link_main_section"></div>
<!--End-- Manage Next And Back Button On All Pages  -->
</div>
</div>
<!-- Other Default WordPress Css -->
<style>
	#footer-thankyou {
		font-style: normal !important;
	}
</style>
<?php if (4	!=	$__taggbox__active_menue_id) : ?>
	<style>
		body {
			min-height: auto !important;
		}
	</style>
<?php endif; ?>
<?php if (6	==	$__taggbox__active_menue_id) : ?>
	<script>
		/*--Start-- Manage Embed Accordion Section*/
		let __taggbox__accordionItem = document.getElementsByClassName('__taggbox__accordionItem');
		let __taggbox__accordionItemHeading = document.getElementsByClassName('__taggbox__accordionItemHeading');
		for (i = 0; i < __taggbox__accordionItemHeading.length; i++)
			__taggbox__accordionItemHeading[i].addEventListener('click', __taggbox__toggleAccodionSection, false);

		function __taggbox__toggleAccodionSection() {
			let __taggbox__accordionSectionClass = this.parentNode.className;
			for (i = 0; i < __taggbox__accordionItem.length; i++)
				__taggbox__accordionItem[i].className = '__taggbox__accordionItem __taggbox__close';
			if (__taggbox__accordionSectionClass == '__taggbox__accordionItem __taggbox__close')
				this.parentNode.className = '__taggbox__accordionItem __taggbox__open';
		}
		/*--End-- Manage Embed Accordion Section*/
	</script>
<?php endif; ?>
<script>
	/*--Start-- Manage And Generate Next And Back Link In Footer*/
	function __taggbox__manageNextAndBackButon() {
		let __taggbox__nextLink = null;
		let __taggbox__backLink = null;
		let __taggbox__nextAndBackLinkHtml = "";
		let __taggbox__next_and_back_link_main_section = document.querySelector("#__taggbox__next_and_back_link_main_section");
		__taggbox__next_and_back_link_main_section.innerHTML = "";
		let __taggbox__nextAndBackLinkSectionStyle = "block";
		let __taggbox__widgets_count = "<?php echo	esc_html($__taggbox__widgets_count);	?>";
		let __taggbox__active_menue_id = "<?php echo	esc_html($__taggbox__active_menue_id);	?>";
		if (__taggbox__widgets_count == 0) {
			__taggbox__nextAndBackLinkSectionStyle = "none";
		}
		switch (__taggbox__active_menue_id) {
			case "1":
				__taggbox__nextLink = "2";
				__taggbox__backLink = null;
				break;
			case "2":
				__taggbox__nextLink = "3";
				__taggbox__backLink = "1";
				__taggbox__nextAndBackLinkSectionStyle = "none"; /* Show In taggbox.feed.script.js */
				break;
			case "3":
				__taggbox__nextLink = "4";
				__taggbox__backLink = "2";
				break;
			case "4":
				__taggbox__nextLink = "5";
				__taggbox__backLink = "3";
				break;
			case "5":
				__taggbox__nextLink = "6";
				__taggbox__backLink = "4";
				break;
			case "6":
				__taggbox__nextLink = null;
				__taggbox__backLink = "5";
				break;
		}
		/* Manage Next And Back */
		if (__taggbox__nextLink != null || __taggbox__backLink != null) {
			__taggbox__nextAndBackLinkHtml = `${__taggbox__nextAndBackLinkHtml}<div class="__taggbox__foot_nextprevious" id="__taggbox__next_and_back_link_section" style="display:${__taggbox__nextAndBackLinkSectionStyle}">`;
			__taggbox__nextAndBackLinkHtml = `${__taggbox__nextAndBackLinkHtml}<div class="__taggbox__footnp_inn">`;
			if (__taggbox__backLink != null) {
				__taggbox__nextAndBackLinkHtml = `${__taggbox__nextAndBackLinkHtml}<button class="__taggbox__btn __taggbox__backbtn" onclick="__taggbox__menus(${__taggbox__backLink});"> <i class="fas fa-angle-left"></i> Back </button>`;
			}
			if (__taggbox__nextLink != null) {
				__taggbox__nextAndBackLinkHtml = `${__taggbox__nextAndBackLinkHtml}<button class="__taggbox__btn" onclick="__taggbox__menus(${__taggbox__nextLink});">Next <i class="fas fa-angle-right"></i> </button>`;
			}
			__taggbox__nextAndBackLinkHtml = `${__taggbox__nextAndBackLinkHtml}</div></div>`;
			__taggbox__next_and_back_link_main_section.innerHTML = __taggbox__nextAndBackLinkHtml;
		}
	}
	window.onload = __taggbox__manageNextAndBackButon();
	/*--End-- Manage And Generate Next And Back Link In Footer*/
</script>