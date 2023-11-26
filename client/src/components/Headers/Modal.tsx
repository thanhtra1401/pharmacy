interface Props {
  children?: JSX.Element;
  closeModal?: () => void;
}
function Modal({ children, closeModal }: Props) {
  // const closeModal = () => {
  //   setModalOpen(false);
  // };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Modal Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={closeModal}
        ></div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
