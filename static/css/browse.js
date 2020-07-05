

function viewDetails(challenge_id) {
    $("#details_" + challenge_id).show();
    $("#hide_link_" + challenge_id).show();
    $("#more_link_" + challenge_id).hide();
    $("#challenge_links_" + challenge_id).hide();
}

function hideDetails(challenge_id) {
    $("#details_" + challenge_id).hide();
    $("#hide_link_" + challenge_id).hide();
    $("#more_link_" + challenge_id).show();
    $("#challenge_links_" + challenge_id).show();
}

function setSortProp(val) {
 
    var s = $('#sortProp');
    var o = $('#sortOrder');
    if (val == s.val()) {
        if (o.val() == 'asc') {
            o.val('desc');
        }
        else {
            o.val('asc');
        }
    }
    else {
        o.val('desc');
    }

    var $theForm = $("[name='filterForm']");
    s.val(val);
    filterResults($theForm);
}

 

function clearSearchTerm() {
 
    var $cbSearch = $('#cb_search');
    $cbSearch.prop("checked", false);
    var $searchTerm = $('#searchTerm');
    $searchTerm.val('');
    filterResults($cbSearch.parents("form"));
}

 
function specialCharacterCheck() {
	 
        var searchTerm = $('#searchTerm').val();
        if (searchTerm != undefined) {
        	var specialCharacters = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
        	searchTerm = searchTerm.replace(specialCharacters, "");
        	$('#searchTerm').val(searchTerm);
        }
   
}

function handleTextSearchInput(e) {
 
    $('#cb_search').prop("checked", true);

    if (!e) {
        e = window.event;
    }

    var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if (keyCode == 13) {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        filterResults($("[name='filterForm']"));
        return true;
    }
}

$("#search").keypress(function(event) {
    $("#search-results").html(event.target.parents("form:first").html());
 
});

 

function openNode(nodeId) {
    var $childDiv = $('#children_' + nodeId);
    var $openImg = $('#open_' + nodeId);
    var $closeImg = $('#close_' + nodeId);
    $openImg.hide();
    $closeImg.show();
    $childDiv.show();
}

function closeNode(nodeId) {
    var $childDiv = $('#children_' + nodeId);
    var $openImg = $('#open_' + nodeId);
    var $closeImg = $('#close_' + nodeId);
    $openImg.show();
    $closeImg.hide();
    $childDiv.hide();
}

function checkOnly(cbnameId) {
 
    var $cb = $('#'+cbnameId);

    var $theForm = $("[name='filterForm']");

    $theForm.find("input:checkbox, input:radio").prop("checked", false);

    if(cbnameId != 'partnerChallengelink') {
        $cb.prop("checked", true);
    }
    else {
        $("#rb_all").prop("checked", true);   
    }

    if (cbnameId.indexOf('ct_') == -1) {
        $('#ct_ALL').prop("checked", true);
    }

    filterResults($theForm);
}

function syncMax(maxSelect) {
 
    $('#max_select').val($(maxSelect).val());
    $('#max_select_lower').val($(maxSelect).val());
    $(maxSelect).prop("form").max.value = $(maxSelect).val();
  
    filterResults($(maxSelect).parents("form"));
}

function syncSort(sortSelect) {
	
	  $('#sortProp').val($(sortSelect).val());
	  $('#sortProp_lower').val($(sortSelect).val());
 
    filterResults($(sortSelect).parents("form"));
}

function syncSortOrder(sortSelect) {
	
	  $('#sortOrder').val($(sortSelect).val());
	  $('#sortOrder_lower').val($(sortSelect).val());

  filterResults($(sortSelect).parents("form"));
}


function filterResults($theForm) {
 
    if ($theForm instanceof jQuery) {  
        $theForm = $theForm;
    }
    else {
        $theForm = $($theForm);  
    }


    specialCharacterCheck();
    checkboxTextColorChange();

    $.post("/ar/challenge/filter", $theForm.serialize())
        .success(function( formContent ) {
            $("#challengeListDiv").html(formContent);
            if ($('#source').val() == 'innocentive') {
            	document.title = 'Challenge Center | InnoCentive';
            }
            else if ($('#source').val() == 'partner') {
            	document.title = 'Challenge Center | Partner';
            }
        });

    $('#pagefiltered').val('true');
}

