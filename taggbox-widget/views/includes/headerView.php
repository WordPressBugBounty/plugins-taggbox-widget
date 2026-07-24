<div class="__taggbox__tabing">
	<div class="__taggbox__tabingone">
		<div class="__taggbox__menumob">
			<ul>
				<li><span>Menu</span><a href="javascript:void(0)" id="__taggbox__burger" onclick="__taggbox__manageMenueHideShowInMobile();"><i class="fa fa-bars" aria-hidden="true"></i></a></li>
			</ul>
		</div>
		<ul class="__taggbox__mainmenu" id="__taggbox__menulist">
			<?php
			$i = 1;
			foreach ($__taggbox__menus	as	$__taggbox__menu) :
				if ($__taggbox__menu->status) :
					$__taggbox__active_menue_id = $__taggbox__menu->id;
				endif;
				if ($__taggbox__menu->id <= 6) :
			?>
					<li onclick="__taggbox__menus('<?php echo esc_html($__taggbox__menu->id); ?>')" class="__taggbox__tablinks<?php echo esc_html($__taggbox__menu->status) == 1 ? ' __taggbox__active ' : ''; ?>"> <span><?php echo esc_html($i); ?></span> <?php echo esc_html($__taggbox__menu->name); ?></li>
				<?php else : ?>
					<li onclick="__taggbox__menus('<?php echo esc_html($__taggbox__menu->id); ?>')" class="__taggbox__tablinks <?php echo esc_html($__taggbox__menu->status) == 1 ? ' __taggbox__active ' : ''; ?>"><?php echo esc_html($__taggbox__menu->name); ?></li>
			<?php
				endif;
				$i++;
			endforeach;
			?>
		</ul>
		<ul class="__taggbox__branding">
			<li><a href="https://taggbox.com/" target="_blank"><img src="<?php echo esc_html(TAGGBOX_PLUGIN_URL); ?>assets/images/taggbox-logo.png" alt="taggbox" /></a></li>
		</ul>
	</div>
	<div class="__taggbox__tabingtwo">
		<div class="__taggbox__tabtwoleft">
			<div class="__taggbox__selectwid">
				<?php if (!empty($__taggbox__widgets)) : ?>
					<?php if (!in_array($__taggbox__active_menue_id, [1,	7,	8,	9,	10])):	?>
						<span class="<?php echo in_array($__taggbox__active_menue_id, [2]) ? 'add-select-widget' : ""; ?> ">Selected Widget</sub></span>
						<select name="__taggbox__widgets" id="__taggbox__widgets">
							<?php foreach ($__taggbox__widgets	as	$__taggbox__widget) : ?>
								<option <?php echo $__taggbox__active_widget_id == $__taggbox__widget->id ? 'selected' : ''; ?> value="<?php echo esc_html($__taggbox__widget->id); ?>#<?php echo esc_html($__taggbox__widget->name); ?>"><?php echo esc_html($__taggbox__widget->name); ?></option>
							<?php endforeach; ?>
						</select>
					<?php endif; ?>
				<?php else: ?>
					<div> <b>NOTE :</b> Create at least one widget </div>
					<a class="__taggbox__btn" href="javascript:void(0);" id="__taggbox__widget_create_form">Create</a>
				<?php endif; ?>
			</div>
		</div>
		<div class="__taggbox__tabtworight">
			<div class="__taggbox__msg">
				<img style="margin-top: -2px;" src="<?php echo esc_html(TAGGBOX_PLUGIN_URL); ?>assets/images/profile.png" />
				<div class="__taggbox__showemail">
					<b>Hi,</b>
					<?php echo esc_html($__taggbox__active_widget_user_name); ?>
					<?php echo '<b style=\'color: #d63638;\'> ( ' . esc_html($__taggbox__active_widget_user_email_id) . ' )</b>'; ?>
				</div>
			</div>
			<a href="javascript:void(0);" id="__taggbox__logout" class="__taggbox__logout">
				<em>Switch account</em>
				<span>
					<img src="<?php echo esc_html(TAGGBOX_PLUGIN_URL); ?>assets/images/turn-off.png" alt="Sign Out" />
					<i>Sign Out</i>
				</span>
			</a>
		</div>
	</div>
</div>
<!--Start-- Manage Taggbox Loader How OR Not -->
<script>
	var __taggbox__loader_status = <?php echo in_array($__taggbox__active_menue_id, [5]) ? 0 : 1; ?>;
</script>
<!--End-- Manage Taggbox Loader How OR Not -->