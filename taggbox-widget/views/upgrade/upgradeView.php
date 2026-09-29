<?php
if (!defined('ABSPATH')) :
	exit;
endif;
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__taggbox__script-upgrade-js', TAGGBOX_PLUGIN_URL . '/assets/js/upgrade/taggbox.upgrade.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
?>
<div class="__taggbox__support" id="__taggbox__support_section" style="display: none;">
	<h3><span style="font-size: 12px;">🔗</span> <a style="color: #d63636;" href="https://taggbox.com/support/" target="_blank">We’re Here to Help You Succeed -</a> </h3>
	<p>You've signed up with Taggbox, and your upgrade will be managed from your Taggbox account.
		To upgrade your plan, manage your subscription, or view billing details, please visit the Taggbox app.</p>
	</br>
	<a class="__taggbox__btn" href="https://app.taggbox.com/price" target="_blank" id="__taggbox__book_demo_free_btn"> Upgrade Now</a>
	<a class="__taggbox__btn __taggbox__intercom_chat_btn" href="javascript:void(0);"> Chat with Us</a>
</div>

<div id="__taggbox__upgrade_plan_section" style="display: none;">
	<div class="__taggbox__billing_head">
		<h2 class="__taggbox__billing_title">Billing &amp; Plans</h2>
		<div class="__taggbox__billing_stats" id="__taggbox__billing_stats" style="display: none;">
			<div class="__taggbox__billing_stat">
				<span>Current Plan</span>
				<strong id="__taggbox__billing_stat_plan">&ndash;</strong>
			</div>
			<div class="__taggbox__billing_stat">
				<span>Renews</span>
				<strong id="__taggbox__billing_stat_renews">&ndash;</strong>
			</div>
			<div class="__taggbox__billing_stat">
				<span>Views Used</span>
				<strong id="__taggbox__billing_stat_views">&ndash;</strong>
			</div>
		</div>
	</div>
	<div class="__taggbox__plan_notice" id="__taggbox__plan_notice" style="display: none;">
		<strong id="__taggbox__plan_notice_title"></strong>
		<span id="__taggbox__plan_notice_message"></span>
	</div>
	<div class="__taggbox__upgrade_tabarea" id="__taggbox__upgrade_tabarea">
		<ul>
			<li><a href="javascript:void(0);" id="__taggbox__upgrade_tab_plan" class="__taggbox__active" onclick="__taggbox__manageUpgradeTab('plan');">Plan Subscriptions</a></li>
			<li id="__taggbox__upgrade_tab_invoice_item"><a href="javascript:void(0);" id="__taggbox__upgrade_tab_invoice" onclick="__taggbox__manageUpgradeTab('invoice');">Billing History<span class="__taggbox__tab_count" id="__taggbox__upgrade_tab_count" style="display: none;"></span></a></li>
		</ul>
	</div>
	<div class="__taggbox__sourcerow __taggbox__pricesection" id="__taggbox__upgrade_plan_panel">
		<div class="__taggbox__priceswitcher">
			<a href="javascript:void(0);" id="__taggbbox__monthely_price_button" onclick="__taggbox__manageSelectPlanPrice('monthely');">Monthly</a>
			<a href="javascript:void(0);" id="__taggbbox__yearly_price_button" onclick="__taggbox__manageSelectPlanPrice('yearly');" class="__taggbox__active">Yearly (Save 20%)</a>
		</div>
		<div class="__taggbox__fourplan" id="__taggbox__plan"></div>
		<!--Start--All Feature Section -->
		<div id="__taggbox__all_feacture_section" class="__taggbox__planfeatures" style="display:none;"></div>
		<div class="__taggbox__showallfeatures">
			<button id="__taggbox__all_feacture_button" onclick="__taggbox__manageAllFeactureHideShow();" class="__taggbox__btn">Compare All Plans</button>
		</div>
		<!--End--All Feature Section -->
	</div>
	<div class="__taggbox__sourcerow __taggbox__pricesection __taggbox__invoicesection" id="__taggbox__invoice_section" style="display: none;">
		<div class="__taggbox__card_wrap" id="__taggbox__card_wrap" style="display: none;"></div>
		<div class="__taggbox__invoice_wrap" id="__taggbox__invoice_wrap"></div>
		<p class="__taggbox__invoice_note" id="__taggbox__invoice_note" style="display: none;"></p>
	</div>
	<!--Start--Account Upgrade Popup-->
	<div id="__taggbox__upgrade_account_popup" class="__taggbox__overlay" style="display:none;"></div>
	<!--End--Account Upgrade Popup-->
</div>

