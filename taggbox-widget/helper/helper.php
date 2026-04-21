<?php
function taggbox_wpApiCall($apiUrl, $body, $header = null, $breakResponse = false)
{
	$header = (null != $header ? $header : []);
	$args = ['body' => $body, 'timeout' => '5', 'redirection' => '5', 'httpversion' => '1.0', 'blocking' => true, 'headers' => $header, 'cookies' => []];
	$response = wp_remote_post($apiUrl, $args);
	if ($breakResponse) :
		taggbox_dd($response);
	endif;
	if (!is_wp_error($response)) :
		if (isset($response['body']) && !empty($response['body'])) :
			return json_decode($response['body']);
		else :
			return;
		endif;
	else :
		taggbox_wpApiCall($apiUrl, $body, $header = null, $breakResponse = false);
	endif;
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
function taggbox_IsBase64($data)
{
	$decoded_data = base64_decode($data, true);
	$encoded_data = base64_encode($decoded_data);
	if ($encoded_data != $data) :
		return false;
	elseif (!ctype_print($decoded_data)) :
		return false;
	else :
		return true;
	endif;
}
function taggbox_exitWithSuccess($data = null)
{
	echo wp_json_encode(['status' => (bool)true, 'data' => (array)$data, 'message' => (string)'OK']);
	exit;
}
function taggbox_exitWithDanger($error = null, $data = [])
{
	echo wp_json_encode(['status' => (bool)false, 'data' => (array)$data, 'message' => (string)('' != $error ? $error : 'Oh snap! Something went wrong.')]);
	exit;
}
function taggbox_d($data = 'NONE')
{
	echo '<pre>';
	print_r($data);
	echo '</pre>';
}
function taggbox_dd($data = 'NONE')
{
	echo '<pre>';
	print_r($data);
	echo '</pre>';
	die;
}
function taggbox_convertObjectToArray($data)
{
	$data = wp_json_encode($data);
	return json_decode($data, true);
}
/* --Start__ Sanetize All Input */
function taggbox_inputSanetize($data)
{
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
		$__taggbox__Input_return_data[$__taggbox__request_input_key] = sanitize_text_field($__taggbox__request_input);
	endforeach;
	return $__taggbox__Input_return_data;
}
/*--End-- Sanitize Request Data*/
