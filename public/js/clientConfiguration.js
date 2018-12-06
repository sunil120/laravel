
/***
 #####      #    ######  #    #  #####    ####     ##     #####     #     ####   #    #
 #    #     #    #       #    #  #    #  #    #   #  #      #       #    #    #  ##   #
 #####      #    #####   #    #  #    #  #       #    #     #       #    #    #  # #  #
 #    #     #    #       #    #  #####   #       ######     #       #    #    #  #  # #
 #    #     #    #       #    #  #   #   #    #  #    #     #       #    #    #  #   ##
 #####      #    #        ####   #    #   ####   #    #     #       #     ####   #    #
***/
 
$(document).ready(function () {

    $('#location').multiselect({
        search: {
            left: '<input type="text" name="q" class="form-control" placeholder="Search..." />'
        },
        fireSearch: function (value) {
            return value.length > 3;
        }
    });

    $('#process').multiselect({
        search: {
            left: '<input type="text" name="q" class="form-control" placeholder="Search..." />'
        },
        fireSearch: function (value) {
            return value.length > 3;
        }
    });

    $('#myUL').multiselect({
        search: {
            left: '<input type="text" id="myInput" name="q" class="form-control" placeholder="Search..." />'
        },
        fireSearch: function (value) {
            return value.length > 3;
        }
    });

    $('.custom-checkbox').click(function () {
        if ($(this).is(":checked")) {
            $(this).parent('label').addClass('checked');
        } else {
            $(this).parent('label').removeClass('checked');
            var name = $(this).attr('name');
            name = name.toLowerCase().split(' ').join('_').replace(/\*/g, '');
            $('.' + name).hide();
            $('.' + name).remove();
        }
    });

    $('input[type="checkbox"]').click(function () {
        var inputValue = $(this).attr("value");
        $("." + inputValue).toggle();
    });

    $('.flxi-feld-chk').on('click', function () {
        var checkLen = $('#myUL li label.checked').length;
        if (checkLen > 5) {
            $(this).parent('label').removeClass('checked');
            alert('Can not select more than five Flexi Fields.');
            return false;
        }
        var flxId = $(this).val();
        var flxName = $(this).attr('name');
        if ($(this).is(":checked")) {
            //now we need to fire the ajax and bring the data down
            $.ajax({
                url: SITE_URL + "client-configuration/ajax/getFlexiFields",
                type: 'post',
                dataType: 'json',
                data: {masterId: flxId, flxName: flxName},
                beforeSend: function (xhr) {

                },
                success: function (data) {
                    $('.subFlexi').append(data);
                }
            });

        }
    });


    $(document).on('click', '.bil-detail-modal', function (event) {
        var bifurId = $(this).data("bifurcationid");
        var clientId = $('#bridgeCltId').val();
        var moduleName = $('#sectionName').val();
        switch (moduleName) {
            case 'bf':
                    method = "getClientInvoiceContactConfigDetails";
                break;
            case 'vali':
                    method = "getValidationContactConfigDetails";
                break;
            default:
                break;
        }
        $.ajax({
            url: SITE_URL + "client-configuration/ajax/"+method+"/" + bifurId + "/" + clientId,
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {

            },
            success: function (data) { 
                $('#load-billing-modal').html(data);
            }
        });
    });

    //remove error class on click 
    $('#location_rightAll, #location_rightSelected').on('click', function(){
        $('.loc-error').remove();
    });

    $('#location').on('dblclick', function(){
        $('.loc-error').remove();
    });

    $('#process_rightAll, #process_rightSelected').on('click', function(){
        $('.pro-error').remove();
    });

    $('#process').on('dblclick', function(){
        $('.pro-error').remove();
    });

    $('#myUL').on('click', function(){
        $('.subFlex-error').remove();
    });


    // on submit bifurcation validation for duplicate entry
    $('#bb-frm, #bf-edit-frm, #vali-frm, #vali-edit-frm').on('submit', function(){
        var locVal = $('select#location_to option').length;
        var proVal = $('select#process_to option').length;
        var isFlexMen = $('#myUL > li').length;
        var moduleName = $('#sectionName').val();
        var error = 0;

        if(locVal == 0){
            $('.loc-error').remove();
            $('#location_to').after('<span class="text-danger loc-error">This field is mandatory.</span>');
            error = 1;
        }

        if(proVal == 0){
            $('.pro-error').remove();
            $('#process_to').after('<span class="text-danger pro-error">This field is mandatory.</span>');
            error = 1;
        }

        if(isFlexMen >= 0){
            if($('.subFlexi > div').length == 0){
                $('.subFlex-error').remove();
                $('#myUL').after('<span class="text-danger subFlex-error">This field is mandatory.</span>');
                error = 1;
            }
        }

        switch (moduleName) {
            case 'bf':
                ajaxUrl = 'bifurcationDuplicationChk';
                msg = "Bifurcation already exist. Kindly update the bifurcation.";
                break;
            case 'bf-edit':
                ajaxUrl = 'editBifurcationDuplicationChk';
                msg = "Bifurcation combination already exist with another bifurcation. Kindly update the bifurcation.";
                break;
            case 'vali':
                ajaxUrl = 'ValidationDuplicationChk';
                msg = "Bifurcation already exist. Kindly update the bifurcation.";
                break;
            case 'vali-edit':
                ajaxUrl = 'editValidationDuplicationChk';
                msg = "Bifurcation combination already exist with another bifurcation. Kindly update the bifurcation.";                
                break;
        
            default:
                break;
        }

        $.ajax({
            url: SITE_URL + "client-configuration/ajax/"+ajaxUrl,
            type: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            async: false,
            beforeSend: function (xhr) {

            },
            success: function (data) {
                if(data == true){
                    alert(msg);
                    error = 1;
                    return false;
                }else{
                    return true;
                }
            }
        });
        if(error == 0 ){
            return true;
        }else{
            return false;
        }
    });

});

