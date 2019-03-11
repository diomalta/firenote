import React, { Component } from 'react';

import { ModalAnotation } from './Modal';
import { Container, Header, Title, Content, Wrapper, Box } from './styles';

import API from '../../services/api';

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      mdeValue: null,
      subcategory: null,
      posts: null,
      _id: null
    };
  }

  componentDidMount() {
    const _id = this.getParams(2);
    this.getPosts(_id);
    this.setState({ _id });
  }

  getPosts = async (_id) => {
    const response = await API.get(`/subcategory/${ _id }`);
    const { subCategory } = response.data;
    
    this.setState({ 
      title: subCategory.title, 
      color: subCategory.color, 
      sigla: subCategory.sigla, 
      posts: subCategory.anotations,
      subcategory: subCategory
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { titlePost, contentPost, _id } = this.state;
    
    const response = await API.post('/anotation/store', {
      _id,
      title: titlePost, 
      content: contentPost,
    });
    
    this.setState({ 
      posts: [ ...this.state.posts, response.data.anotation ]
    });
    this.controlModal();
  };

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
    const { sigla, title, modalIsOpen, posts, color, subcategory } = this.state;

    return (
      <Container>
        <Header>
          <Title color={ color }>
            <span>{ sigla }</span>
            { title }
          </Title>
          <Content>
            <button onClick={this.controlModal}><i class="fas fa-plus-circle"></i>Criar anotação</button>
            <a href="/#/categories"><i class="fas fa-chevron-left"></i>Voltar</a>
          </Content>
        </Header>

        <Wrapper>
          {
            posts
            ? posts.map(anotation => {
              return (
                <Box>
                  <div>
                    <span>
                      <h1><i class="fas fa-book"></i></h1>
                    </span>
                    <div>
                      <a href={`/#/subcategories/${subcategory._id}/anotation/${anotation._id}`}>{anotation.title}</a>
                      <small>Por Diego Malta - há um dia</small>
                    </div>
                  </div>
                </Box>
              )
          })
          : <h2>Sem anotações no momento...</h2>}
        </Wrapper>
        
        <ModalAnotation
          modalIsOpen={modalIsOpen}
          controlModal={ this.controlModal }
          handleChange={ this.handleChange }
          setContent={this.setContent}
          onSubmit={this.onSubmit} 
        />
      </Container>
    );
  }
}

