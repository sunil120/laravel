/***************Disable Browser back button script start*******************/
history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function (event)
{
    history.pushState(null, document.title, location.href);
});
/***************Disable Browser back button script end*******************/
var DATE_FORMAT = 'dd-M-yy';
var DATE_TIME_FORMAT = 'dd-M-yy';
var TIME_FORMAT = 'HH:mm:ss';
var globle_percent = '';
$(function () {
    $(".datepicker").datepicker({
        dateFormat: DATE_FORMAT,
        changeYear: true,
        changeMonth: true
    });
    $(".timepicker").timepicker({
        showInputs: false,
        timeFormat: TIME_FORMAT,
    });
    $(".datetimepicker").datetimepicker({
        dateFormat: DATE_FORMAT,
        timeFormat: TIME_FORMAT,
        changeMonth: true,
        changeYear: true,
    });

    if ($('.flash_fade').length) {
        setTimeout(function () {
            $('.flash_fade').remove();
        }, 6000);
    }

    $('.glyphicon-calendar').click(function (event) {
        event.preventDefault();
        $(this).parents('.input-group , .form-group').children('.hasDatepicker').focus();
    });
});

$(document).ajaxStart(function () {
    $('#loadingDiv').fadeIn();
}).ajaxStop(function () {
    $('#loadingDiv').fadeOut("slow");
});
$(window).on('load', function () {
    $("#loadingDiv").fadeOut("slow");
});
$(document).on('click', ".show-loading", function () {
    $('#loadingDiv').fadeIn();
});
// floatinig placeholder label for select2 boxex
$(document).on('select2:opening', '.selectBoxDropdown', function () {
    $(this).parent().parent().find('.custom-select2-label').attr('style', 'opacity: 1; top: -10px;');
});

$(document).on('select2:closing', '.selectBoxDropdown', function () {
    if ($(this).val() === "") {
        $(this).parent().parent().find('.custom-select2-label').removeAttr('style');
    } else {
        $(this).parent().parent().find('.custom-select2-label').attr('style', 'opacity: 1; top: -10px;');
    }
});

$(document).on('change', 'select:visible', function () {
    if ($(this).val() === "") {
        $(this).parent().parent().find('.custom-select2-label').removeAttr('style');
    } else {
        $(this).parent().parent().find('.custom-select2-label').attr('style', 'opacity: 1; top: -10px;');
    }
});

$(document).on('blur change focus', '.floating-element input, .floating-element textarea', function () {
    if ($(this).val().trim() == '') {
        $(this).parent().find('.floating-span').removeClass('active-txt-label');
    } else {
        $(this).parent().find('.floating-span').addClass('active-txt-label');
    }
});
$(document).ready(function () {
    $('.floating-element input:not([type="hidden"]), .floating-element textarea').each(function () {
        if ($(this).val().trim() == '') {
            $(this).parent().find('.floating-span').removeClass('active-txt-label');
        } else {
            $(this).parent().find('.floating-span').addClass('active-txt-label');
        }
    });
    $('.selectBoxDropdown, select:visible').each(function () {
        if ($(this).val() === "") {
            $(this).parent().parent().find('.custom-select2-label').removeAttr('style');
        } else {
            $(this).parent().parent().find('.custom-select2-label').attr('style', 'opacity: 1; top: -10px;');
        }
    });
});
// floatinig placeholder label for select2 boxes(ends)


