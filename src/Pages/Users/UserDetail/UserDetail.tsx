import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CoveredImage } from "./../../../Components/OptimisedImage/OptimisedImage";
import "./UserDetail.css";
import { User } from "../UserContext";

const UserDetail = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [profileDetail, setProfileDetail] = useState<User>({
    address: "",
    age: "",
    email: "",
    familyName: "",
    name: "",
    profilePicture: "",
  });

  useEffect(() => {
    const userDetail = location.state;
    setProfileDetail({
      address: userDetail.data.address,
      age: userDetail.data.age,
      email: userDetail.data.email,
      familyName: userDetail.data.familyName,
      name: userDetail.data.name,
      profilePicture: userDetail.data.profilePicture,
    });
  }, [location.state]);

  return (
    <div>
      <div className="nav-link">
        <h1>User Detail Card</h1>
      </div>

      <div className="card">
        <CoveredImage
          altText="ProfileImage"
          srcUrl={profileDetail.profilePicture}
          width={"100%"}
          height={250}
        />
        <h2>
          {profileDetail.name} {profileDetail.familyName}
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Family Name</th>
              <td>{profileDetail.familyName}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{profileDetail.age}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{profileDetail.email}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{profileDetail.address}</td>
            </tr>
          </tbody>
        </table>
        <button className="back-button" onClick={() => navigation(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
