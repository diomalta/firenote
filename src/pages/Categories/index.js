import React, { Component } from "react";
import { ModalCategory, ModalCategorySub } from "./Modal";

import {
  Container,
  Header,
  Title,
  Content,
  Wrapper,
  Category,
  Box
} from "./styles";
import { Success, Danger } from "../../components/Flash";
import Loading from "../../components/Loading";

import API from "../../services/api";

export class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalIsOpenSub: false,

      name: null,
      email: null,
      categories: [],

      idCategory: null,
      titleCategory: null,
      contentCategory: null,

      categorySubCategory: null,
      titleSubCategory: null,
      contentSubCategory: null,
      colorSubCategory: null,

      editCategory: null,
      pickerVisible: false,
      pageLoading: true
    };
  }

  async componentDidMount() {
    await this.onGetCategories();
    this.setState({
      name: localStorage.getItem("@name"),
      email: localStorage.getItem("@email"),
      pageLoading: false
    });
  }

  controlModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  };

  controlModalSub = () => {
    this.setState(prevState => ({ modalIsOpenSub: !prevState.modalIsOpenSub }));
  };

  onGetCategories = async () => {
    const _id = localStorage.getItem("@id");

    const response = await API.get(`/user/show/${_id}`);
    const { categories } = response.data;

    if (categories) {
      await this.setState({ categories });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleColorChange = ({ hex }) => this.setState({ colorSubCategory: hex });
  onTogglePicker = () =>
    this.setState({ pickerVisible: !this.state.pickerVisible });

  onSubmitCategory = async e => {
    e.preventDefault();
    const { titleCategory, contentCategory, email, idCategory } = this.state;

    let response;
    if (!idCategory) {
      response = await API.post("/category/store", {
        email,
        title: titleCategory,
        content: contentCategory
      });

      if (!response.data.category) {
        return Danger("Não foi possivel adcionar a nova categoria...");
      }

      Success("Categoria cadastrada...");
      this.setState({
        categories: [...this.state.categories, response.data.category]
      });
    } else {
      response = await API.put("/category/update", {
        _id: idCategory,
        title: titleCategory,
        content: contentCategory,
        email
      });

      if (!response.data.categories) {
        return Danger("Não foi possivel atualizar a categoria...");
      }
      Success("Categoria atualizada...");
      this.setState({ categories: response.data.categories });
    }

    this.controlModal();
  };

  onSubmitSubCategory = async e => {
    e.preventDefault();

    const {
      titleSubCategory,
      contentSubCategory,
      categorySubCategory,
      email,
      categories,
      colorSubCategory
    } = this.state;

    const response = await API.post("/subcategory/store", {
      email,
      title: titleSubCategory,
      content: contentSubCategory,
      sigla: titleSubCategory.charAt(0),
      categoryId: categorySubCategory,
      color: colorSubCategory
    });

    const { subCategory } = response.data;

    if (!subCategory) {
      return Danger("Não foi possivel adcionar a nova categoria...");
    }

    Success("Subcategoria cadastrada...");
    categories.map(category => {
      if (category._id === subCategory.categoryId) {
        if (!category.subCategories) {
          return (category.subCategories = [{ ...subCategory }]);
        }
        return category.subCategories.push({ ...subCategory });
      }
      return category;
    });

    this.setState({ categories });
    this.controlModalSub();
  };

  handleEdit = (event, category) => {
    event.preventDefault();
    this.setState({
      idCategory: category._id,
      titleCategory: category.title,
      contentCategory: category.content
    });
    this.controlModal();
  };

  render() {
    const {
      modalIsOpen,
      modalIsOpenSub,
      name,
      categories,
      titleCategory,
      contentCategory,
      pickerVisible,
      colorSubCategory,
      pageLoading
    } = this.state;

    // TODO: Precisa de um refatoramento urgente, component muito grande
    return (
      <>
        {pageLoading ? (
          <Loading />
        ) : (
          <Container>
            <Header>
              <Title>
                Bem vindo, <span>{name} :D</span>
              </Title>
              <Content>
                <button onClick={this.controlModal}>
                  <i className="fas fa-address-book" />
                  Categoria
                </button>
                <button onClick={this.controlModalSub}>
                  <i className="far fa-address-book" />
                  SubCategoria
                </button>
              </Content>
            </Header>
            {categories.length > 0 ? (
              categories.map((category, id) => {
                return (
                  <Wrapper key={id}>
                    <Category>
                      <h3>
                        {category.title}
                        <i
                          onClick={e => this.handleEdit(e, category)}
                          className="fas fa-edit"
                        />
                        {/* <i className="fas fa-times-circle"></i> */}
                        <small>{category.content}</small>
                      </h3>
                    </Category>
                    {category.subCategories ? (
                      category.subCategories.map((sub, id) => {
                        return (
                          <Box key={id} color={sub.color}>
                            <div>
                              <span>
                                <h1>{sub.sigla}</h1>
                              </span>
                              <a href={`/anotations/${sub._id}`}>{sub.title}</a>
                            </div>
                            <h2>Informação indisponivel</h2>
                          </Box>
                        );
                      })
                    ) : (
                      <small>
                        Nenhuma subcategoria foi criada até o momento...
                      </small>
                    )}
                  </Wrapper>
                );
              })
            ) : (
              <Wrapper>
                <h2>Nenhuma categoria criada até o momento...</h2>
              </Wrapper>
            )}
            {ModalCategory({
              modalIsOpen,
              controlModal: this.controlModal,
              handleChange: this.handleChange,
              onSubmitCategory: this.onSubmitCategory,
              data: {
                title: titleCategory,
                content: contentCategory
              }
            })}

            {ModalCategorySub({
              modalIsOpenSub,
              controlModalSub: this.controlModalSub,
              handleChange: this.handleChange,
              categories,
              onSubmitSubCategory: this.onSubmitSubCategory,
              onTogglePicker: this.onTogglePicker,
              handleColorChange: this.handleColorChange,
              pickerVisible,
              ColorChange: colorSubCategory
            })}
          </Container>
        )}
      </>
    );
  }
}

export default Categories;
