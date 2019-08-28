import React from "react";
import Modal from "react-responsive-modal";
import Store from "store";
import Auth from "Routes/Auth";

export default props => {
  return (
    <Store.Consumer>
      {store => (
        <Modal
          open={store.modal}
          onClose={store.offModal}
          center
          focusTrapped={false}
        >
          <Auth {...store} {...props} />
        </Modal>
      )}
    </Store.Consumer>
  );
};
