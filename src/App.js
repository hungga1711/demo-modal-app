import { useState } from "react";
import "./App.css";
import Modal, { MODAL_ANIMATION_STYLES } from "./components/modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [lockModal, setLockModal] = useState(false);
  const [animation, setAnimation] = useState(MODAL_ANIMATION_STYLES.FADE);

  const renderModalAnimationOptions = () => {
    return Object.values(MODAL_ANIMATION_STYLES).map((animation) => (
      <option key={animation} value={animation}>
        {animation}
      </option>
    ));
  };

  return (
    <div className="App">
      <label for="lock"> Lock modal</label>
      <input
        type="checkbox"
        id="lock"
        onClick={() => setLockModal(!lockModal)}
      />
      <br />
      <br />
      <label for="animations">Choose animation:</label>
      <select
        name="animations"
        id="animations"
        onChange={(e) => setAnimation(e.target.value)}
      >
        {renderModalAnimationOptions()}
      </select>
      <br />
      <br />
      <button onClick={() => setShowModal(true)}>Show Modal</button>

      <Modal
        open={showModal}
        title="Example Modal"
        animation={animation}
        lock={lockModal}
        onCancel={() => setShowModal(false)}
      >
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </p>
      </Modal>
    </div>
  );
};

export default App;
