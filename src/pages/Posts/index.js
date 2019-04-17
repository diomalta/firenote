import React, { Component } from "react";

import { ModalAnotation } from "./Modal";
import EditModal from "./EditModal";
import { Container, Header, Title, Content, Wrapper, Box } from "./styles";
import { Success, Danger } from "../../components/Flash";
import Loading from "../../components/Loading";

import API from "../../services/api";

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      subcategory: null,
      posts: [],
      _id: "",

      pickerVisible: null,
      category: null,
      title: "",
      titlePost: "",
      content: "",
      color: "",
      modalIsOpenSub: false,

      categories: null,
      editCategory: null,
      pageLoading: true
    };
  }

  async componentDidMount() {
    const _id = this.getParams(2);
    await this.getPosts(_id);
    this.setState({
      _id,
      pageLoading: false
    });
  }

  getPosts = async _id => {
    const userId = localStorage.getItem("@id");
    const response = await API.get(`/subcategory/${_id}`);

    const responseUser = await API.get(`/user/show/${userId}`);
    const { subCategory } = response.data;

    this.setState({
      idCategory: subCategory._id,
      title: subCategory.title,
      color: subCategory.color,
      sigla: subCategory.sigla,
      content: subCategory.content,
      posts: subCategory.anotations,
      subcategory: subCategory,
      categories: responseUser.data.categories
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { titlePost, content, _id, posts } = this.state;

    const response = await API.post("/anotation/store", {
      _id,
      title: titlePost,
      content: content
    });

    if (!response.data.anotation) {
      return Danger("Anotação não foi cadastrada...");
    }

    Success("Anotação adcionada com sucesso...");
    if (posts) {
      this.setState({
        posts: [...this.state.posts, response.data.anotation]
      });
    } else {
      this.setState({
        posts: [response.data.anotation]
      });
    }

    this.controlModal();
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

  controlModalSub = () => {
    this.setState(prevState => ({ modalIsOpenSub: !prevState.modalIsOpenSub }));
  };

  handleColorChange = ({ hex }) => this.setState({ color: hex });
  onTogglePicker = () =>
    this.setState({ pickerVisible: !this.state.pickerVisible });

  onSubmitCategory = async e => {
    e.preventDefault();
    const { title, content, color, idCategory } = this.state;

    const response = await API.post("/subcategory/update", {
      _id: idCategory,
      title: title,
      content: content,
      color: color
    });

    if (!response.data.subCategory) {
      return Danger("Subcategoria não foi atualizada...");
    }

    Success("Subcategoria foi atualizada...");
    this.controlModalSub();
  };

  handleEdit = event => {
    event.preventDefault();
    this.controlModalSub();
  };

  render() {
    const {
      sigla,
      title,
      modalIsOpen,
      posts,
      color,
      subcategory,
      modalIsOpenSub,
      categories,
      content,
      pickerVisible,
      _id,
      pageLoading
    } = this.state;

    return (
      <>
        {pageLoading ? (
          <Loading />
        ) : (
          <Container>
            <Header>
              <Title color={color}>
                <span>{sigla}</span>
                {title}
                <i onClick={this.handleEdit} className="fas fa-edit" />
              </Title>
              <Content>
                <button onClick={this.controlModal}>
                  <i className="fas fa-plus-circle" />
                  Criar anotação
                </button>
                <a href="/categories">
                  <i className="fas fa-chevron-left" />
                  Voltar
                </a>
              </Content>
            </Header>

            <Wrapper>
              {posts ? (
                posts.map((anotation, idx) => {
                  return (
                    <Box key={idx}>
                      <div>
                        <span>
                          <h1>
                            <i className="fas fa-book" />
                          </h1>
                        </span>
                        <div>
                          <a
                            href={`/subcategories/${
                              subcategory._id
                            }/anotation/${anotation._id}`}
                          >
                            {anotation.title}
                          </a>
                          {/* <small>Por Diego Malta - há um dia</small> */}
                        </div>
                      </div>
                    </Box>
                  );
                })
              ) : (
                <h2>Sem anotações no momento...</h2>
              )}
            </Wrapper>

            <ModalAnotation
              modalIsOpen={modalIsOpen}
              controlModal={this.controlModal}
              handleChange={this.handleChange}
              setContent={this.setContent}
              onSubmit={this.onSubmit}
            />

            <EditModal
              modalIsOpenSub={modalIsOpenSub}
              controlModalSub={this.controlModalSub}
              handleChange={this.handleChange}
              categories={categories}
              onSubmitSubCategory={this.onSubmitCategory}
              onTogglePicker={this.onTogglePicker}
              handleColorChange={this.handleColorChange}
              pickerVisible={pickerVisible}
              ColorChange={color}
              data={{ _id, title, content, color }}
            />
          </Container>
        )}
      </>
    );
  }
}
