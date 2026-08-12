<?php
if (!defined('ABSPATH')) :
	exit;
endif;
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
?>
<div>
	<iframe src="<?php echo esc_url(TAGGBOX_PLUGIN_SERVER_URL . 'analytics?userId=' . $__taggbox__active_widget_user_id); ?>" class="__taggbox__analytics" width="100%" height="100%" title="Taggbox Analytics"></iframe>
</div>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>