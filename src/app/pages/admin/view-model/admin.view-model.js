import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { Cookie } from "../../../../store/cookie/cookie";


const useAdminViewModel = () => {

    const [users, setUsers] = useState([])
    const [initLoading, setInitLoading] = useState(true);
    const [addNewUser, setAddNewUser] = useState(false);
    const [openCurrentDelete, setOpenCurrentDelete] = useState({
        currentId: "",
        loading: false,
    });


    const getUser = async() => {

        const url = `${import.meta.env.VITE_URL_APP}/api/user`;
        const { data } = await axios.get(
            url,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookie.getToken()}`,
                },
            }
        );

        const users = data.categories

        const usersWithActions = users.map((user) => {
            const actions = [];
                actions.push("edit");
                actions.push("delete");
            return {
                ...user,
                actions,
            };
            });

        console.log('users', data.categories)
        setUsers(usersWithActions)
        setInitLoading(false)

    }

    
    const deleteUser = async (id) => {
        
        console.log(id);
        setOpenCurrentDelete({ ...openCurrentDelete, loading: true });
        const url = `${import.meta.env.VITE_URL_APP}/api/user/${id}`;
        const deleteUserReponse = await axios.delete(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.getToken()}`,
        },
        });
        console.info("deleteUserReponse", deleteUserReponse);
        setOpenCurrentDelete({ ...openCurrentDelete, loading: false });
        setAddNewUser(true);
    };
    
    useEffect(() => {
        if (addNewUser) {
            setTimeout(() => {
                getUser();
                setAddNewUser(false);
          }, 2000);
        }
    }, [addNewUser]);
    
    useEffect(() => {
      getUser()
    }, []);
    
    return {
        users,
        initLoading,
        deleteUser,
        openCurrentDelete,
        setOpenCurrentDelete
    }
}

export default useAdminViewModel;