/***
 ######
#     #     #    #       #          #    #    #   ####
#     #     #    #       #          #    ##   #  #    #
######      #    #       #          #    # #  #  #
#     #     #    #       #          #    #  # #  #  ###
#     #     #    #       #          #    #   ##  #    #
######      #    ######  ######     #    #    #   ####

 #####
#     #   ####   #    #   #####    ##     ####    #####
#        #    #  ##   #     #     #  #   #    #     #
#        #    #  # #  #     #    #    #  #          #
#        #    #  #  # #     #    ######  #          #
#     #  #    #  #   ##     #    #    #  #    #     #
 #####    ####   #    #     #    #    #   ####      #

****/

$(document).ready(function () { 
    $('.nxt-acc').on('click', function () {
        $(this).parent().parent().parent().parent().parent().parent().find('.acc_content').slideUp(200);
        $(this).parent().parent().parent().parent().parent().parent().parent().find('.accordion_in').removeClass('acc_active');
        $(this).parent().parent().parent().parent().parent().parent().next().addClass('acc_active');
        $(this).parent().parent().parent().parent().parent().parent().next().find('.acc_content').slideDown(200);
    });

    $(".accordion_example1").smk_Accordion({
        showIcon: true, //boolean
        animation: true, //boolean
        closeAble: true, //boolean
        slideSpeed: 200 //integer, miliseconds
    });

    if(typeof(moduleName) != "undefined"){
        $('#'+moduleName+'-billingcontact-level1-contact-id, #'+moduleName+'-billinginfo-contact-id, #'+moduleName+'-shippinginfo-hardcopy-contact-id, #'+moduleName+'-collectionspoc-spoc-contact-id, #'+moduleName+'-collectionspoc-escalation-contact-id, #'+moduleName+'-shippinginfo-email-kind-attention').on('change', function(){
            var contactId = $(this).val();
            //get the section name
            var sectionName = $(this).data('sectionname');
            $.ajax({
                url: SITE_URL + "client-configuration/ajax/getContactDetails",
                type: 'post',
                dataType: 'json',
                data: {contactId: contactId},
                beforeSend: function (xhr) {
        
                },
                success: function (data) { 
                    if(data.length != 0){
                        switch (sectionName) {
                            case 'billing-contact':
                                elementName = 'bc-cont-lt';
                                showSection = 'bc-cntct-lst-dtl';
                                elementType = 'billingContact';
                                break;
                            case 'billing-info':
                                elementName = 'billing-info';
                                showSection = 'billing-info-contact-details';
                                elementType = 'billingInfo';
                                showGST     =  '1';
                                break;
                            case 'shipping-info':
                                elementName = 'si-hcp';
                                showSection = 'si_hcp_kind_attnd_details';
                                elementType = 'billingInfo';
                                break;
                            case 'shipping-info-email':
                                //special case
                                elementType = 'shipping-email-info';
                                showSection = 'si_email_kind_Attention_details';
                                break;
                            case 'collection-scop-scop':
                                elementName = 'cs-spoc';
                                showSection = 'spoc_contact_detail_section';
                                elementType = 'billingContact';
                                break;
                            case 'collection-scop-escalation':
                                elementName = 'cs-escalation';
                                showSection = 'escalation_contact_detail_section';
                                elementType = 'billingContact';
                                break;
                            default:
                                break;
                        }
                        if(elementType=='billingContact'){
                            $('#'+elementName+'-fst-name').val(data['CONTACT_FNAME']);
                            $('#'+elementName+'-lst-name').val(data['CONTACT_LNAME']);
                            $('#'+elementName+'-dep-nme').val(data['CONTACT_DESIGNATION']);
                            $('#'+elementName+'-mob-01').val(data['CONTACT_MOBILE']);
                            $('#'+elementName+'-email-01').val(data['CONTACT_EMAIL']);
                            $('#'+elementName+'-address').val(data['company_location'].ADDRESS);
                            $('#'+elementName+'-city').val(data['company_location'].state.STATE_NAME);
                            $('#'+elementName+'-state').val(data['company_location'].city.CITY_NAME);
                            //$('#'+elementName+'-state-code').val(data['company_location'].state.GST_STATE_CODE);
                        }else if(elementType=='billingInfo'){
                            $('#'+elementName+'-address1').val(data['company_location'].ADDRESS);
                            $('#'+elementName+'-address2').val(data['company_location'].ADDRESS);
                            $('#'+elementName+'-state').val(data['company_location'].state.STATE_NAME);
                            $('#'+elementName+'-city').val(data['company_location'].city.CITY_NAME);
                            $('#'+elementName+'-state-code').val(data['company_location'].state.GST_STATE_CODE);
                        }
                        $('.'+showSection).show('slide');
                    }
                }
            });
            return false;
        });



        //hide show for the page 
        $('.'+moduleName+'-billing-info-gst-applicable').on('change', function(){
            if($(this).val() == 0){
                $('#'+moduleName+'-billinginfo-no-gst-reason').val('');
                $('.'+moduleName+'-billing-info-gst-reason').show();
                //also we need to hide the GST percentage
                $('.'+moduleName+'-billing-info-gstCal-sec').hide();
            }else{
                $('.'+moduleName+'-billing-info-gst-reason').hide();
                $('.'+moduleName+'-billing-info-sez-details').hide();
                //also we need to show the GST percentage
                $('.'+moduleName+'-billing-info-gstCal-sec').show();
            }
        });
        
        $('.'+moduleName+'-billing-info-po-confirm').on('change', function(){
            if($(this).val() == '1'){
                $('#'+moduleName+'-billinginfo-po-cat').val('');
                $('.'+moduleName+'-billing-info-po-cat-sec').show();
            }else{
                $('.'+moduleName+'-billing-info-po-cat-sec').hide();
                $('.'+moduleName+'-billing-info-po-number-sec').hide();
            }
        });

        $('#'+moduleName+'-billinginfo-po-category').on('change', function(){
            $('#'+moduleName+'-billinginfo-po-number').val('');
            if($(this).val() != '3'){
                //$('.'+moduleName+'-billing-info-po-number-sec').show();
                //ajax to get the po data
                var category = $(this).val();
                var clientId = $('#bridge-client-id').val();
                var ajaxData = {poCategory: category, clientId : clientId, moduleName : moduleName };
                $.ajax({
                    url: SITE_URL + "client-configuration/ajax/getPODetails",
                    type: 'post',
                    dataType: 'json',
                    data: ajaxData,
                    beforeSend: function (xhr) {
            
                    },
                    success: function (data) { 
                        $('.po-Box').html(data);
                        $('.'+moduleName+'-billing-info-po-number-sec').show();
                        return false;
                    }
                });

            }else{
                $('.'+moduleName+'-billing-info-po-number-sec').hide();
            }
        });

        
        $('#'+moduleName+'-billinginfo-no-gst-reason').on('change', function(){
            if($(this).val() == 2){
                $('.'+moduleName+'-billing-info-sez-details').show();
            }else{
                $('.'+moduleName+'-billing-info-sez-details').hide();
            }
        });

        $('#billing-con-save-frm-btn, #billing-con-save-frm-btn-wid-exit').on('click', function(){
            var error = 0;
            var errorAcordian = [];
            //var moduleName = ['bf','bf-edit','vali','vali-edit'];
            //var sections = ['billingcontact', 'billinginfo', 'shippinginfo', 'collectionspoc'];
            //var moduleName = '';
            var subSections = [];
            var chkSubSections = [];
            var shippingSubFields = [];
            //subSections = ['billingcontact','billinginfo','collectionspoc'];
            //subSections['billingcontact']   = ['level1-contact-id'];  
            //subSections['billinginfo']      = ['legal-entity','contact-id'];      
            //subSections['collectionspoc']   = ['spoc-contact-id','escalation-contact-id']; 
            subSections = {
                'billingcontact' : ['level1-contact-id'],
                'billinginfo' : ['legal-entity','contact-id'],
                'collectionspoc':['spoc-contact-id','escalation-contact-id']
            };
            chkSubSections = ['billinginfo-po-number', 'billinginfo-no-gst-reason'];
            var errorClass = 'error';
            var isExit = 0;
            if($(this).attr('id') == 'billing-con-save-frm-btn-wid-exit'){
                $('#is-exit').val(1);
            }   
            $.each(subSections, function(index, value){
                $.each(value, function(key, entity){                    
                    var idName = moduleName+'-'+index+'-'+entity;
                    if($('#'+idName).val().length <= 0){
                        if($('.'+idName+'-'+errorClass).length == 0){
                            $('#'+idName).next().after('<span class="error-color '+idName+'-'+errorClass+'">This field is required.</span>');
                            error =1;
                            errorAcordian.push(index);
                        }
                    }
                });
            });    
        
            if($('#'+moduleName+'-shippinginfo-email-kind-attention').val().length <= 1){
                if($('.'+moduleName+'-shippinginfo-email-kind-attention-error').length == 0){
                    $('#'+moduleName+'-shippinginfo-email-kind-attention').next().after('<span class="error-color '+moduleName+'-shippinginfo-email-kind-attention-error">This field is required.</span>');
                    errorAcordian.push('shippinginfo');
                    error = 1;
                }
            }else{
                shippingSubFields.push(moduleName+'-si_email_to');
                shippingSubFields.push(moduleName+'-si_email_cc');
                shippingSubFields.push(moduleName+'-si_email_bcc');
                shippingSubFields.push(moduleName+'-si_email_subject');
                shippingSubFields.push(moduleName+'-si_email_body');
        
                $.each(shippingSubFields, function(needle, memo){
                    if($('#'+memo).val().length <= 1){
                        if($('.'+memo+'-error').length == 0){
                            $('#'+memo).after('<span class="error-color '+memo+'-error">This field is required.</span>');
                            error = 1;
                            errorAcordian.push('shippinginfo');
                        }
                    }
                });
            }
        
            if($('#'+moduleName+'-billinginfo-gst-no').val().length  <= 0){
                if(!$('#'+moduleName+'-billinginfo-gst-unregistered').prop('checked')){
                    if($('.'+moduleName+'-billinginfo-gst-no-error').length == 0){
                        $('#'+moduleName+'-billinginfo-gst-no').after('<span class="error-color '+moduleName+'-billinginfo-gst-no-error">This field is required.</span>');
                        errorAcordian.push('billinginfo');
                        error = 1;
                    }
                }
            }else{var ajaxData = {poCategory: $(this).val(), }
                var gstCode = $('#'+moduleName+'-billinginfo-gst-no').val().substring(0,2);
                if($('#billing-info-state-code').val() != gstCode){
                    $('.'+moduleName+'-billinginfo-gst-no-error').remove();
                    $('#'+moduleName+'-billinginfo-gst-no').after('<span class="error-color '+moduleName+'-billinginfo-gst-no-error">Invalid GST number.</span>');
                    errorAcordian.push('billinginfo');
                    error = 1;
                }
            }
        
            var gstApplicable = $("input[name='BillingInfo[gst]']:checked").val();
            if(gstApplicable == 0){
                var secName  = moduleName+'-billinginfo-no-gst-reason';
                if($('#'+secName).val().length <= 0){
                    if($('.'+secName+'-error').length == 0){
                        $('#'+secName).next().after('<span class="error-color '+secName+'-error">This field is required.</span>');
                        errorAcordian.push('billinginfo');
                        error = 1;
                    }
                }
            }
        
            var poApplicable = $("input[name='BillingInfo[po_application]']:checked").val();
            if(poApplicable == 1){
                var secName = moduleName+'-billinginfo-po-number';
                if($('#'+secName).val().length <= 0){
                    if($('.'+secName+'-error').length == 0){
                        $('#'+secName).next().after('<span class="error-color '+secName+'-error">This field is required.</span>');
                        errorAcordian.push('billinginfo');
                        error = 1;
                    }
                }
            }
        
            if($('#hrdcopychk').parent().hasClass('checked')){
                var secName = moduleName+'-shippinginfo-hardcopy-legal-entity';
                if($('#'+secName).val().length <= 0){
                    if($('.'+secName+'-error').length == 0){
                        $('#'+secName).next().after('<span class="error-color '+secName+'-error">This field is required.</span>');
                        error = 1;
                        errorAcordian.push('shippinginfo');
                    }
                }
            }
        
            //Acordian must be active
            $.unique(errorAcordian);
            if(errorAcordian.length >= 0){
                $.each(errorAcordian, function(k, v){
                    var className =  v+'-'+'accordin';
                    $("."+className).addClass('acc_active');
                    $("."+className).find('.acc_content').slideDown(200);
                });
            }
        
            if(error == 0){
                $('#'+moduleName+'-billing-contact-form').submit();
            }else{
                return false;
            }
            
        });
/******************************************************END HERE **************************** */

        $('#'+moduleName+'-billinginfo-gst-no').on('blur', function(){
            if($('#'+moduleName+'-billinginfo-gst-no').val().length >= 2){
                var gstCode = $('#'+moduleName+'-billinginfo-gst-no').val().substring(0,2);
                if($('#billing-info-state-code').val() != gstCode){
                    $('#'+moduleName+'-billinginfo-gst-no').after('<span class="error-color '+moduleName+'-billinginfo-gst-no-error">Invalid GST number.</span>');
                }else{
                    if(gstCode == 06){
                        $('.'+moduleName+'-billing-info-gstCal-sec').show();
                        $('.'+moduleName+'-billing-info-Igst-sec').show();
                    }else{
                        $('.'+moduleName+'-billing-info-gstCal-sec').show();
                        $('.'+moduleName+'-billing-info-Cgst-sec').show(); 
                    }
                }
            }
        });


        $('#'+moduleName+'-si_email_bcc').on('blur', function(){
            var emailTo = $(this).val();
            if(emailTo.length <= 1){
                if($('.'+moduleName+'-si_email_bcc-error').length == 0){
                    $(this).after('<span class="error-color '+moduleName+'-si_email_bcc-error">This field is required.</span>');
                }
            }else{
                //check for comma sepration
                var emailArray = emailTo.split(",");
                $(emailArray).each(function(index, value){
                    var authCheck = value.split('@');
                    if(!pattern .test($.trim(value))){
                        $('#'+moduleName+'-si_email_bcc').after('<span class="error-color '+moduleName+'-si_email_bcc-error">Not a valid email id.</span>');
                        return false;
                    }
                    if(authCheck[1] != 'authbridge.com'){
                        $('#'+moduleName+'-si_email_bcc').after('<span class="error-color '+moduleName+'-si_email_bcc-error">Only authbridge.com mail id are allowed.</span>');
                        return false;
                    }
                    
                });
            }
        });
    }

    $('#bf-same_as_above').on('click', function(){
        var billinglegalEntity = $('#'+moduleName+'-billinginfo-legal-entity').val();
        var billingcontactId   = $('#'+moduleName+'-billinginfo-contact-id').val();
        $('#'+moduleName+'-shippinginfo-hardcopy-legal-entity').val(billinglegalEntity);
        $('#'+moduleName+'-shippinginfo-hardcopy-contact-id').val(billingcontactId);
        if(billingcontactId.length !== 0){
            $.ajax({
                url: SITE_URL + "client-configuration/ajax/getContactDetails",
                type: 'post',
                dataType: 'json',
                data: {contactId: billingcontactId },
                beforeSend: function (xhr) {
        
                },
                success: function (data) { 
                    $('#si-hcp-address1').val(data['company_location'].ADDRESS);
                    $('#si-hcp-address2').val(data['company_location'].ADDRESS);
                    $('#si-hcp-state').val(data['company_location'].state.STATE_NAME);
                    $('#si-hcp-city').val(data['company_location'].city.CITY_NAME);
                    $('#si-hcp-state-code').val(data['company_location'].state.GST_STATE_CODE);
                    $('.si_hcp_kind_attnd_details').show('slide');
                }
            });
        }
    });
/*
    $(document).on('change', function(){
        if(typeof moduleName !== "undefined"){
            var idName = $(this).attr('id');
            console.log(idName);
            var idForChange = [];
            idForChange[moduleName+'-billinginfo-gst-unregistered'] = 1;
            idForChange[moduleName+'-billinginfo-po-number'] = 1;
            idForChange[moduleName+'-billinginfo-no-gst-reason'] = 1;
            idForChange[moduleName+'-billingcontact-level1-contact-id'] = 1;
            idForChange[moduleName+'-billinginfo-legal-entity'] = 1;
            idForChange[moduleName+'-billinginfo-contact-id'] = 1;
            idForChange[moduleName+'-shippinginfo-hardcopy-legal-entity'] = 1;
            idForChange[moduleName+'-shippinginfo-email-kind-attention'] = 1;
            idForChange[moduleName+'-collectionspoc-spoc-contact-id'] = 1;
            idForChange[moduleName+'-collectionspoc-escalation-contact-id'] = 1;
            console.log(idForChange.idName);
            if(typeof(idForChange.idName != "undefined" &&  idForChange.idName == 1)){
                $('.'+idForChange+'-error').remove();
            }
        }
    });
*/
    $('.bc-lst').on('change', function(){
        var idName = $(this).attr('id');
        $('.'+idName+'-error').remove();
    });


    $(document).on('keypress', 'input', function(){
        if(typeof moduleName !== "undefined"){
            var idName = $(this).attr('id');
            var chkSubFields = [];
            chkSubFields [moduleName+'-si_email_to'] = 1;
            chkSubFields [moduleName+'-si_email_cc'] = 1;
            chkSubFields [moduleName+'-si_email_bcc'] = 1;
            chkSubFields [moduleName+'-si_email_subject'] = 1;
            chkSubFields [moduleName+'-si_email_body'] = 1;
            chkSubFields [moduleName+'-billinginfo-gst-no'] = 1;
            if(typeof(chkSubFields[idName] != "undefined" &&  chkSubFields[idName] == 1)){
                $('.'+idName+'-error').remove();
            }
        }
        
    });

    var pattern = new RegExp("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

    $('#bf-si_email_to, #bf-si_email_cc, #bf-edit-si_email_to, #bf-edit-si_email_cc, #vali-si_email_to, #vali-si_email_cc, #vali-edit-si_email_to, #vali-edit-si_email_cc').on('blur', function(){
        var emailTo = $(this).val();
        var IdName = $(this).attr('id');
        if(emailTo.length <= 1){
            if($('.'+IdName+'-error').length == 0){
                $(this).after('<span class="error-color '+IdName+'-error">This field is required.</span>');
            }
        }else{
            //check for comma sepration
            var emailArray = emailTo.split(",");
            $(emailArray).each(function(index, value){
                if(!pattern .test($.trim(value))){
                    $('#'+IdName).after('<span class="error-color '+IdName+'-error">Not a valid email id.</span>');
                    //return false;
                }
            });
        }
    });
});



$(document).ready(function(){
    $('#bc_new_loc').on('click', function () {
        $('.bc_new_loc_form').removeClass('hide');
        $('#select2-contact-location-container').html('Select Location');
    });

    $.validate({
        form: '#new_con_loc_frm',
        onSuccess: function ($form) {
            //now we need to save the data
            var datastring = $("#new_con_loc_frm").serialize();
            var clientId = $('#client_id').val();
            var moduleName = $('#sectionName').val();
            $.ajax({
                url: SITE_URL + "client-configuration/ajax/addContactOnBridge",
                type: 'post',
                dataType: 'json',
                data: datastring,
                beforeSend: function (xhr) {

                },
                success: function (data) {
                    //if(activeTab == 'bifurcation'){
                        $("#new_con_loc_frm").trigger("reset");
                        $('#select2-contact-location-container').html('Select Location');
                        $('#bc_nw_contact').modal('toggle');
                        $('#'+moduleName+'-billingcontact-level1-contact-id, #'+moduleName+'-billinginfo-contact-id, #'+moduleName+'-shippinginfo-hardcopy-contact-id, #'+moduleName+'-collectionspoc-spoc-contact-id, #'+moduleName+'-collectionspoc-escalation-contact-id, #'+moduleName+'-shippinginfo-email-kind-attention').append(data);
                    /*
                    }else{
                        //refresh with section
                        $("#new_con_loc_frm").trigger("reset");
                        $('#select2-contact-location-container').html('Select Location');
                        $('#bc_nw_contact').modal('toggle');
                        preBillingInfo = [];
                        sectionId = getSectionId(activeTab);
                        getBillingTabData(clientId, sectionId, activeTab);
                    }
                    */
                }
            });
            return false; // Will stop the submission of the form
        }
    });


    $('#bc-contactlist').on('change', function(){
        var contactId = $(this).val();
        $.ajax({
            url: SITE_URL + "client-configuration/ajax/getContactDetails",
            type: 'post',
            dataType: 'json',
            data: {contactId: contactId},
            beforeSend: function (xhr) {
    
            },
            success: function (data) {          
                $('#bc-cont-lt-fst-name').val(data['CONTACT_FNAME']);
                $('#bc-cont-lt-lst-name').val(data['CONTACT_LNAME']);
                $('#bc-cont-lt-dep-nme').val(data['CONTACT_DESIGNATION']);
                $('#bc-cont-lt-mob-01').val(data['CONTACT_MOBILE']);
                $('#bc-cont-lt-email-01').val(data['CONTACT_EMAIL']);
                $('#bc-cont-lt-address').val(data['company_location'].ADDRESS);
                //$('#bc-cont-lt-pin-code').val(data['company_location'].ADDRESS);
                $('#bc-cont-lt-city').val(data['company_location'].state.STATE_NAME);
                $('#bc-cont-lt-state').val(data['company_location'].city.CITY_NAME);
                $('.bc-cntct-lst-dtl').show('slide');
            }
        });       
    });

    $('.bc-add-new-location').on('click', function(){
        $('#contact-location').val('');
        $('#contact-location').attr('data-validation-optional','true');
        $('#select2-contact-location-container').html('Select Location');
    });

    $('#contact-location').on('change', function(){
        //$(".bc-add-new-location").attr("aria-expanded","false");
        $('#contact-location').attr('data-validation-optional','false');
        $(".bc-add-new-location").attr('aria-expanded', 'false');
        $('#collapseExample').collapse('hide');
        //reset the form
        $('#select2-ad-nw-modal-city-container').html('Select City');
        $('#ad-nw-modal-city').val('');
        $('#ad-modal-state').val('');
        $('#ad-modal-country').val('');
        $('#ad-modal-address').val('');
        $('#ad-modal-pincode').val('');
        $('#ad-modal-phn').val('');
        //$('#ad-modal-rmrk').val('');
    });

    $('#ad-nw-modal-city').on('change', function(){

        if($(".bc-add-new-location").attr('aria-expanded') == 'false'){
            return false;
        }
        var selectedCityId = $('#ad-nw-modal-city').val();
        $.ajax({
            url: SITE_URL + "client-configuration/ajax/getCityDetails/",
            type: 'post',
            async: false,
            data: {city_id: selectedCityId},
            success: function (data)
            {
                var result = $.parseJSON(data);
                $('#ad-modal-state').val(result.state.STATE_ID);
                $('#ad-modal-country').val(result.country.COUNTRY_ID);
            }
        });
    });
});


$(document).ready(function(){
    $('#loadmore-bifur').on('click', function(){
        var clientId = $('#bridgeCltId').val();
        var curcount = $('.bil-detail-modal').length;
        $.ajax({
            url: SITE_URL + "client-configuration/ajax/loadMoreBifurcation",
            type: 'post',
            dataType: 'json',
            data: {clientId: clientId, offset: curcount},
            beforeSend: function (xhr) {

            },
            success: function (data) {
                $('#load-mr-ctn-brf').append(data);
            }
        });
    });


});

/**
 * Billing Info Section jQuery code
 */

$(document).ready(function(){
    preBillingInfo = [];
    activeTab = 'billingContact-billinfo';
    $('.tab_detect').on('click', function(){
        var clientId = $('#client_id').val();
        var sectionname = $(this).data('sectionname');
        activeTab = sectionname;
        if($.inArray(sectionname, preBillingInfo) === -1){
            preBillingInfo.push(sectionname);
            sectionId = getSectionId(sectionname);
            getBillingTabData(clientId, sectionId, sectionname);
        }
    });


    $(document).on('click', '.ecb-billing-contact', function(){
        var contactId = $(this).data('contactid');
        var clientId  = $('#client_id').val();
        $.ajax({
            url: SITE_URL + "client-configuration/ajax/getEditContactDetails/",
            type: 'post',
            async: false,
            data: {contactId: contactId, clientId: clientId},
            success: function (data)
            {
                $('#edit-contact-modal-body').html(data);
                //$('.'+sectionname+'-table').DataTable().destroy();
                //$('.'+sectionname+'-tbody').html(JSON.parse(data));
                //$('.'+sectionname+'-table').DataTable({ });
            }
        });
        
    });


    $(document).on('click', '#edit-contact-frm-submit', function(){
        $.validate({
            form: '#edit_con_loc_frm',
            onSuccess: function ($form) {
                //now we need to save the data
                var datastring = $("#edit_con_loc_frm").serialize();
                var clientId = $('#client_id').val();
                $.ajax({
                    url: SITE_URL + "client-configuration/ajax/editContactOnBridge",
                    type: 'post',
                    dataType: 'json',
                    data: datastring,
                    beforeSend: function (xhr) {
    
                    },
                    success: function (data) {
                        preBillingInfo = [];
                        sectionId = getSectionId(activeTab);
                        getBillingTabData(clientId, sectionId, activeTab);
                        $('#bill_edit_contact').modal('toggle');
                    }
                });
                return false; // Will stop the submission of the form
            }
        });
    });
});

$(document).ready(function(){
    $('.sam-as-bifur').on('change', function(){
        var isLikeBifurcation = $(this).val();
        //now we need to confirm by client
        $( "#validation_confirm_modal" ).modal();
        $('#validation_confirm_modal_title').html('Warning');
        if(isLikeBifurcation == 'bYes'){
            $('#validation_confirm_modal_body').html('Are you show you want to perform this action, as it will override all the validation configuration for this client ?');
            $('#validation_confirm_modal_button').attr('id','sync_bifurcation');
        }else{
            $('#validation_confirm_modal_body').html('Are you show you want to perform this action, as it will override the sync feature with Bifurcation ?');
            $('#validation_confirm_modal_button').attr('id','brk_sync_bifur');
        }
    });

    $('#validation_confirm_modal_cancel').on('click', function(){
        $('.sam-as-bifur').not(':checked').prop("checked", true);
    });
});

$(document).on('click','#sync_bifurcation', function(){
    var client = $('#bridgeCltId').val();
    $.ajax({
        url: SITE_URL + "client-configuration/ajax/validationSameAsBifurcationConfig",
        type: 'post',
        dataType: 'json',
        data: {bridge_client_id: client},
        async: true,
        beforeSend: function (xhr) {

        },
        success: function (data) {
            if(data == 1){
                $( "#validation_confirm_modal" ).modal('hide');
                location.reload();                    
            }
        }
    });
    return false; // Will stop the submission of the form
});
$(document).on('click','#brk_sync_bifur', function(){
    var client = $('#bridgeCltId').val();
    $.ajax({
        url: SITE_URL + "client-configuration/ajax/breakSyncValidationConfig",
        type: 'post',
        dataType: 'json',
        data: {bridge_client_id: client},
        async: true,
        beforeSend: function (xhr) {

        },
        success: function (data) {
            $( "#validation_confirm_modal" ).modal('hide');
            if(data == 1){
                $('.vali-section').removeClass('hide2');                    
            }else{

            }
        }
    });
});

$(document).on('click', '.add-po-type', function(){
    if($(this).val() == 'limited_amount'){
        $('#addpo-amount').attr({'disabled':false});
    }else{
        $('#addpo-amount').attr({'disabled':true});
    }
});

//Add new PO form for basic Config
$(document).ready(function(){

    $('.add_po').on('click', function(){
        var poCat = $('#bf-billinginfo-po-category').val();
        $('#addpo-amount').removeAttr('disabled');
        $("input[value='open']").removeAttr('checked');
        $("input[value='limited_amount']").removeAttr('checked');
        $("input[value='limited_amount']").removeAttr('disabled');
        $("input[value='open']").removeAttr('disabled');

        if(poCat == 1){ 
            $("input[value='open']").attr({'disabled':true});
            $("input[value='limited_amount']").prop({'checked':true});
        }
        if(poCat == 2){
            $("input[value='open']").prop({'checked':true});
            $("input[value='limited_amount']").attr({'disabled':true});
            $('#addpo-amount').attr({'disabled': true});
        }
        $('.addPo-datepicker').val('');
        $('#addpo-po-number').val('');
    });

    $('.addPo-datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: new Date()
    });

    $('#addpo-amount').on('keyup', function(){
        $('.addpo-amount-error').remove();
    });
    $('#addpo-po-number').on('keyup', function(){
        $('.addpo-po-number-error').remove();
    });
    $('#addpo-validtill').on('change', function(){
        $('.addpo-validtill-error').remove();
    });

    $('#save-new-po').on('click', function(){
        var amt = $('#addpo-amount').val();
        var poType = $("input[name='addPo[type]']:checked").val();
        var addPoError = 0;
        var poNumber = $('#addpo-po-number').val();
        var poValidTill = $('#addpo-validtill').val();
        var clientId    = $('#bridge-client-id').val();
        alert(poType);
        if( (poType == 'limited_amount')){
            if(amt.length == 0){
                $('.addpo-amount-error').remove();
                $('#addpo-amount').after('<span class="text-danger addpo-amount-error">This field is mandatory.</span>');
                addPoError = 1;
            }
        }   

        if(poNumber.length == 0){
            $('.addpo-po-number-error').remove();
            $('#addpo-po-number').after('<span class="text-danger addpo-po-number-error">This field is mandatory.</span>');
            addPoError = 1;
        }

        if(poValidTill.length == 0){
            $('.addpo-validtill-error').remove();
            $('#addpo-validtill').after('<span class="text-danger addpo-validtill-error">This field is mandatory.</span>');
            addPoError = 1;
        }

        if(addPoError == 1){
            return false;
        }

        //now send ajax and submit the 
        $.ajax({
            url: SITE_URL + "client-configuration/ajax/addNewPo/",
            type: 'post',
            async: false,
            data: {poType: poType, poNumber: poNumber, poValidTill: poValidTill, clientId: clientId, poAmount : amt},
            success: function (result)
            {
                var html ='';
                var data = JSON.parse(result);
                $('#bf-billinginfo-po-number').append(data);
                $('#add-po').modal('hide');
            }
        });
    });

});


function search_list() {
    var input, filter, ul, li, a, i, label;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        label = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}


function getBillingTabData(clientId, sectionId, sectionname){
    $.ajax({
        url: SITE_URL + "client-configuration/ajax/getBillingInfoDetails/",
        type: 'post',
        async: false,
        data: {clientId: clientId, sectionId: sectionId},
        success: function (data)
        {
            $('.'+sectionname+'-table').DataTable().destroy();
            $('.'+sectionname+'-tbody').html(JSON.parse(data));
            $('.'+sectionname+'-table').DataTable({ });
        }
    });
}

function getSectionId(sectionname){
    switch (sectionname) {
        case 'billingContact-billinfo':
            sectionId = '1';
        break;
        case 'billingInfo-billinfo':
            sectionId = '2';
        break;
        case 'shippingInfo-billinfo':
            sectionId = '3';
        break;
        case 'collectionSpoc-billinfo':
            sectionId = '4';
        break;
        default:

        break;
    }
    return sectionId;
}
