/*--Start--Manage All Feacture Hide Show*/
function __taggbox__manageAllFeactureHideShow() {
	let __taggbox__all_feacture_section = document.querySelector("#__taggbox__all_feacture_section");
	let __taggbox__all_feacture_button = document.querySelector("#__taggbox__all_feacture_button");
	if (__taggbox__all_feacture_section.style.display === "none") {
		__taggbox__all_feacture_section.style.display = "block";
		__taggbox__all_feacture_button.textContent = "Hide All Features";
	} else {
		__taggbox__all_feacture_section.style.display = "none";
		__taggbox__all_feacture_button.textContent = "Show All Features";
	}
}
/*--End--Manage All Feacture Hide Show*/
/*--Start--Manage All Feacture Hide Show*/
function __taggbox__manageSelectPlanPrice(timePeriod) {
	let __tagembbed__monthely_price_button = document.querySelector("#__tagembbed__monthely_price_button");
	let __tagembbed__yearly_price_button = document.querySelector("#__tagembbed__yearly_price_button");
	if (timePeriod == "monthely") {
		document.querySelectorAll('.__taggbox__yearly_plan').forEach(function (el) {
			el.style.display = 'none';
		});
		document.querySelectorAll('.__taggbox__monthely_plan').forEach(function (el) {
			el.style.display = 'block';
		});
		document.querySelectorAll('.__taggbox__selectbtn_yearly').forEach(function (el) {
			el.style.display = 'none';
		});
		document.querySelectorAll('.__taggbox__selectbtn_monthely').forEach(function (el) {
			el.style.display = 'block';
		});
		__tagembbed__monthely_price_button.classList.add("__taggbox__active");
		__tagembbed__yearly_price_button.classList.remove("__taggbox__active");
	} else if (timePeriod == "yearly") {
		document.querySelectorAll('.__taggbox__yearly_plan').forEach(function (el) {
			el.style.display = 'block';
		});
		document.querySelectorAll('.__taggbox__monthely_plan').forEach(function (el) {
			el.style.display = 'none';
		});
		document.querySelectorAll('.__taggbox__selectbtn_yearly').forEach(function (el) {
			el.style.display = 'block';
		});
		document.querySelectorAll('.__taggbox__selectbtn_monthely').forEach(function (el) {
			el.style.display = 'none';
		});
		__tagembbed__yearly_price_button.classList.add("__taggbox__active");
		__tagembbed__monthely_price_button.classList.remove("__taggbox__active");
	}
}
/*--End--Manage All Feacture Hide Show*/
/*--Start-- Get User Accounts Details*/
window.addEventListener ? window.addEventListener("load", __taggbox__get_account_details, false) : window.attachEvent && window.attachEvent("onload", __taggbox__get_account_details);
function __taggbox__get_account_details() {
	let __taggbox__all_feacture_section = document.querySelector("#__taggbox__all_feacture_section");
	let allFeactureRemovableKeys = ['id', 'created', 'modified', 'webEmbed', 'status', 'collaborator', 'collaboratorStatus', 'themes', 'updatesIntervalCron', 'unit_cron', 'retainPost'];
	let allFeactureIcons = ['apiLimit', 'name', 'retainPostCount', 'support', 'walls', 'feeds', 'linkedInFeedLimit', 'linkedInFeedLimit', 'twitterFeedLimit', 'viewCount']
	let freeTrialPlanIds = ['1'];
	let __taggbox__plan = document.querySelector("#__taggbox__plan");
	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__get_account_details');
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

			/*--Start-- Manage Upgrade Plan Section Hide | Show*/
			let __taggbox__upgrade_plan_section = document.querySelector("#__taggbox__upgrade_plan_section");
			let __taggbox__support_section = document.querySelector("#__taggbox__support_section");
			if (response.data.upgradeSection && response.data.upgradeSection === "hide") {
				if (__taggbox__upgrade_plan_section) {
					__taggbox__upgrade_plan_section.style.display = "none";
				}
				if (__taggbox__support_section) {
					__taggbox__support_section.style.display = "block";
				}
				return false;
			}
			/*--End-- Manage Upgrade Plan Section Hide | Show*/

			/*--Start-- Manage All Feacture Section*/
			let allFeactureHTML = "";
			let i = 0;
			for (let indexxxxx in response.data.Product) {
				if (indexxxxx == "Plan") {
					for (let indexxxxxx in response.data.Product[indexxxxx]) {
						if (!freeTrialPlanIds.includes(response.data.Product[indexxxxx][indexxxxxx].Plan.id)) {
							const selectedKeys = [
								'name', 'walls', 'feeds', 'Networks', 'branding', 'api', 'support', 'apiLimit',
								'customCss', 'manualModeration', 'automaticModeration', 'webAnalytic',
								'customPost', 'customBanner', 'profanityFilter', 'cta', 'cdn', 'retainPostCount',
								'linkedInFeedLimit', 'twitterFeedLimit', 'viewCount'
							];
							if (i === 0) {
								allFeactureHTML += '<tr>';

								for (const key of selectedKeys) {
									const planRuleData = response.data.Product[indexxxxx][indexxxxxx].PlanRule;
									if (planRuleData.hasOwnProperty(key) && !allFeactureRemovableKeys.includes(key)) {
										allFeactureHTML += `<th>${__taggbox__escapeText(key.replace(/([A-Z])/g, ' $1'))}</th>`;
									}
								}
								allFeactureHTML += '<th>Networks</th></tr>';
							}
							i++;
							allFeactureHTML += '<tr>';

							for (const key of selectedKeys) {
								const planRuleData = response.data.Product[indexxxxx][indexxxxxx].PlanRule;
								if (planRuleData.hasOwnProperty(key) && !allFeactureRemovableKeys.includes(key)) {
									if (allFeactureIcons.includes(key)) {
										allFeactureHTML += `<td>${__taggbox__escapeText(planRuleData[key])}</td>`;
									} else {
										if (planRuleData[key] == "1") {
											allFeactureHTML += `<td class="text-center mb-0"><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" class="img-fluid"></td>`;
										} else {
											allFeactureHTML += `<td class="text-center mb-0"><img src="${__taggbox__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" class="img-fluid"></td>`;
										}
									}
								}
							}
							allFeactureHTML += '<td>';
							for (let network of response.data.Product[indexxxxx][indexxxxxx].Planrulenetwork) {
								allFeactureHTML += `<img style="height:14px; margin:2px;" src="${__taggbox__plugin_url_for_js}assets/images/network/${__taggbox__escapeAttr(network.network)}.png"/>`;
							}
							allFeactureHTML += '</td></tr>';
						}
					}
				}
			}
			__taggbox__setSafeHtml(__taggbox__all_feacture_section, `<table> ${allFeactureHTML}</table>`);
			/*--End-- Manage All Feacture Section*/
			/*--Start-- Manage Plan Serction Section*/
			let elemHTML = "";
			for (let indexx in response.data.Product) {
				if (indexx == "Plan") {
					for (let indexxx in response.data.Product[indexx]) {
						elemHTML = `${elemHTML}<div class="__taggbox__planbox ${(response.data.Product[indexx][indexxx].Plan.id == response.data.Product.ActivePlan.id) ? '__taggbox__activeplan' : ''}">`;
						if (response.data.Product[indexx][indexxx].Plan.id == response.data.Product.ActivePlan.id)
							elemHTML = `${elemHTML}<span class="__taggbox__currentplan">Current Plan</span>`;
						elemHTML = `${elemHTML}<strong>${__taggbox__escapeText(response.data.Product[indexx][indexxx].Plan.name)}</strong>`;
						let monthelyPrice = response.data.Product[indexx][indexxx].Plan.wordpessMonthlyPrice;
						let yearlyPrice = response.data.Product[indexx][indexxx].Plan.wordpressYearlyPrice;
						if (response.data.Product[indexx][indexxx].Plan.id == 67 || response.data.Product[indexx][indexxx].Plan.id == 53) {
							elemHTML = `${elemHTML}<h2>Free</h2>`;
						} else {
							elemHTML = `${elemHTML}<h2 class="__taggbox__monthely_plan" style="display:none;">$${__taggbox__escapeText(monthelyPrice)}/Mo</h2>`;
							elemHTML = `${elemHTML}<h2 class="__taggbox__yearly_plan">$${__taggbox__escapeText(yearlyPrice)}/Mo</h2>`;
						}
						elemHTML = `${elemHTML}<p>${__taggbox__escapeText(response.data.Product[indexx][indexxx].Plan.description)}</p>`;
						elemHTML = `${elemHTML}<ul>`;
						elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${__taggbox__escapeText(response.data.Product[indexx][indexxx].PlanRule.feeds)} ${(response.data.Product[indexx][indexxx].Plan.id == 67 || response.data.Product[indexx][indexxx].Plan.id == 53) ? `Feed` : `Feeds`}</li>`;
						elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${__taggbox__escapeText(response.data.Product[indexx][indexxx].PlanRule.viewCount)} Views/Month</li>`;
						if (response.data.Product[indexx][indexxx].Plan.id != 67 && response.data.Product[indexx][indexxx].Plan.id != 53) {
							if (response.data.Product[indexx][indexxx].PlanRule.linkedInFeedLimit != 0) {
								elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />LinkedIn Auto Update (Max ${__taggbox__escapeText(response.data.Product[indexx][indexxx].PlanRule.linkedInFeedLimit)} Feeds)</li>`;
							} else {
								elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />LinkedIn Manual</li>`;
							}
						} else {
							elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />LinkedIn Feed</li>`;
						}
						elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${__taggbox__escapeText(response.data.Product[indexx][indexxx].PlanRule.updatesIntervalCron)} ${(response.data.Product[indexx][indexxx].PlanRule.unit_cron == 3600) ? "Hours" : "Mins"}  Update Time</li>`;
						if (response.data.Product[indexx][indexxx].PlanRule.customCss == 0) {
							elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />No Custom CSS</li>`;
						} else {
							elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />Custom CSS</li>`;
						}
						if (response.data.Product[indexx][indexxx].PlanRule.branding == 0) {
							elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />No Taggbox Branding</li>`;
						} else {
							elemHTML = `${elemHTML}<li><img src="${__taggbox__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />Taggbox Branding</li>`;
						}
						elemHTML = `${elemHTML}</ul>`;
						if (response.data.Product[indexx][indexxx].Plan.id != 1) {
							if (response.data.Product[indexx][indexxx].Plan.id == response.data.Product.ActivePlan.id) {
								if (response.data.Product[indexx][indexxx].Plan.id != 67 && response.data.Product[indexx][indexxx].Plan.id != 53) {
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-taggbox-action="cancel-subscription" data-taggbox-plan-id="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" class="__taggbox__selectbtn">Cancel Subscription</a>`;
								}
							} else {
								if (response.data.Product[indexx][indexxx].Plan.id == 67 || response.data.Product[indexx][indexxx].Plan.id == 53) {
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-taggbox-action="lite-payment" data-taggbox-plan-id="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-taggbox-price-code="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeMonthlyPriceCode)}" class="__taggbox__selectbtn  __taggbox__selectbtn_monthely" style="display:none;">Select</a>`;
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-taggbox-action="lite-payment" data-taggbox-plan-id="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-taggbox-price-code="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeYearlyPriceCode)}" class="__taggbox__selectbtn  __taggbox__selectbtn_yearly">Select</a>`;
								} else {
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-taggbox-action="payment" data-taggbox-plan-id="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-taggbox-price-code="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeMonthlyPriceCode)}" class="__taggbox__selectbtn  __taggbox__selectbtn_monthely" style="display:none;">Select</a>`;
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-taggbox-action="payment" data-taggbox-plan-id="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-taggbox-price-code="${__taggbox__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeYearlyPriceCode)}" class="__taggbox__selectbtn  __taggbox__selectbtn_yearly">Select</a>`;
								}
							}
						}
						elemHTML = `${elemHTML}</div>`;
					}
				}
			}
			__taggbox__setSafeHtml(__taggbox__plan, elemHTML);
			/* The plan buttons carry their values in data attributes and are wired up here. */
			__taggbox__plan.querySelectorAll('[data-taggbox-action]').forEach(function (b) {
				b.addEventListener('click', function () {
					let a = (this.getAttribute('data-taggbox-action') || "");
					let pid = (this.getAttribute('data-taggbox-plan-id') || "");
					let pc = (this.getAttribute('data-taggbox-price-code') || "");
					if ('cancel-subscription' === a) __taggbox__cancel_subscription(pid);
					else if ('lite-payment' === a) __taggbox__make_lite_plan_payment(pid, pc);
					else if ('payment' === a) __taggbox__make_payment(pid, pc);
				});
			});
			/*--End-- Manage Plan Serction Section*/

			/*Manage Upgrade Plan Section Hide | Show */
			if (__taggbox__upgrade_plan_section)
				__taggbox__upgrade_plan_section.style.display = "block";

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
/*--End-- Get User Accounts Details*/
/*--Start-- Manage Payment*/
function __taggbox__make_lite_plan_payment(planId, priceCode) {
	__taggbox__confirmDialog({ title: 'Opting Free Forever LITE Plan', message: 'Your current plan will be canceled and changed to Lite Plan.', buttonText: 'Confirm', type: 'danger' }, function () {
		__taggbox__make_payment(planId, priceCode);
	});
}
function __taggbox__make_payment(planId, priceCode) {
	let __taggbox__toast = new TaggboxToast;
	if (!planId || !priceCode) {
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	} else {
		__taggbox__open_loader();
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__make_payment');
		formData.append('planId', planId);
		formData.append('priceCode', priceCode);
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
				window.open(response.data.redirectUrl + '?__taggbox__paymentData=' + response.data.__taggbox__paymentData + '&__taggbox__requestCallBackUrl=' + response.data.__taggbox__requestCallBackUrl, '_self');
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
/*--End-- Manage Payment*/
function __taggbox__cancel_subscription(planId) {
	let __taggbox__toast = new TaggboxToast;
	if (!planId)
		return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	__taggbox__confirmDialog({ title: 'Are you sure!', message: 'Do you want to cancel subscription?', buttonText: 'Yes', type: 'danger' }, function () {
		let formData = new FormData();
		formData.append('planId', planId);
		formData.append('action', 'taggbox_data');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__cancel_subscription');
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
				if (response.data.hasOwnProperty("message")) {
					__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
				}
				setTimeout(function () {
					window.open('https://taggbox.com/cancel-account/', '_blank');
				}, 3000);
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
/*--Start--Hide  Account Upgrade Modal*/
function __taggbox__hide_upgrade_account_popup() {
	let __taggbox__upgrade_account_popup = document.querySelector("#__taggbox__upgrade_account_popup");
	__taggbox__upgrade_account_popup.style.display = "none";
}
/*--End--Hide  Account Upgrade Modal*/