const { renderToStaticMarkup } = require('react-dom/server');
const { Recycle } = require('lucide-react');
const React = require('react');
console.log(renderToStaticMarkup(React.createElement(Recycle)));
