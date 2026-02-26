<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-filter-js', TAGGBOX_PLUGIN_URL . '/assets/js/filter/taggbox.filter.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
?>
<div class="__taggbox__filter">
	<div class="" id="__taggbox__widget_filter_section_id"></div>
</div>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php';	?>