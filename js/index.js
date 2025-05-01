$(function(){
	setMainSlider();
	setBnrSlider();
});

$(window).on('load', function() {
	setInstagramList();
});


/*--------------------------------------------------
slider
----------------------------------------------------*/

function setMainSlider(){
	var $mainSlider = $('#main_slider');
	var $slider = $mainSlider.find('.slider');
	var $thumbnail = $mainSlider.find('.thumbnail');

	if(1 >= $slider.find('.slider_item').length){
		$mainSlider.addClass('notSlider');
	}

	if($slider.find('.slider_item').length > 1){
		$mainSlider.removeClass('notSlider');
		$slider.on('init', function (slick, currentSlide, i) {
			$thumbnail.find('li').eq(0).addClass('js-current');
		});
	}
	$slider.on('beforeChange', function (slick, currentSlide, i) {
		var _num = (currentSlide['currentSlide']);
		
		$mainSlider.addClass('anim');
		$slider.find('.slider_item').eq(_num).find('figure').unwrap();
	});
	$slider.on('afterChange', function (slick, currentSlide, i) {
		var _num = (currentSlide['currentSlide']);

		$slider.find('.slider_item').eq(_num).find('figure').wrap('<h1>');
		$thumbnail.find('li').removeClass('js-current');
		$thumbnail.find('li').eq(_num).addClass('js-current');
		$mainSlider.removeClass('anim');
	});

	$thumbnail.find('ul li a').on('click', function(i){
		var index = $thumbnail.find('ul li a').index(this);

		$thumbnail.find('ul li').removeClass('js-current');
		$(this).parent('li').addClass('js-current');
		$slider.slick('slickGoTo', index);
	});

	$slider.slick({
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		//asNavFor: $thumbnail,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					touchMove: true
				}
			}
		]
	});
}

function setBnrSlider(){
	var _winW;
  var _isSp = true;  //PC:false, SP:true
	var _bp = 768;

	var $slider = $('#bnr_slider .slider');
	var $sliderList = $slider.find('.slider_item');

	$slider.addClass('is-notSlide');

	function checkStartSlide(){
		_winW = $(window).width();
		(_winW >= _bp) ? _isSp = false : _isSp = true;

		if(_isSp){
			$slider.removeClass('is-notSlide');
			if($sliderList.length <= 1){
				$slider.addClass('is-notSlide');
			}
		}else{
			$slider.removeClass('is-notSlide');
			if($sliderList.length <= 4){
				$slider.addClass('is-notSlide');
			}
		}
	}

	$slider.slick({
		autoplay: false,
		//autoplaySpeed: 3000,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		//variableWidth: true,
		dots: true,
		infinite: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '21.5%',
			}
		}
		]
	});

	$(window).on('load resize',function(){
    checkStartSlide();
  });
}

/*--------------------------------------------------
instagramList
----------------------------------------------------*/
function setInstagramList(){
	var limit = 4; //表示件数
	var data;
	var graph_api = 'https://graph.facebook.com/v20.0/';
	var accessToken = 'EAAEJ8ZCXXMwEBO4eL6MZC9m0CtPez5ReHkLQ3lhvojV5T5mZBxfeqiKXB769RKKxGzbZCtkMwFZCkQQ2cdAQVM9YlpxJH7ZAcFyn58ghlHxXIDwX5IHeGEWrZAQrEo4EtLRkj6aLN3EnBvTsMX9rB0ko3vnFmRDLzYUHFKUsfjpM6yBxrXaAeX2hZCQMwCQO'; // アクセストークン
	var businessID = '17841406108446527'; //instagram_business_accountのID
	var fields = 'media{caption,media_url,permalink,timestamp,thumbnail_url,media_type,username}';
	var url = graph_api + businessID + '?fields=' + fields + "&access_token=" + accessToken;

	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: function(json) {
			var html = '';
			var insta = json.media.data;
			for (var i = 0; i < limit; i++) {
		    var media_type = insta[i].media_type;
				if ( insta[i].media_type == "IMAGE" || insta[i].media_type == "CAROUSEL_ALBUM" ) {
					html += '<div class="fig"><a href="' + insta[i].permalink + '" target="_blank">';
					html += '<img src="' + insta[i].media_url + '">';
					html += '</a></div>';
				}else if (media_type == "VIDEO" ) {
					html += '<div class="fig"><a href="' + insta[i].permalink + '" target="_blank">';  
					html += '<img src="' + insta[i].thumbnail_url + '">';  
					html += '</a></div>';       
					var media_type = '';                    
				}       
			}
			$('#instagramList').append(html);
		},
		error: function(jqXHR, status) {
			$('#instagramList').html('<p class="txt">読み込みに失敗しました。</p>');
		}
	});
}