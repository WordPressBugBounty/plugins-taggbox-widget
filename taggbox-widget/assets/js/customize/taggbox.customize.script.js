window.addEventListener ? window.addEventListener("load", __taggbox__getCustomizationOption, false) : window.attachEvent && window.attachEvent("onload", __taggbox__getCustomizationOption);
function __taggbox__getCustomizationOption() {
	/*Manage Customizaton Section Hide Show*/
	document.querySelector("#__taggbox__customization_section").style.display = "none";
	let widgetId = document.querySelector("#__taggbox__widgets").selectedOptions[0];
	widgetId = widgetId.value.split('#')[0];
	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('widgetId', widgetId);
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__get_customization_option');
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
			__taggbox__manageCustomizationOptions(response.data);
			__taggbox__manageBlockAndUnblockSection(response.data.ThemeRule.inheritStyles);
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
/*--Start-- Manage Inherit Styles Customize Options */
function __taggbox__manageBlockAndUnblockSection(inheritStylesValue) {
	if (inheritStylesValue == "1") {
		document.querySelector("#__taggbox__inherit_styles_auther_font_color").classList.add("__taggbox__inherit_styles_font_color");
		document.querySelector("#__taggbox__inherit_styles_font_color").classList.add("__taggbox__inherit_styles_font_color");
		document.querySelector("#__taggbox__inherit_styles_font_size").classList.add("__taggbox__inherit_styles_font_size");
	}
	if (inheritStylesValue == "0") {
		document.querySelector("#__taggbox__inherit_styles_auther_font_color").classList.remove("__taggbox__inherit_styles_font_color");
		document.querySelector("#__taggbox__inherit_styles_font_color").classList.remove("__taggbox__inherit_styles_font_color");
		document.querySelector("#__taggbox__inherit_styles_font_size").classList.remove("__taggbox__inherit_styles_font_size");
	}
}
function __taggbox__manageInheritStylesCustomizeOptions() {
	let __taggbox__show_is_ck = document.querySelector("#__taggbox__show_is_ck");
	if (__taggbox__show_is_ck.checked) {
		__taggbox__manageBlockAndUnblockSection("1");
	} else {
		__taggbox__manageBlockAndUnblockSection("0");
	}
}
/*--End-- Manage Inherit Styles Customize Options */
/*--Start-- Manage Customization Options*/
function __taggbox__manageCustomizationOptions(__taggbox__customizationsOptions) {
	document.querySelector("#__taggbox__personalization_id").value = __taggbox__customizationsOptions.Personalization.id;
	document.querySelector("#__taggbox__themeRule_id").value = __taggbox__customizationsOptions.ThemeRule.id;

	/*--Start-- Manage Layout Setting*/
	document.querySelector("#__taggbox__featured_popup").checked = false;
	document.querySelector("#__taggbox__direct_to_source").checked = false;
	document.querySelector("#__taggbox__none").checked = false;
	if (__taggbox__customizationsOptions.Personalization.postFeatured == 1)
		document.querySelector("#__taggbox__featured_popup").checked = true;
	if (__taggbox__customizationsOptions.Personalization.mobilePopup == 1)
		document.querySelector("#__taggbox__direct_to_source").checked = true;
	if (__taggbox__customizationsOptions.Personalization.postFeatured == 0 && __taggbox__customizationsOptions.Personalization.mobilePopup == 0)
		document.querySelector("#__taggbox__none").checked = true;
	document.querySelector("#__taggbox__total_noptd").value = __taggbox__customizationsOptions.ThemeRule.numberOfPosts;
	document.querySelector("#__taggbox__hide_top_ck").checked = false;
	if (__taggbox__customizationsOptions.Personalization.postText == 1)
		document.querySelector("#__taggbox__hide_top_ck").checked = true;
	document.querySelector("#__taggbox__ps").value = __taggbox__customizationsOptions.Personalization.padding;
	document.querySelector("#__taggbox__post_spacing_range_value_section").innerHTML = __taggbox__customizationsOptions.Personalization.padding;
	document.querySelector("#__taggbox__post_mw").value = __taggbox__customizationsOptions.Personalization.minimumPostWidth;
	document.querySelector("#__taggbox__post_width_range_value_section").innerHTML = __taggbox__customizationsOptions.Personalization.minimumPostWidth;
	document.querySelector("#__taggbox__columnCount").value = __taggbox__customizationsOptions.ThemeRule.numberOfColumn;
	document.querySelector("#__taggbox__columnCountMobile").value = __taggbox__customizationsOptions.ThemeRule.mobileColumn;
	/*--End-- Manage Layout Setting*/

	/*--Start-- Manage Card Setting*/
	document.querySelector("#__taggbox__fontColor").value = __taggbox__customizationsOptions.ThemeRule.fontColor;
	document.querySelector("#__taggbox__post_font_color_value_section").innerHTML = __taggbox__customizationsOptions.ThemeRule.fontColor;
	document.querySelector("#__taggbox__authorFontColor").value = __taggbox__customizationsOptions.ThemeRule.authorColor;
	document.querySelector("#__taggbox__author_font_color_value_section").innerHTML = __taggbox__customizationsOptions.ThemeRule.authorColor;
	document.querySelector("#__taggbox__cardColor").value = __taggbox__customizationsOptions.ThemeRule.cardColor;
	document.querySelector("#__taggbox__card_color_value_section").innerHTML = __taggbox__customizationsOptions.ThemeRule.cardColor;
	document.querySelector("#__taggbox__post_font_size").innerHTML = __taggbox__customizationsOptions.ThemeRule.fontSize;
	document.querySelector("#__taggbox__post_font_size_section").innerHTML = __taggbox__customizationsOptions.ThemeRule.fontSize;
	document.querySelector("#__taggbox__show_is_ck").checked = false;
	if (__taggbox__customizationsOptions.ThemeRule.inheritStyles == 1)
		document.querySelector("#__taggbox__show_is_ck").checked = true;
	document.querySelector("#__taggbox__show_so_ck").checked = false;
	if (__taggbox__customizationsOptions.ThemeRule.shareOption == 1)
		document.querySelector("#__taggbox__show_so_ck").checked = true;
	document.querySelector("#__taggbox__hide_c_ck").checked = false;
	if (__taggbox__customizationsOptions.ThemeRule.hideContent == 1)
		document.querySelector("#__taggbox__hide_c_ck").checked = true;
	document.querySelector("#__taggbox__show_ad_ck").checked = false;
	if (__taggbox__customizationsOptions.Personalization.postAuthor == 1)
		document.querySelector("#__taggbox__show_ad_ck").checked = true;
	document.querySelector("#__taggbox__show_date_ck").checked = false;
	if (__taggbox__customizationsOptions.Personalization.postTime == 1)
		document.querySelector("#__taggbox__show_date_ck").checked = true;
	document.querySelector("#__taggbox__linetrim").value = (__taggbox__customizationsOptions.ThemeRule.lineTrim == null) ? 0 : __taggbox__customizationsOptions.ThemeRule.lineTrim
	document.querySelector("#__taggbox__aspectimageratio").value = __taggbox__customizationsOptions.ThemeRule.aspectImageRatio;
	document.querySelector("#__taggbox__left_alignment").checked = false;
	document.querySelector("#__taggbox__center_alignment").checked = false;
	document.querySelector("#__taggbox__right_alignment").checked = false;
	if (__taggbox__customizationsOptions.ThemeRule.textAlignment == 'left')
		document.querySelector("#__taggbox__left_alignment").checked = true;
	if (__taggbox__customizationsOptions.ThemeRule.textAlignment == 'right')
		document.querySelector("#__taggbox__right_alignment").checked = true;
	if (__taggbox__customizationsOptions.ThemeRule.textAlignment == 'center' || __taggbox__customizationsOptions.ThemeRule.textAlignment == 'NULL')
		document.querySelector("#__taggbox__center_alignment").checked = true;
	document.querySelector("#__taggbox__square_curve").checked = false;
	document.querySelector("#__taggbox__rounded_corner").checked = false;
	document.querySelector("#__taggbox__circular_corner").checked = false;
	if (__taggbox__customizationsOptions.ThemeRule.borderRadius == 0)
		document.querySelector("#__taggbox__square_curve").checked = true;
	if (__taggbox__customizationsOptions.ThemeRule.borderRadius == 8)
		document.querySelector("#__taggbox__rounded_corner").checked = true;
	if (__taggbox__customizationsOptions.ThemeRule.borderRadius == 24)
		document.querySelector("#__taggbox__circular_corner").checked = true;
	/*--End-- Manage Card Setting*/

	/*--Start-- Manage Custom Css Setting*/
	document.querySelector("#__taggbox__custom_css").value = __taggbox__customizationsOptions.Personalization.css;
	/*--End-- Manage Custom Css Setting*/

	/*--Start-- Manage Footer Setting*/
	document.querySelector("#__taggbox__show_more").checked = false;
	document.querySelector("#__taggbox__auto_load").checked = false;
	document.querySelector("#__taggbox__showmore_autoload_none").checked = false;
	if (__taggbox__customizationsOptions.Personalization.loadMoreStatus == 1)
		document.querySelector("#__taggbox__show_more").checked = true;
	if (__taggbox__customizationsOptions.Personalization.autoScrollStatus == 1)
		document.querySelector("#__taggbox__auto_load").checked = true;
	if (__taggbox__customizationsOptions.Personalization.loadMoreStatus == 0 && __taggbox__customizationsOptions.Personalization.autoScrollStatus == 0)
		document.querySelector("#__taggbox__showmore_autoload_none").checked = true;
	/*--End-- Manage Footer Setting*/

	/*Manage Customizaton Section Hide Show*/
	document.querySelector("#__taggbox__customization_section").style.display = "flex";
}
/*--End-- Manage Customization Options*/
/*--End--Get Customization Option*/

/*--Start--Update Customization Option*/
function __taggbox__updateCustomizationOption(__taggbox__optionType) {
	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('personalizationId', document.querySelector("#__taggbox__personalization_id").value);
	formData.append('themeRuleId', document.querySelector("#__taggbox__themeRule_id").value);
	switch (__taggbox__optionType) {
		case 'footer':
			let __taggbox__autoScrollStatusValue = 0;
			let __taggbox__showMoreValue = 0;
			if (document.querySelector("#__taggbox__show_more").checked) {
				__taggbox__showMoreValue = 1;
				__taggbox__autoScrollStatusValue = 0;
			}
			if (document.querySelector("#__taggbox__auto_load").checked) {
				__taggbox__showMoreValue = 0;
				__taggbox__autoScrollStatusValue = 1;
			}
			if (document.querySelector("#__taggbox__showmore_autoload_none").checked) {
				__taggbox__showMoreValue = 0;
				__taggbox__autoScrollStatusValue = 0;
			}
			/*Manage Form Data*/
			formData.append('loadMoreStatus', __taggbox__showMoreValue);
			formData.append('autoScrollStatus', __taggbox__autoScrollStatusValue);
			break;
		case 'layout':
			let __taggbox__total_numberOFPostToDisplay = document.querySelector("#__taggbox__total_noptd").value;
			let __taggbox__postSpacing = document.querySelector("#__taggbox__ps").value;
			let __taggbox__maximumPostWidth = document.querySelector("#__taggbox__post_mw").value;
			let __taggbox__columnCountDesktop = document.querySelector("#__taggbox__columnCount").value;
			let __taggbox__columnCountMobile = document.querySelector("#__taggbox__columnCountMobile").value;
			let __taggbox__hideTextOnlyPostCheckBoxValue = 0;
			let __taggbox__hideTextOnlyPost = document.querySelector("#__taggbox__hide_top_ck");
			if (__taggbox__hideTextOnlyPost.checked)
				__taggbox__hideTextOnlyPostCheckBoxValue = 1;
			let __taggbox__featurePopupCheckBoxValue = 0;
			if (document.querySelector("#__taggbox__featured_popup").checked)
				__taggbox__featurePopupCheckBoxValue = 1;
			let __taggbox__directToSourceCheckBoxValue = 0;
			if (document.querySelector("#__taggbox__direct_to_source").checked)
				__taggbox__directToSourceCheckBoxValue = 1;
			if (document.querySelector("#__taggbox__none").checked) {
				__taggbox__directToSourceCheckBoxValue = 0;
				__taggbox__featurePopupCheckBoxValue = 0;
			}
			/*Manage Form Data*/
			formData.append('numberOfPosts', __taggbox__total_numberOFPostToDisplay);
			formData.append('padding', __taggbox__postSpacing);
			formData.append('minimumPostWidth', __taggbox__maximumPostWidth);
			formData.append('columnCount', __taggbox__columnCountDesktop);
			formData.append('columnCountMobile', __taggbox__columnCountMobile);
			formData.append('postText', __taggbox__hideTextOnlyPostCheckBoxValue);
			formData.append('mobilePopup', __taggbox__directToSourceCheckBoxValue);
			formData.append('postFeatured', __taggbox__featurePopupCheckBoxValue);
			break;
		case 'card':
			let __taggbox__fontColor = document.querySelector("#__taggbox__fontColor").value;
			let __taggbox__authorFontColor = document.querySelector("#__taggbox__authorFontColor").value;
			let __taggbox__cardColor = document.querySelector("#__taggbox__cardColor").value;
			let __taggbox__fontSize = document.querySelector("#__taggbox__post_font_size").value;
			let __taggbox__inheritStylesOptionCheckBoxValue = 0;
			let __taggbox__show_is_ck = document.querySelector("#__taggbox__show_is_ck");
			if (__taggbox__show_is_ck.checked)
				__taggbox__inheritStylesOptionCheckBoxValue = 1;
			let __taggbox__showShareOptionCheckBoxValue = 0;
			let __taggbox__show_so_ck = document.querySelector("#__taggbox__show_so_ck");
			if (__taggbox__show_so_ck.checked)
				__taggbox__showShareOptionCheckBoxValue = 1;
			let __taggbox__hideContentCheckBoxValue = 0;
			let __taggbox__hide_c_ck = document.querySelector("#__taggbox__hide_c_ck");
			if (__taggbox__hide_c_ck.checked)
				__taggbox__hideContentCheckBoxValue = 1;
			let __taggbox__showAuthorDetailsCheckBoxValue = 0;
			let __taggbox__show_ad_ck = document.querySelector("#__taggbox__show_ad_ck");
			if (__taggbox__show_ad_ck.checked)
				__taggbox__showAuthorDetailsCheckBoxValue = 1;
			let __taggbox__showDataCheckBoxValue = 0;
			let __taggbox__show_date_ck = document.querySelector("#__taggbox__show_date_ck");
			if (__taggbox__show_date_ck.checked)
				__taggbox__showDataCheckBoxValue = 1;
			/*New Card Style Data*/

			let __taggbox__linetrim = document.querySelector("#__taggbox__linetrim").value;
			let __taggbox__aspectImageRatio = document.querySelector("#__taggbox__aspectimageratio").value;
			if (document.querySelector("#__taggbox__left_alignment").checked)
				__taggbox__textAlignment = 'left';
			if (document.querySelector("#__taggbox__center_alignment").checked)
				__taggbox__textAlignment = 'center';
			if (document.querySelector("#__taggbox__right_alignment").checked)
				__taggbox__textAlignment = 'right';
			if (document.querySelector("#__taggbox__square_curve").checked)
				__taggbox__cardCurve = 0;
			if (document.querySelector("#__taggbox__rounded_corner").checked)
				__taggbox__cardCurve = 8;
			if (document.querySelector("#__taggbox__circular_corner").checked)
				__taggbox__cardCurve = 24;
			/*Manage Form Data*/
			formData.append('inheritStyles', __taggbox__inheritStylesOptionCheckBoxValue);
			formData.append('fontColor', __taggbox__fontColor);
			formData.append('authorColor', __taggbox__authorFontColor);
			formData.append('cardColor', __taggbox__cardColor);
			formData.append('fontSize', __taggbox__fontSize);
			formData.append('shareOption', __taggbox__showShareOptionCheckBoxValue);
			formData.append('hideContent', __taggbox__hideContentCheckBoxValue);
			formData.append('postAuthor', __taggbox__showAuthorDetailsCheckBoxValue);
			formData.append('postTime', __taggbox__showDataCheckBoxValue);
			formData.append('lineTrim', __taggbox__linetrim);
			formData.append('aspectImageRatio', __taggbox__aspectImageRatio);
			formData.append('textAlignment', __taggbox__textAlignment);
			formData.append('borderRadius', __taggbox__cardCurve);
			break;
		case 'other':
			let __taggbox__customCss = document.querySelector("#__taggbox__custom_css").value;
			/*Manage Form Data*/
			formData.append('css', __taggbox__customCss);
			break;
		default:
			return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			break;
	}
	/*Get And Manage Widget Id*/
	let widgetId = document.querySelector("#__taggbox__widgets").selectedOptions[0];
	widgetId = widgetId.value.split('#')[0];
	formData.append('action', 'data');
	formData.append('widgetId', widgetId);
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__update_' + __taggbox__optionType + '_customization_option');
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
			if (response.data.hasOwnProperty("message"))
				__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
		} else {
			if (response.hasOwnProperty("message")) {
				__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
			} else {
				__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			}
		}
	}).catch((error) => {
		console.log(error);
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	});
}
/*--End--Update Customization Option*/

