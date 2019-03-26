import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
const React = require('react');
const PropTypes = require('prop-types');

class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
    console.log('aqui')
  }

  setRef(el) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
            {this.props.value}
        </code>
      </pre>
    )
  }
}

CodeBlock.defaultProps = {
  language: ''
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}

export default CodeBlock;