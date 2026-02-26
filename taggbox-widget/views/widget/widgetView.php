<?php
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
?>
<div id="__taggbox__widgetab" class="__taggbox__tabcontent">
	<div class="__taggbox__widgetarea">
		<div class="__taggbox__widgetactions">
			<div>
				<h3>My Widget</h3>
			</div>
			<div style="display:<?php echo (empty($__taggbox__widgets)) ? 'none' : ''; ?>">
				<a class="__taggbox__btn" href="javascript:void(0);" id="__taggbox__widget_create_form">Create</a>
			</div>
		</div>
		<div class="__taggbox__widgetinn">
			<?php
			if (!empty($__taggbox__widgets)) :
				$count = 0;
				foreach ($__taggbox__widgets as $__taggbox__widget) :
			?>
					<div class="__taggbox__widgetbox <?php echo $__taggbox__active_widget_id == $__taggbox__widget->id ? 'active' : ''; ?>" id="__taggbox__widgetbox<?php echo esc_html($count); ?>">
						<div class="__taggbox__widgethead">
							<div>
								<h3><?php echo esc_html($__taggbox__widget->name); ?></h3>
								<ul>
									<li><?php echo esc_html($__taggbox__widget->feedCount); ?> Feeds</li>
									<li><?php echo esc_html($__taggbox__widget->networkCount); ?> Networks</li>
								</ul>
							</div>
							<div class="tooltip">
								<div class="__taggbox__toggleOnBut __taggbox__switch">
									<div class="__taggbox__onoffswitch">
										<input data-widgetStatus="<?php echo esc_html($__taggbox__widget->status); ?>" onchange="__taggbox__updateWidgetStauts('<?php echo esc_html($__taggbox__widget->id); ?>', '<?php echo esc_html($count); ?>');" type="checkbox" name="widget-<?php echo esc_html($count); ?>" id="widget-<?php echo esc_html($count); ?>" class="__taggbox__onoffswitch-checkbox __taggbox__updateStatus" data-on-color="#009385" data-off-color="#989898" <?php echo (esc_html($__taggbox__widget->status)) ? 'checked' : ''; ?>>
										<label class="__taggbox__onoffswitch-label" for="widget-<?php echo esc_html($count); ?>">
											<span class="__taggbox__onoffswitch-inner"></span>
											<span class="__taggbox__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
										</label>
									</div>
								</div>
								<span class="tooltiptext">Status</span>
							</div>
						</div>
						<div class="__taggbox__widget_sourcecode" onclick="__taggbox__copyToWidgetShortCode('[taggbox widgetid=&quot;<?php echo esc_html($__taggbox__widget->id); ?>&quot;]');">
							<p>[taggbox widgetid="<?php echo esc_html($__taggbox__widget->id); ?>"]</p>
							<button
								title="Copy Short Code">
								<i class="fa fa-files-o" aria-hidden="true"></i>
							</button>
						</div>
						<div class="__taggbox__widgetfoot">
							<ul>
								<li><a href="javascript:void(0);" onclick="__taggbox__menus(2, '<?php echo esc_html($__taggbox__widget->id); ?>')"> Open </a></li>
								<li>
									<a href="javascript:void(0);" onclick="__taggbox__widgetEditForm('<?php echo esc_html($__taggbox__widget->id); ?>', '<?php echo addslashes($__taggbox__widget->name); ?>');">
										Rename
									</a>
								</li>

								<li><a href="javascript:void(0);" onclick="__taggbox__deleteWidget('<?php echo esc_html($__taggbox__widget->id); ?>', '__taggbox__widgetbox<?php echo esc_html($count); ?>');"> Delete </a></li>
							</ul>
						</div>
					</div>
			<?php
					$count++;
				endforeach;
			endif;
			?>
		</div>
	</div>
</div>
<?php include_once TAGGBOX_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>