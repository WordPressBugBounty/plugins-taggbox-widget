<?php
if (!defined('ABSPATH')) :
	exit;
endif;
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-theme-js', TAGGBOX_PLUGIN_URL . '/assets/js/theme/taggbox.theme.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
/* Lazy Loader Script */
wp_enqueue_script('__script-lazy-loading-js', TAGGBOX_PLUGIN_URL . '/assets/js/lazyload.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
if (!empty($__taggbox__widgets)) :
?>
	<div id="__taggbox__choosetheme" class="__taggbox__tabcontent">
		<div class="__taggbox__sourcerow">
			<div class="__taggbox__tabheading">
				<h3>Select Any Layout</h3>
				<span>Note: Select any layout of your choice.</span>
			</div>
		</div>
		<div class="__taggbox__sourcerow">
			<div class="__taggbox__layoutarea">
				<ul id="__taggbox__theme"></ul>
			</div>
		</div>
	</div>
<?php endif; ?>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>