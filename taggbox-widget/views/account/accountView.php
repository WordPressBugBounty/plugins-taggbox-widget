<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
wp_enqueue_script('__script-account-js', TAGGBOX_PLUGIN_URL . '/assets/js/account/taggbox.account.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
?>
<!--Start-- Other Plugin Popup-->
<style>
	.__taggbox__okaybtn:hover {
		color: #fff !important;
	}
</style>
<div id="__taggbox__other_plugin_popup" class="__taggbox__other_plugin_popup"></div>
<!--End-- Other Plugin Popup-->

<div class="__taggbox__row">
	<div class="__taggbox__col __taggbox__col_12 __taggbox__login_account">
		<!--Error-->
		<div id="__taggbox__account_error" class="__taggbox__acount_error __taggbox__danger"> Unknown email. Check again or try your email address.<br></div>
		<!--Tabbing-->
		<div id="__taggbox__account_tab_view" class="__taggbox__tabarea">
			<ul>
				<li><a id="__taggbox__account_login" onclick="__taggbox__manage_account_view('login')" href="javascript:void(0);" class="active">Login</a></li>
				<li><a id="__taggbox__account_register" onclick="__taggbox__manage_account_view('register')" href="javascript:void(0);">Register</a></li>
			</ul>
		</div>
		<!--Start-- Login View-->
		<div id="__taggbox__account_login_view" class="__taggbox__login_account_inn">
			<div class="__taggbox__login_with">
				<h2>Sign In</h2>
			</div>
			<p>Enter your email and password</p>
			<form action="javascript:void(0);" id="__taggbox__login_form">
				<div class="__taggbox__form_row">
					<input type="email" name="emailId" value="" placeholder="Email" required autofocus>
					<span id="__taggbox__login_email_id_error"></span>
				</div>
				<div class="__taggbox__form_row">
					<input type="password" name="password" value="" placeholder="Password" required>
					<span id="__taggbox__login_password_error"></span>
				</div>
				<div class="__taggbox__submit_sec">
					<a href="https://app.taggbox.com/accounts/forgotpassword/" target="_blank">Forgot Password</a>
					<a href="javascript:void(0);" onclick="__taggbox__manage_account_view('forgotPassword')"></a>
					<button type="submit" class="__taggbox__btn">Sign In</button>
				</div>
			</form>
		</div>
		<!--End-- Login View-->
		<!--Start-- Register View-->
		<div id="__taggbox__account_register_view" class="__taggbox__register_inn">
			<div class="__taggbox__login_with">
				<h2>Sign Up</h2>
			</div>
			<p>Enter your details to create your account</p>
			<form action="javascript:void(0);" id="__taggbox__register_form">
				<div class="__taggbox__form_row">
					<input type="text" name="fullName" value="" placeholder="Full Name" required>
					<span id="__taggbox__register_full_name_error"></span>
				</div>
				<div class="__taggbox__form_row">
					<input type="email" name="emailId" value="" placeholder="Email" required>
					<span id="__taggbox__register_email_id_error"></span>
				</div>
				<div class="__taggbox__form_row">
					<input type="number" name="contact_no" value="" placeholder="Contact Number">
					<span id="__taggbox__register_contact_no_error"></span>
				</div>
				<div class="__taggbox__form_row">
					<input type="password" name="password" value="" placeholder="Password" required>
					<span id="__taggbox__register_password_error"></span>
					<p style="font-size: 12px;color: #b5b5c3;font-weight: 400;max-width: 300px;margin-top: 10px;line-height: normal;">By clicking Create Account, you agree to our <a href="https://taggbox.com/terms-of-service/" target="_blank" style="cursor: pointer;">Terms of Service</a> and <a href="https://taggbox.com/privacy-policy/" target="_blank" style="cursor: pointer;">Privacy Policy</a></p>
				</div>
				<div class="__taggbox__submit_sec __taggbox__flexend">
					<button type="submit" class="__taggbox__btn">Create Account</button>
				</div>
			</form>
		</div>
	</div>
</div>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>