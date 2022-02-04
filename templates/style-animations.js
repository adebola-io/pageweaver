module.exports = `\`/* This file contains all animation keyframes for the \${mainParam} page. */

/* For Generic animations */
@keyframes animation_1 {
    from {
        \${
          !args.jsFramework
            ? \`transform: translateY(10%);
        opacity: 0;\`
            : ""
        }
    }
    to {

    }
}

/* Specific animations */
@keyframes animation_2 {
    0% {

    }
    100% {

    }
}
\``;
