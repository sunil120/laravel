!function ($) {
    var first_key_index = -1;
    $.fn.bindKeyEvents = function (options) {
        if (!options) {
            options = {};
        }
        var settings = $.extend({}, $.fn.bindKeyEvents.defaults, options);
        this.on('keyup', function (ev) {
            var key = ev.keyCode;
            if (!key) {
                key = ev.which;
            }
            if (key === 16) {
                first_key_index = $('.' + settings.childCommonClass).index($(document.activeElement).closest('.' + settings.childCommonClass));
            }
        });
        this.on('keydown', function (e) {
            var key = e.keyCode;
            if (!key) {
                key = e.which;
            }
            var parentnode = $('body');
            if (settings.parentId !== '') {
                parentnode = $('#' + settings.parentId);
            } else if (settings.parentClass !== '') {
                parentnode = $('.' + settings.parentClass);
            }
            var prevent_default = true;
            var is_focus_within = $(document.activeElement).closest(parentnode);
            var is_context_menu_open = $('.context-menu-list:visible').length;
            if (!e.altKey && (is_context_menu_open > 0 || (!is_focus_within.length && key !== 117)) && !(e.ctrlKey && $.inArray(key, [37,38,39,40]) !== -1)) {
                prevent_default = false;
            } else if (e.shiftKey) {
                if ($.inArray(key, settings.unBindShiftKeyEvents) !== -1) {
                    key = -1;
                }
                var cur_key_index = $('.' + settings.childCommonClass).index($(document.activeElement).closest('.' + settings.childCommonClass));
                var n = Math.floor(parentnode.width() / $('.' + settings.childCommonClass).outerWidth(true));
                var is_cur_key_set = false;
                switch (key) {
                    case 37://prev
                        cur_key_index -= 1;
                        is_cur_key_set = true;
                    case 38://up
                        if (!is_cur_key_set) {
                            cur_key_index -= n;
                            is_cur_key_set = true;
                        }
                    case 39://next
                        if (!is_cur_key_set) {
                            cur_key_index += 1;
                            is_cur_key_set = true;
                        }
                    case 40://down
                        if (!is_cur_key_set) {
                            cur_key_index += n;
                            is_cur_key_set = true;
                        }
                        if (first_key_index < 0) {
                            break;
                        }
                        if (cur_key_index < 0 || cur_key_index > ($('.' + settings.childCommonClass).length - 1)) {
                            break;
                        }
                        var min = Math.min(first_key_index, cur_key_index);
                        var max = Math.max(first_key_index, cur_key_index);
                        $('.' + settings.childCommonClass).removeClass(settings.childClass);
                        for (var i = min; i <= max; i++) {
                            $('.' + settings.childCommonClass).eq(i).addClass(settings.childClass);
                        }
                        $('.' + settings.childCommonClass).eq(cur_key_index).find(settings.focusElement).focus();
                        break;
                    default:
                        prevent_default = false;
                        break;
                }
            } else if (e.ctrlKey) {
                if ($.inArray(key, settings.unBindCtrlKeyEvents) !== -1) {
                    key = -1;
                }
                switch (key) {
                    case 37://prev
                        rotateOnKey(-90);
                        break;
                    case 38://up
                        $(settings.zoomIn).trigger('click');
                        break;
                    case 39://next
                        rotateOnKey(90);
                        break;
                    case 40://down
                        $(settings.zoomOut).trigger('click');
                        break;
                    case 68://Delete
                    case 100:
                        deleteImageSelected();
                        break;
                    case 85:// unselect all <U>
                    case 117:
                        resetSelection();
                        first_key_index = -1;
                        break;
                    case 83:// seprator <S>
                    case 115:
                        addSepratorBeforeSelected();
                        break;
                    case 73:
                        insuffImageSelected();
                        break;                        
                    default:
                        prevent_default = false;
                        break;
                }
            } else if (e.altKey) {
               
                //return false;
                if ($.inArray(key, settings.unBindAltKeyEvents) !== -1) {
                    key = -1;
                }
                var add_class = '';
                var is_action_taken = false;
                var imgBoxPannel = $('.imgBoxCntr');
                if(imgBoxPannel.length) {
                    switch (key) {
                        case 37://prev
                            //add_class = imgBoxPannel.length ? '' : 'move-form-to-left';
                            is_action_taken = true;
                        case 38://up
                            if (!is_action_taken) {

                                if ($('#main').hasClass('move-form-to-left')) {
                                    add_class = 'move-form-to-left';
                                }
                                is_action_taken = true;
                            }
                            is_action_taken = true;                                                        
                        case 39://next

                            if (!is_action_taken) {
                                add_class = imgBoxPannel.length ? 'move-form-to-left' : '';
                                is_action_taken = true;
                            }
                        case 40://down
                            if($(".PopupImgBox").length) {
                                var esc = $.Event("keyup", { keyCode: 27 });
                                $("body").trigger(esc);
                            }
                            if (!is_action_taken) {
                                add_class = 'move-form-to-bottom';
                                if ($('#main').hasClass('move-form-to-left')) {
                                    add_class += ' move-form-to-left';
                                }
                            }
                            $('#main, #sidebar').removeClass('move-form-to-left move-form-to-bottom');
                            if (add_class.trim() !== '') {
                                $('#main, #sidebar').addClass(add_class);
                            }
                            var window_height = window.innerHeight - 126;
                            if (add_class.indexOf('move-form-to-bottom') !== -1) {
                                window_height = (window_height - 5) / 2;
                            }
                            var container_width = $('.gallery-container').width();
                            var img_container_width = $('.imgBox').css('min-width').replace('px', '');
                            var min_wd = Math.round(100 / (container_width / img_container_width));
                            $('.imgBox').css('width', min_wd + '% !important');
                            $("#slider").slider('value', min_wd).trigger('change');
                            $('#sidebar .imgBoxCntr, #sidebar .sidebar-img-popup, #main .bridgeForm, #main .main-form-popup').css("height", window_height + "px");
                            break;
                        default:
                            prevent_default = false;
                            break;
                    }
                }
            } else {
                if ($.inArray(key, settings.unBindKeyEvents) !== -1) {
                    key = -1;
                }
                if (key === 9) {//tab to next
                    key = 39;
                }
                switch (key) {
                    case 13://enter
                        var f = $("." + settings.childClass).first();
                        if (f.length <= 0) {
                            f = parentnode.children().first();
                        }
                        first_key_index = $('.' + settings.childCommonClass).index(f);
                        f.addClass(settings.childClass).find(settings.focusElement).trigger('click');
                        break;
                    case 35://end
                        parentnode.children().removeClass(settings.childClass).last().addClass(settings.childClass).find(settings.focusElement).focus();
                        first_key_index = $('.' + settings.childCommonClass).length - 1;
                        break;
                    case 36://home
                        parentnode.children().removeClass(settings.childClass).first().addClass(settings.childClass).find(settings.focusElement).focus();
                        first_key_index = 0;
                        break;
                    case 37://prev
                        if (first_key_index <= 0) {
                            first_key_index = 0;
                        } else {
                            first_key_index -= 1;
                        }
                        $('.' + settings.childCommonClass).removeClass(settings.childClass).eq(first_key_index).addClass(settings.childClass).find(settings.focusElement).focus();
                        break;
                    case 38://up
                        if (first_key_index < 0) {
                            first_key_index = 0;
                        }
                        var n = Math.floor(parentnode.width() / $('.' + settings.childCommonClass).outerWidth(true));
                        first_key_index = (first_key_index - n) < 0 ? first_key_index : (first_key_index - n);
                        $('.' + settings.childCommonClass).removeClass(settings.childClass).eq(first_key_index).addClass(settings.childClass).find(settings.focusElement).focus();
                        prevent_default = false;
                        break;
                    case 39://next
                        var m = $('.' + settings.childCommonClass).length - 1;
                        if (first_key_index < 0) {
                            first_key_index = 0;
                        } else if (first_key_index + 1 >= m) {
                            first_key_index = m;
                        } else {
                            first_key_index += 1;
                        }
                        $('.' + settings.childCommonClass).removeClass(settings.childClass).eq(first_key_index).addClass(settings.childClass).find(settings.focusElement).focus();
                        break;
                    case 40://down
                        var m = $('.' + settings.childCommonClass).length - 1;
                        if (first_key_index < 0) {
                            first_key_index = m;
                        }
                        var n = Math.floor(parentnode.width() / $('.' + settings.childCommonClass).outerWidth(true));
                        first_key_index = ((first_key_index + n) > $('.' + settings.childCommonClass).length - 1) ? first_key_index : (first_key_index + n);
                        $('.' + settings.childCommonClass).removeClass(settings.childClass).eq(first_key_index).addClass(settings.childClass).find(settings.focusElement).focus();
                        prevent_default = false;
                        break;
                    case 46://delete
                        deleteImageSelected();
                        break;
                    case 93: //keyboard Contaxt Menu
                        $(document.activeElement).trigger('contextmenu');
                        break;
                    case 117://F6
                        toggelPointerToPannels();
                        break;
                    default:
                        prevent_default = false;
                        break;
                }
            }
            if (prevent_default) {
                e.preventDefault();
            }
        });
        this.on('click', '.' + settings.childCommonClass + ' > img, .' + settings.childCommonClass + ' > .layer', function (e) {
            if (e.ctrlKey) {
                first_key_index = $('.' + settings.childCommonClass).index($(this).parent('.' + settings.childCommonClass));
                $(this).parent('.' + settings.childCommonClass).toggleClass(settings.childClass).find(settings.focusElement).focus();
            } else if (e.shiftKey) {
                var clicked = $('.' + settings.childCommonClass).index($(this).parent('.' + settings.childCommonClass));
                if (first_key_index < 0) {
                    first_key_index = clicked;
                }
                var min = Math.min(first_key_index, clicked);
                var max = Math.max(first_key_index, clicked);
                $('.' + settings.childCommonClass).removeClass(settings.childClass);
                for (var i = min; i <= max; i++) {
                    $('.' + settings.childCommonClass).eq(i).addClass(settings.childClass);
                }
                $('.' + settings.childCommonClass).eq(clicked).find(settings.focusElement).focus();
            } else {
                first_key_index = $('.' + settings.childCommonClass).index($(this).parent('.' + settings.childCommonClass));
                if ($(this).parent('.' + settings.childCommonClass).hasClass(settings.childClass)) {
                    $(this).parent('.' + settings.childCommonClass).removeClass(settings.childClass).find(settings.focusElement).focus();
                } else {
                    $('.' + settings.childCommonClass).removeClass(settings.childClass);
                    $(this).parent('.' + settings.childCommonClass).addClass(settings.childClass).find(settings.focusElement).focus();
                }
            }
        });
    };
    $.fn.bindKeyEvents.defaults = {
        childCommonClass: 'imgBox',
        focusElement: 'a.zoom-icon',
        childClass: 'selected-image',
        parentId: 'sortable',
        parentClass: '',
        zoomIn: 'div.plus:visible',
        zoomOut: 'div.minus:visible',
        unBindKeyEvents: [],
        unBindShiftKeyEvents: [],
        unBindCtrlKeyEvents: [],
        unBindAltKeyEvents: []
    };
}(jQuery);
