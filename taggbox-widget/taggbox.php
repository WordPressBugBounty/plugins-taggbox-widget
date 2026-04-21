<?php

/**
 * Plugin Name:       Taggbox: Social Feed Widgets
 * Plugin URI:        https://taggbox.com/widget/
 * Description:       Display social media feeds and user-generated content in an interactive widget.
 * Version:           3.9
 * Author:            Taggbox
 * Author URI:        https://taggbox.com/
 * License:           GPLv3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 */
if (!defined('WPINC')) :
	die;
endif;

/* --Start-- Create Constant */
!defined('TAGGBOX_PLUGIN_VERSION')          && define('TAGGBOX_PLUGIN_VERSION',          '3.9');
!defined('TAGGBOX_PLUGIN_DIR_PATH')         && define('TAGGBOX_PLUGIN_DIR_PATH',         plugin_dir_path(__FILE__));
!defined('TAGGBOX_PLUGIN_URL')              && define('TAGGBOX_PLUGIN_URL',              plugin_dir_url(__FILE__));
!defined('TAGGBOX_PLUGIN_REDIRECT_URL')     && define('TAGGBOX_PLUGIN_REDIRECT_URL',     get_admin_url(null, 'admin.php?page='));
!defined('TAGGBOX_PLUGIN_API_URL')          && define('TAGGBOX_PLUGIN_API_URL',          'https://api.tagembed.com/app/');
!defined('TAGGBOX_PLUGIN_SERVER_URL')       && define('TAGGBOX_PLUGIN_SERVER_URL',       'https://api.tagembed.com/app/');
!defined('TAGGBOX_PLUGIN_REACT_URL')        && define('TAGGBOX_PLUGIN_REACT_URL',        'https://widget.taggbox.com/');
!defined('TAGGBOX_PLUGIN_CALL_BACK_URL')    && define('TAGGBOX_PLUGIN_CALL_BACK_URL',    admin_url() . 'admin.php?page=taggbox');
!defined('TAGGBOX_PLUGIN_PLATFORM')         && define('TAGGBOX_PLUGIN_PLATFORM',         'taggbox');
!defined('TAGGBOX_PLUGIN_OTHER_PLUGIN')     && define('TAGGBOX_PLUGIN_OTHER_PLUGIN',     'tagembed-widget/tagembed.php');
!defined('TAGGBOX_PLUGIN_OTHER_PLUGIN_URL') && define('TAGGBOX_PLUGIN_OTHER_PLUGIN_URL', admin_url() . 'admin.php?page=tagembed');
/* --End-- Create Constant */

/* --Start--Include Files */
require_once TAGGBOX_PLUGIN_DIR_PATH . 'helper/helper.php';
/* --End--Include Files */

