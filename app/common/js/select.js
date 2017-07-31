;(function(okay) {

    // Define our constructor
    function Select(){

        // Create global element references
        this.closeButton = null;
        this.overlay = null;
        this.modal = null;
        this.transitionEnd = transitionSelect();

        // Define option defaults
        var defaults = {
            className: 'fade-and-drop',
            content: "",
            overlay: true,
            dropback: false
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && isObject(arguments[0])) {
          this.options = extendDefaults(defaults, arguments[0]);
        }

        this.open();

    }


    Select.prototype.open = function() {
        // Build out our Modal
        buildOut.call(this);

        //init select
        initSelect.call(this);

        // Initialize our event listeners
        initializeEvents.call(this);

    }

    function buildOut() {
        var header,content,selects,opts;
        var str='',self = this;
        var key,text;
        // Create modal element
        this.modal = $('<div class="select-modal clearfix col-' + this.options.content.length + '"></div>');

        // If closeButton option is true, add a close button
        if (this.options.title) {
            header = $('<div class="select-header"><button class="select-close">取消</button><span>' + this.options.title + '</span><button class="select-confirm">确定</button></div>');
            this.modal.append(header);
        }

        // If overlay is true, add one
        if (this.options.overlay) {
            this.overlay = $('<div class="select-overlay"></div>');
            if(this.options.className){
                this.overlay.addClass(this.options.className);
            }
            $('body').append(this.overlay);
        }

        // Create content area and append to modal
        content = $('<div class="select-content"></div>');
        selects = this.options.content;
        key = this.options.key || 'value';
        text = this.options.text || 'text';
        for (var i = 0,len = selects.length; i < len; i++) {
            opts = selects[i].select;
            str += '<select id="' + selects[i].id +'">';
            for(var j=0,len2 = opts.length;j < len2;j++){
                if(Array.isArray(opts[j])){
                    str += '<option value="' + opts[j][0] + '">' + opts[j][1] + '</option>';
                }else{
                    str += '<option value="' + opts[j][key] + '">' + opts[j][text] + '</option>';
                }
            }
            str += '</select>';
        }
        content.html(str);
        this.modal.append(content);

        $('body').append(this.modal);

    }


    function initSelect(selectIndexs){
        var selects = this.options.content;
        for (var i = 0,len = selects.length; i < len; i++) {
            (function(i){
                $('#' + selects[i].id).drum({
                    onChange : function (e) {
                        selects[i].onChange && selects[i].onChange(e);
                    }
                });
                selects[i].selectIndex && $('#' + selects[i].id).drum('setIndex', selects[i].selectIndex);
            })(i);
        }
    }


    function initializeEvents() {
        var self  = this;

        $(document).on('tap','.select-close',function(){
            close();
        });

        $(document).on('tap','.select-confirm',function(){
            self && self.options && self.options.onaccept && self.options.onaccept();
            close();
        });

        function close(){
            self = null;
            $('.select-overlay').remove();
            $('.select-modal').remove();
        }

    }


    // Utility method to check the argument is an object
    function isObject(obj){
        return Object.prototype.toString.call(obj) == '[object Object]';
    }

    // Utility method to determine which transistionend event is supported
    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
          if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
          }
        }
        return source;
    }


    window.Okay = okay || {};
    window.Okay.Select = Select;

})(window.Okay);