$(document).ready(function () {

    var $initiator = $(".initiatorScreen").length;

    $(".selectBoxDropdown").select2();

    $('#uploadDocBtn').change(function () {
        $('#path').val($(this).val());
    });

    /* Zoom */
    var select = $("#demo");
    var container_width = $('.gallery-container').width();
    var img_container_width = $('.imgBox').css('min-width');
    img_container_width = img_container_width === undefined ? 1 : img_container_width.replace('px', '');
    var min_wd = Math.round(100 / (container_width / img_container_width));
    $('.imgBox').css('width', min_wd + '% !important');
    $('#sliderPosition').html(min_wd);
    var slider = $("<div id='slider'></div>").insertAfter(select).slider({
        min: 0,
        max: 200,
        value: min_wd,
        range: "min",
        change: function (event, ui) {
            //alert(1);
            container_width = $('.gallery-container').width();
            //autocomplete with calculation start
            $('.ui-autocomplete').css('display', 'none');
            //end autocomplete
            min_wd = Math.round(100 / (container_width / img_container_width));
            var sliderValue = $("#slider").slider("option", "value");
            if (sliderValue < min_wd) {
                $("#slider").slider("value", min_wd).trigger('change');
                return;
            }
            if (ui.value > 100) {
                $('.scrollbar').css('overflow-x', 'scroll');
            } else {
                $('.scrollbar').css('overflow-x', 'hidden');
            }
            if (!(ui.value < min_wd || ui.value > 200)) {
                $('.imgBox').css('width', ui.value + '%');
                var divWidth = $('.imgBox').width();
                var incHeight = (divWidth + 8) * 0.4012;
                var x = divWidth + incHeight + 8;
                $('.imgBox').css('height', x);
            }
            $('#sliderPosition').html(sliderValue);
        }

    });

    $('#increase').click(function () {
        var sliderCurrentValue = $("#slider").slider("option", "value");
        slider.slider("value", sliderCurrentValue + 1);
    });

    $('#decrease').click(function () {
        var sliderCurrentValue = $("#slider").slider("option", "value");
        slider.slider("value", sliderCurrentValue - 1);
    });



    $(".addFieldsBtn").click(function () {
        var tracker_field = '<li class="row"><div class="form-group col-sm-4 internal-name"><input type="text" class="form-control" name="internalName" placeholder="Internal Name"></div><div class="form-group col-sm-8 external-name"><input type="text" class="form-control" name="externalName" placeholder="External Name"></div></li>';
        $("#trackerDetailCntr").append(tracker_field);

    });

    /* map existing organization toggle starts here */
    $(".map-existing-btn").click(function () {
        $(".map-existing-organization").slideToggle();

    });
    /* map existing organization toggle ends here */

});

/*Magnify popup range slider */
$(document).ready(function () {
    var select = $("#magnifyPopupdemo");
    var slider = $("<div id='slider1'></div>").insertAfter(select).slider({
        min: 100,
        max: 200,
        value: 100,
        range: "min",
        change: function (event, ui) {
            var sliderValue1 = $("#slider1").slider("option", "value");
            if (!(ui.value < 100 || ui.value > 200)) {
                $('.PopupImgBox').css('width', ui.value + '%');
            }
            $('#magnifyPopupsliderPosition').html(sliderValue1);
        }
    });

    $('#magnifyPopupincrease').click(function () {
        var sliderCurrentValue = $("#slider1").slider("option", "value");
        slider.slider("value", sliderCurrentValue + 1);
    });

    $('#magnifyPopupdecrease').click(function () {
        var sliderCurrentValue = $("#slider1").slider("option", "value");
        slider.slider("value", sliderCurrentValue - 1);
    });
});

//function alert(message) {
//    $("#alert_modal_body").html(message);
//    $("#alert_modal").modal("show");
//}

function agreementToggleDiv(child_id) {
    $("#" + child_id).toggle();
    if ($("#" + child_id).is(':hidden')) {
        $(".fa." + child_id).removeClass('fa-minus').addClass('fa-plus');
    } else {
        $(".fa." + child_id).removeClass('fa-plus').addClass('fa-minus');
    }
}