function processSaveSettings() {
    var $theForm = jQuery("[name='filterForm']");
    var saveRadioValue;
    var $saveRadio = jQuery('#saveRadio');
    var $saveRadio2 = jQuery('#saveRadio2');
    var $saveRadio3 = jQuery('#saveRadio3');
    var $saveRadio4 = jQuery('#saveRadio4');
    if ($saveRadio && $saveRadio.is(":checked")) {
        saveRadioValue = 1;
    } else if ($saveRadio2 && $saveRadio2.is(":checked")) {
        saveRadioValue = 2;
    } else if ($saveRadio3 && $saveRadio3.is(":checked")) {
        saveRadioValue = 3;
    } else if ($saveRadio4 && $saveRadio4.is(":checked")) {
        saveRadioValue = 4;
    }

 
     $.post("/ar/challenge/saveFilterSettingsAJAX", $theForm.serialize() + "&saveValue=" + saveRadioValue);
    filterResults($theForm);
}

 


function expandShrinkAll(obj) {
 
    var $theForm = $("[name='filterForm']");

    if ($('#expandAction').val() == 'expand') {
        $('#expandAction').val('shrink');
        $('#plusminus').html('-');
    }
    else {
        $('#expandAction').val('expand');
        $('#plusminus').html('+');
    }

    $('#useCurrentOffset').val('true');
    filterResults($theForm);
}

function setActiveImage(active, $element) {

    if (!($element.parents("li:first").hasClass("active"))) {
        if (active) {
            $element.attr("src", '/ar/images/challenge/' + $element.attr('id') + '-on.gif');
        } else {
            $element.attr("src", '/ar/images/challenge/' + $element.attr('id') + '-off.gif');
        }
    }
}

function setActivePavilion(active) {
//	console.log("in setactivepavilion with " + active);
    if (active) {
       
        $('#pavilion-overlay').show();
        setSource('pavilion', false);
    } else {
      
        $('#pavilion-overlay').hide();
    }
 
}

function highlightPavilionCell(active, element) {

    var $element = $(element);

    if (active) {
        $element.addClass("active");
    } else {
        $element.removeClass();
    }
}

function setSource(challengeType, reload) {
 
    var $theForm = $("[name='filterForm']");
    var theFilterPanel = $('#filters-panel')
    var searchTerm = $('#searchTerm');
    var disciplines = $('#disciplines');
    var challengeTypes = $('#challengeType');
    var status = $('#status');
    var categories = $('#categories');
    var pavilions = $('#pavilions');
    var partners = $('#partners');
    var submissiontype = $('#submission_type');
    var pavilionbanner = $('#pavilion-banner');
    var source = $('#source');
    $('#refreshOffset').val(0);
//    console.log("in setSource, challengeTpe is " + challengeType);

    if (challengeType == 'InnoCentive Challenges') {
 
        theFilterPanel.show();
        searchTerm.show();
        disciplines.show();
        challengeTypes.show();
        status.show();
        pavilions.show();
        pavilionbanner.hide();
        $('#pavilionName').val('');
        $('#source').val("innocentive");
        setActivePavilion(false);
        $('#enel-title').hide();
        $('#innocentive-list-item').addClass('active');
        $('#partner-list-item').removeClass('active');
        $('#pavilion-list-item').removeClass('active');
    }
    else if (challengeType == 'Partner Challenges') {
 
        $('#sortProp').val('Posted');
        theFilterPanel.hide();
        pavilionbanner.hide();
        setActivePavilion(false);
        $('#source').val("partner");
        $('#pavilionName').val('');
        $('#enel-title').hide()
        $('#innocentive-list-item').removeClass('active');
        $('#partner-list-item').addClass('active');
        $('#pavilion-list-item').removeClass('active');
    }
    else if (challengeType == 'Oiml Challenges') {
        $('#innocentive-challenges').prop("src", '/ar/images/challenge/innocentive-challenges-off.gif');
        $('#private-pavillions').prop("src", '/ar/images/challenge/private-pavillions-on.gif');
        $('#other-challenges').prop("src", '/ar/images/challenge/other-challenges-off.gif');
        $('#source').val("pavilion");
        pavilionbanner.show();
        pavilions.hide();
        $('#innocentive-list-item').removeClass();
        $('#partner-list-item').removeClass();
        $('#pavilion-list-item').addClass('active');
        advancedfilters.hide();
        advancedfilterLink.hide();
        pavilionbanner.show();
        $('#sortProp').val('postedDate');
        categories.hide();
        pavilions.hide();
        partners.hide();
        $('#source').val("pavilion");
        $('#pavilion-list-item').addClass('active');
        $('#partnerChallengelink').removeClass();
        $('#partner-list-item').removeClass();
        $('#innocentiveChallengelink').removeClass();
        $('#innocentive-list-item').removeClass();
 
        checkOnly('partnerChallengelink');
 
    } else {
//    	console.log("setting source to pavilion");
        $('#source').val("pavilion");
        pavilionbanner.show();
        theFilterPanel.hide();
        $('#enel-title').hide();
        $('#innocentive-list-item').removeClass('active');
        $('#partner-list-item').removeClass('active');
        $('#pavilion-list-item').addClass('active');
    }

    if (reload==true) {
    	filterResults($theForm);
    }
}

