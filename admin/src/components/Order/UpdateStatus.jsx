import { Modal, Radio } from "antd";

import PropTypes from "prop-types";

function UpdateStatus({ updateStatus, setUpdateStatus, order }) {
  console.log(order);
  return (
    <div>
      <Modal
        open={updateStatus}
        onCancel={() => {
          setUpdateStatus(false);
        }}
        okText="Xác nhận"
        title="Cập nhật đơn hàng"
      >
        <Radio.Group>
          <Radio value={1}>Xác nhận đơn hàng</Radio>
          <Radio value={2}>Đã giao hàng</Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
}
UpdateStatus.propTypes = {
  updateStatus: PropTypes.boolean,
  setUpdateStatus: PropTypes.func,
  order: PropTypes.object,
};

export default UpdateStatus;
