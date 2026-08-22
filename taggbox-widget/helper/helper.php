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