function checkboxTextColorChange() {
    var $inputCollection = $("#filters input:checkbox, #filters input:radio");
    $inputCollection.each(function(){
        $(this).siblings("label").css("fontWeight", $(this).is(":checked")? 'bold' : 'normal');
    });
}

function checkboxFontWeightChange($el) {
    if ($el != null) {
        var $checkGroup = $("[name='" + $el.prop("name") + "']");

        $checkGroup.each(function(){
            $(this).parent().css("fontWeight", $(this).is(":checked") ? 'bold' : 'normal');
        });
    }
}

function checkPartners(pt) {
 
    var $f = $(pt).parents("form");

    if ($(pt).attr('id') == 'pt_all' && $(pt).is(":checked")) {
        uncheckPartners($f);
    }
    else {
        $('#pt_all').prop("checked", false);
    }

    filterResults($f, $(pt));
}

function uncheckPartners($f) {
 
    for (var i = 0; i < $f.find('input').size(); i++) {
        var e = $f.find('input').get(i);
        if (e.prop("id").indexOf('pt_') == 0 && e.prop("id") != 'pt_all') {
            e.prop("checked", false);
        }
    }
}

function submitForm() {
 
    var $theForm = $("[name='filterForm']");
    $theForm.submit();
}

function filterPanelSetup() {
	  jQuery('#statusFilterRefresh').multiselect( {
	      	numberDisplayed: 10,
	    	includeSelectAllOption: true,
	    	selectAllText: 'Select All',
	    	allSelectedText: 'All Selected',
	    	selectAllValue: 'st_all',
	    	selectAllNumber: false,
	    	inheritClass: true,
	    	buttonWidth: '100%'
	    });
	    jQuery('#disciplineFilterRefresh').multiselect( {
	      	numberDisplayed: 10,
	    	includeSelectAllOption: true,
	    	allSelectedText: 'All Selected',
	    	selectAllText: 'Select All',
	    	selectAllValue: 'cb_all',
	     	selectAllNumber: false,
	     	inheritClass: true,
	    	buttonWidth: '100%'
	    });
	    jQuery('#pavilionFilterRefresh').multiselect( {
	      	numberDisplayed: 10,
	    	includeSelectAllOption: true,
	    	allSelectedText: 'All Selected',
	    	selectAllText: 'Select All',
	    	selectAllValue: 'pv_all',
	     	selectAllNumber: false,
	     	inheritClass: true,
	    	buttonWidth: '100%'
	    });
	    jQuery('#challengeTypeFilterRefresh').multiselect( {
	      	numberDisplayed: 10,
	    	includeSelectAllOption: true,
	    	allSelectedText: 'All Selected',
	    	selectAllText: 'Select All',
	     	selectAllNumber: false,
	    		selectAllValue: 'ct_all',
	    		inheritClass: true,
	    	buttonWidth: '100%'
	    });
}

jQuery(document).ready(function() {
		filterPanelSetup();	
});
