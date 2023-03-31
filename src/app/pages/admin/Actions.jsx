import { DeleteOutlined, EditOutlined, WarningFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";

const Actions = ({
  action,
  user,
  deleteUser,
  setOpenCurrentDelete,
  openCurrentDelete,
}) => {
  switch (action) {
    case "edit":
      return <EditOutlined key="edit" />;
    case "delete":
      return (
        <Popconfirm
          title="Deseas eliminar el usuario?"
          icon={<WarningFilled style={{ color: "#c62626" }} />}
          onConfirm={() => deleteUser(user._id)}
          okButtonProps={{ loading: openCurrentDelete.loading }}
          onCancel={() =>
            setOpenCurrentDelete({ ...openCurrentDelete, id: "" })
          }
          cancelText="No"
          okText="Si"

        >
          <DeleteOutlined
            key="delete"
            onClick={() =>
              setOpenCurrentDelete({ ...openCurrentDelete, id: user._id })
            }
          />
        </Popconfirm>
      );
    default:
      break;
  }
};

export default Actions;