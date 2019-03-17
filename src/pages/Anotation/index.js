import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import { ModalAnotation } from '../Posts/Modal';
import { Container, Header, Title, Content, Wrapper, Box, Anotation } from './styles';

import API from '../../services/api';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      _id: null,
      post: {},
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
          post,
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

  setContent = (contentPost) => {
    this.setState({ contentPost });
  }

  render() {
    const { modalIsOpen, post, subcategory } = this.state;
    
    return (
      <Container>
        <Header>
          <Title color={subcategory.color}>
            <span>{subcategory.sigla}</span>
            <i style={{ marginRight: '10px' }} class="fas fa-chevron-right"></i>
            {subcategory.title}
          </Title>
          <Content>
            <button onClick={this.controlModal}><i class="fas fa-pencil-alt"></i>Editar</button>
            <a href={`/#/anotations/${subcategory._id}`}><i class="fas fa-chevron-left"></i>Voltar</a>
          </Content>
        </Header>

        <Wrapper>
          <Box>
            <Title>
              <i style={{ marginRight: '10px' }} class="fas fa-pen-square"></i>
              {post.title}
            </Title>
            <Anotation>
              <ReactMarkdown source={post.content} />                      
            </Anotation>
          </Box>
        </Wrapper>

        <ModalAnotation
          modalIsOpen={modalIsOpen}
          controlModal={ this.controlModal }
          handleChange={ this.handleChange }
          setContent={this.setContent}
          onSubmit={this.onSubmit} 
          post={post}
        />
      </Container>
    );
  }
}

export default Posts;
