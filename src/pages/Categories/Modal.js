import React from 'react';
import { CompactPicker   } from 'react-color'
import Modal from 'react-modal';

export const ModalCategory = ({ modalIsOpen, controlModal, handleChange, onSubmitCategory, data }) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={controlModal}
    style={customStyles}
    contentLabel="Modal Category"
    ariaHideApp={false}
  >
    <div className="modal" id="new-category">
      <form className="modal-content">
        <input 
          type="text" 
          name="titleCategory" 
          placeholder="Título da categoria" 
          value={ data ? data.title : null }
          onChange={ handleChange }
        />

        <div className="content-container">
          <textarea 
            name="contentCategory" 
            className="mde" 
            placeholder="Conteúdo dessa categoria" 
            value={ data ? data.content : null }
            onChange={ handleChange } 
          >
          </textarea>
        </div>

        <button onClick={onSubmitCategory}>SALVAR CATEGORIA</button>
        {/* eslint-disable-next-line */}
        <a onClick={(e) => controlModal(e)}>CANCELAR</a>
      </form>
    </div>
  </Modal>
);

export const ModalCategorySub = ({ pickerVisible, modalIsOpenSub, controlModalSub, categories, handleChange, onSubmitSubCategory, onTogglePicker, handleColorChange, ColorChange }) => (
  <Modal
    isOpen={modalIsOpenSub}
    onRequestClose={controlModalSub}
    style={customStyles}
    contentLabel="Modal Category"
    ariaHideApp={false}
  >
    <div className="modal" id="new-category">
      <form className="modal-content">
        <input type="text" name="titleSubCategory" placeholder="Título da Sub-categoria" onChange={ handleChange }/>

        <select name="categorySubCategory" onChange={ handleChange }>
          <option>Selecione um categoria</option>
          {categories
          ? categories.map((category, index )=> {
            return <option key={index} value={ category._id }>{ category.title }</option>;
          })
          : <option></option>}
        </select>

        <div className="content-container">
          <textarea name="contentSubCategory" className="mde" placeholder="Conteúdo dessa categoria" onChange={ handleChange } ></textarea>
        </div>
        {/* eslint-disable-next-line */}
        <a style={{ background: ColorChange || null }} onClick={ onTogglePicker }>
          Escolha uma cor
        </a>

        { pickerVisible && (
          <div style={{ position: 'absolute', bottom: '73px' }}>
            <CompactPicker
              color="#333"
              onChangeComplete={ handleColorChange }
            />
          </div>
        ) }

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