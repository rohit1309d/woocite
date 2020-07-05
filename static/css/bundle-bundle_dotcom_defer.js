jQuery(document).ready(function(){

    _initBootstrapSelect();

});

function _initBootstrapSelect() {
    jQuery('.selectpicker').selectpicker();
};

function facebookLogin() {
    FB.api('/me', function(user) {
        if (user && user.name) {
            window.location.href = "/ar/registration/facebookRegister";
        }
    })
}

function isEmpty(anObject){
    return anObject == undefined || anObject == null || anObject === "" || anObject === [] || anObject.length == 0 || (anObject.size != undefined && anObject.size() == 0);
}

/* jQuery functions */
jQuery.fn.toggleSpin = function(bool) {
    return this.each(
        function(){
            var $this = jQuery(this);
            if(bool || (bool == undefined && !$this.hasClass("fa-spin"))){
                $this.addClass("fa-spin");
            }
            else{
                $this.removeClass("fa-spin");
            }
        }
    );
};

jQuery.fn.check = function() {
    return this.prop("checked", true);
};
jQuery.fn.uncheck = function() {
    return this.prop("checked", false);
};
jQuery.fn.toggleCheck = function(bool) {
    return this.each(
        function(){
            var $this = jQuery(this);
            if(bool || (bool == undefined && !$this.is(":checked"))){
                $this.check();
            }
            else{
                $this.uncheck();
            }
        }
    );
};
jQuery.fn.isChecked = function() {
    return jQuery(this).is(":checked");
};
jQuery.fn.isCheckBox = function() {
    return jQuery(this).attr("type") == "checkbox";
};
jQuery.fn.isFileInput = function() {
    return jQuery(this).attr("type") == "file";
};

jQuery.fn.isEnable = function() {
    return isEmpty(this.attr("disabled"));
};
jQuery.fn.enable = function() {
    return this.removeAttr("disabled").removeClass("disabled");
};
jQuery.fn.disable = function() {
    return this.attr("disabled", "disabled").addClass("disabled");
};
jQuery.fn.toggleEnable = function(bool) {
    return this.each(
        function(){
            var $this = jQuery(this);
            if(bool || (bool == undefined && $this.attr("disabled"))){
                $this.enable();
            }
            else{
                $this.disable();
            }
        }
    );
};

jQuery.fn.id = function(id) {
    if(id == undefined){
        return this.attr("id");
    }
    return this.attr("id", id);
};

jQuery.fn.name = function(name) {
    if(name == undefined){
        return this.attr("name");
    }
    return this.attr("name", name);
};

jQuery.fn.title = function(title) {
    if(title == undefined){
        return this.attr("title");
    }
    return this.attr("title", title);
};

jQuery.fn.originalTitle = function(title) {
    if(title == undefined){
        return this.attr("data-original-title");
    }
    return this.attr("data-original-title", title);
};

jQuery.fn.placeholder = function(placeholder) {
    if(placeholder == undefined){
        return this.attr("placeholder");
    }
    return this.attr("placeholder", placeholder);
};

jQuery.fn.colspan = function(colspan) {
    if(colspan == undefined){
        return parseInt(this.attr("colspan"));
    }
    return this.attr("colspan", colspan);
};
jQuery.fn.increaseColspan = function(toInc) {
    return this.each(
        function(){
            var $this = jQuery(this);
            var currentColspan = $this.attr('colspan');
            if(isEmpty(currentColspan)){
                $this.attr('colspan', toInc);
            }
            else{
                $this.attr('colspan', +currentColspan + toInc);
            }
        }
    );
};
jQuery.fn.decreaseColspan = function(toDec) {
    return this.each(
        function(){
            var $this = jQuery(this);
            var currentColspan = $this.attr('colspan');
            if(currentColspan){
                $this.attr('colspan', +currentColspan - toDec);
            }
        }
    );
};

jQuery.fn.findObject = function(comparator) {
    return jQuery.findObject(this, comparator);
};

jQuery.findObject = function(array, comparator) {
    var objects = jQuery.grep(array, comparator);

    if(isEmpty(objects)){
        return null;
    }

    return objects[0];
};