<style>
	#__taggbox__upgrade_plan_section {
		float: left;
		clear: both;
		width: 100%;
		padding: 0 15px 6px;
		box-sizing: border-box;
		height: 100%;
		overflow-y: auto;
		max-height: calc(100% - 80px);
	}

	#__taggbox__upgrade_plan_section::-webkit-scrollbar {
		background-color: #f5f5f5;
		width: 6px;
	}

	#__taggbox__upgrade_plan_section::-webkit-scrollbar-thumb {
		background-color: #d63635;
		border-radius: 0;
		-moz-border-radius: 0;
		-webkit-border-radius: 0;
	}

	.notice~.__taggbox__container #__taggbox__upgrade_plan_section {
		max-height: calc(100% - 50px);
	}

	.notice+.notice~.__taggbox__container #__taggbox__upgrade_plan_section {
		max-height: calc(100% - 90px);
	}

	#__taggbox__upgrade_plan_section .__taggbox__pricesection {
		height: auto;
		max-height: none;
		overflow-y: visible;
	}

	.__taggbox__billing_head {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		gap: 12px;
		margin: 14px 0 0;
	}

	.__taggbox__billing_title {
		margin: 0;
		padding: 4px 0 0;
		font-size: 20px;
		font-weight: 700;
		line-height: 1.2;
		color: #1d2327;
	}

	.__taggbox__plan_notice {
		margin: 14px 0 0;
		padding: 11px 16px;
		background: #fff;
		border: 1px solid #e5e5e5;
		border-left: 4px solid #dba617;
		border-radius: 0;
	}

	.__taggbox__plan_notice > strong {
		display: block;
		font-size: 13px;
		font-weight: 600;
		line-height: 1.4;
		color: #1d2327;
		margin: 0 0 2px;
	}

	.__taggbox__plan_notice span strong {
		display: inline;
		font-weight: 600;
		color: #1d2327;
	}

	.__taggbox__plan_notice span {
		display: block;
		font-size: 13px;
		font-weight: 400;
		line-height: 1.5;
		color: #50575e;
	}


	.__taggbox__billing_stats {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		background: #fff;
		border: 1px solid #e5e5e5;
	}

	.__taggbox__billing_stat {
		padding: 6px 14px;
		border-right: 1px solid #e5e5e5;
		min-width: 104px;
	}

	.__taggbox__billing_stat:last-child {
		border-right: 0;
	}

	.__taggbox__billing_stat span {
		display: block;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: .6px;
		text-transform: uppercase;
		line-height: 1.4;
		color: #8c8f94;
		margin-bottom: 1px;
	}

	.__taggbox__billing_stat strong {
		display: block;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.25;
		color: #1d2327;
	}

	.__taggbox__upgrade_tabarea {
		border-bottom: 1px solid #c3c4c7;
		margin: 12px 0 0;
	}

	.__taggbox__upgrade_tabarea ul {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.__taggbox__upgrade_tabarea ul li {
		margin: 0 28px 0 0;
	}

	.__taggbox__upgrade_tabarea ul li a {
		display: block;
		padding: 0 0 9px;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		color: #8c8f94;
		text-decoration: none;
		border-bottom: 3px solid transparent;
		margin-bottom: -1px;
		-webkit-transition: 0.3s ease-in-out;
		-o-transition: 0.3s ease-in-out;
		transition: 0.3s ease-in-out;
	}

	.__taggbox__upgrade_tabarea ul li a:hover {
		color: #d63636;
	}

	.__taggbox__upgrade_tabarea ul li a:focus {
		outline: 0;
		-webkit-box-shadow: none;
		box-shadow: none;
	}

	.__taggbox__upgrade_tabarea ul li a.__taggbox__active {
		color: #1d2327;
		border-bottom-color: #d63636;
	}

	.__taggbox__tab_count {
		display: inline-block;
		margin-left: 7px;
		padding: 1px 7px;
		font-size: 11px;
		font-weight: 600;
		line-height: 17px;
		color: #d63636;
		background: #fdeceb;
		vertical-align: middle;
	}

	#__taggbox__upgrade_plan_panel,
	.__taggbox__invoicesection {
		margin-top: 18px;
	}

	.__taggbox__invoicesection {
		margin-bottom: 10px;
	}

	.__taggbox__card_wrap {
		margin-bottom: 14px;
		background: #fff;
		border: 1px solid #e5e5e5;
		padding: 16px 18px;
	}

	.__taggbox__card_head {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: .5px;
		text-transform: uppercase;
		color: #646970;
		margin: 0 0 10px;
	}

	.__taggbox__card_row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		flex-wrap: wrap;
	}

	.__taggbox__card_detail {
		font-size: 13px;
		color: #1d2327;
		line-height: 1.6;
	}

	.__taggbox__card_detail strong {
		font-weight: 600;
	}

	.__taggbox__card_expiry {
		color: #646970;
	}

	.__taggbox__card_expired {
		color: #d63638;
		font-weight: 600;
	}

	a.__taggbox__card_action {
		cursor         : pointer;
		display        : inline-block;
		background     : #d63636;
		color          : #fff;
		border         : 0;
		border-radius  : 0;
		padding        : 0 14px;
		min-height     : 32px;
		min-width      : 62px;
		line-height    : 2.15;
		font-size      : 13px;
		font-weight    : 600;
		text-align     : center;
		text-decoration: none;
		text-shadow    : none;
		box-shadow     : none;
	}

	a.__taggbox__card_action:hover,
	a.__taggbox__card_action:focus,
	a.__taggbox__card_action:active {
		background     : #e05c5c;
		color          : #fff;
		text-decoration: none;
	}

	.__taggbox__card_empty {
		font-size: 13px;
		color: #646970;
	}

	.__taggbox__invoice_wrap {
		background: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 0;
		overflow-x: auto;
	}

	.__taggbox__invoice_table {
		width: 100%;
		max-width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		margin-bottom: 0;
	}

	.__taggbox__invoice_table th {
		background-color: #f6f7f7;
		color: #646970;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: .6px;
		text-transform: uppercase;
		text-align: left;
		white-space: nowrap;
		vertical-align: middle;
		padding: 11px 15px;
		border-bottom: 1px solid #e5e5e5;
	}

	.__taggbox__invoice_table td {
		background-color: #fff;
		color: #3f4254;
		font-size: 13px;
		font-weight: 400;
		vertical-align: middle;
		white-space: nowrap;
		padding: 13px 15px;
		border-bottom: 1px solid #f0f0f1;
	}

	.__taggbox__invoice_table tbody tr:last-child td {
		border-bottom: 0;
	}

	.__taggbox__invoice_table tbody tr:hover td {
		background-color: #fafafa;
	}

	.__taggbox__invoice_table .__taggbox__invoice_col_amount,
	.__taggbox__invoice_table .__taggbox__invoice_amount {
		text-align: left;
	}

	.__taggbox__invoice_table .__taggbox__invoice_col_action,
	.__taggbox__invoice_table .__taggbox__invoice_action {
		text-align: right;
	}

	.__taggbox__invoice_table .__taggbox__invoice_number {
		font-weight: 600;
		color: #1d2327;
	}

	.__taggbox__invoice_table .__taggbox__invoice_plan {
		white-space: normal;
	}

	.__taggbox__invoice_table .__taggbox__invoice_muted {
		color: #a1a5b7;
	}

	.__taggbox__invoice_table .__taggbox__invoice_coupon {
		display: block;
		margin-top: 3px;
		font-size: 11px;
		font-weight: 400;
		color: #4fa746;
	}

	.__taggbox__invoice_table .__taggbox__invoice_was {
		display: inline-block;
		margin-right: 6px;
		font-size: 12px;
		font-weight: 400;
		color: #a1a5b7;
		text-decoration: line-through;
	}

	.__taggbox__invoice_state {
		font-size: 13px;
		font-weight: 400;
		color: #3f4254;
	}

	.__taggbox__invoice_state.__taggbox__invoice_state_refunded {
		color: #b32d2e;
	}

	a.__taggbox__invoice_action_link {
		cursor         : pointer;
		display        : inline-block;
		background     : #d63636;
		color          : #fff;
		border         : 0;
		border-radius  : 0;
		padding        : 0 14px;
		min-height     : 32px;
		min-width      : 62px;
		line-height    : 2.15;
		font-size      : 13px;
		font-weight    : 600;
		text-align     : center;
		text-decoration: none;
		text-shadow    : none;
		box-shadow     : none;
	}

	a.__taggbox__invoice_action_link:hover,
	a.__taggbox__invoice_action_link:focus,
	a.__taggbox__invoice_action_link:active {
		background     : #e05c5c;
		color          : #fff;
		text-decoration: none;
	}

	.__taggbox__invoice_empty {
		text-align: center;
		color: #646970;
		padding: 30px 15px;
		font-size: 13px;
	}

	.__taggbox__invoice_note {
		margin: 12px 2px 0;
		font-size: 12px;
		color: #a1a5b7;
	}
	.__taggbox__container .__taggbox__row .__taggbox__pricesection .__taggbox__fourplan .__taggbox__planbox span.__taggbox__selectbtn_cancelled {
		background: #f6f7f7;
		color: #8c8f94;
		border: 1px solid #dcdcde;
		cursor: default;
		pointer-events: none;
		user-select: none;
		border-radius: 0;
	}

	.__taggbox__container .__taggbox__row .__taggbox__pricesection .__taggbox__fourplan .__taggbox__planbox span.__taggbox__selectbtn_cancelled:hover {
		background: #f6f7f7;
		color: #8c8f94;
	}
</style>

<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>