import React from 'react';

import Modal from 'react-modal';

export const ModalCategory = ({ modalIsOpen, controlModal, handleChange, onSubmitCategory }) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={controlModal}
    style={customStyles}
    contentLabel="Modal Category"
  >
    <div class="modal" id="new-category">
      <form class="modal-content">
        <input type="text" name="titleCategory" placeholder="Título da categoria" onChange={ handleChange } />
        <input type="text" name="colorCategory" placeholder="Escolhar uma cor da categoria" onChange={ handleChange } />

        <div class="content-container">
          <textarea name="contentCategory" class="mde" placeholder="Conteúdo dessa categoria" onChange={ handleChange } ></textarea>
        </div>

        <button onClick={onSubmitCategory}>SALVAR CATEGORIA</button>
        {/* eslint-disable-next-line */}
        <a onClick={(e) => controlModal(e)}>CANCELAR</a>
      </form>
    </div>
  </Modal>
);

export const ModalCategorySub = ({ modalIsOpenSub, controlModalSub, categories, handleChange, onSubmitSubCategory }) => (
  <Modal
    isOpen={modalIsOpenSub}
    onRequestClose={controlModalSub}
    style={customStyles}
    contentLabel="Modal Category"
  >
    <div class="modal" id="new-category">
      <form class="modal-content">
        <input type="text" name="titleSubCategory" placeholder="Título da Sub-categoria" onChange={ handleChange }/>

        <select name="categorySubCategory" onChange={ handleChange }>
          <option>Selecione um categoria</option>
          {categories
          ? categories.map(category => {
            return <option value={ category._id }>{ category.title }</option>;
          })
          : <option></option>}
        </select>

        <div class="content-container">
          <textarea name="contentSubCategory" class="mde" placeholder="Conteúdo dessa categoria" onChange={ handleChange } ></textarea>
        </div>

        <button onClick={ onSubmitSubCategory }>SALVAR SUBCATEGORIA</button>
        {/* eslint-disable-next-line */}
        <a onClick={(e) => controlModalSub(e)}>CANCELAR</a>
      </form>
    </div>
  </Modal>
);

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
    width: '700px',
    padding: '20px',
    background: '#282A36',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'ease .2s',
  },

  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
};