<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-display-js', TAGGBOX_PLUGIN_URL . '/assets/js/display/taggbox.display.script.js', ['jquery'], TAGGBOX_PLUGIN_VERSION, true);
if (!empty($__taggbox__widgets)) :
?>
	<div id="__taggbox__displayfeed" class="__taggbox__tabcontent">
		<div class="__taggbox___displayfeedrow">
			<div class="__taggbox__displayleft">
				<!--Start-- Accordion -->
				<div class="__taggbox__accordionItem __taggbox__open">
					<h2 class="__taggbox__accordionItemHeading">Short Code</h2>
					<div class="__taggbox__accordionItemContent">
						<div class="__taggbox__dispsteps">
							<ol>
								<li>Copy Short Code to Embed feed on Page or Posts</li>
								<li>Go to Page/Posts and add new block (+), search "<strong>taggbox</strong>"to select the plugin</li>
								<li>Paste the code and click on "<strong>Embed</strong>" to preview.</li>
								<li>For more details, visit <a href="https://wordpress.org/support/plugin/taggbox-widget/" target="_blank">Installation Guide</a></li>
								<li><strong>Note : </strong> Are you not able to find taggbox Block ? Don't worry, simply paste the short code under code
									< /> block.
								</li>
							</ol>
						</div>
						<div class="__taggbox__copycode">
							<div class="__tabembed__fromrow">
								<span><i class="fa fa-code" aria-hidden="true"></i></span>
								<div onclick="__taggbox__copyCodeEmbed('shortCode', '__taggbox__shortCode');" id="__taggbox__shortCode" class="__taggbox__copyvalue"></div>
							</div>
							<div class="__taggbox__formrow"><button onclick="__taggbox__copyCodeEmbed('shortCode', '__taggbox__shortCode');" class="__taggbox__btn">Copy Code</button></div>
						</div>
					</div>
				</div>
				<div class="__taggbox__accordionItem __taggbox__close">
					<h2 class="__taggbox__accordionItemHeading">HTML/JS Code</h2>
					<div class="__taggbox__accordionItemContent">
						<div class="__taggbox__htmlcode">
							<div class="__tabembed__fromrow" style="flex-wrap:wrap;">
								<p>Your web embed code to be placed under custom HTML block.</p>
								<p style="margin-top:0;">You can set Height in Pixels (px) like 800px or in Percentage ( % ) like 100%</p>
								<textarea onclick="__taggbox__copyCodeEmbed('embedCode', '__taggbox__html_embed_code');" id="__taggbox__html_embed_code" rows="4" readonly="readonly"></textarea>
							</div>
							<div class="__taggbox__formrow"><button onclick="__taggbox__copyCodeEmbed('embedCode', '__taggbox__html_embed_code');" class="__taggbox__btn">Copy Code</button></div>
						</div>
					</div>
				</div>
				<div class="__taggbox__accordionItem __taggbox__close">
					<h2 class="__taggbox__accordionItemHeading">Iframe Code</h2>
					<div class="__taggbox__accordionItemContent">
						<div class="__taggbox__iframecode">
							<p>Your web embed code to be placed under the code block.</p>
							<p style="margin-top:0;">You can set Height in Pixels (px) like 800px or in Percentage ( % ) like 100%</p>
							<textarea onclick="__taggbox__copyCodeEmbed('embedCode', '__taggbox__iframe_embed_code');" id="__taggbox__iframe_embed_code" rows="6" readonly="readonly"></textarea>
						</div>
						<div class="__taggbox__formrow"><button onclick="__taggbox__copyCodeEmbed('embedCode', '__taggbox__iframe_embed_code');" class="__taggbox__btn">Copy Code</button></div>
					</div>
				</div>
				<!--End-- Accordion -->
			</div>
			<div class="__taggbox__displayright">
				<div class="__taggbox__previewarea">
					<div class="__taggbox__previewation">
						<ul>
							<li>
								<a id="__taggbox__previewdesk" class="__taggbox__tabcommpreivew __taggbox__previewactive" href="javascript:void(0);" onclick="__taggbox__displayPreview('__taggbox__previewdesk')">
									<svg xmlns="http://www.w3.org/2000/svg" width="26.85" height="24.165" viewBox="0 0 26.85 24.165">
										<g id="Group_5409" data-name="Group 5409" transform="translate(-1742.575 -95)">
											<path id="Path_5610" data-name="Path 5610" d="M24.823,3H6.028A4.028,4.028,0,0,0,2,7.028v10.74A4.028,4.028,0,0,0,6.028,21.8h8.055V24.48H8.713a1.343,1.343,0,1,0,0,2.685H22.138a1.343,1.343,0,0,0,0-2.685h-5.37V21.8h8.055a4.028,4.028,0,0,0,4.028-4.028V7.028A4.028,4.028,0,0,0,24.823,3Zm1.343,14.768a1.343,1.343,0,0,1-1.343,1.343H6.028a1.343,1.343,0,0,1-1.343-1.343V7.028A1.343,1.343,0,0,1,6.028,5.685h18.8a1.343,1.343,0,0,1,1.343,1.343Z" transform="translate(1740.575 92)" fill="#626262"></path>
										</g>
									</svg>
								</a>
							</li>
							<li>
								<a id="__taggbox__previewtab" class="__taggbox__tabcommpreivew" href="javascript:void(0);" onclick="__taggbox__displayPreview('__taggbox__previewtab')">
									<svg xmlns="http://www.w3.org/2000/svg" width="20.388" height="24.33" viewBox="0 0 20.388 24.33">
										<path id="Path_5618" data-name="Path 5618" d="M7.65,2H20.739a3.65,3.65,0,0,1,3.65,3.65V22.681a3.65,3.65,0,0,1-3.65,3.65H7.65A3.65,3.65,0,0,1,4,22.681V5.65A3.65,3.65,0,0,1,7.65,2Zm0,2.433A1.217,1.217,0,0,0,6.433,5.65V22.681A1.217,1.217,0,0,0,7.65,23.9H20.739a1.217,1.217,0,0,0,1.217-1.217V5.65a1.217,1.217,0,0,0-1.217-1.217Zm7.007,18.248a1.217,1.217,0,1,1,1.217-1.217A1.217,1.217,0,0,1,14.656,22.681Z" transform="translate(-4 -2)" fill="#626262"></path>
									</svg>
								</a>
							</li>
							<li>
								<a id="__taggbox__previewmob" class="__taggbox__tabcommpreivew" href="javascript:void(0);" onclick="__taggbox__displayPreview('__taggbox__previewmob')">
									<svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 26 30">
										<path id="Path_5616" data-name="Path 5616" d="M19.22,2H7.162A2.414,2.414,0,0,0,4.75,4.412V23.705a2.414,2.414,0,0,0,2.412,2.412H19.22a2.414,2.414,0,0,0,2.412-2.412V4.412A2.414,2.414,0,0,0,19.22,2ZM7.162,23.705V4.412H19.22l0,19.294Z" transform="translate(0)" fill="#626262"></path>
										<circle id="Ellipse_169" data-name="Ellipse 169" cx="1" cy="1" r="1" transform="translate(12.191 20.059)" fill="#626262"></circle>
									</svg>
								</a>
							</li>
						</ul>
						<span onclick="__taggbox__openFullscreen();" class="__taggbox_expand">
							<i class="fas fa-expand-arrows-alt"></i>
						</span>
					</div>
					<div class="__taggbox__viewofpreview">
						<div class="__taggbox__previewdesk" id="__taggbox__widget_display_preview_id"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php endif; ?>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>