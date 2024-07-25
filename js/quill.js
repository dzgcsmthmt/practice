//add custom class
let Block = Quill.import("blots/block");

// Create a custom blot for Javascript
class CustomBlot extends Block {
    static create(url) {
        let node = super.create();
        // Attribute for output HTML
        // node.setAttribute("class", "custom-class");
        return node;
    }
}

// The format name to toggle
CustomBlot.blotName = "custom";
// Class to look for when parsing your input HTML
CustomBlot.className = "custom-class";
// Tag to look for when parsing your input HTML
CustomBlot.tagName = "div";
// Register your custom blot with quill.
Quill.register(CustomBlot);


//image add custom class
var Image = Quill.import('formats/image');
Image.className = 'img-fluid';
Quill.register(Image, true);
