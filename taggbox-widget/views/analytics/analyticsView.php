<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
?>
<div>
	<iframe src="<?php echo esc_html(TAGGBOX_PLUGIN_SERVER_URL); ?>analytics?userId=<?php echo esc_html($__taggbox__active_widget_user_id); ?>" class="__taggbox__analytics" width="100%" height="100%"></iframe>
</div>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>