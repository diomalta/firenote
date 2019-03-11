import React from 'react';
import Modal from 'react-modal';

import ReactMde from 'react-mde';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export class ModalAnotation extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: "",
      tab: "write"
    };

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleTabChange = tab => {
    this.setState({ tab });
  };

  handleValueChange = async (value) => {
    const { setContent } = this.props;
    await setContent(value);
    this.setState({ value });
  };

  render () {
    const {  modalIsOpen, controlModal, handleChange, onSubmit, post } = this.props;
    
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={controlModal}
        style={customStyles}
        contentLabel="Modal Anotation"
      >
        <div class="modal" id="new-Anotation">
          <form class="modal-content">
            <input type="text" name="titlePost" placeholder="Título da anotação" onChange={handleChange} value={post.title}/>

            <ReactMde
              onChange={this.handleValueChange}
              onTabChange={this.handleTabChange}
              value={post.content}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
              selectedTab={this.state.tab}
            />

            <button onClick={onSubmit}>SALVAR ANOTAÇÃO</button>
            {/* eslint-disable-next-line */}
            <a onClick={(e) => controlModal(e)}>CANCELAR</a>
          </form>
        </div>
      </Modal>
    );
  }
}

export default ModalAnotation;


const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
    width: '800px',
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