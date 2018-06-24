import React from 'react';
import ReactDOM from 'react-dom';
const ReactMarkdown = require('react-markdown')

const input = '\n' +
  '# Live demo\n' +
  '\n' +
  'Changes are automatically rendered as you type.\n' +
  '\n' +
  '* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n' +
  '* Renders actual, "native" React DOM elements\n' +
  '* Allows you to escape or skip HTML (try toggling the checkboxes above)\n' +
  '* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n' +
  '\n' +
  '## HTML block below\n' +
  '\n' +
  '<blockquote>\n' +
  '  This blockquote will change based on the HTML settings above.\n' +
  '</blockquote>\n' +
  '\n' +
  '## How about some code?\n' +
  '```js\n' +
  'var React = require(\'react\');\n' +
  'var Markdown = require(\'react-markdown\');\n' +
  '\n' +
  'React.render(\n' +
  '  <Markdown source="# Your markdown here" />,\n' +
  '  document.getElementById(\'content\')\n' +
  ');\n' +
  '```'
class Test extends React.Component {
    render() {
        return (
            <div>
                <ReactMarkdown source={input} />,
            </div>
        );
    }
}
export default Test;