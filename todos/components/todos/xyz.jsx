import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "../Header";
import Link from "next/link";
import {
  fetchTodosApi,
  deleteTodoApi,
  shareTodoApi,
  showUserNameApi,
  removePermissionsApi,
} from "../../helperFunctions/apiHelper";
import { RingSpinner } from "react-spinners-kit";
import withAuth from "../../utils/withAuth";
import { FaShareAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewTodos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const theme = useTheme();
  const [selectedUserIds, setSelectedUserIds] = useState([]); // State to hold selected user ids
  const [names, setNames] = useState([]); // State to hold names of users in Share dropdown
  const [permissions, setPermissions] = useState([]);
  // const [removePermissions, setRemovePermissions] = useState([]);

  const permissionOptions = ["Read", "Update", "Delete"];

  // console.log("data", data);

  const getStyles = (name, selectedUserIds, theme) => {
    return {
      fontWeight:
        selectedUserIds.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUserIds(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangePermissions = (event) => {
    const {
      target: { value },
    } = event;
    setPermissions(typeof value === "string" ? value.split(",") : value);
  };

  const handleOpen = async (id) => {
    setSelectedTodo(id);
    setOpen(true);
    await allUser();
    // console.log("todo", id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShareAndClose = async () => {
    await handleShare();
    handleClose();
  };

  const handleShare = async () => {
    console.log("handle share called successfully");

    if (!selectedTodo) return;

    try {
      await shareTodoApi(selectedTodo, selectedUserIds, permissions);
      // console.log("shareTodoAPi");
      toast.success("Todo shared successfully!");
      handleClose();
    } catch (error) {
      // console.log("error", error);
      toast("Oops, Something Went Wrong!");
    }
  };

  const handleRemovePermissionsAndClose = async () => {
    console.log("handleRemovePermissionsAndClose");
    handleRemovePermissions();
    handleClose();
  };

  const handleRemovePermissions = async () => {
    if (!selectedTodo) return;

    try {
      await removePermissionsApi(selectedTodo, selectedUserIds, permissions);
      toast.success("Permissions removed successfully!");
      // setRemovePermissions([]);
      handleClose();
    } catch (error) {
      toast("Oops, Something Went Wrong!");
    }
  };

  const deleteTodo = async (id) => {
    console.log("delete todo id from viewTodos file", id);
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteTodoApi(id);
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        toast.success("Todo Deleted SuccessFully...!");
      } catch (error) {
        // toast("Oops Something Went Wrong...!");
        if (error.response && error.response.status === 403) {
          toast(error.response.data.message);
        } else {
          console.log(error);
          toast("Oops, Something Went Wrong!");
        }
      }
    }
  };

  const allUser = async () => {
    try {
      const response = await showUserNameApi();
      setNames(response);
    } catch (error) {
      // console.log(error);
      toast("No Others User Found...!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await fetchTodosApi();
        // console.log(todos);
        setData(todos);
        setLoading(false);
      } catch (error) {
        toast("Oops Something Went Wrong...!");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">
              Your Todos
            </h1>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <RingSpinner size={50} color="#00bfff" />
            </div>
          ) : (
            <div className="w-full">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        className="odd:bg-white even:bg-gray-50 border-b"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.title}
                        </th>
                        <td className="px-6 py-4">{item.description}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex">
                            <a
                              className="cursor-pointer font-medium border-2 border-red-500 rounded-md p-1 hover:bg-red-500 hover:text-white"
                              onClick={() => deleteTodo(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                                width="20px"
                                height="20px"
                              >
                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
                              </svg>
                            </a>
                            <Link
                              className="ml-2 cursor-pointer border-2 border-green-500 rounded-md p-1 hover:bg-green-500 hover:text-white"
                              href={`/edit/${item.id}`}
                              // onClick={handleUpdate}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                width="20px"
                                height="20px"
                              >
                                <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z" />
                              </svg>
                            </Link>
                            <button
                              className="ml-2 py-2 text-base cursor-pointer border-2 border-green-500 rounded-md p-1 hover:bg-green-500 hover:text-white text-center"
                              onClick={() => handleOpen(item.id)}
                            >
                              <FaShareAlt />
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title" className="text-center">
            <span className="font-bold px-1">Title - </span>
            {selectedTodo ? selectedTodo.title : "No Title Found..."}
          </h2>
          <p id="modal-modal-description" className="text-center">
            <span className="font-bold px-1">Description -</span>
            {selectedTodo
              ? selectedTodo.description
              : "No Description Found..."}
          </p>
          <FormControl sx={{ m: 2, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Share With</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedUserIds}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.id}
                  style={getStyles(name, selectedUserIds, theme)}
                >
                  {name.id} {name.userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, width: 300 }}>
            <InputLabel id="demo-multiple-permission-label">
              Permissions
            </InputLabel>
            <Select
              labelId="demo-multiple-permission-label"
              id="demo-multiple-permission"
              multiple
              value={permissions}
              onChange={handleChangePermissions}
              input={
                <OutlinedInput
                  id="select-multiple-permission"
                  label="Permissions"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {permissionOptions.map((permission) => (
                <MenuItem key={permission} value={permission}>
                  {permission}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleShareAndClose}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
          >
            Share
          </Button>
          <Button
            onClick={handleRemovePermissionsAndClose}
            variant="contained"
            color="secondary"
            sx={{ m: 1 }}
          >
            Remove Permissions
          </Button>
        </Box>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default withAuth(ViewTodos);
