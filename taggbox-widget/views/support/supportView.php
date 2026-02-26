<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-support-js', TAGGBOX_PLUGIN_URL . '/assets/js/support/taggbox.support.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
?>
<div class="__taggbox__support">
	<h3><span style="font-size: 12px;">🔗</span> <a style="color: #d63636;" href="https://taggbox.com/support/" target="_blank">We’re Here to Help You Succeed -</a> </h3>
	<p>Whether you’re setting up your social media feeds, customizing layouts, or troubleshooting an issue, our team is here to help you get the most out of your social media feeds!</p>
	</br>
	<a style="display: none;" class="__taggbox__btn" href="https://meetings.hubspot.com/ankur35/meeting-with-tagbox" target="_blank" id="__taggbox__book_demo_free_btn"> Book a Demo</a>
	<a style="display: none;" class="__taggbox__btn" href="https://calendly.com/taggbox/csm" target="_blank" id="__taggbox__book_demo_paid_btn"> Book a Demo</a>
	<a class="__taggbox__btn __taggbox__intercom_chat_btn" href="javascript:void(0);"> Chat with Us</a>
</div>
<div class="__taggbox__support">
	<h3><span style="font-size: 12px;">🔗</span> <a style="color: #d63636;" href="https://wordpress.org/support/plugin/taggbox-widget/" target="_blank">Taggbox WordPress.org Support -</a></h3>
	<p>We actively monitor and answer all questions posted on WordPress.org</p>
</div>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>