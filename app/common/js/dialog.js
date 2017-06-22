;(function(okay) {

    // Define our constructor
    function Modal(){

        // Create global element references
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;
        this.transitionEnd = transitionSelect();

        // Define option defaults
        var defaults = {
            className: 'fade-and-drop',
            closeButton: false,
            title:"",
            content: "",
            footer:"",
            maxWidth: '90%',
            width: '72%',
            overlay: true,
            dropback: false
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && isObject(arguments[0])) {
          this.options = extendDefaults(defaults, arguments[0]);
        }

        this.open();

    }


    Modal.prototype.open = function() {
        // Build out our Modal
        buildOut.call(this);

        // Initialize our event listeners
        initializeEvents.call(this);

        /*
         * After adding elements to the DOM, use getComputedStyle
         * to force the browser to recalc and recognize the elements
         * that we just added. This is so that CSS animation has a start point
         */
        window.getComputedStyle(this.modal).height;

        /*
         * Add our open class and check if the modal is taller than the window
         * If so, our anchored class is also applied
         */
        this.modal.className = this.modal.className +
          (this.modal.offsetHeight > window.innerHeight ?
            " dialog-open dialog-anchored" : " dialog-open");
        this.overlay.className = this.overlay.className + " dialog-open";

    }


    Modal.prototype.close = function() {
        // Store the value of this
        var _ = this;

        // Remove the open class name
        this.modal.className = this.modal.className.replace("dialog-open", "");
        this.overlay.className = this.overlay.className.replace("dialog-open","");

        /*
         * Listen for CSS transitionend event and then
         * Remove the nodes from the DOM
         */
        this.modal.addEventListener(this.transitionEnd, function handler(){
            _.modal.parentNode && _.modal.parentNode.removeChild(_.modal);
            _.modal.removeEventListener(this.transitionEnd, handler, false);
        },false);

        if(this.overlay){
            this.overlay.addEventListener(this.transitionEnd, function handler(){
                _.overlay.parentNode &&  _.overlay.parentNode.removeChild(_.overlay);
                _.modal.removeEventListener(this.transitionEnd, handler, false);
            },false);
            //fix huwei p9 browser
            setTimeout(function(){
                _.overlay.parentNode &&  _.overlay.parentNode.removeChild(_.overlay);
            },450);
        }

        unbindEvents.call(this);

    }


    function buildOut() {
        var header,content, contentHolder,footer,docFrag,buttons,btn;
        var self = this;
        /*
         * If content is an HTML string, append the HTML string.
         * If content is a domNode, append its content.
         */

        if (typeof this.options.content === "string") {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // Create a DocumentFragment to build with
        docFrag = document.createDocumentFragment();

        // Create modal element
        this.modal = document.createElement("div");
        this.modal.className = "dialog-modal " + this.options.className;
        this.modal.style.width = this.options.width;

        // If closeButton option is true, add a close button
        if (this.options.closeButton) {
            this.closeButton = document.createElement("button");
            this.closeButton.className = "dialog-close close-button";
            this.closeButton.innerHTML = "×";
            this.modal.appendChild(this.closeButton);
        }

        // If overlay is true, add one
        if (this.options.overlay) {
            this.overlay = document.createElement("div");
            this.overlay.className = "dialog-overlay " + this.options.className;
            docFrag.appendChild(this.overlay);
        }

        if(this.options.title){
            header = document.createElement("div");
            header.className = "dialog-header";
            header.innerHTML = this.options.title;
            this.modal.appendChild(header);
        }

        // Create content area and append to modal
        contentHolder = document.createElement("div");
        contentHolder.className = "dialog-content";
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        if(this.options.buttons && this.options.buttons.length){
            buttons = this.options.buttons;
            footer = document.createElement("div");
            footer.className = "dialog-footer";
            for (var i = 0,len = buttons.length; i < len; i++) {
                (function(i){
                    btn = document.createElement("BUTTON");        // Create a <button> element
                    var t = document.createTextNode(buttons[i].text);       // Create a text node
                    btn.appendChild(t);
                    btn.className = 'btn ' + (buttons[i].className || '');
                    footer.appendChild(btn);
                    btn.addEventListener('click',buttons[i].cb.bind(self),false);                         // Append the text to <button>
                })(i);
            }
            this.modal.appendChild(footer);
        }

        // Append modal to DocumentFragment
        docFrag.appendChild(this.modal);

        // Append DocumentFragment to body
        document.body.appendChild(docFrag);

    }


    function initializeEvents() {
        this._events = {
            clickCloseBtn: this.close.bind(this),
            clickOverlay: this.close.bind(this)
        };
        if (this.closeButton) {
            this.closeButton.addEventListener(tap(), this._events.clickCloseBtn,false);
        }
        if (this.options.dropback) {
            this.overlay.addEventListener(tap(), this._events.clickOverlay,false);
        }

    }

    function unbindEvents(){
        if (this.closeButton) {
            this.closeButton.removeEventListener(tap(), this._events.clickCloseBtn,false);
        }
        if (this.options.dropback) {
            this.overlay.removeEventListener(tap(), this._events.clickOverlay,false);
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

    function tap(){
        return okay && okay.util && okay.util.isMobile ? 'touchstart' : 'click';
    }

    Modal.alert = function(opt){
        var option = {
            buttons:[
                {
                    text: opt.text,
                    className:'btn-md btn-primary btn-full',
                    cb: function(){
                        this.close();
                    }
                }
            ]
        }
        extendDefaults(opt,option);
        new Modal(opt);
    }

    Modal.confirm = function(opt){
        var option = {
            buttons:[
                {
                    text: opt.text[0],
                    className:'btn-md ' + (opt.hlCancel ? 'btn-primary ' : '') + 'btn-half',
                    cb: function(){
                        if(opt.ondeny){
                            opt.ondeny.call(this);
                        }else{
                            this.close();
                        }
                    }
                },
                {
                    text: opt.text[1],
                    className:'btn-md btn-primary btn-half',
                    cb: function(){
                        opt.onaccept.call(this);
                        !opt.manualClose && this.close();
                    }
                }
            ]
        }
        extendDefaults(opt,option);
        new Modal(opt);
    }

    window.Okay = okay || {};
    window.Okay.Dialog = Modal;

})(window.Okay);
