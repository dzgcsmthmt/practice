// https://github.com/chocolateboy/babel-plugin-async-try-catch

function alreadyWrapped(node,t) {
    let body = node.body.body;
    return body && body.length === 1 && t.isTryStatement(body[0]);
}

async function test() {
    const v1 = await getSomething();
}



export default function (babel) {
    const { types: t } = babel;
    function wrap(node, callback = 'asyncError') {
        return {
            "body": [
                {
                    "block": node,
                    "finalizer": null,
                    "handler": {
                        "body": {
                            "body": [
                                {
                                    "expression": {
                                        "arguments": [
                                            {
                                                "type": "ThisExpression"
                                            },
                                            {
                                                "name": "error",
                                                "type": "Identifier"
                                            }
                                        ],
                                        "callee": {
                                            "computed": false,
                                            "object": {
                                                "name": callback,
                                                "type": "Identifier"
                                            },
                                            "property": {
                                                "name": "call",
                                                "type": "Identifier"
                                            },
                                            "type": "MemberExpression"
                                        },
                                        "type": "CallExpression"
                                    },
                                    "type": "ExpressionStatement"
                                }
                            ],
                            "type": "BlockStatement"
                        },
                        "param": {
                            "name": "error",
                            "type": "Identifier"
                        },
                        "type": "CatchClause"
                    },
                    "type": "TryStatement"
                }
            ],
            "type": "BlockStatement"
        }
    }

    return {
        name: "ast-transform", // not required
        visitor: {
            FunctionDeclaration(path) {
                console.log(path);
                const node = path.node;
                if (node.async && !alreadyWrapped(node,t)) {
                    node.body = wrap(node.body);
                }
            }
        }
    };
}