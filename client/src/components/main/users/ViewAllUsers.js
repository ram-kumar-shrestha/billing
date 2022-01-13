import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

import { fetchUsers, fetchUser, deleteUser } from "../../../actions";

const ViewAllUsers = (props) => {
  const updateClickHandler = (id) => {
    props.fetchUser(id); //to get initial state for update form
  };

  const deleteClickHandler = (id) => {
    props.deleteUser(id);
  };

  useEffect(() => {
    props.fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redering loading
  const loading = () => {
    return <div>Loading... </div>;
  };

  // fetch users if the users state is either empty array or not an array at all
  if (
    !(Object.prototype.toString.call(props.users) === "[object Array]") ||
    props.users.length === 0
  ) {
    return loading();
  }

  const usersList = props.users.map((user, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>
          <Link
            className="link edit"
            to={`/users/update/${user._id}`}
            onClick={(e) => updateClickHandler(user._id)}
          >
            {<AiTwotoneEdit />}
          </Link>
        </td>
        <td>
          <Link
            className="link delete"
            to={`/users/delete/${user._id}`}
            onClick={(e) => deleteClickHandler(user._id)}
          >
            {<AiFillDelete />}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <section className="all-users">
      <h1 className="title">Users</h1>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>User Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>{usersList}</tbody>
      </table>
    </section>
  );
};

const mapToStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapToStateToProps, {
  fetchUsers,
  fetchUser,
  deleteUser,
})(ViewAllUsers);
