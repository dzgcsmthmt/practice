## Selection
Selection对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的Selection对象，请调用 window.getSelection()
### 锚点（anchor）
> 锚指的是一个选区的起始点。当我们使用鼠标框选一个区域的时候，锚点就是我们鼠标按下瞬间的那个点。在用户拖动鼠标时，锚点是不会变的。
### 焦点（focus）
> 选区的焦点是该选区的终点，当您用鼠标框选一个选区的时候，焦点是你的鼠标松开瞬间所记录的那个点。随着用户拖动鼠标，焦点的位置会随着改变。
### 范围（range）
>范围指的是文档中连续的一部分。一个范围包括整个节点，也可以包含节点的一部分，例如文本节点的一部分。用户通常下只能选择一个范围，但是有的时候用户也有可能选择多个范围（例如当用户按下Control按键并框选多个区域时，Chrome中禁止了这个操作，译者注）。“范围”会被作为range对象返回。Range对象也能通过DOM创建、增加、删减。
## Range
 Range可以用 Document 对象的 createRange方法创建，也可以用Selection对象的getRangeAt方法取得。另外，可以通过构造函数 Range() 来获得一个 Range 。
## document.execCommand
bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
### 返回值
>一个 Boolean ，如果是 false 则表示操作不被支持或未被启用。
### 参数
> aCommandName
一个 DOMString ，命令的名称。可用命令列表请参阅 命令 。

> aShowDefaultUI
一个 Boolean， 是否展示用户界面，一般为 false。Mozilla 没有实现。

> aValueArgument
一些命令（例如insertImage）需要额外的参数（insertImage需要提供插入image的url），默认为null。
## document.caretRangeFromPoint
returns a Range object for the document fragment under the specified coordinates.

var range = document.caretRangeFromPoint(float x, float y);
### Returns
> A Range.

> Null, if x or y are negative, outside viewport, or there is no text entry node.
### Parameters
> x A horizontal position within the current viewport.

> y A vertical position within the current viewport.

```
function insertBreakAtPoint(e) {

    var range;
    var textNode;
    var offset;

    if (document.caretPositionFromPoint) {
        range = document.caretPositionFromPoint(e.clientX, e.clientY);
        textNode = range.offsetNode;
        offset = range.offset;

    } else if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(e.clientX, e.clientY);
        textNode = range.startContainer;
        offset = range.startOffset;
    }

    // only split TEXT_NODEs
    if (textNode && textNode.nodeType == 3) {
        var replacement = textNode.splitText(offset);
        var br = document.createElement('br');
        textNode.parentNode.insertBefore(br, replacement);
    }
}

var paragraphs = document.getElementsByTagName("p");
for (i=0 ; i < paragraphs.length; i++) {
    paragraphs[i].addEventListener("click", insertBreakAtPoint, false);
}
```
## document.elementFromPoint
返回当前文档上处于指定坐标位置最顶层的元素, 坐标是相对于包含该文档的浏览器窗口的左上角为原点来计算的, 通常 x 和 y 坐标都应为正数
## Element.insertAdjacent(HTML|Element|Text)(position,text)
parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position
### Parameters
 >position A DOMString representing the position relative to the element; must be one of the following strings:
1. 'beforebegin': Before the element itself.
2. 'afterbegin': Just inside the element, before its first child.
3. 'beforeend': Just inside the element, after its last child.
4. 'afterend': After the element itself.

>text is the string to be parsed as HTML or XML and inserted into the tree
## XMLSerializer
The XMLSerializer interface provides the serializeToString() method to construct an XML string representing a DOM tree.
```
var inp = document.createElement('input');
var XMLS = new XMLSerializer();
var inp_xmls = XMLS.serializeToString(inp); // First convert DOM node into a string

// Insert the newly created node into the document's body
document.body.insertAdjacentHTML('afterbegin', inp_xmls);
```
## DOMParser
The DOMParser interface provides the ability to parse XML or HTML source code from a string into a DOM Document.
```
parser = new DOMParser();
doc = parser.parseFromString(stringContainingHTMLSource, "text/html");
// returns a HTMLDocument, which also is a Document.
```
## Document.createNodeIterator()
var nodeIterator = document.createNodeIterator(root, whatToShow, filter);
```
var nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    function(node) {
        return node.nodeName.toLowerCase() === 'p' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}
```
## Document.createTreeWalker()
treeWalker = document.createTreeWalker(root, whatToShow, filter, entityReferenceExpansion);
```
var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
  false
);

var nodeList = [];

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
```
##  Node.compareDocumentPosition()
The Node.compareDocumentPosition() method compares the position of the current node against another node in any other document
```
var head = document.getElementsByTagName('head').item(0);

if (head.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_FOLLOWING) {
  console.log("well-formed document");
} else {
  console.log("<head> is not before <body>");
}
```
## Node.contains()
The Node.contains() method returns a Boolean value indicating whether a node is a descendant of a given node, i.e. the node itself, one of its direct children (childNodes), one of the children's direct children, and so on.
```
function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}
```
## Document.evaluate()
Returns an XPathResult based on an XPath expression and other given parameters
## Document.implementation
Returns a DOMImplementation object associated with the current document.
## Element.getBoundingClientRect()
Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置
返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。

DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
## Element.scrollIntoView()
element.scrollIntoView(); // 等同于element.scrollIntoView(true)
element.scrollIntoView(alignToTop); // Boolean型参数
element.scrollIntoView(scrollIntoViewOptions);

// Object型参数
alignToTop
一个Boolean值：
>如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。

>如果为false，元素的底端将和其所在滚动区的可视区域的底端对齐。

scrollIntoViewOptions
<pre>
一个boolean或一个带有选项的object：
{
    behavior: "auto"  | "instant" | "smooth",
    block:    "start" | "end",
}
如果是一个boolean, true 相当于{block: "start"}，false 相当于{block: "end"}
</pre>
## Node.normalize()
The Node.normalize() method puts the specified node and all of its sub-tree into a "normalized" form. In a normalized sub-tree, no text nodes in the sub-tree are empty and there are no adjacent text nodes.
```
var wrapper = document.createElement("div");

wrapper.appendChild( document.createTextNode("Part 1 ") );
wrapper.appendChild( document.createTextNode("Part 2 ") );

// At this point, wrapper.childNodes.length === 2
// wrapper.childNodes[0].textContent === "Part 1 "
// wrapper.childNodes[1].textContent === "Part 2 "

wrapper.normalize();

// Now, wrapper.childNodes.length === 1
// wrapper.childNodes[0].textContent === "Part 1 Part 2 "
```
