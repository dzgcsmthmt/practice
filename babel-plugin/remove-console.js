// https://github.com/babel/minify/blob/master/packages/babel-plugin-transform-remove-console/src/index.js
console.log(11,console.log(222));
function aa(){}
aa()
export default function (babel) {
    const { types: t } = babel;

    return {
        name: "ast-transform", // not required
        visitor: {
            CallExpression(path) {
                console.log(path)
                const callee = path.get("callee");
                console.log('callee', callee);
                if (!callee.isMemberExpression()) return;
                console.log('object', callee.get('object'));
                if (callee.node.object.name === 'console') {
                    path.remove()
                }
            }
        }
    };
}


// const a = console.log;
// a();
// const b = console.error.bind(console);
// b("asdf");


// true && console.log("foo");