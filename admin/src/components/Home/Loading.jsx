import { Modal, Spin } from "antd";

function Loading() {
  return (
    <div className="h-lvh container w-full">
      <Modal open={true} closeIcon={false} footer={null}>
        <div className="flex items-center justify-center flex-col">
          <Spin size="large" />
          <div className="mt-4">Loading</div>
        </div>
      </Modal>
    </div>
  );
}

export default Loading;
