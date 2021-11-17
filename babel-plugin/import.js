export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      ImportDeclaration(path) {
          //console.log(path,path.node);
          const node = path.node;
          //console.log(node)
          let libraryName = node.source.value;
          // 获取声明说明符
          const { specifiers } = node;
        
        let filters = specifiers.some(specifier => {
          console.log(t.isImportDefaultSpecifier(specifier))
			return t.isImportDefaultSpecifier(specifier)
        })
        if(filters) return;
        	
          // 遍历对应的声明符
          const importDeclarations = specifiers.map((specifier, index) => {
            // 获得原本导入的模块
            console.log(specifiers,specifier)
            const moduleName = specifier.imported.name;
            // 获得导入时的重新命名
            const localIdentifier = specifier.local;
            return generateImportStatement(t,libraryName,moduleName, localIdentifier);
          });
          if (importDeclarations.length === 1) {
          	  // 如果仅仅只有一个语句时
              path.replaceWith(importDeclarations[0]);
          } else {
          	  // 多个声明替换
              path.replaceWithMultiple(importDeclarations);
          }
      }
    }
  };
}

function generateImportStatement(t,libraryName,moduleName, localIdentifier) {
    return t.importDeclaration(
      [t.ImportDefaultSpecifier(localIdentifier)],
      t.StringLiteral(`${libraryName}/${moduleName}`)
    );
  }
