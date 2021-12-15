//解析html
/* <!DOCTYPE html>
<html>

<body>
    <div class="aaa"></div>
    <div id="ccc"></div>
    <span></span>
</body>

</html> */

let data = {id:new Set(),class:new Set(),tag:new Set()};
export default function(tree) {
  tree.walk(node => {
    console.log(node);
    if(typeof node === 'object'){
      	data.tag.add(node.tag);
    	if(node.attrs){
        	if(node.attrs.id){data.id.add(node.attrs.id)}
          	if(node.attrs.class){data.class.add(node.attrs.class)}
        }
    }
    return node;
  });
  console.log(data)
}


//css规则匹配
import * as postcss from 'postcss';
let rules = {"id":["ccc"],"class":["aaa"],"tag":["html","body","div","span"]};
export default postcss.plugin('postcss-reverse-props', (options = {}) => {
    // Work with options here
    return root => {
        // Transform CSS AST here
        root.walkRules(rule => {
            console.log(rule)
          	let selector = rule.selector.split(/\s+/g).pop();
          	if(selector.startsWith('#')){
            	//handle id
              	if(rules.id.indexOf(rule.selector.substr(1)) === -1){
                    console.log('unused id',selector)
                    rule.remove()
                }
            }else if(selector.startsWith('.')){
              if(rules.class.indexOf(rule.selector.substr(1)) === -1){
                	console.log('unused class',selector)
                	rule.remove()
                }
            }else{
              	if(rules.tag.indexOf(selector) === -1){
                    console.log('unused tag',selector)
                    rule.remove()
                }
            }
            //rule.walkDecls(decl => {
                //console.log(decl)
            //});
        });
    };
});
