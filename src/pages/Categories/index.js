import React, { Component } from 'react';
import { ModalCategory, ModalCategorySub } from './Modal';

import { Container, Header, Title, Content, Wrapper, Category, Box } from './styles';

import API from '../../services/api';

export class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalIsOpenSub: false,

      name: null,
      email: null,
      categories: null,

      titleCategory: null,
      contentCategory: null,
      colorCategory: null,

      categorySubCategory: null,
      titleSubCategory: null,
      contentSubCategory: null,
    };
  }

  async componentDidMount() {
    await this.onGetCategories();
    this.setState({
      name: localStorage.getItem('@name'),
      email: localStorage.getItem('@email'),
    });
  }

  controlModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  }

  controlModalSub = () => {
    this.setState(prevState => ({ modalIsOpenSub: !prevState.modalIsOpenSub }));
  }

  onGetCategories = async () => {
    const _id = localStorage.getItem('@id');

    const response = await API.get(`/user/show/${_id}`);
    const { categories } = response.data;
    
    if (categories) {
      this.setState({ categories });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value
    })
  }

  onSubmitCategory = async (e) => {
    e.preventDefault();

    const { titleCategory, contentCategory, email, colorCategory } = this.state;

    const response = await API.post('/category/store', {
      email,
      title: titleCategory, 
      content: contentCategory,
      color: colorCategory
    });
    
    this.setState({ categories: [ ...this.state.categories, response.data.category ]});
    this.controlModal();
  };

  onSubmitSubCategory = async (e) => {
    e.preventDefault();

    const { titleSubCategory, contentSubCategory, categorySubCategory, email, categories } = this.state;

    const response = await API.post('/subcategory/store', {
      email,
      title: titleSubCategory, 
      content: contentSubCategory,
      sigla: titleSubCategory.charAt(0),
      categoryId: categorySubCategory
    });

    const { subCategory } = response.data;
    categories.map(category => {
      if (category._id === subCategory.categoryId) {

        if (!category.subCategories) {
          return category.subCategories = [{ ...subCategory }];
        }      
        return category.subCategories.push({ ...subCategory });
      }
      return category;
    })
    
    this.setState({ categories });
    this.controlModalSub();
  };

  render () {
    const { modalIsOpen, modalIsOpenSub, name, categories } = this.state;

    return (
      <Container>
        <Header>
          <Title>Bem vindo, <span>{ name } :D</span></Title>
          <Content>
            <button onClick={this.controlModal}><i class="fas fa-address-book"></i>Categoria</button>
            <button onClick={this.controlModalSub}><i class="far fa-address-book"></i>SubCategoria</button>
          </Content>
        </Header>
        {
          categories 
          ? categories.map(category => {
            return (
              <Wrapper>
                <Category>
                  <h3>
                    { category.title }
                    <small>
                      { category.content }                      
                    </small>
                  </h3>
                </Category>

                {
                  category.subCategories
                  ? category.subCategories.map(sub => {
                    return (
                      <Box color={ category.color }>
                        <div>
                          <span>
                            <h1>{ sub.sigla }</h1>
                          </span>
                          <a href={`/#/anotations/${sub._id}`}>{sub.title}</a>
                        </div>
                        <h2>Informação indisponivel</h2>
                      </Box>
                    )
                  })
                  : <small>Nenhuma subcategoria foi criada até o momento...</small>
                }
              </Wrapper>
            )
          })
          : 
          <Wrapper>
            <h2>Nenhuma categoria criada até o momemnto...</h2>
          </Wrapper>
        }
        {ModalCategory({
          modalIsOpen, 
          controlModal: this.controlModal,
          handleChange: this.handleChange,
          onSubmitCategory: this.onSubmitCategory
        })}

        {ModalCategorySub({
          modalIsOpenSub, 
          controlModalSub: this.controlModalSub,
          handleChange: this.handleChange,
          categories,
          onSubmitSubCategory: this.onSubmitSubCategory
        })}
      </Container>
    )
  }
};



export default Categories;