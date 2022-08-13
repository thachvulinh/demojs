setTimeout(function(){
    $('#carousel_content').carousel({interval: 500});
    /* carousel-multip*/
    $('#carousel-multip').on('slide.bs.carousel', function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 5;
        var totalItems = $('#carousel-multip .carousel-item').length;
        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $('#carousel-multip .carousel-item').eq(i).appendTo('#carousel-multip .carousel-inner');
                }
                else {
                    $('#carousel-multip .carousel-item').eq(0).appendTo('#carousel-multip .carousel-inner');
                }
            }
        }
    });
},1000);
