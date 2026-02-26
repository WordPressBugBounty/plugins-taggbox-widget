<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
if (!empty($__taggbox__widgets)) :
	wp_enqueue_script('__script-networks-js', TAGGBOX_PLUGIN_URL . '/assets/js/network/taggbox.networks.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
	wp_enqueue_script('__script-feed-create-js', TAGGBOX_PLUGIN_URL . '/assets/js/feed/taggbox.feed.create.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
	wp_enqueue_script('__script-feed-js', TAGGBOX_PLUGIN_URL . '/assets/js/feed/taggbox.feed.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
?>
	<div style="" id="__taggbox__addfeed" class="__taggbox__tabcontent">
		<!--Start-- Network View-->
		<div class="__taggbox__sourcerow">
			<div class="__taggbox__ssleft">
				<h3>Network</h3>
				<div><b>NOTE: </b>Select any of the Network like Instagram, Facebook, Youtube, Airbnb, Reviews Etc.</div>
			</div>
			<div class="__taggbox__ssright __taggbox__ssource __tagembe__singline">
				<div>
					<select name="__taggbox__networks" id="__taggbox__networks">
						<option vlaue="">Select Network</option>
					</select>
					<span class="__taggbox__error">Error message here.</span>
				</div>
				<div class="__taggbox__copycode" id="__taggbox__copycode" style="display: none;">
					<div class="__tabembed__fromrow">
						<span>Embed Short Code</span>
						<div onclick="__taggbox__copyCodeEmbed('shortCode', '__taggbox__shortCode');" id="__taggbox__shortCode" class="__taggbox__copyvalue"></div>
						<span onclick="__taggbox__copyCodeEmbed('shortCode', '__taggbox__shortCode');">
							<i class="fa fa-files-o" aria-hidden="true"></i>
						</span>
					</div>
				</div>
			</div>
		</div>
		<!--End-- Network View-->
		<!--Start-- Feed Filter View-->
		<div class="__taggbox__sourcerow" id="__taggbox__feed_filter_row" style="display:none;">
			<div class="__taggbox__ssleft ">
				<h3>Feed Filter</h3>
				<div><b>NOTE: </b>Select any of the Feed Filter like Handle, HashTag Etc.</div>
			</div>
			<div class="__taggbox__ssright __taggbox__ssource">
				<select name="__taggbox__feed" id="__taggbox__feed_filters">
					<option vlaue="-1">Select Feed Filter</option>
				</select>
				<span id="" class="__taggbox__error">Error message here.</span>
			</div>
		</div>
		<!--End-- Feed Filter View-->
		<!--Start-- Feed View-->
		<div class="__taggbox__sourcerow" id="__taggbox__feed" style="display:none;">
			<div class="__taggbox__ssleft">
				<h3>Feeds</h3>
				<div><b>NOTE: </b> Manage Connected Feeds.</div>
			</div>
			<div class="__taggbox__ssright" id="__taggbox__feed_data"></div>
		</div>
		<!--Start-- Feed View-->
	</div>
<?php endif; ?>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>