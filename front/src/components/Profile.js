import React from "react";
import PropTypes from "prop-types";
import FormAddStore from "./FormAddStore.js";


  const Profile = props => {


    return (
      <div className="container">

    <div className="row">
        <div className="col-sm-6">
            <div className="well">
                <h3><span className="fa fa-user"></span> User details</h3>

                    <p>
                        <strong>id</strong>: {props._id}<br/>
                        <strong>username</strong>: {props.username}<br/>
                        <strong>password</strong>: {props.password}
                    </p>

            </div>
        </div>

    </div>

        <div className="page-header text-center">
        <h1><span className="fa fa-shopping-cart"></span> Add a business</h1>
        <FormAddStore></FormAddStore>

    </div>

</div>
      );
};

Profile.propTypes = {
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};
export default Profile;