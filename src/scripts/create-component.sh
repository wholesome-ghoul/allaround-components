#!/bin/bash

# USAGE:
#
# ./create-component.sh component
# ./create-component.sh component-name

RAW_COMPONENT_NAME=$1
COMPONENT_NAME=$(echo $RAW_COMPONENT_NAME | sed -r 's/(-)(.)/\u\2/g') # kebab-case to camelCase

DIRECTORY_PATH="./src/packages/$RAW_COMPONENT_NAME"

if [ -d "$DIRECTORY_PATH" ]; then
  echo "[ *** ] component '$RAW_COMPONENT_NAME' exists."
  exit 0
fi

CAPITALIZED_COMPONENT_NAME="${COMPONENT_NAME^}" # PascalCase

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

echo ".$COMPONENT_NAME {
  color: var(--fg-color);
  font-family: inherit;
}

.small$CAPITALIZED_COMPONENT_NAME {
  font-size: var(--font-size-small);
}

.medium$CAPITALIZED_COMPONENT_NAME {
  font-size: var(--font-size-medium);
}

.large$CAPITALIZED_COMPONENT_NAME {
  font-size: var(--font-size-large);
}

.fill {
  width: 100%;
}" > $SRC/$STYLES

echo "import { mount } from \"@cypress/react18\";

import $CAPITALIZED_COMPONENT_NAME from \"../$SRC/$CAPITALIZED_COMPONENT_NAME\";

describe(\"$CAPITALIZED_COMPONENT_NAME\", () => {
  it(\"renders\", () => {
    mount(<$CAPITALIZED_COMPONENT_NAME />);
  });
});" > $CYPRESS

echo "import cx from \"classnames\";

import Props from \"./types\";
import styles from \"./style.module.scss\";
import $STYLED_COMPONENT from \"./$STYLED_COMPONENT\";

const $CAPITALIZED_COMPONENT_NAME = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  ...rest
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <$STYLED_COMPONENT
      className={cx(
        styles.$COMPONENT_NAME,
        {
          [styles.fill]: fill,
        },
        styles[\`\${size}$CAPITALIZED_COMPONENT_NAME\`],
        className
      )}
      {...styledProps}
      {...rest}
      data-cy={dataCy}
    >
      {children}
    </$STYLED_COMPONENT>
  );
};

$CAPITALIZED_COMPONENT_NAME.defaultProps = {
  size: \"small\",
  dataCy: \"$RAW_COMPONENT_NAME-component\",
};

export default $CAPITALIZED_COMPONENT_NAME;" > $SRC/$COMPONENT.tsx

echo "import { BaseProps, Size } from \"../../../utils\";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
};

export default Props;" > $SRC/$TYPES

echo "import styled, { css } from \"styled-components\";

import Props from \"./types\";
import { applyGridPosition, stylesObjToCss } from \"../../../utils\";

type CSS = Pick<Props, \"gridPosition\" | \"styles\">;

const $STYLED_COMPONENT = styled.div\`
  \${({ gridPosition, styles }: CSS) => css\`
    \${applyGridPosition(gridPosition)};

    \${stylesObjToCss(styles)};
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
  \"name\": \"@allaround/$RAW_COMPONENT_NAME\",
  \"version\": \"1.0.0\",
  \"description\": \"AllAround React $CAPITALIZED_COMPONENT_NAME component\",
  \"author\": \"Wholesome Ghoul <wholesome.ghoul@gmail.com>\",
  \"publishConfig\": {
    \"access\": \"public\"
  },
  \"main\": \"dist/packages/$RAW_COMPONENT_NAME/src/index.js\",
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
jq ".dependencies += { \"@allaround/$RAW_COMPONENT_NAME\": \"^1.0.0\" }" package.json > package.json.tmp && mv package.json.tmp package.json
echo "export { default as $CAPITALIZED_COMPONENT_NAME } from \"@allaround/$RAW_COMPONENT_NAME\";" >> $ALL_COMPONENTS_INDEX

ROOT_DIR=../../..
cd $ROOT_DIR

RELEASE_CONFIG=release-please-config.json
jq ".packages += { \"src/packages/$RAW_COMPONENT_NAME\": { \"release-type\": \"node\" } }" $RELEASE_CONFIG > $RELEASE_CONFIG.tmp && mv $RELEASE_CONFIG.tmp $RELEASE_CONFIG

npm install
