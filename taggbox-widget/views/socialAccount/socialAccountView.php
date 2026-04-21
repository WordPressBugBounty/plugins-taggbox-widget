<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
$__taggbox__social_account_id = taggbox_get_user_social_account_id();
?>
<!--Start-- Get And Manage Social Accounts -->
<iframe allow="clipboard-write" name="<?php echo esc_html(TAGGBOX_PLUGIN_CALL_BACK_URL); ?>" src="<?php echo esc_html(TAGGBOX_PLUGIN_SERVER_URL); ?>socialaccounts/index/<?php echo esc_html($__taggbox__social_account_id); ?>" class="__taggbox__analytics" width="100%" height="100%"></iframe>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>