/*--Start--Manage Customize Menue Hide Show*/
function __taggbox__manageCustomizeMenueHideShow(__taggbox__customize_menue) {
	/*Section*/
	let __taggbox__layoutSettings = document.querySelector("#__taggbox__layout_settings");
	let __taggbox__cardSettings = document.querySelector("#__taggbox__card_settings");
	let __taggbox__otherSettings = document.querySelector("#__taggbox__other_settings");
	let __taggbox__footer_settings = document.querySelector("#__taggbox__footer_settings");
	/*Menue*/
	let __taggbox__layoutSettingsMenue = document.querySelector("#__taggbox__layout_settings_menue");
	let __taggbox__cardSettingsMenue = document.querySelector("#__taggbox__card_settings_menue");
	let __taggbox__otherSettingsMenue = document.querySelector("#__taggbox__other_settings_menue");
	let __taggbox__footer_settings_menue = document.querySelector("#__taggbox__footer_settings_menue");
	switch (__taggbox__customize_menue) {
		case 'ls':
			__taggbox__cardSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__cardSettings.style.display = "none";

			__taggbox__otherSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__otherSettings.style.display = "none";

			__taggbox__footer_settings_menue.classList.remove("__taggbox__active");
			__taggbox__footer_settings.style.display = "none";

			__taggbox__layoutSettingsMenue.classList.add("__taggbox__active");
			__taggbox__layoutSettings.style.display = "block";
			break;
		case 'cs':
			__taggbox__layoutSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__layoutSettings.style.display = "none";

			__taggbox__otherSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__otherSettings.style.display = "none";

			__taggbox__footer_settings_menue.classList.remove("__taggbox__active");
			__taggbox__footer_settings.style.display = "none";

			__taggbox__cardSettingsMenue.classList.add("__taggbox__active");
			__taggbox__cardSettings.style.display = "block";
			break;
		case 'os':
			__taggbox__layoutSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__layoutSettings.style.display = "none";

			__taggbox__cardSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__cardSettings.style.display = "none";

			__taggbox__footer_settings_menue.classList.remove("__taggbox__active");
			__taggbox__footer_settings.style.display = "none";

			__taggbox__otherSettingsMenue.classList.add("__taggbox__active");
			__taggbox__otherSettings.style.display = "block";
			break;
		case 'fo':
			__taggbox__layoutSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__layoutSettings.style.display = "none";

			__taggbox__cardSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__cardSettings.style.display = "none";

			__taggbox__otherSettingsMenue.classList.remove("__taggbox__active");
			__taggbox__otherSettings.style.display = "none";

			__taggbox__footer_settings_menue.classList.add("__taggbox__active");
			__taggbox__footer_settings.style.display = "block";
			break;
		default:
			let __taggbox__toast = new TaggboxToast;
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			break;
	}
}
/*--End--Manage Customize Menue Hide Show*/
/*--Start-- Show Range Input Value*/
function __taggbox__showRangeInputValue(__taggbox__range_val, __taggbox__range_value_Show_section_id) {
	let __taggbox__rangeValueShowSection = document.getElementById(__taggbox__range_value_Show_section_id);
	if (__taggbox__rangeValueShowSection)
		__taggbox__rangeValueShowSection.innerHTML = __taggbox__range_val;
}
/*--End-- Show Range Input Value*/
/*--Start-- Show Range Input Value*/
function __taggbox__showColorInputValue(__taggbox__color_val, __taggbox__color_value_Show_section_id) {
	let __taggbox__colorValueShowSection = document.getElementById(__taggbox__color_value_Show_section_id);
	if (__taggbox__colorValueShowSection)
		__taggbox__colorValueShowSection.innerHTML = __taggbox__color_val;
}
/*--End-- Show Range Input Value*/
