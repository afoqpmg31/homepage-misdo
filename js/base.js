$(function(){
	laodedExp();
	if($('#page_top').length > 0){
		pagetopScroll();
	}
	smoothScroll();
	navSp();
	navSpTgl();
	setupdateYear();
});
$(window).on('load', function() {
	mdHeaderScroll();
});

/*--------------------------------------------------
laodedExp
----------------------------------------------------*/
function laodedExp(){
	$('html').addClass('loaded');
}

/* --------------------------------------------------
pagetopScroll
-------------------------------------------------- */
function pagetopScroll(){
	var _toTop = $('#page_top');

	$(window).on('scroll', function() {
		var scrollPos = $(window).scrollTop();
		if( scrollPos > 100 ){
			_toTop.fadeIn('fast');
		}else{
			_toTop.fadeOut('fast');
		}
	});
	
	_toTop.click(function() {
		$('html, body').animate({scrollTop:0}, 500, 'swing');
		return false;
	});
}

/* --------------------------------------------------
smoothScroll
-------------------------------------------------- */
function smoothScroll(){
	var $header = $('#mdHeader');
	var headerH;
	var urlHash = location.hash;
	var speed = 500;
	var target;
	var position;

	($(window).width() < 768) ? headerH = $header.find('.mdHeader_wrap').outerHeight() : headerH = 80;

	$('a[href^="#"]').not('a.noScrl[href^="#"], .noScrl a[href^="#"]').click(function(){
		var href= $(this).attr('href');
		target = $(href == "#" || href == "" ? 'html' : href);
		position = target.offset().top;
		$('html, body').stop().animate({scrollTop:position - headerH}, speed, 'swing');
		return false;
	});
	
	if(urlHash){
		$('html, body').stop().scrollTop(0);

		target = $(urlHash);
		position = target.offset().top;
		$('html, body').stop().animate({scrollTop:position - headerH}, speed, 'swing');
	}
}

/* --------------------------------------------------
mdHeader
-------------------------------------------------- */
function mdHeaderScroll(){
	var $header = $('#mdHeader');
	var fixedPoint = $header.find('.mdHeader_wrap').outerHeight() + 55;
	var scrollTop = $(window).scrollTop();

	if(scrollTop >= fixedPoint){
		$header.addClass('is-pin');
	}else{
		$header.removeClass('is-pin');
	}

	$(window).on('scroll', function() {
		scrollTop = $(this).scrollTop();
		if(scrollTop >= fixedPoint) {
      $header.addClass('is-pin');
    } else {
      $header.removeClass('is-pin');
    }
  });
}

/* --------------------------------------------------
navSp
-------------------------------------------------- */
function navSp(){
	var $btnOpen = $('#mdHeader_menu_btn a');
	var $nav = $('#mdNav_sp');
	var $btnClose = $nav.find('#mdNav_sp_close a');
	var $cover = $nav.find('#mdNav_sp_cover');

	function navOpen(){
		$nav.addClass('op');
	}

	function navClose(){
		$nav.removeClass('op');
	}

	$btnOpen.on('click' , function(){
		navOpen();
	});

	$btnClose.on('click', function(){
		navClose();
	});

	$cover.on('click' , function(){
		navClose();
	});
}

function navSpTgl(){
	var $tgl = $('.js-mdNav_sp_list_tgl');
	var $tglTrg = $('.js-mdNav_sp_list_trg');
	var $tglCnt = $('.js-mdNav_sp_list_cnt');

	$tglTrg.on('click', function(){
		var $t = $(this).closest($tgl);
		var $cnt = $t.find($tglCnt);

		if($t.hasClass('op')){
			$t
				.removeClass('op');
			$cnt
				.stop()
				.slideUp();
		}
		else{
			$t
				.addClass('op');
			$cnt
				.stop()
				.slideDown();
		}
	});
}

/*--------------------------------------------------
setupdateYear
----------------------------------------------------*/
function setupdateYear(){
	var $updateYearFull = $('#updateYearFull');
	var $updateYear = $('#updateYear');
	var today = new Date();
	var year = today.getFullYear();
	var data = year.toString().slice(-2);

	if($updateYearFull.length){
		$updateYearFull.html(year);
	}
	$updateYear.html(data);
}