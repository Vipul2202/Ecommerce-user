export default {
  meta: {
    type: "problem",
    docs: {
      description: "Require try/catch in async functions",
    },
  },
  create(context) {
    function checkAsyncFunction(node) {
      if (
        node.async &&
        node.body.type === "BlockStatement" &&
        !node.body.body.some(n => n.type === "TryStatement")
      ) {
        context.report({
          node,
          message: `Async function '${node.id?.name || "<anonymous>"}' should have a try/catch block.`,
        });
      }
    }

    return {
      FunctionDeclaration: checkAsyncFunction,
      FunctionExpression: checkAsyncFunction,
      ArrowFunctionExpression(node) {
        if (
          node.async &&
          node.body.type === "BlockStatement" &&
          !node.body.body.some(n => n.type === "TryStatement")
        ) {
          context.report({
            node,
            message: "Async arrow function should have a try/catch block.",
          });
        }
      },
    };
  },
};
