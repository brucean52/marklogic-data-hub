const { override, fixBabelImports, addLessLoader } = require('customize-cra');
//import themeVariables from './src/theme-variables.json'
const themeVariables = require('./theme-variables.json');

module.exports = override(
  fixBabelImports('import', [
    {
    libraryName: 'antd',
    libraryDirectory: 'es',
     style: true,
  },
  {
    libraryName: '@marklogic/design-system',
    libraryDirectory: 'src',
  },
]),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: themeVariables
 }),
);
// Refer to theme vars below
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less