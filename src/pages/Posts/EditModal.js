import React, { Component } from 'react';
import { CompactPicker   } from 'react-color'
import Modal from 'react-modal';

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { 
      pickerVisible, 
      modalIsOpenSub, 
      controlModalSub, 
      categories, 
      handleChange, 
      onSubmitSubCategory, 
      onTogglePicker, 
      handleColorChange, 
      ColorChange,
      data
    } = this.props;
    
    return (
      <Modal
        isOpen={modalIsOpenSub}
        onRequestClose={controlModalSub}
        style={customStyles}
        contentLabel="Modal Category"
        ariaHideApp={false}
      >
        <div className="modal" id="new-category">
          <form className="modal-content">
            <input 
            type="text" 
            name="title" 
            placeholder="Título da Sub-categoria" 
            onChange={ handleChange }
            value={ data.title ? data.title : null }
          />

            <select name="category" onChange={ handleChange }>
              {categories
              ? categories.map((category, index )=> {
                if (category._id === data._id) {
                  return <option key={index} value={ category._id }>{ category.title }</option>;
                }
                return <option key={index} value={ category._id }>{ category.title }</option>;
              })
              : <option></option>}
            </select>

            <div className="content-container">
              <textarea 
                name="content" 
                className="mde" 
                placeholder="Conteúdo dessa categoria" 
                onChange={ handleChange } 
                value={ data.content ? data.content : null }
              >
              </textarea>
            </div>
            {/* eslint-disable-next-line */}
            <a style={{ background: ColorChange }} onClick={ onTogglePicker }>
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
  }
}

export default EditModal;

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