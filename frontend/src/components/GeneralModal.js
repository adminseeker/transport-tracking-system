import React from "react";
import Modal from "react-modal";

const GeneralModal = (props) => {
    return (
        <Modal 
           isOpen={props.showModal}
           contentLabel="Loading"
           closeTimeoutMS={200}
           ariaHideApp={false}
           className={props.modal}
        >
          <div>
            <img className="loader__image" src={"/images/"+props.loader_image} alt={"loader/"+props.loader_image}/>
          </div>
          <h3 className={props.modal__title}>{props.text}</h3>
          <div></div>
        </Modal>
    );
}

export default GeneralModal;