// JS for Resizable starts here
$(document).ready(function () {
    var i = 0;
    var dragging = false;
    var horizontalDragging = false;
    $('#dragbar').mousedown(function (e) {
        e.preventDefault();

        dragging = true;
        var main = $('#main');
        var ghostbar = $('<div>',
                {id: 'ghostbar',
                    css: {
                        height: main.outerHeight(),
                        top: main.offset().top,
                        left: main.offset().left
                    }
                }).appendTo('body');

        $(document).mousemove(function (e) {
            ghostbar.css("left", e.pageX + 2);
        });

    });
    $('#horizontal-dragbar').mousedown(function (e) {
        e.preventDefault();

        horizontalDragging = true;
        var main = $('#main');
        var ghostbar = $('<div>',
                {id: 'ghostbar',
                    css: {
                        height: 5,
                        width: '100%',
                        top: main.offset().top,
                        left: main.offset().left
                    }
                }).appendTo('body');

        $(document).mousemove(function (e) {
            ghostbar.css("top", e.pageY + 2);
        });

    });

    $(document).mouseup(function (e) {
        if (dragging)
        {
            var img_container_width = $('.imgBox').css('min-width').replace('px', '');
            var min_percentage = (parseInt(img_container_width) + 50) * 100 / window.innerWidth;
            var percentage = (e.pageX / window.innerWidth) * 100;
            if(percentage <=27) { percentage = 27 };
            var min_main_percentage = 350 * 100 / window.innerWidth;
            var mainPercentage = 100 - percentage;
            if ($('#sidebar').hasClass('move-form-to-left')) {
                percentage = mainPercentage;
                mainPercentage = 100 - percentage;
            }
           
            // more preference for left side image container
            if (mainPercentage < min_main_percentage) {
                mainPercentage = min_main_percentage;
                percentage = 100 - mainPercentage;
            }
            if (percentage < min_percentage) {
                percentage = min_percentage;
                mainPercentage = 100 - percentage;
            }
            // adding class to auto adjust form
            if (mainPercentage <= 410 * 100 / window.innerWidth) {
                $('#main').removeClass('resizeFormMax').addClass('resizeFormMin');
            } else if (mainPercentage >= 610 * 100 / window.innerWidth) {
                $('#main').removeClass('resizeFormMin').addClass('resizeFormMax');
            } else {
                $('#main').removeClass('resizeFormMax resizeFormMin');
            }
            $('#sidebar').css("width", percentage + "%");
            $('#sidebar').attr("width_per", percentage);
            $('#sidebar.move-form-to-bottom .imgBoxCntr').css("height", "calc(100% - 126px)");
            $('.sidebar-img-popup').css("width", "calc(" + percentage + "% - 5px)");
            $('#main, .main-form-popup').css("width", mainPercentage + "%");
            $('#ghostbar').remove();
            $(document).unbind('mousemove');
            dragging = false;
            var container_width = $('.gallery-container').width();
            var min_wd = Math.round(100 / (container_width / img_container_width));
            $('.imgBox').css('width', min_wd + '% !important');
            $("#slider").slider('value', min_wd).trigger('change');
            if ($(".PopupImgBox").length) {
                var cur_index = $('.sidebar-img-popup-container div.PopupImgBox').attr('cur_index');
                setTimeout(function () {
                    var esc = $.Event("keyup", {keyCode: 27});
                    $("body").trigger(esc);
                    $('.imgBox').eq(cur_index).find('a.zoom-icon').trigger('click');
                }, 500);
            }
            if ($('#sidebar').hasClass('move-form-to-left')) {
                globle_percent = 100 - percentage;
                $('.prev-arrow').css("left", (globle_percent+0.5) + "%");
            } else {
                $('.next-arrow').css("left", (percentage-5) + "%");
                globle_percent = percentage;
            }
        }
        if (horizontalDragging) {
            // height = cursor height - header height - dragger height;
            height = e.pageY - 126 - 5;
            var win_height = window.innerHeight;
            if (height <= 200) {// min image container height = 200;
                height = 200;
            } else if (e.pageY >= win_height - 100) {// min form container height = 100;
                height = win_height - 126 - 5 - 100;
            }
            var main_height = win_height - height - 126 - 5;
            var sidbar_height = win_height-main_height-10;
            $('#sidebar.move-form-to-bottom .imgBoxCntr, #sidebar.move-form-to-bottom .sidebar-img-popup').css("height", height + "px");
            $('#main.move-form-to-bottom .bridgeForm, #main.move-form-to-bottom .main-form-popup').css("height", main_height + "px");
            $('#sidebar.move-form-to-bottom .sidebar-img-popup').css("height", sidbar_height + "px !important");
            $('#ghostbar').remove();
            $(document).unbind('mousemove');
            horizontalDragging = false;
        }
    });

});
//popup on click
$(document).on('click', 'a.zoom-icon', function (e) {
    var cur_index = $('.imgBox').index($(this).closest('div.imgBox'));
    $('.imgBox').removeClass('selected-image').eq(cur_index).addClass('selected-image');
    var html = $('.imgBox').eq(cur_index).clone(false);
    html.removeClass('imgBox').addClass('PopupImgBox').removeClass('selected-image').attr('cur_index', cur_index).attr('style', 'position:relative;border: 0px !important;');
    html.find('img').attr('id', 'cropbox').css({width: '100% !important', height: 'auto !important'}).parent().append('<div class="jcrop"></div>');
    html.find('img').attr('id', 'cropbox').css({width: '100% !important', height: 'auto !important'}).parent().append('<a href="javascript:void(0);" class="prev-arrow" current_index = "' + cur_index + '"><i class="fa fa-angle-left" aria-hidden="true"></i></a><a href="javascript:void(0);" class="next-arrow" current_index = "' + cur_index + '"><i class="fa fa-angle-right" aria-hidden="true"></i></a>');
    html.find('a.zoom-icon').remove();
    html.find('a.delete-icon').remove();
    html.find('div.layer').remove();
    html.find('input').remove();

    $('.sidebar-img-popup-container').html('').append(html);
    $('.sidebar-img-popup').css('display', 'block');
    //$('.sidebar-img-popup').css('display', 'block');
    
    if(globle_percent !='') { 
        
        if ($('#sidebar').hasClass('move-form-to-bottom')) {
            $('.prev-arrow').css("left",'none');
        } else if ($('#sidebar').hasClass('move-form-to-left')) {
            globle_percent = $('#sidebar').attr('width_per');
            $('.prev-arrow').css("left", (100 - globle_percent+0.5) + "%");
        } else {
            globle_percent = $('#sidebar').attr('width_per');
            $('.next-arrow').css("left", (globle_percent-5) + "%");
        } 
    }
     
    if ($("#main").hasClass('main-width-enlarge')) {
        $("#main").removeClass('main-width-enlarge').addClass('removed-width-enlarge');
    }
    var is_full_width = $('.sidebar-img-popup').closest('#sidebar');
    if (is_full_width.length <= 0) {
        $('.sidebar-img-popup').css('width', '100%');
    }
    $('a.popup_inner_block').focus();
    $("#slider1").slider('value', 100).trigger('change');
    $(".magnific-zoom-selector").removeClass('hide');
    $(".zoom-selector").addClass('hide');
    $('.sidebar-img-popup-container').addClass('disable-selection');
    $('.ui-sortable-handle').addClass('disable-selection');
    e.preventDefault();
});
//dismiss popup on esc
$(document).on('keyup', function (e) {
    if (e.keyCode === 27) {
        var cur_index = $('.sidebar-img-popup-container div.PopupImgBox').attr('cur_index');
        $('.sidebar-img-popup-container').html('');
        $('.sidebar-img-popup').css('display', 'none');
        $(".magnific-zoom-selector").addClass('hide');
        $(".zoom-selector").removeClass('hide');
        $('.imgBox').eq(cur_index).find('a.zoom-icon').focus();
        if ($('.PopupImgBox').hasClass('removed-selected-image')) {
            $('.PopupImgBox').addClass('selected-image');
        }
        if ($("#main").hasClass('removed-width-enlarge')) {
            $("#main").addClass('main-width-enlarge');
        }
    }
});


