<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-upgrade-js', TAGGBOX_PLUGIN_URL . '/assets/js/upgrade/taggbox.upgrade.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
?>
<div class="__taggbox__sourcerow __taggbox__pricesection">
	<div class="__taggbox__tabheading">
		<h3>Plan Subscriptions</h3>
	</div>
	<div class="__taggbox__priceswitcher">
		<a href="javascript:void(0);" id="__tagembbed__monthely_price_button" onclick="__taggbox__manageSelectPlanPrice('monthely');">Monthly</a>
		<a href="javascript:void(0);" id="__tagembbed__yearly_price_button" onclick="__taggbox__manageSelectPlanPrice('yearly');" class="__taggbox__active">Yearly (Save 20%)</a>
	</div>
	<div class="__taggbox__fourplan" id="__taggbox__plan"></div>
	<!--Start--All Feature Section -->
	<div id="__taggbox__all_feacture_section" class="__taggbox__planfeatures" style="display:none;"></div>
	<div class="__taggbox__showallfeatures">
		<button id="__taggbox__all_feacture_button" onclick="__taggbox__manageAllFeactureHideShow();" class="__taggbox__btn">Show All Features</button>
	</div>
	<!--End--All Feature Section -->
</div>
<!--Start--Account Upgrade Popup-->
<div id="__taggbox__upgrade_account_popup" class="__taggbox__overlay" style="display:none;"></div>
<!--End--Account Upgrade Popup-->
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>