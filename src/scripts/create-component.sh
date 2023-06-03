#!/bin/bash

# USAGE:
#
# ./create-component.sh component-name

COMPONENT_NAME=$1

DIRECTORY_PATH="./src/packages/$COMPONENT_NAME"

if [ -d "$DIRECTORY_PATH" ]; then
  echo "[ *** ] component '$COMPONENT_NAME' exists."
  exit 0
fi

CAPITALIZED_COMPONENT_NAME="${COMPONENT_NAME^}"

mkdir -p $DIRECTORY_PATH/src

cp LICENSE $DIRECTORY_PATH

cd $DIRECTORY_PATH

SRC="src"

mkdir tests

CYPRESS="tests/$CAPITALIZED_COMPONENT_NAME.spec.tsx"
STORY="$CAPITALIZED_COMPONENT_NAME.stories.mdx"
COMPONENT="$CAPITALIZED_COMPONENT_NAME"
STYLED_COMPONENT="Styled$CAPITALIZED_COMPONENT_NAME"
INDEX="index.ts"
TYPES="types.ts"
STYLES="style.module.scss"
STYLE_TYPES="style.module.d.ts"
TSCONFIG="tsconfig.json"
PACKAGE_JSON="package.json"

touch $SRC/$STYLES

echo "import { mount } from \"@cypress/react18\";
import $CAPITALIZED_COMPONENT_NAME from \"../$SRC/$CAPITALIZED_COMPONENT_NAME\";

describe(\"$CAPITALIZED_COMPONENT_NAME\", () => {
  it(\"renders\", () => {
    mount(<$CAPITALIZED_COMPONENT_NAME />);
  });
});" > $CYPRESS

echo "import Props from \"./types\";
import styles from \"./style.module.scss\";
import $STYLED_COMPONENT from \"./$STYLED_COMPONENT\";

const $CAPITALIZED_COMPONENT_NAME = ({
  children,
  size,
  gridPosition,
  className,
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <$STYLED_COMPONENT
      className={className}
      {...styledProps}
    >
      {children}
    </$STYLED_COMPONENT>
  );
};

$CAPITALIZED_COMPONENT_NAME.defaultProps = {
  size: \"small\",
};

export default $CAPITALIZED_COMPONENT_NAME;" > $SRC/$COMPONENT.tsx

echo "import { BaseProps, Size } from \"../../../utils\";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
};

export default Props;" > $SRC/$TYPES

echo "import styled, { css } from \"styled-components\";

import { GridPos } from \"../../../utils\";

const $STYLED_COMPONENT = styled.div\`
  \${({ rowPos, colPos }: GridPos) => css\`
    grid-row: \${rowPos};
    grid-column: \${colPos};
  \`}
\`;

export default $STYLED_COMPONENT;" > $SRC/$STYLED_COMPONENT.tsx

echo "export { default } from \"./$CAPITALIZED_COMPONENT_NAME\";" > $SRC/$INDEX
echo "export { default } from \"./$SRC\";" > $INDEX

echo "import { Meta, Story } from \"@storybook/addon-docs\";

import $CAPITALIZED_COMPONENT_NAME from \"./$CAPITALIZED_COMPONENT_NAME\";

<Meta title=\"$CAPITALIZED_COMPONENT_NAME\" component={$CAPITALIZED_COMPONENT_NAME} />

export const Template = (args) => <$CAPITALIZED_COMPONENT_NAME {...args} />;

# $CAPITALIZED_COMPONENT_NAME

<Story name=\"Default\" args={{}}>
  {Template.bind({})}
</Story>" > $SRC/$STORY

echo "declare module \"*.scss\"" > $SRC/$STYLE_TYPES

echo "{
  \"extends\": \"@allaround/configs-tsconfig/dist/tsconfig.build.json\",
  \"compilerOptions\": {
    \"outDir\": \"dist\"
  },
  \"include\": [\"src\"]
}" > $TSCONFIG

echo "{
  \"name\": \"@allaround/$COMPONENT_NAME\",
  \"version\": \"1.0.0\",
  \"description\": \"AllAround React $CAPITALIZED_COMPONENT_NAME component\",
  \"author\": \"Wholesome Ghoul <wholesome.ghoul@gmail.com>\",
  \"publishConfig\": {
    \"access\": \"public\"
  },
  \"main\": \"dist/index.js\",
  \"files\": [
    \"dist/**/*\"
  ],
  \"scripts\": {
    \"build\": \"../../scripts/build.sh\"
  },
  \"peerDependencies\": {
    \"react\": \"^18.0.0\"
  },
  \"devDependencies\": {
    \"@allaround/configs-tsconfig\": \"^1.0.0\",
    \"@cypress/react18\": \"^2.0.0\",
    \"cypress\": \"^12.13.0\"
  }
}" > $PACKAGE_JSON

ALL_COMPONENTS=../all
cd $ALL_COMPONENTS
ALL_COMPONENTS_INDEX=./src/index.ts
jq ".dependencies += { \"@allaround/$COMPONENT_NAME\": \"^1.0.0\" }" package.json > package.json.tmp && mv package.json.tmp package.json
echo "export { default as $CAPITALIZED_COMPONENT_NAME } from \"@allaround/$COMPONENT_NAME\";" >> $ALL_COMPONENTS_INDEX