// See: http://learn.jquery.com/performance/dont-act-on-absent-elements/
jQuery.fn.doOnce = function( func ) {
    this.length && func.apply( this );
    return this;
};

//Function to filter a list by input text
//Params: textbox, the input text; selectSingleMatch, select HTML Element to apply filter
jQuery.fn.filterByText = function(textbox, selectSingleMatch) {
    return this.each(function() {
        var select = this;
        var options = new Array();
        $(select).find('option').each(function() {
            options.push({value: jQuery(this).val(), text: jQuery(this).text()});
        });
        jQuery(select).data('options', options);
        jQuery(textbox).bind('change keyup', function() {
            var options = jQuery(select).empty().data('options');
            var search = jQuery.trim($(this).val());
            var regex = new RegExp(search,"gi");

            jQuery.each(options, function(i) {
                var option = options[i];
                if(option.text.match(regex) !== null) {
                	jQuery(select).append(
                			jQuery('<option>').text(option.text).val(option.value)
                    );
                }
            });
            if (selectSingleMatch === true && $(select).children().length === 1) {
            	jQuery(select).children().get(0).selected = true;
            }
        });
    });
};

jQuery.fn.showInLine = function() {
    return this.each(
        function(){
        	jQuery(this).css("display", "inline-block");
        }
    );
};

/*
 Use this function on an jquery object to append the element passed as param at specific position.
 Element can be a String or a Jquery element.
 When this function is applied to many elements, the element that is passed as param is cloned.
 Be careful becuase there will be different instances of the element parameter.
 */
jQuery.fn.insertAt = function(index, element) {

    var $element = jQuery(element);

    return this.each(
        function(){
            var $this = jQuery(this);
            var lastIndex = $this.children().size();

            $this.append($element);
            if (index < lastIndex) {
                $this.children().eq(index).before($this.children().last());
            }

            $element = jQuery(element).clone(true, true);
        }
    );
};

jQuery.fn.isEmpty = function() {
    return isEmpty(jQuery(this));
};

jQuery.fn.isVisible = function() {
    return jQuery(this).is(":visible");
};

/**
 * Use placeholders in an expression for replacement. For example: "To{0}'s the
 * {0}. And it's going to happen {1}, and {1}, and {1}...".format("night",
 * "again") outputs: "Tonight's the night. And it's going to happen again, and
 * again, and again..."
 */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

if (!String.prototype.toCapitalize) {
    String.prototype.toCapitalize = function(){
        return this.toLowerCase().replace(/\b[a-z]/g, function(letter){
            return letter.toUpperCase();
        });
    };
}

if (!String.prototype.toUpperFirst) {
    String.prototype.toUpperFirst = function(){
        return this.charAt(0).toUpperCase() + this.substring(1);
    };
}

if (!String.prototype.trunc) {
    String.prototype.trunc = function(n){
        return $.trim(this.substr(0,n-1)) + (this.length>n?'&hellip;':'');
    };
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second parm
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
};

/**
 * jQuery validator
 */
jQuery.validator.setDefaults({
    debug: true,
    success: "valid",
    errorElement: "label",
    errorPlacement: function(error, element) {
        element = jQuery(element);
        var parent = element.parent();
        if (parent.hasClass("input-group")) {
            parent.after(error);
        }
        else{
            parent.append(error);
        }
    },
    showErrors: function(errorMap, errorList) {

        this.defaultShowErrors();

        var inputs = jQuery(this.currentForm).find("div.has-error input");
        jQuery.each(inputs, function(index, input){
            input = jQuery(input);
            if (!input.hasClass("error")) {
                var parent = input.parent();
                parent.removeClass("has-error");
            }
        });

        for (var i in errorList) {
            var element = jQuery(errorList[i].element);
            var parent = element.parent();
            if (parent.hasClass("input-group")) {
                if (element.hasClass("error")){
                    parent.addClass("has-error");
                }
                else{
                    parent.removeClass("has-error");
                }
            }
        }
    },
});

jQuery(document).ajaxStart(function ()
		{
		    jQuery(document.body).addClass('wait');

		}).ajaxComplete(function () {

		    jQuery(document.body).removeClass('wait');

		});



