$(function(){
	tabs();
	setAcc();
});

$(window).on('load', function() {
	setMatchHeight();
});

/* --------------------------------------------------
タブ（tab）
-------------------------------------------------- */
function tabs(){
	var $tabs = $('.js-tabs');
	var $tabNav = $('.js-tabNav');
	var $tabPanel = $('.js-tabPanel');

	function init(){
		$tabs.each(function(){
			var $this = $(this);
			var $targetPanel = $this.find($tabPanel);
			var _tabFlag = false;

			$this.find($tabNav).find('a').each(function(){
				var _targetPanelTab;

				$targetPanel.removeClass('is-current');

				if($(this).parent().hasClass('is-current')){
					_targetPanelTab = $(this).data('tab');

					for(var i=0; i<$targetPanel.length; i++){
						if($targetPanel.eq(i).data('tab') == _targetPanelTab){
							$targetPanel.eq(i)
								.addClass('is-current')
								.stop()
								.fadeIn();
							
							break;
						}
					}
						
					_tabFlag = true;

					return false;
				}
			});

			if(!_tabFlag){
				$this.find($tabPanel).eq(0)
					.addClass('is-current')
					.show();

				$this.find($tabNav).find('li').eq(0)
					.addClass('is-current')
					.show();
			}
		});
	}
	init();

	$tabNav.find('a').on('click', function(){
			var $targetTabs = $(this).closest($tabs);
			var $targetNav = $targetTabs.find($tabNav);
			var $targetPanel = $targetTabs.find($tabPanel);
			var _targetPanelTab = $(this).data('tab');

			if(!$(this).parent().hasClass('is-current')){
					$targetNav.find('li').removeClass('is-current');
					$(this).parent().addClass('is-current');

					$targetPanel
							.removeClass('is-current')
							.hide();
					
					for(var i=0; i<$targetPanel.length; i++){
							if($targetPanel.eq(i).data('tab') == _targetPanelTab){
									$targetPanel.eq(i)
											.addClass('is-current')
											.stop()
											.fadeIn();
									
									break;
							}
					}
			}
	});
}

/* --------------------------------------------------
accordion
-------------------------------------------------- */
function setAcc(){
	$('.js-acc').each(function(){
			var $accCnt = $(this).find('.js-acc_content');

			if($(this).hasClass('open')){
					$accCnt.show();
			}
	});

	$('body').on('click','.js-acc_trg', function(){
			var $accArea = $(this).closest('.js-acc');
			var $accCnt = $accArea.find('.js-acc_content');

			if($accArea.hasClass('open')){
					$accCnt
							.stop()
							.slideUp();
					$accArea
							.removeClass('open');
			}
			else{
					$accCnt
							.stop()
							.slideDown();
					$accArea
							.addClass('open');
			}
	});
}

/* --------------------------------------------------
setMatchHeight
-------------------------------------------------- */
function setMatchHeight() {
	if($('.matchHeight').length > 0){
			$('.matchHeight').each(function () {
					$(this).find('.matchH').matchHeight();
			});
	}
}
