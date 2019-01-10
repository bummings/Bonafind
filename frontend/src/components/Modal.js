import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const BackdropStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(4, 0, 0, 0.7);
  .modal{
    width: 30%;
    height: 150px;
    border: 1px solid grey;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    background-color: white;
  }
`;

class Modal extends Component {
  constructor() {
    super();
  }

  render () {
    if(!this.props.show) {
      return null;
    }

    return (
      <BackdropStyle>
        <div className="modal">
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </BackdropStyle>
        
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;