$(document).on('click', 'a.next-arrow', function (e) {
    var cur_index = parseInt($(this).attr('current_index'));
    $('.imgBox').eq(cur_index).removeClass('selected-image'); 
    cur_index++;    
    var esc = $.Event("keyup", { keyCode: 27 });
    $("body").trigger(esc);
    $('.imgBox').eq(cur_index).find('a.zoom-icon').trigger('click');

});

$(document).on('click', 'a.prev-arrow', function (e) {
    var cur_index = parseInt($(this).attr('current_index'));
    $('.imgBox').eq(cur_index).removeClass('selected-image'); 
    cur_index--;    
    var esc = $.Event("keyup", { keyCode: 27 });
    $("body").trigger(esc);
    $('.imgBox').eq(cur_index).find('a.zoom-icon').trigger('click'); 
});


$(document).on('click', 'a#show_history_in_modal', function (e) {
    $("#history_confirm_modal").modal("show"); 
    
});
/**************Remove selection of Image if user click out side of the image with in image listing box****************/
$(document).ready(function () {
   $("div#remove_selection" ).click(function( event ) {            
        var domElement = event.target.nodeName;
        if(domElement !== 'IMG' && domElement !== 'I'){
           $('.imgBox').removeClass('selected-image');
        }        	
    }); 
});

/**************Show Image in Popup on click of image in camparison window ***************************/
$(document).ready(function () {
   $("body" ).on('click', 'div.unmatch-doc-link', function( event ) {   
       var imgImage = $(this).attr("data-imagename");
       var imgIndex = $('.imgBox').index($("img[data_src='" + imgImage + "']").parents(".imgBox"));
       $('.imgBox').eq(imgIndex).find('a.zoom-icon').trigger('click');            
    }); 
});
