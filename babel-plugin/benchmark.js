function a(){
	let count = 0;
  	for(let i = 0;i < 100;i++){
    	count += i;
    }
}
a();

export default function (babel) {
    const { types: t } = babel;
    
    return {
      name: "ast-transform", // not required
      visitor: {
        FunctionDeclaration(path){
            console.log(path.node.id);
          let name = path.node.id.name;
          //path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before')))
          path.get('body').unshiftContainer('body', t.callExpression(t.MemberExpression(t.Identifier('console'),t.Identifier('time')),[t.StringLiteral(name)]))
          //path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')))
          path.get('body').pushContainer('body', t.callExpression(t.MemberExpression(t.Identifier('console'),t.Identifier('timeEnd')),[t.StringLiteral(name)]))
        },
        CallExpression(path){
            console.log(path)
        }
      }
    };
  }
  