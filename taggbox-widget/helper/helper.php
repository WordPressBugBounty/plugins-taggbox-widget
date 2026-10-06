<?php
if (!defined('ABSPATH')) :
	exit;
endif;
function taggbox_wpApiCall($apiUrl, $body, $header = null)
{
	$header   = (null != $header ? $header : []);
	$args     = ['body' => $body, 'timeout' => '5', 'redirection' => '5', 'httpversion' => '1.0', 'blocking' => true, 'headers' => $header, 'cookies' => []];
	$response = wp_remote_post($apiUrl, $args);
	if (is_wp_error($response)) :
		return;
	endif;
	if (isset($response['body']) && !empty($response['body'])) :
		return json_decode($response['body']);
	endif;
	return;
}
function taggbox_manageApiResponse($response)
{
	if (empty($response->head)) :
		return taggbox_exitWithDanger();
	endif;
	$responseCode = $response->head->code;
	switch ($responseCode) {
		case 200:
			if ($response->head->status) :
				if (!empty($response->body)) :
					return $response->body;
				endif;
				if (!empty($response->head->message)) :
					return taggbox_exitWithSuccess($response->head->message);
				else :
					return taggbox_exitWithSuccess();
				endif;
			else :
				if (!empty($response->head->message)) :
					return taggbox_exitWithDanger($response->head->message);
				else :
					return taggbox_exitWithDanger();
				endif;
			endif;
			break;
		case 412:
			/* --Start-- Manage Validation Error */
			if (empty($response->body)) :
				return taggbox_exitWithDanger();
			else :
				return taggbox_exitWithDanger('Validation Error', $response->body);
			endif;
			/* --End-- Manage Validation Error */
			break;
		default:
			if (!empty($response->head->message)) :
				return taggbox_exitWithDanger($response->head->message);
			else :
				return taggbox_exitWithDanger();
			endif;
	}
}
function taggbox_exitWithSuccess($data = null)
{
	wp_send_json(['status' => (bool)true, 'data' => (array)$data, 'message' => (string)'OK']);
}
function taggbox_exitWithDanger($error = null, $data = [])
{
	wp_send_json(['status' => (bool)false, 'data' => (array)$data, 'message' => (string)('' != $error ? $error : 'Oh snap! Something went wrong.')]);
}
/* --Start__ Sanetize All Input */
function taggbox_inputSanetize($data)
{
	if (is_array($data)) :
		foreach ($data as $__taggbox__input_sanetize_item) :
			taggbox_inputSanetize($__taggbox__input_sanetize_item);
		endforeach;
		return;
	endif;
	$data = (string)$data;
	if (preg_match('/<[^>]*>/', $data)) :
		return taggbox_exitWithDanger('Special characters  are not allowed. Please remove them and try again.');
	endif;
}
/* --End Sanetize All Input */
/* --Start-- Sanitize Request Data */
function taggbox_sanitizeRequestData($__taggbox__request_input_data)
{
	$__taggbox__Input_return_data = [];
	foreach ($__taggbox__request_input_data as $__taggbox__request_input_key => $__taggbox__request_input) :
		if (is_array($__taggbox__request_input)) :
			$__taggbox__Input_return_data[$__taggbox__request_input_key] = taggbox_sanitizeRequestData($__taggbox__request_input);
		else :
			$__taggbox__Input_return_data[$__taggbox__request_input_key] = sanitize_text_field($__taggbox__request_input);
		endif;
	endforeach;
	return $__taggbox__Input_return_data;
}
/*--End-- Sanitize Request Data*/

function taggbox_expandLinkedinShortUrl($__taggbox__linkedinShortUrl)
{
	$__taggbox__expandedUrl = $__taggbox__linkedinShortUrl;
	for ($__taggbox__hop = 0; $__taggbox__hop < 5; $__taggbox__hop++) :
		$__taggbox__currentHost = wp_parse_url($__taggbox__expandedUrl, PHP_URL_HOST);
		$__taggbox__currentHost = is_string($__taggbox__currentHost) ? strtolower($__taggbox__currentHost) : '';
		if ($__taggbox__currentHost !== 'lnkd.in' && substr($__taggbox__currentHost, -8) !== '.lnkd.in') :
			break;
		endif;
		$__taggbox__response = wp_remote_head($__taggbox__expandedUrl, ['timeout' => 10, 'redirection' => 0, 'httpversion' => '1.1', 'blocking' => true]);
		if (is_wp_error($__taggbox__response)) :
			return '';
		endif;
		$__taggbox__location = wp_remote_retrieve_header($__taggbox__response, 'location');
		if (is_array($__taggbox__location)) :
			$__taggbox__location = end($__taggbox__location);
		endif;
		$__taggbox__location = is_string($__taggbox__location) ? trim($__taggbox__location) : '';
		if ($__taggbox__location === '') :
			break;
		endif;
		if (stripos($__taggbox__location, 'http') !== 0) :
			return '';
		endif;
		$__taggbox__expandedUrl = $__taggbox__location;
	endfor;
	return $__taggbox__expandedUrl === $__taggbox__linkedinShortUrl ? '' : $__taggbox__expandedUrl;
}
function taggbox_parseLinkedinPostUrl($__taggbox__linkedinPostUrl)
{
	$__taggbox__postPath = wp_parse_url($__taggbox__linkedinPostUrl, PHP_URL_PATH);
	if (!is_string($__taggbox__postPath) || $__taggbox__postPath === '') :
		return [];
	endif;
	$__taggbox__postPath = rtrim($__taggbox__postPath, '/');
	if (!preg_match('/(?:urn:li:|[-_\/])(activity|ugcPost|share)[-_:]([0-9]{6,30})/i', $__taggbox__postPath, $__taggbox__matchedPost)) :
		return [];
	endif;
	$__taggbox__postTypeMap = ['activity' => 'activity', 'ugcpost' => 'ugcPost', 'share' => 'share'];
	$__taggbox__postType = strtolower($__taggbox__matchedPost[1]);
	if (!isset($__taggbox__postTypeMap[$__taggbox__postType])) :
		return [];
	endif;
	return ['value2' => $__taggbox__postTypeMap[$__taggbox__postType], 'value3' => $__taggbox__matchedPost[2]];
}
