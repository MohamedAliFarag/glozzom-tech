//Year Date
$('#year').text(new Date().getFullYear())


//config carousel
$('.carousel').carousel({
interval: 6000,
pause : 'hover'
})

//image light-box
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });


//close modal video
$(function(){
$(".video").click(function(){
var theModal = $(this).data("target"),
videoSRC = $(this).attr("data-video"),
videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1"
$(theModal+' iframe').attr('src',videoSRCauto)
$(theModal+' button.close').click(function(){
  $(theModal+' iframe').attr('src',videoSRC)
})
})
})

//message time
setTimeout(function() {
  $("#flash").fadeOut().empty();
}, 5000);

//slick slider
$('.slider').slick({
  infinite:true,
  slideToShow:1,
  slideToScroll:1
})
