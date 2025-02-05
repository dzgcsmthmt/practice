console.log(
    "----------------------------",
    "custom plugin: tryCatch.js",
    "----------------------------"
);
module.exports = function ({ types: t }) {
    return {
        visitor: {
            CallExpression(path) {
                if (
                    t.isMemberExpression(path.node.callee) &&
                    t.isIdentifier(path.node.callee.object, { name: "JSON" }) &&
                    t.isIdentifier(path.node.callee.property, { name: "parse" })
                ) {
                    let parentTry = path.findParent((p) =>
                        t.isTryStatement(p.node)
                    );

                    if (!parentTry) {
                        path.replaceWith(
                            t.callExpression(
                                t.arrowFunctionExpression(
                                    [],
                                    t.blockStatement([
                                        t.tryStatement(
                                            t.blockStatement([
                                                t.returnStatement(path.node),
                                            ]),
                                            t.catchClause(
                                                t.identifier("e"),
                                                t.blockStatement([
                                                    t.returnStatement(
                                                        t.nullLiteral()
                                                    ),
                                                ])
                                            )
                                        ),
                                    ])
                                ),
                                []
                            )
                        );
                    }
                }
            },
        },
    };
};
