const path = require("path");

const template = (
  { imports, interfaces, componentName, jsx, exports },
  { tpl }
) => {
  return tpl`
${imports};

${interfaces};

import { isIconSize, iconSize, IconSize } from "../../../utils";

type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string;
};

const ${componentName} = (props: Props) => (
  ${jsx}
);

${componentName}.defaultProps = {
  size: "small"
}

${exports};
`;
};

function indexTemplate(filePaths) {
  return filePaths
    .map((filePath) =>
      path.basename(filePath.path, path.extname(filePath.path))
    )
    .map((basename) => {
      const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
      return `export { default as ${exportName}Icon } from './${basename}'`;
    })
    .join("\n");
}

module.exports = {
  template,
  indexTemplate,
  typescript: true,
  filenameCase: "pascal",
  jsxRuntime: "automatic",
  icon: "1rem",
  ignoreExisting: true,
  jsx: {
    babelConfig: {
      plugins: [
        [
          "@svgr/babel-plugin-remove-jsx-attribute",
          {
            elements: ["svg", "path"],
            attributes: ["viewBox", "style"],
          },
        ],
        [
          "@svgr/babel-plugin-add-jsx-attribute",
          {
            elements: ["svg"],
            attributes: [
              {
                name: "fill",
                value: "'currentColor'",
                spread: false,
                literal: true,
                position: "end",
              },
              {
                name: "viewBox",
                value: "'0 0 512 512'",
                spread: false,
                literal: true,
                position: "end",
              },
            ],
          },
        ],
        [
          "@svgr/babel-plugin-replace-jsx-attribute-value",
          {
            values: [
              {
                value: "1rem",
                newValue:
                  "isIconSize(props.size) ? iconSize[props.size] : props.size",
                literal: true,
              },
            ],
          },
        ],
      ],
    },
  },
};
