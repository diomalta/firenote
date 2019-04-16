import React, { Component } from "react";
import { ModalAnotation } from "../Posts/Modal";
import {
  Container,
  Header,
  Title,
  Content,
  Wrapper,
  Box,
  Anotation,
  Line
} from "./styles";
import { Success, Danger } from "../../components/Flash";

import API from "../../services/api";

const ReactMarkdown = require("react-markdown");
const hljs = require("highlight.js");
const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${
        hljs.highlight(lang, str.trim(), true).value
      }</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(
      str.trim()
    )}</code></pre>`;
  }
});

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      _id: null,
      content: "",
      titlePost: null,
      subcategory: []
    };
  }

  componentDidMount() {
    const _id = this.getParams(2);
    const postId = this.getParams(4);
    this.onGetAnotation(_id, postId);
    this.setState({ _id });
  }

  onGetAnotation = async (_id, postId) => {
    const response = await API.get(`/subcategory/${_id}/anotation/${postId}`);
    response.data.post.map(post => {
      if (post) {
        this.setState({
          titlePost: post.title,
          content: post.content,
          subcategory: response.data.subcategory
        });
      }
      return true;
    });
  };

  getParams = number => {
    return this.props.location.pathname.split("/")[number];
  };

  controlModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  setContent = content => {
    this.setState({ content });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { titlePost, content } = this.state;

    const _id = this.getParams(2);
    const idAnotation = this.getParams(4);

    const response = await API.put("/anotation/update", {
      title: titlePost,
      content,
      idAnotation,
      _id
    });

    if (!response.data.subCategory) {
      return Danger("Anotação não foi atualizada...");
    }

    Success("Anotação atualizada...");
    this.controlModal();
  };

  getParams = number => {
    return this.props.location.pathname.split("/")[number];
  };

  render() {
    const { modalIsOpen, titlePost, content, subcategory } = this.state;

    return (
      <Container>
        <Header>
          <Title color={subcategory.color}>
            <span>{subcategory.sigla}</span>
            <i
              style={{ marginRight: "10px", color: "rgb(139, 131, 152)" }}
              className="fas fa-chevron-right"
            />
            {subcategory.title}
          </Title>
          <Content>
            <button onClick={this.controlModal}>
              <i className="fas fa-pencil-alt" />
              Editar
            </button>
            <a href={`/anotations/${subcategory._id}`}>
              <i className="fas fa-chevron-left" />
              Voltar
            </a>
          </Content>
        </Header>

        <Wrapper>
          <Box>
            <Title>
              <i
                style={{
                  marginRight: "10px",
                  color: "rgb(139, 131, 152)",
                  fontSize: "14px"
                }}
                class="fas fa-paste"
              />
              {titlePost}
            </Title>
            <Line />
            <Anotation>
              <ReactMarkdown
                source={md.render(content)}
                escapeHtml={false}
                rawSourcePos={true}
              />
            </Anotation>
          </Box>
        </Wrapper>

        <ModalAnotation
          modalIsOpen={modalIsOpen}
          controlModal={this.controlModal}
          handleChange={this.handleChange}
          setContent={this.setContent}
          onSubmit={this.onSubmit}
          post={{
            title: titlePost,
            content
          }}
        />
      </Container>
    );
  }
}

export default Posts;
