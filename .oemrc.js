const packageJson = ({ name }) => `{
  "name": "@oem/${name}",
  "version": "1.0.0",
  "description": "Automagic 🦄 Project Scaffolding with Code Generation - ${name}",
  "main": "dist/index",
  "types": "dist/index",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "npm run clean && npm run compile",
    "clean": "rm -rf ./dist",
    "compile": "tsc -p tsconfig.build.json"
  },
  "devDependencies": {
    "typescript": "3.7.2"
  },
  "dependencies": {},
  "author": "Daniel Emod Kovacs <kovacsemod@gmail.com>",
  "license": "MIT"
}
`;

const tsConfigBuild = () => `{
  "extends": "../../tsconfig.build.json",

  "compilerOptions": {
    "outDir": "./dist"
  },

  "include": ["src/**/*"]
}
`;

const tsConfig = () => `{
  "extends": "../../tsconfig.json"
}
`;

const package = ({ name }) => ({
  packages: {
    [name]: {
      src: {
        "index.ts": () => ``
      },
      "package.json": packageJson,
      "tsconfig.build.json": tsConfigBuild,
      "tsconfig.json": tsConfig
    }
  }
});

package.args = {
  name: "name of the package"
};

module.exports = {
  package
};