/* --Start-- Add Js And Css */
function taggbox_plugin_scripts_css()
{
	wp_enqueue_script('__taggbox__embbedJs', TAGGBOX_PLUGIN_REACT_URL . 'embed.min.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
	if (is_admin()) :
		/* CSS */
		wp_enqueue_style('__taggbox__commonCss', TAGGBOX_PLUGIN_URL . '/assets/css/common.css', '', TAGGBOX_PLUGIN_VERSION);
		wp_enqueue_style('__taggbox__toastCss', TAGGBOX_PLUGIN_URL . '/assets/css/toast.css', '', TAGGBOX_PLUGIN_VERSION);
		wp_enqueue_style('__taggbox__confirmDialogCss', TAGGBOX_PLUGIN_URL . '/assets/css/confirm_dialog.css', '', TAGGBOX_PLUGIN_VERSION);
		wp_enqueue_style('__taggbox__loaderCss', TAGGBOX_PLUGIN_URL . '/assets/css/loader.css', '', TAGGBOX_PLUGIN_VERSION);
		wp_enqueue_style('__taggbox__popupCss', TAGGBOX_PLUGIN_URL . '/assets/css/styles.css', '', TAGGBOX_PLUGIN_VERSION);

		/* JS */
		wp_enqueue_script('__taggbox__toastJs', TAGGBOX_PLUGIN_URL . '/assets/js/toast.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
		wp_enqueue_script('__taggbox__confirmDialogJs', TAGGBOX_PLUGIN_URL . '/assets/js/confirm_dialog.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
		wp_enqueue_script('__taggbox__tagemedLoaderJs', TAGGBOX_PLUGIN_URL . '/assets/js/loader.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
		wp_localize_script('__taggbox__tagemedLoaderJs', '__taggbox__pluginLoaderImageUrlObj', ['__taggbox__pluginLoaderImageUrl' => TAGGBOX_PLUGIN_URL]);
		wp_enqueue_script('__taggbox__deactive-js', TAGGBOX_PLUGIN_URL . '/assets/js/taggbox.deactive.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
		$__taggbox__ajax_call_security_nones = wp_create_nonce('__taggbox__ajax_call_security_nones');
		wp_localize_script('__taggbox__deactive-js', '__taggbox__ajax_call_security_nones_object', ['__taggbox__ajax_call_security_nones' => $__taggbox__ajax_call_security_nones]);
		wp_enqueue_script('__taggbox__DialogFormJs', TAGGBOX_PLUGIN_URL . '/assets/js/dialog.form.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
		/* --Start-- Gutenberge */
		if (!function_exists('register_block_type')) :
			return;
		else :
			wp_enqueue_style('__taggbox__editorCss', TAGGBOX_PLUGIN_URL . '/assets/css/editor/editor.css', '', 6468464646);
			wp_register_script("__taggbox__editor-js", TAGGBOX_PLUGIN_URL . '/assets/js/editor/editor.js', ["wp-blocks", "wp-element", "wp-block-editor", "wp-components", "wp-i18n", "wp-data", "wp-compose"], rand(0000, 9999));
			register_block_type("taggbox-block/taggbox", ["editor_script" => "__taggbox__editor-js", "editor_style" => "__taggbox__editorCss", "style" => ""]);
		endif;
	/* --End-- Gutenberge */
	endif;
}
add_action('init', 'taggbox_plugin_scripts_css');
add_filter(
	'script_loader_tag',
	function ($tag, $handle) {
		if ('embbedJs' !== $handle) :
			return $tag;
		else :
			return str_replace('src', 'defer src', $tag);
		endif;
	},
	10,
	2
);
/* --End-- Add Js And Css */

/* --Start-- Add Menus */
function ___taggbox_plugin_menus()
{
	ob_start();
?>
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 141.4 141.4" width="200px" height="200px">
		<title>Taggbox Icon</title>
		<g id="Layer_2" data-name="Layer 2">
			<g id="Layer_1-2" data-name="Layer 1">
				<g id="Layer_2-2" data-name="Layer 2">
					<path fill="#ccc" d="M70.7,141.4a70.7,70.7,0,1,1,70.7-70.7A70.82,70.82,0,0,1,70.7,141.4Zm0-135.7a65,65,0,1,0,65,65A65,65,0,0,0,70.7,5.7Z" />
				</g>
				<g id="Layer_3" data-name="Layer 3">
					<path fill="#ccc" d="M133,70.7A62.4,62.4,0,1,1,70.6,8.3,62.42,62.42,0,0,1,133,70.7Z" />
				</g>
				<g id="Layer_4" data-name="Layer 4">
					<polygon points="115.4 45.3 26 45.3 26 73.2 51.9 73.2 51.9 107.2 90.5 73.2 115.4 73.2 115.4 45.3" />
				</g>
			</g>
		</g>
	</svg>
<?php
	$svg = ob_get_clean();
	add_menu_page('Taggbox', 'Taggbox Widget', 'manage_options', 'taggbox', 'taggbox_view', 'data:image/svg+xml;base64,' . base64_encode($svg));
}
add_action("admin_menu", '___taggbox_plugin_menus');
/* --End-- Add Menus */

/* --Start-- Add & Manage Views */
function taggbox_view()
{
	if (!empty(taggbox_user()->isLogin) && taggbox_user()->isLogin == 'yes') :
		$__taggbox__menus = taggbox_menus(['__taggbox__menu_condation' => 1]);
		if (empty($__taggbox__menus)) :
			include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/widget/widgetView.php';
		else :
			include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/' . $__taggbox__menus[0]->path . '.php';
		endif;
	else :
		include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/account/accountView.php';
	endif;
}
/* --End-- Add & Manage Views */

/* --Start-- Feed Count For First Time Create */
function taggbox_get_feed_count_information($userDetails, $networkId)
{
	$param['networkId'] = sanitize_key($networkId);
	$param['userId']    = sanitize_key($userDetails->userId);
	$response           = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/getFeedCountForFirstTimeFeed', $param, ['Authorization:' . $userDetails->accessToken]);
	if (200 == $response->head->code || !empty($response->body) || $response->body || $response->head->status) :
		return $response->body;
	endif;
}
/* --End-- Feed Count For First Time Create */

/* --Start-- Manage Ajax Calls */
add_action('wp_ajax_taggbox_data', 'taggbox_data_ajax_handler');
function taggbox_data_ajax_handler()
{
	if (!current_user_can('manage_options')):
		return taggbox_exitWithDanger('You do not have sufficient permissions to access this page.');
	endif;
	if (empty($_REQUEST['__taggbox__ajax_action'])) :
		return false;
	endif;
	$data = taggbox_sanitizeRequestData($_REQUEST);
	$data = (object)$data;
	/* --Start-- Manage Ajax call Request Security */
	$__taggbox__ajaxCallSecurityNones = isset($data->__taggbox__ajax_call_nones) ? sanitize_text_field($data->__taggbox__ajax_call_nones) : '';
	if (!wp_verify_nonce($__taggbox__ajaxCallSecurityNones, '__taggbox__ajax_call_security_nones')) :
		return taggbox_exitWithDanger();
	endif;
	/* --End-- Manage Ajax call Request Security */
	/* --Start__ Sanetize All Input */
	foreach ($data as $key => $value) :
		if (!in_array($key, ['emailId', 'password', 'youtubePlaylist'])) :
			taggbox_inputSanetize($value);
		endif;
	endforeach;
	/* --End__ Sanetize All Input */

	$param = [];
	global $wpdb;
	$action = $data->__taggbox__ajax_action;
	$__taggbox__user_details = taggbox_user();
	switch ($action):
		case '__taggbox__getCallingCode':
			/* --Start-- Manage Param Data */
			$param['platform']  = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/getCallingCode', $param, []);
			$response = taggbox_manageApiResponse($response);
			unset($param);
			return taggbox_exitWithSuccess(['callingCode' => $response]);
			break;
		case '__taggbox__register':
			if (empty($data->emailId) || empty($data->password) || empty($data->fullName)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['fullName']     = sanitize_text_field($data->fullName);
			$param['emailId']      = sanitize_email($data->emailId);
			$param['password']     = $data->password;
			$param['contact_no']   = $data->contact_no;
			$param['calling_code'] = $data->calling_code;
			$param['platform']     = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/register', $param, []);
			$response = taggbox_manageApiResponse($response);
			unset($param);

			/*Mange Other Plugin Login*/
			if (isset($response->accountAlreadyOtherPluginStatus)):
				$taggbox_other_plugin_install_status = false;
				if (function_exists('is_plugin_active') && is_plugin_active(TAGGBOX_PLUGIN_OTHER_PLUGIN))
					$taggbox_other_plugin_install_status = true;
				return taggbox_exitWithSuccess([
					'accountAlreadyOtherPluginStatus' => $response->accountAlreadyOtherPluginStatus,
					'pluginUrl'                       => $response->pluginUrl,
					'existingPluginUser'              => $response->existingPluginUser,
					'otherPluginInstallStatus'        => $taggbox_other_plugin_install_status,
					'otherPluginInstallUrl'           => TAGGBOX_PLUGIN_OTHER_PLUGIN_URL,
				]);
			endif;

			$param = ['userId' => sanitize_key($response->userId), 'inheritStyles' => 1];
			taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiwidget/create', $param, ['Authorization:' . $response->access_token]);
			if (taggbox_login($response) == true) :
				return taggbox_exitWithSuccess(['redirectUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL]);
			else :
				return taggbox_exitWithDanger();
			endif;
			break;
		case '__taggbox__login':
			if (empty($data->emailId) || empty($data->password)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['emailId']  = sanitize_email($data->emailId);
			$param['password'] = $data->password;
			$param['platform']   = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/login', $param, []);
			unset($param);
			$response = taggbox_manageApiResponse($response);

			/*Mange Other Plugin Login*/
			if (isset($response->accountAlreadyOtherPluginStatus)):
				$taggbox_other_plugin_install_status = false;
				if (function_exists('is_plugin_active') && is_plugin_active(TAGGBOX_PLUGIN_OTHER_PLUGIN))
					$taggbox_other_plugin_install_status = true;
				return taggbox_exitWithSuccess([
					'accountAlreadyOtherPluginStatus' => $response->accountAlreadyOtherPluginStatus,
					'pluginUrl'                       => $response->pluginUrl,
					'existingPluginUser'              => $response->existingPluginUser,
					'otherPluginInstallStatus'        => $taggbox_other_plugin_install_status,
					'otherPluginInstallUrl'           => TAGGBOX_PLUGIN_OTHER_PLUGIN_URL,
				]);
			endif;

			if (taggbox_login($response) == true) :
				return taggbox_exitWithSuccess(['redirectUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL]);
			else :
				return taggbox_exitWithDanger();
			endif;
			break;
		case '__taggbox__logout':
			if (taggbox_logout()) :
				return taggbox_exitWithSuccess(['redirectUrl' => TAGGBOX_PLUGIN_REDIRECT_URL . 'taggbox']);
			else :
				return taggbox_exitWithDanger();
			endif;
			break;
		case '__taggbox__check_plan_premium_feature':
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/checkPlanPremiumFeature', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__check_user_accout_status':
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/checkUserAccountStatus', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_account_details':
			$data->auth = !empty($data->auth) ? 1 : 0;
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			$param['platform'] = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/getdetails', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__manage_active_widget':
			if (empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			if (taggbox_manageActiveWidget($data->widgetId)) :
				return taggbox_exitWithSuccess();
			else :
				return taggbox_exitWithDanger();
			endif;
			break;
		case '__taggbox__menue':
			if (empty($data->menueId)) :
				return taggbox_exitWithDanger();
			endif;
			if (taggbox_menus(['__taggbox__menu_id' => $data->menueId])) :
				return taggbox_exitWithSuccess(['redirectUrl' => TAGGBOX_PLUGIN_REDIRECT_URL . 'taggbox']);
			else :
				return taggbox_exitWithDanger();
			endif;
			break;
		case '__taggbox__create_widget':
			if (empty($__taggbox__user_details) || empty($data->name)) :
				return taggbox_exitWithDanger('Validation Error', ['name' => 'Widget name is required']);
			endif;
			$data->profanity = (isset($data->profanity)) ? 0 : 1;
			/* --Start-- Manage Param Data */
			$param['name']          = sanitize_text_field($data->name);
			$param['profanity']     = sanitize_key($data->profanity);
			$param['userId']        = sanitize_key($__taggbox__user_details->userId);
			$param['inheritStyles'] = 1;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiwidget/create', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response, 'redirectUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL]);
			break;
		case '__taggbox__edit_widget':
			if (empty($__taggbox__user_details) || empty($data->name) || empty($data->widgetId)) :
				return taggbox_exitWithDanger('Validation Error', ['name' => 'Widget name is required']);
			endif;
			/* --Start-- Manage Param Data */
			$param['name']     = sanitize_text_field($data->name);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiwidget/edit', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response, 'redirectUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL]);
			break;
		case '__taggbox__update_widget_status':
			if (empty($__taggbox__user_details) || empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['status']   = sanitize_key($data->status);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiwidget/status', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__delete_widget':
			if (empty($__taggbox__user_details) || empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiwidget/delete', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__source_networks':
			$data->auth = !empty($data->auth) ? 1 : 0;
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['auth']   = sanitize_key($data->auth);
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apinetwork/get', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_themes':
			if (empty($__taggbox__user_details) || empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'Apitheme/get', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__edit_themes':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || empty($data->themeId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['themeId']  = sanitize_key($data->themeId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'Apitheme/edit', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_network_filter':
			if (empty($__taggbox__user_details) || empty($data->networkId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['networkId'] = sanitize_key($data->networkId);
			$param['userId']    = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apinetwork/filter', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_already_exist_accounts':
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiauth/getalreadyexistaccounts', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__add_or_update_account':
			if (empty($__taggbox__user_details) || empty($data->networkId) || empty($data->type)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['connectedAccountId'] = $data->connectedAccountId;
			$param['feedId']             = sanitize_key($data->feedId);
			$param['type']               = sanitize_text_field($data->type);
			$param['networkId']          = sanitize_key($data->networkId);
			$param['filterId']           = sanitize_key($data->filterId);
			$param['otherData']          = $data->otherData;
			$param['userId']             = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiauth/addorupdate', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess(['__taggbox__requestCallBackUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL, 'redirectUrl' => TAGGBOX_PLUGIN_API_URL . 'apiauth/getauth', '__taggbox__feedData' => $response->__taggbox__feedData]);
			break;
		case '__taggbox__delete_account':
			if (empty($__taggbox__user_details) || empty($data->networkId) || empty($data->parentId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['parentId']  = sanitize_key($data->parentId);
			$param['networkId'] = sanitize_key($data->networkId);
			$param['userId']    = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiauth/delete', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__get_already_exist_auth':
			if (empty($__taggbox__user_details) || empty($data->networkId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['networkId'] = sanitize_key($data->networkId);
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiauth/get', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__search_google_location':
			if (empty($__taggbox__user_details) || empty($data->googleLocationName)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['googleLocationName'] = $data->googleLocationName;
			$param['userId']             = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/searchgooglelocation', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__search_vk_communities':
			if (empty($__taggbox__user_details) || empty($data->vkCommunitiesName)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['vkCommunitiesName'] = $data->vkCommunitiesName;
			$param['userId']            = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/searchVkCommunities', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__search_facebook_page':
			if (empty($data->facebookPageData)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['facebookPageData'] = $data->facebookPageData;
			$param['userId']           = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			/* --Start-- Call And Manage Api Call */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/searchfacebookpage', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_facebook_page_albums':
			if (empty($__taggbox__user_details) || empty($data->connectedAccountsId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['connectedAccountsId'] = sanitize_key($data->connectedAccountsId);
			$param['userId']              = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiauth/apiauthfacebookpagealbums', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__search_youtube_channel':
			if (empty($__taggbox__user_details) || empty($data->youtubeChannelData)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['youtubeChannelData'] = $data->youtubeChannelData;
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/searchyoutubechannel', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_youtube_playlist':
			if (empty($__taggbox__user_details) || empty($data->youtubeId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['youtubeId'] = $data->youtubeId;
			$param['userId']    = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/getyoutubeplaylist', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_slack_channel_list':
			if (empty($data->connectedAccountsId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['connectedAccountsId'] = $data->connectedAccountsId;
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/getslackchannellist', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_feed':
			if (empty($__taggbox__user_details) || empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/get', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__update_feed_status':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || empty($data->feedId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['feedId']   = sanitize_key($data->feedId);
			$param['status']   = sanitize_key($data->status);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/status', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__delete_feed':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || empty($data->feedId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['feedId']   = sanitize_key($data->feedId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/delete', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__create_feed':
			if (empty($__taggbox__user_details) || empty($data->widgetName) || empty($data->networkName) || empty($data->filterName) || empty($data->widgetId) || empty($data->networkId) || empty($data->filterId)) :
				return taggbox_exitWithDanger();
			endif;
			$__taggbox__feed_input_data = ['feed' => sanitize_text_field($data->feed), 'userId' => sanitize_key($__taggbox__user_details->userId), 'moderation' => sanitize_key(isset($data->moderation) ? 1 : 0), 'widgetName' => sanitize_text_field($data->widgetName), 'networkName' => sanitize_text_field($data->networkName), 'filterName' => sanitize_text_field($data->filterName), 'widgetId' => sanitize_key($data->widgetId), 'networkId' => sanitize_key($data->networkId), 'filterId' => sanitize_key($data->filterId), 'auth' => 0, 'authId' => isset($data->authId) ? sanitize_key($data->authId) : 0];
			$__taggbox__feed_input_data['feed'] = !empty($data->feed) ? sanitize_text_field($data->feed) : '__taggbox__feed';
			$__taggbox__feed_filter_id = $data->filterId;
			switch ($__taggbox__feed_input_data['networkId']):
				case 1:
					$__taggbox__feed_input_data['auth']           = 1;
					$__taggbox__feed_input_data['multiplePhoto']  = sanitize_key(isset($data->multiplePhoto) ? 1 : 0);
					$__taggbox__feed_input_data['excludeRetweet'] = sanitize_key(isset($data->excludeRetweet) ? 1 : 0);
					if (!empty($data->list)) :
						$__taggbox__feed_input_data['list'] = sanitize_key($data->list);
					endif;
					break;
				case 2:
					$__taggbox__feed_input_data['auth'] = 1;
					break;
				case 3:
					$__taggbox__feed_input_data['auth'] = 1;
					switch ($__taggbox__feed_filter_id):
						case 65:
							$__taggbox__feed_input_data['accountAlbumType'] = sanitize_key(isset($data->accountAlbumType) ? $data->accountAlbumType : '');
							$__taggbox__feed_input_data['accountAlbumData'] = sanitize_text_field(isset($data->accountAlbumData) ? $data->accountAlbumData : '');
							break;
					endswitch;
					break;
				case 4:
					if ($__taggbox__feed_filter_id == 29) :
						$__taggbox__feed_input_data['auth'] = 1;
					else :
						$__taggbox__feed_input_data['placeId']   = $data->placeId;
						$__taggbox__feed_input_data['placeName'] = $data->placeName;
					endif;
					break;
				case 5:
					switch ($__taggbox__feed_filter_id):
						case 1:
						case 71:
							break;
						case 12:
							if (!preg_match('/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
							endif;
							$pintrestHeaders                       = explode('/', parse_url($data->feed)['path']);
							$__taggbox__feed_input_data['value1'] = strtolower($pintrestHeaders[1]);
							$__taggbox__feed_input_data['value2'] = strtolower($pintrestHeaders[2]);
							break;
					endswitch;
					break;
				case 6:
					switch ($__taggbox__feed_filter_id):
						case 1:
						case 2:
							$__taggbox__feed_input_data['feed'] = $__taggbox__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					break;
				case 7:
					if (in_array($__taggbox__feed_filter_id, [1, 71])) :
						$isUrl = false;
						if (preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
							$isUrl = true;
						endif;
						if ((empty($data->youtubeId) || empty($data->youtubeName)) && !$isUrl) :
							return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid Channel URL Or Tab On Search Icon']);
						endif;
						if ($isUrl) :
							$data->youtubeId   = explode('/', $data->feed);
							$data->youtubeId   = $data->youtubeId[4];
							$data->youtubeName = 'youtube';
							if (empty($data->youtubeId) || empty($data->youtubeName)) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid Channel URL']);
							endif;
						endif;
					endif;
					switch ($__taggbox__feed_filter_id):
						case 1:
						case 75:
							$__taggbox__feed_input_data['youtubeId']   = $data->youtubeId;
							$__taggbox__feed_input_data['youtubeName'] = $data->youtubeName;
							break;
						case 11:
							if (empty($data->youtubePlaylist) && empty($data->youtubeId)) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid Channel URL Or Tab On Search Icon']);
							elseif (empty($data->youtubePlaylist) && !empty($data->youtubeId)) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Play List Not Found']);
							endif;
							$data->youtubePlaylist                      = explode('#', $data->youtubePlaylist);
							$__taggbox__feed_input_data['youtubeId']   = $data->youtubePlaylist[0];
							$__taggbox__feed_input_data['youtubeName'] = $data->youtubePlaylist[1];
							$__taggbox__feed_input_data['feed']        = $data->youtubePlaylist[1];
							unset($data->youtubePlaylist);
							break;
					endswitch;
					break;
				case 8:
					switch ($__taggbox__feed_filter_id):
						case 1:
						case 2:
							$__taggbox__feed_input_data['auth'] = 1;
							break;
					endswitch;
					break;
				case 10:
					if (in_array($__taggbox__feed_filter_id, [1, 16, 17])) :
						if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
							return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
						endif;
					endif;
					switch ($__taggbox__feed_filter_id):
						case 16:
							$postUrl = parse_url($data->feed);
							if (!strstr($postUrl['host'], 'linkedin')) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							$postUrl = $data->feed;
							$postUrl = rtrim($postUrl, '/');
							preg_match('/[^\/]+$/', $postUrl, $postId);
							$postId = $postId[0];
							$postId = (explode('?', $postId)[0]);
							$value1 = 'LinkedIn';
							if (stripos($postId, 'activity') !== false) :
								$postId = (explode('activity', $postId)[1]);
								$value2 = 'activity';
							elseif (stripos($postId, 'ugcPost') !== false) :
								$postId = (explode('ugcPost', $postId)[1]);
								$value2 = 'ugcPost';
							else :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							preg_match_all('!\d+!', $postId, $postId);
							if (isset($postId[0][0]) && empty($postId[0][0])) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							$value3 = $postId[0][0];
							if (empty($value1) || empty($value2) || empty($value3)) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							$__taggbox__feed_input_data['value1'] = $value1;
							$__taggbox__feed_input_data['value2'] = $value2;
							$__taggbox__feed_input_data['value3'] = $value3;
							break;
						case 1:
						case 17:
							$url = parse_url($data->feed);
							$companyPageUrl = $url['scheme'] . '://' . $url['host'];
							$url = explode('/', $url['path']);
							$companyPageUrl = $companyPageUrl . '/' . $url[1] . '/' . $url[2] . '/';
							$__taggbox__feed_input_data['feed'] = $companyPageUrl;
							$url[2] = str_replace('-', ' ', '$url[2]');
							$__taggbox__feed_input_data['page'] = ucwords($url[2], ' ');
							break;
						case 2:
							$__taggbox__feed_input_data['feed'] = $__taggbox__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					break;
				case 11:
					switch ($__taggbox__feed_filter_id):
						case 1:
						case 2:
							$__taggbox__feed_input_data['feed'] = $__taggbox__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					break;
				case 12:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__taggbox__feed_input_data['name'] = $data->name;
					break;
				case 18:
					switch ($__taggbox__feed_filter_id):
						case 23:
							if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
								return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
							endif;
							break;
						case 26:
							$__taggbox__feed_input_data['hashtagCaption'] = sanitize_key(isset($data->hashtagCaption) ? 1 : 0);
							$__taggbox__feed_input_data['hashtagOlder']   = sanitize_key(isset($data->hashtagOlder) ? 1 : 0);
							break;
					endswitch;
					$__taggbox__feed_input_data['auth'] = 1;
					break;
				case 19:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$yelpBusinessUrl = parse_url($data->feed);
					if (!strstr($yelpBusinessUrl['host'], 'yelp')) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter	Yelp	Business	Url']);
					endif;
					$yelpBusinessPath = explode('/', $yelpBusinessUrl['path']);
					$__taggbox__feed_input_data['feed'] = $yelpBusinessPath[2];
					$__taggbox__feed_input_data['name'] = $yelpBusinessPath[2];
					break;
				case 20:
					$__taggbox__feed_input_data['auth'] = 1;
					$slackData = isset($data->slackChannelList) ? $data->slackChannelList : '';
					if (!empty($slackData)) :
						$slackData = explode('#', $slackData);
						$__taggbox__feed_input_data['name'] = $slackData[1];
						$__taggbox__feed_input_data['feed'] = $slackData[0];
					endif;
					break;
				case 23:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$airbnbListUrl = parse_url($data->feed);
					if (strstr($airbnbListUrl['host'], 'airbnb')) :
						preg_match('/[^\/]+$/', $data->feed, $matches);
						$__taggbox__feed_input_data['listId'] = explode('?', $matches[0])[0];
					else :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter	Airbnb	Url']);
					endif;
					$__taggbox__feed_input_data['name'] = $data->name;
					break;
				case 36:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$etsyShopUrl = parse_url($data->feed);
					if (!strstr($etsyShopUrl['host'], 'etsy')) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter	Etsy	Shop	Url']);
					endif;
					$__taggbox__feed_input_data['feed'] = $__taggbox__feed_input_data['name'] = explode('/shop/', $etsyShopUrl['path'])[1];
					break;
				case 28:
					switch ($__taggbox__feed_filter_id):
						case 72:
							$__taggbox__feed_input_data['feed'] = $data->feed;
							$__taggbox__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					if (!in_array($__taggbox__feed_filter_id, [72])) :
						$__taggbox__feed_input_data['auth'] = 1;
					endif;
					break;
				case 30:
					switch ($__taggbox__feed_filter_id):
						case 2:
							$__taggbox__feed_input_data['feed'] = $data->feed;
							$__taggbox__feed_input_data['name'] = $data->feed;
							break;
						case 75:
							$__taggbox__feed_input_data['communitiesName'] = $data->communitiesName;
							$__taggbox__feed_input_data['communitiesId']   = $data->communitiesId;
							break;
					endswitch;
					if (!in_array($__taggbox__feed_filter_id, [2, 75])) :
						$__taggbox__feed_input_data['auth'] = 1;
					endif;
					break;
				case 34:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__taggbox__feed_input_data['name'] = explode('/', $data->feed)[3];
					$__taggbox__feed_input_data['feed'] = $data->feed;
					break;
				case 35:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__taggbox__feed_input_data['name'] = explode('Reviews-', $data->feed)[1];
					$__taggbox__feed_input_data['name'] = explode('.html', $__taggbox__feed_input_data['name'])[0];
					$__taggbox__feed_input_data['feed'] = $data->feed;
					break;
				case 37:
					$data->feed = explode('.html', $data->feed)[0];
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return taggbox_exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__taggbox__feed_input_data['name'] = $data->feed;
					$__taggbox__feed_input_data['feed'] = explode('item/', $data->feed)[1];
					break;
			endswitch;
			unset($data);

			/* --Start-- Manage Api Calling */
			$byApiCall = 0;
			if (empty($__taggbox__feed_input_data['authId'])) :
				switch ($__taggbox__feed_input_data['networkId']):
					case 4:
						if (33 == $__taggbox__feed_filter_id) :
							$byApiCall = 1;
							$__taggbox__feed_input_data['byApiCall'] = 1;
						endif;
						break;
					/*
						case 3:
			            case 18:
						if (23 == $__taggbox__feed_filter_id || 26 == $__taggbox__feed_filter_id || 8 == $__taggbox__feed_filter_id) :
						$__taggbox__get_feed_count_information = taggbox_get_feed_count_information($__taggbox__user_details, $__taggbox__feed_input_data['networkId']);
						if (empty($__taggbox__get_feed_count_information)) :
						$byApiCall = 1;
						$__taggbox__feed_input_data['byApiCall'] = 1;
						endif;
						endif;
						break;
						case 1:
						$__taggbox__get_feed_count_information = taggbox_get_feed_count_information($__taggbox__user_details, $__taggbox__feed_input_data['networkId']);
						if (empty($__taggbox__get_feed_count_information)) :
						$byApiCall = 1;
						$__taggbox__feed_input_data['byApiCall'] = 1;
						endif;
						break;
						*/
					case 5:
					case 7:
					case 6:
					case 10:
					case 11:
					case 12:
					case 19:
					case 23:
					case 28:
					case 29:
					case 33:
					case 34:
					case 35:
					case 37:
						$byApiCall = 1;
						$__taggbox__feed_input_data['byApiCall'] = 1;
						break;
					case 31:
						if (2 == $__taggbox__feed_filter_id) :
							$byApiCall = 1;
							$__taggbox__feed_input_data['byApiCall'] = 1;
						endif;
						break;
					case 32:
						if (in_array($__taggbox__feed_filter_id, [2, 75])) :
							$byApiCall = 1;
							$__taggbox__feed_input_data['byApiCall'] = 1;
						endif;
						break;
				endswitch;
			else :
				$byApiCall = 1;
				$__taggbox__feed_input_data['byApiCall'] = 1;
			endif;
			$__taggbox__feed_input_data['appUser']  = 1;
			$__taggbox__feed_input_data['platform'] = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Api Calling */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifeed/create', ['feedData' => $__taggbox__feed_input_data], ['Authorization:' . $__taggbox__user_details->accessToken]);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess(['byapiCall' => $byApiCall, '__taggbox__requestCallBackUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL, 'redirectUrl' => TAGGBOX_PLUGIN_API_URL . 'apiauth/getauth', '__taggbox__feedData' => $response->__taggbox__feedData]);
			break;
		case '__taggbox__make_payment':
			if (empty($__taggbox__user_details) || empty($data->planId) || empty($data->priceCode)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['planId']    = sanitize_key($data->planId);
			$param['priceCode'] = $data->priceCode;
			/* --Start-- Manage Param Data */
			$param['userId']    = sanitize_key($__taggbox__user_details->userId);
			$param['email']     = $__taggbox__user_details->email;
			$param['name']      = $__taggbox__user_details->name;
			$param['platform']  = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/getpaymentdetails', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess(['__taggbox__requestCallBackUrl' => TAGGBOX_PLUGIN_CALL_BACK_URL, 'redirectUrl' => TAGGBOX_PLUGIN_API_URL . 'apiaccount/makepayment', '__taggbox__paymentData' => $response->__taggbox__paymentData]);
			break;
		case '__taggbox__cancel_subscription':
			if (empty($__taggbox__user_details) || empty($data->planId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['planId']   = sanitize_key($data->planId);
			/* --Start-- Manage Param Data */
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			$param['email']    = $__taggbox__user_details->email;
			$param['name']     = $__taggbox__user_details->name;
			$param['platform'] = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/cancelsubscription', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__get_post':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || !isset($data->perPage) || !isset($data->offset) || !isset($data->postStatus)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']          = sanitize_key($__taggbox__user_details->userId);
			$param['widgetId']        = sanitize_key($data->widgetId);
			$param['perPage']         = sanitize_key($data->perPage);
			$param['offset']          = sanitize_key($data->offset);
			$param['postStatus']      = sanitize_key($data->postStatus);
			$param['feedIds']         = $data->feedIds;
			$param['postType']        = $data->postType;
			$param['highlightFilter'] = sanitize_key($data->highlightFilter);
			$param['pinFilter']       = sanitize_key($data->pinFilter);
			$param['recentFilter']    = sanitize_key($data->recentFilter);
			$param['retweetFilter']   = sanitize_key($data->retweetFilter);
			$param['searchText']      = sanitize_text_field($data->searchText);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifilter/get', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__manage_post_status':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || empty($data->postIds) || empty($data->postStatus)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']     = sanitize_key($__taggbox__user_details->userId);
			$param['widgetId']   = sanitize_key($data->widgetId);
			$param['postIds']    = $data->postIds;
			$param['postStatus'] = sanitize_key($data->postStatus);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifilter/status', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__feed_for_search':
			if (empty($__taggbox__user_details) || empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifilter/getfeeds', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__manage_post_pin':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || empty($data->postId) || !isset($data->pin)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['postId']   = $data->postId;
			$param['pin']      = sanitize_key($data->pin);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifilter/pin', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__manage_post_highlight':
			if (empty($__taggbox__user_details) || empty($data->widgetId) || empty($data->postId) || !isset($data->highlight)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId']    = sanitize_key($__taggbox__user_details->userId);
			$param['widgetId']  = sanitize_key($data->widgetId);
			$param['postId']    = $data->postId;
			$param['highlight'] = sanitize_key($data->highlight);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apifilter/highlight', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return taggbox_exitWithSuccess(['message' => $response]);
			break;
		case '__taggbox__plugin_version':
			/* --Start-- Manage Param Data */
			$param             = [];
			$param['platform'] = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/pluginversion', $param, []);
			$response = taggbox_manageApiResponse($response);
			unset($param);
			$installedPluginVersion           = get_file_data(__FILE__, ['Version' => 'Version'], false);
			$installedPluginVersion           = $installedPluginVersion['Version'];
			$response->installedPluginVersion = $installedPluginVersion;
			$response->pluginUpgradeURL       = admin_url() . 'plugins.php';
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__check_user_token':
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/checkusertoken', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			if (401 == $response->head->code && !$response->head->status) :
				taggbox_logout();
			endif;
			unset($param);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__plugin_deactivate':
			/* --Start-- Manage Param Data */
			$__taggbox__user_details = taggbox_userData();
			$param = [];
			$param['userId']                 = !empty($__taggbox__user_details) ? sanitize_key($__taggbox__user_details->userId) : '';
			$param['userName']               = !empty($__taggbox__user_details) ? sanitize_text_field($__taggbox__user_details->name) : '';
			$param['userEmail']              = !empty($__taggbox__user_details) ? sanitize_email($__taggbox__user_details->email) : '';
			$param['pluginDeactivateReason'] = sanitize_text_field($data->pluginDeactivateReason);
			$param['otherReason']            = sanitize_text_field($data->otherReason);
			$param['betterPlugin']           = sanitize_text_field($data->betterPlugin);
			$param['userWebsiteUrl']         = get_site_url();
			$param['platform']               = TAGGBOX_PLUGIN_PLATFORM;
			/* --End-- Manage Param Data */
			taggbox_dropDatabaseTablesForPlugin();
			deactivate_plugins(plugin_basename(__FILE__), true);
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/deactivateuserdata', $param, []);
			$response = taggbox_manageApiResponse($response);
			unset($param);
			return taggbox_exitWithSuccess();
			break;
		case '__taggbox__get_customization_option':
			if (empty($__taggbox__user_details) || empty($data->widgetId)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId']   = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apicustomization/get', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__update_footer_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId']          = sanitize_key($data->widgetId);
			$param['userId']            = sanitize_key($__taggbox__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['themeRuleId']       = sanitize_key($data->themeRuleId);
			$param['loadMoreStatus']    = sanitize_key($data->loadMoreStatus);
			$param['autoScrollStatus']  = sanitize_key($data->autoScrollStatus);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apicustomization/footer', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__update_layout_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId']          = sanitize_key($data->widgetId);
			$param['userId']            = sanitize_key($__taggbox__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['themeRuleId']       = sanitize_key($data->themeRuleId);
			$param['numberOfPosts']     = sanitize_key($data->numberOfPosts);
			$param['padding']           = sanitize_key($data->padding);
			$param['minimumPostWidth']  = sanitize_key($data->minimumPostWidth);
			$param['columnCount']       = sanitize_key($data->columnCount);
			$param['columnCountMobile'] = sanitize_key($data->columnCountMobile);
			$param['postText']          = sanitize_key($data->postText);
			$param['mobilePopup']       = sanitize_key($data->mobilePopup);
			$param['postFeatured']      = sanitize_key($data->postFeatured);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apicustomization/layout', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__update_card_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId']          = sanitize_key($data->widgetId);
			$param['userId']            = sanitize_key($__taggbox__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['inheritStyles']     = sanitize_key($data->inheritStyles);
			$param['themeRuleId']       = sanitize_key($data->themeRuleId);
			$param['fontColor']         = $data->fontColor;
			$param['authorColor']       = $data->authorColor;
			$param['cardColor']         = $data->cardColor;
			$param['fontSize']          = sanitize_key($data->fontSize);
			$param['shareOption']       = sanitize_key($data->shareOption);
			$param['hideContent']       = sanitize_key($data->hideContent);
			$param['postAuthor']        = sanitize_key($data->postAuthor);
			$param['postTime']          = sanitize_key($data->postTime);
			$param['lineTrim']          = sanitize_key($data->lineTrim);
			$param['aspectImageRatio']  = $data->aspectImageRatio;
			$param['textAlignment']     = $data->textAlignment;
			$param['borderRadius']      = $data->borderRadius;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apicustomization/card', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__update_other_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId']          = sanitize_key($data->widgetId);
			$param['userId']            = sanitize_key($__taggbox__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['themeRuleId']       = sanitize_key($data->themeRuleId);
			$param['css']               = $data->css;
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apicustomization/other', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		case '__taggbox__get_and_manage_intercom_chat_setting':
			if (empty($__taggbox__user_details)) :
				return taggbox_exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__taggbox__user_details->userId);
			/* --End-- Manage Param Data */
			$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/getIntercomSettingData', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
			unset($param);
			$response = taggbox_manageApiResponse($response);
			return taggbox_exitWithSuccess($response);
			break;
		default:
			return taggbox_exitWithDanger();
	endswitch;
}
/* --End-- Manage Ajax Calls */

/* --Start-- Manage Login And Register On Plugin Activate */
function taggbox_manageLoginAndRegisterOnPluginActivate()
{
	global $wpdb;
	$__taggbox__activeUserData = wp_get_current_user();
	if (empty($__taggbox__activeUserData->roles) || 'administrator' != $__taggbox__activeUserData->roles[0]) :
		return false;
	endif;
	if (!empty($__taggbox__activeUserData->data->user_email) && !empty($__taggbox__activeUserData->data->display_name)) :
		$__taggbox__activeUserName = $__taggbox__activeUserData->data->display_name;
		$__taggbox__activeUserEmail = $__taggbox__activeUserData->data->user_email;
		$__taggbox__activeOptions = taggbox_getActiveOptions();
		if (!empty($__taggbox__activeOptions[0]->email)) :
			if (empty($__taggbox__activeOptions[0]->isLogin) || 'no' == $__taggbox__activeOptions[0]->isLogin) :
				return false;
			endif;
			$__taggbox__activeUserEmail = $__taggbox__activeOptions[0]->email;
		endif;
		$__taggbox__user_details = taggbox_user($__taggbox__activeUserEmail);
		$accessTocken = (isset($__taggbox__user_details->accessToken) && !empty($__taggbox__user_details->accessToken)) ? $__taggbox__user_details->accessToken : '';
		$param = [];
		$param['emailId'] = sanitize_email($__taggbox__activeUserEmail);
		$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/checkUserExistOrNotAndGetData', $param, ['Authorization:' . $accessTocken]);
		unset($param);
		if (!empty($response->body->userId)) :
			taggbox_login($response->body);
		endif;
	endif;
}
/* --End-- Manage Login And Register On Plugin Activate */

/* --Start-- Login */
function taggbox_login($response)
{
	global $wpdb;
	$return = false;
	$user = taggbox_user($response->emailId);
	if (empty($user->email)) :
		if ($wpdb->query($wpdb->prepare('INSERT INTO wp_taggbox_users (userId, name, email, accessToken, isLogin) VALUES (%d, %s, %s, %s, %s)', $response->userId, $response->name, $response->emailId, $response->access_token, 'yes'))) :
			$return = true;
		endif;
	else :
		if ($wpdb->query($wpdb->prepare('UPDATE wp_taggbox_users SET userId = %d, name = %s, email = %s, accessToken = %s, isLogin = %s WHERE email = %s', $response->userId, $response->name, $response->emailId, $response->access_token, 'yes', $response->emailId))) :
			$return = true;
		endif;
	endif;
	taggbox_manageActiveOptions($response->emailId, 'yes'); /* Manage Active Options */
	if ($return) :
		taggbox_manageActiveWidgetsUser($response->userId);
	endif;
	return $return;
}
/* --End-- Login */

/* --Start-- Manage Active Options */
function taggbox_manageActiveOptions($email = null, $other = null)
{
	global $wpdb;
	if (null == $email && null != $other) :
		$wpdb->query($wpdb->prepare('UPDATE wp_taggbox_active_options SET isLogin = %s WHERE id = %d', $other, 1));
	else :
		$__taggbox__activeOptions = $wpdb->get_results($wpdb->prepare('SELECT email FROM wp_taggbox_active_options WHERE id = %d', 1));
		if (empty($__taggbox__activeOptions[0]->email)) :
			$wpdb->query($wpdb->prepare('INSERT INTO wp_taggbox_active_options (email, isLogin) VALUES (%s, %s)', $email, $other));
		else :
			$wpdb->query($wpdb->prepare('UPDATE wp_taggbox_active_options SET email = %s, isLogin = %s WHERE id = %d', $email, $other, 1));
		endif;
	endif;
}
/* --End-- Manage Active Options */

/* --Start--Get User Last Login Email Id */
function taggbox_getActiveOptions()
{
	global $wpdb;
	$__taggbox__activeOptions = $wpdb->get_results($wpdb->prepare('SELECT email, isLogin FROM wp_taggbox_active_options WHERE id = %d', 1));
	return $__taggbox__activeOptions;
}
/* --End--Get User last Login Email Id */

/* --Start-- Logout */
function taggbox_logout()
{
	global $wpdb;
	if ($wpdb->query($wpdb->prepare('UPDATE wp_taggbox_users SET isLogin = %s  WHERE isLogin = %s', 'no', 'yes'))) :
		taggbox_manageActiveOptions(null, 'no'); /* Manage Active Options */
		return true;
	endif;
	return false;
}
/* --End-- Logout */

/* --Start--Manage Menues */
function taggbox_menus($__taggbox__menu_condatation = [])
{
	global $wpdb;
	if (empty($__taggbox__menu_condatation)) :
		return $wpdb->get_results('SELECT * FROM wp_taggbox_menus');
	endif;
	if (array_key_exists('__taggbox__menu_condation', $__taggbox__menu_condatation)) :
		return $wpdb->get_results($wpdb->prepare('SELECT * FROM wp_taggbox_menus WHERE status = %s', $__taggbox__menu_condatation['__taggbox__menu_condation']));
	endif;
	if (array_key_exists('__taggbox__menu_id', $__taggbox__menu_condatation)) :
		if ($wpdb->query($wpdb->prepare('UPDATE wp_taggbox_menus SET status = %d WHERE status = %d', 0, 1)) && $wpdb->query($wpdb->prepare('UPDATE wp_taggbox_menus SET status = %d WHERE id = %d', 1, $__taggbox__menu_condatation['__taggbox__menu_id']))) :
			return true;
		else :
			return false;
		endif;
	endif;
}
/* --End--Manage Menues */

/* --Start-- Get User Details */
function taggbox_user($email = null)
{
	global $wpdb;
	$__taggbox__userResponse = '';
	if (empty($email)) :
		$__taggbox__userResponse = $wpdb->get_results($wpdb->prepare('SELECT * FROM wp_taggbox_users WHERE isLogin = %s', 'yes'));
	else :
		$__taggbox__userResponse = $wpdb->get_results($wpdb->prepare('SELECT * FROM wp_taggbox_users WHERE email = %s', $email));
	endif;
	if (!empty($__taggbox__userResponse)) :
		return $__taggbox__userResponse[0];
	else :
		return;
	endif;
}
function taggbox_userData()
{
	global $wpdb;
	$__taggbox__user_dataResponse = '';
	$__taggbox__user_dataResponse = $wpdb->get_results('SELECT * FROM wp_taggbox_users');
	if (!empty($__taggbox__user_dataResponse)) :
		return $__taggbox__user_dataResponse[0];
	else :
		return;
	endif;
}
/* --End-- Get User Details */

/* --Start-- Get Widget */
function taggbox_widgets()
{
	$returnWidgetData = [];
	$__taggbox__user_details = taggbox_user();
	if (!empty($__taggbox__user_details)) :
		$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiwidget/get', ['userId' => sanitize_key($__taggbox__user_details->userId)], ['Authorization:' . $__taggbox__user_details->accessToken]);
		if (!isset($response->head->status)) :
			return $returnWidgetData;
		endif;
		if (false == $response->head->status || 200 != $response->head->code || false == $response->body || empty($response->body)) :
			return $returnWidgetData;
		endif;
		$returnWidgetData = $response->body;
	endif;
	return $returnWidgetData;
}
/* --End-- Get Widget */

/* --Start-- Get Active Widget */
function taggbox_activeWidget()
{
	global $wpdb;
	$__taggbox__activeWidgetResponse = '';
	$__taggbox__activeWidgetResponse = $wpdb->get_results('SELECT * FROM wp_taggbox_active_widget');
	if (!empty($__taggbox__activeWidgetResponse)) :
		return $__taggbox__activeWidgetResponse[0]->widgetId;
	else :
		return;
	endif;
}
/* --End-- Get Active Widget */

/* --Start-- Manage Active Widget User */
function taggbox_manageActiveWidget($widgetId)
{
	global $wpdb;
	$return = '';
	$activeWidgetUserId = taggbox_activeWidget();
	if ($activeWidgetUserId == $widgetId) :
		return true;
	endif;
	if (empty($activeWidgetUserId)) :
		$wpdb->query($wpdb->prepare('INSERT INTO wp_taggbox_active_widget (widgetId) VALUES (%s)', $widgetId));
		return true;
	else :
		$wpdb->query($wpdb->prepare('UPDATE wp_taggbox_active_widget SET widgetId = %s  WHERE id = %d', $widgetId, 1));
		return true;
	endif;
	return false;
}
/* --End-- Manage Active Widget User */

/* --Start-- Get Active Widget User */
function taggbox_activeWidgetUser()
{
	global $wpdb;
	$__taggbox__activeWidgetUserResponse = '';
	$__taggbox__activeWidgetUserResponse = $wpdb->get_results('SELECT * FROM wp_taggbox_active_widget_users');
	if (!empty($__taggbox__activeWidgetUserResponse)) :
		return $__taggbox__activeWidgetUserResponse[0]->userId;
	endif;
	return;
}
/* --End-- Get Active Widget User */

/* --Start-- Manage Active Widget User */
function taggbox_manageActiveWidgetsUser($userId)
{
	global $wpdb;
	$return = '';
	$activeWidgetUserId = taggbox_activeWidgetUser();
	if ($activeWidgetUserId == $userId) :
		return true;
	endif;
	if (empty($activeWidgetUserId)) :
		$wpdb->query($wpdb->prepare('INSERT INTO wp_taggbox_active_widget_users (userId) VALUES (%d)', $userId));
		return true;
	else :
		$wpdb->query($wpdb->prepare('UPDATE wp_taggbox_active_widget_users SET userId = %d WHERE id = %d', $userId, 1));
		return true;
	endif;
	return false;
}
/* --End-- Manage Active Widget User */

/* * ** DATABASE *** */
/* --Start-- Manage Database */
function taggbox_createDatabaseTableForPlugin()
{
	global $wpdb;
	include_once ABSPATH . 'wp-admin/includes/upgrade.php';
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_taggbox_users` (`id` int(11) NOT NULL AUTO_INCREMENT,`userId` varchar(100) NOT NULL,`name` varchar(100) NOT NULL,`email` varchar(100) NOT NULL,`accessToken` varchar(255) NOT NULL,`isLogin` enum(\'no\', \'yes\') NOT NULL,PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_taggbox_active_widget_users` (`id` int(11) NOT NULL AUTO_INCREMENT,`userId` varchar(100) NOT NULL,PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_taggbox_menus` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(100) NOT NULL,`status` tinyint(2) NOT NULL,`path` varchar(255) NOT NULL,PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_taggbox_active_widget` (`id` int(11) NOT NULL AUTO_INCREMENT,`widgetId` varchar(100) NOT NULL,PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_taggbox_active_options` (`id` int(11) NOT NULL AUTO_INCREMENT,`email` varchar(500) NOT NULL,`isLogin` enum(\'no\', \'yes\'),PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
	/* --Start-- Manage Tagembed Plugin Menus */
	$__taggbox__checkAlreadyExistMenusDataExistOrNot = $wpdb->get_results('SELECT id FROM wp_taggbox_menus');
	if (empty($__taggbox__checkAlreadyExistMenusDataExistOrNot)) :
		$__taggbox__menus = [['name' => 'Widget', 'status' => 0, 'path' => 'widget/widgetView'], ['name' => 'Feed', 'status' => 1, 'path' => 'feed/addView'], ['name' => 'Choose Theme', 'status' => 0, 'path' => 'theme/themeView'], ['name' => 'Filter', 'status' => 0, 'path' => 'filter/filterView'], ['name' => 'Customize', 'status' => 0, 'path' => 'customize/customizeView'], ['name' => 'Display', 'status' => 0, 'path' => 'display/displayView'], ['name' => 'Social Accounts', 'status' => 0, 'path' => 'socialAccount/socialAccountView'], ['name' => 'Support', 'status' => 0, 'path' => 'support/supportView'], ['name' => 'Upgrade', 'status' => 0, 'path' => 'upgrade/upgradeView'], ['name' => 'Analytics', 'status' => 0, 'path' => 'analytics/analyticsView']];
		foreach ($__taggbox__menus as $__taggbox__menu) :
			$wpdb->query($wpdb->prepare('INSERT INTO wp_taggbox_menus (name, status, path) VALUES (%s, %s, %s)', $__taggbox__menu['name'], $__taggbox__menu['status'], $__taggbox__menu['path']));
		endforeach;
	endif;
	/* --End-- Manage Tagembed Plugin Menus */
}
function taggbox_dropDatabaseTablesForPlugin()
{
	global $wpdb;
	$wpdb->query('DROP table IF EXISTS  wp_taggbox_active_widget_users');
	$wpdb->query('DROP table IF EXISTS  wp_taggbox_active_widget');
	$wpdb->query('DROP table IF EXISTS  wp_taggbox_menus');
}
/* --End-- Manage Database */

/* --Start-- Manage Active Deactive And Uninstall Webhook */
register_activation_hook(__FILE__, 'taggbox_pluginActivate');
function taggbox_pluginActivate()
{
	taggbox_createDatabaseTableForPlugin();
	taggbox_manageLoginAndRegisterOnPluginActivate();
	add_action('activated_plugin', 'taggbox_plginActivationRedirect');
}
register_uninstall_hook(__FILE__, 'taggbox_pluginUnistall');
function taggbox_pluginUnistall()
{
	taggbox_dropDatabaseTablesForPlugin();
	global $wpdb;
	$wpdb->query('DROP table IF EXISTS  wp_taggbox_active_options');
	$wpdb->query('DROP table IF EXISTS  wp_taggbox_users');
}
/* --End-- Manage Active Deactive And Uninstall Webhook */

/* --Start--Manage Redirect After Plugin Activate */
function taggbox_plginActivationRedirect()
{
	$__taggbox__activeUserData = wp_get_current_user();
	if (empty($__taggbox__activeUserData->roles)) :
		return false;
	endif;
	$__taggbox__pluginCallbackUrl = esc_url(TAGGBOX_PLUGIN_CALL_BACK_URL);
	wp_safe_redirect($__taggbox__pluginCallbackUrl);
	exit;
	/* exit(wp_redirect(TAGGBOX_PLUGIN_CALL_BACK_URL)); */
}
/* --End--Manage Redirect After Plugin Activate */

/* --Start--Manage Setting Link */
function taggbox_settingsLink($links)
{
	array_unshift($links, '<a href=' . TAGGBOX_PLUGIN_CALL_BACK_URL . '>Settings</a>');
	return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'taggbox_settingsLink');
/* --End--Manage Setting Link */

/* --Start--Manage Database On Plugin Update Time */
function taggbox_manageDatabaseOnPluginUpdateTime()
{
	$__taggbox__userTableDropStatus = false;
	taggbox_drop_old_database_tables();
	taggbox_dropDatabaseTablesForPlugin();
	taggbox_createDatabaseTableForPlugin();
	taggbox_manageLoginAndRegisterOnPluginActivate();
}
add_action('upgrader_process_complete', 'taggbox_manageDatabaseOnPluginUpdateTime', 10, 2);
/* --End--Manage Database On Plugin Update Time */

/* --Start-- Drop Old Taggbox Database Tables 
* We Can Remove This Code After Some Time Or 3.5 Version Ke Baad
*/
function taggbox_drop_old_database_tables()
{
	global $wpdb;
	$wpdb->query("DROP table IF EXISTS  wp_taggbox_user");
	$wpdb->query("DROP table IF EXISTS  wp_taggbox_collaborator");
	$wpdb->query("DROP table IF EXISTS  wp_taggbox_widget");
	$wpdb->query("DROP table IF EXISTS  wp_taggbox_active_widget_user");
}
/* --End-- Drop Old Taggbox Database Tables */

/* --Sart--Get And Manage Social Accout Id */
function taggbox_get_user_social_account_id()
{
	$__taggbox__user_details = taggbox_user();
	$param['userId'] = $__taggbox__user_details->userId;
	$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/getsocialaccountid', $param, ['Authorization:' . $__taggbox__user_details->accessToken]);
	if (isset($response->head->status)) :
		if ($response->head->status) :
			$response = taggbox_manageApiResponse($response);
			if (!empty($response->userId)) :
				return $response->userId;
			endif;
		endif;
	endif;
	return false;
}
/* --End--Get And Manage Social Accout Id */

/* --Start-- Show Admin General Notification After Login And Register */
function taggbox_generalAdminNotice()
{
	$__tagmebed__page_name = '';
	if (!empty($_GET['page'])) :
		$__tagmebed__page_name = taggbox_sanitizeRequestData($_GET);
		$__tagmebed__page_name = $__tagmebed__page_name['page'];
	endif;
	$response = taggbox_wpApiCall(TAGGBOX_PLUGIN_API_URL . 'apiaccount/notification', ['callBy' => 'wordpress'], []);
	if (!is_wp_error($response)) :
		if (isset($response->head->status)) :
			$response = taggbox_manageApiResponse($response);
			if (!empty($response->notifications) && is_array($response->notifications)) :
				$htmlData = '';
				foreach ($response->notifications as $notifications) :
					if ('taggbox' == $notifications->location || 'inner' == $notifications->location) :
						if ('taggbox' != $__tagmebed__page_name) :
							continue;
						endif;
						$htmlData .= '<div class=\'notice notice-' . esc_html($notifications->type) . 'is-dismissible\'>';
						$htmlData .= '<p>' . $notifications->message . '</p>';
						$htmlData .= '</div>';
					elseif ('all' == $notifications->location) :
						$htmlData .= '<div class=\'notice	notice-' . esc_html($notifications->type) . 'is-dismissible\'>';
						$htmlData .= '<p>' . $notifications->message . '</p>';
						$htmlData .= '</div>';
					endif;
				endforeach;
				echo wp_kses_post($htmlData);
			endif;
		endif;
	endif;
}
add_action('in_admin_header', 'taggbox_hideGeneralAdminNotice');
function taggbox_hideGeneralAdminNotice()
{
	$__tagmebed__page_name = '';
	if (!empty($_GET['page'])) :
		$__tagmebed__page_name = taggbox_sanitizeRequestData($_GET);
		$__tagmebed__page_name = $__tagmebed__page_name['page'];
	endif;
	if ('taggbox' == $__tagmebed__page_name) :
		remove_all_actions('admin_notices');
		remove_all_actions('all_admin_notices');
	endif;
	if (!empty(taggbox_user())) :
		add_action('admin_notices', 'taggbox_generalAdminNotice');
	endif;
}
/* --End-- Show Admin General Notification After Login And Register */
/* --End-- Drop Database Table */
add_shortcode("taggbox", "taggboxPluginShortCode");
function taggboxPluginShortCode($attr)
{
	extract(shortcode_atts(array('height' => '100%', 'width' => '100%',), $attr));
	$widgetId = (isset($attr['widgetid']) ? $attr['widgetid'] : '');
	if (!empty($widgetId) && is_numeric($widgetId) && (($width === '' || preg_match('/^\d+(px|%|)$/', $width)) && ($height === '' || preg_match('/^\d+(px|%|)$/', $height)))):
		$code = '';
		$code .= '<div class="taggbox" data-widget-id="' . $widgetId . '"></div>';
		$code .= '<script type="text/javascript" src="https://widget.taggbox.com/embed-lite.min.js"></script>';
	else:
		$code = '<span style="display: block;text-align: center;border: 1px solid #eee;padding: 5px 15px;background-color: #fafafa;">Invalid Parameters Provided In The Taggbox Shortcode.</span>';
	endif;
	return $code;
}
/* --End-- Create Short Code */
