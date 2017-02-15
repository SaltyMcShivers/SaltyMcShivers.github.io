function replaceImage(targetID, newImg){
	document.getElementById(targetID).src = newImg;
}

function scroll_if_anchor(href) {
    href = typeof(href) == "string" ? href : $(this).attr("href");

    // You could easily calculate this dynamically if you prefer
    var fromTop = 64;

    if($(window).width() <= 768){
    	fromTop = 0;
    }

    // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
    // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
    if(href.indexOf("#") == 0) {
        var $target = $(href);
        
        // Older browser without pushState might flicker here, as they momentarily
        // jump to the wrong position (IE < 10)
        if($target.length) {
            $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
            if(history && "pushState" in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}    

function ToggleExtra(button, label, divToShow){
	$(divToShow).toggle();
	$this = $(this);
	if($(divToShow).css('display') == 'none'){
		$(button).text("Show More " + label);
	}else{
		$(button).text("Show Less " + label);
	}
}

function TopBarResize(){
	if($(window).width() > 768) {
        $('.navbar-custom').addClass('navbar-fixed-top');
        $('.navbar-custom').removeClass('navbar-static-top');
    }else{
        $('.navbar-custom').addClass('navbar-static-top');
        $('.navbar-custom').removeClass('navbar-fixed-top');
    }
}

function ShowVideoModal(videoCode, wider){
	var vid_url = "https://www.youtube.com/embed/";
	vid_url += videoCode;
	vid_url += "?autoplay=1";
	if(wider){
		$('#Modal_Video_16_9').modal('show');
		$("#VideoModalSource_16_9").attr('src', vid_url);
	}else{
		$('#Modal_Video_4_3').modal('show');
		$("#VideoModalSource_4_3").attr('src', vid_url);
	}
}

$( document ).ready(function() {
    TopBarResize();
});

$(function(){
	$(window).on('resize', function() {
	    TopBarResize();
	})

	$(".menuButton a").click(function(){
		scroll_if_anchor($(this).attr('href'));
	});

	$('.modal').on('hidden.bs.modal', function () {
	    $('iframe').each(function() {
	      var url = $(this).attr('src');
	      $(this).attr('src', '');
	      //$(this).attr('src', url);
	    });
	});

	$('.sizingButton').click(function(){
		var target = $(this).attr('href');
		$(target).toggle();
		if($(target).css('display') == 'none'){
			$(this).text("Show More " + $(this).attr('id'));
		}
		else{
			$(this).text("Show Fewer " + $(this).attr('id'));
		}
	})
});
