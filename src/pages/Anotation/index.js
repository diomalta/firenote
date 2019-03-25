import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import { ModalAnotation } from '../Posts/Modal';
import { Container, Header, Title, Content, Wrapper, Box, Anotation, Line } from './styles';

import API from '../../services/api';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      _id: null,
      content: null,
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
    })
  }

  getParams = (number) => {
    return this.props.location.pathname.split('/')[number];
  }

  controlModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value
    })
  }

  setContent = (content) => {
    this.setState({ content });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { titlePost, content } = this.state;
    
    const _id = this.getParams(2);
    const idAnotation = this.getParams(4);
    
    await API.put('/anotation/update', {
      title: titlePost, 
      content,
      idAnotation,
      _id
    });
    
    this.controlModal();
  };

  getParams = (number) => {
    return this.props.location.pathname.split('/')[number];
  }

  render() {
    const { modalIsOpen, titlePost, content, subcategory } = this.state;
    
    return (
      <Container>
        <Header>
          <Title color={subcategory.color}>
            <span>{subcategory.sigla}</span>
            <i style={{ marginRight: '10px', color: 'rgb(139, 131, 152)' }} className="fas fa-chevron-right"></i>
            {subcategory.title}
          </Title>
          <Content>
            <button onClick={this.controlModal}><i className="fas fa-pencil-alt"></i>Editar</button>
            <a href={`/#/anotations/${subcategory._id}`}><i className="fas fa-chevron-left"></i>Voltar</a>
          </Content>
        </Header>

        <Wrapper>
          <Box>
            <Title>
              <i style={{ marginRight: '10px', color: 'rgb(139, 131, 152)', fontSize: '14px' }} class="fas fa-paste"></i>
              {titlePost}
            </Title>
            <Line />
            <Anotation>
              <ReactMarkdown source={content} />                      
            </Anotation>
          </Box>
        </Wrapper>

        <ModalAnotation
          modalIsOpen={modalIsOpen}
          controlModal={ this.controlModal }
          handleChange={ this.handleChange }
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
