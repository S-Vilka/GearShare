import Tools from "./Tools/Tools";
import UserProfile from "./Profile/UserProfile";

function Profile() {
  return (
    <div>
      <div className="profileToolsWrapper">
        <div className="profileContainer">
          <UserProfile
            name="Joonas Ronimus"
            address="Metropolia"
            zip="03453"
            email="joonas.ronimus@metropolia.fi"
            profilePicture="./src/profileImage.jpeg"
          />
        </div>
        <div className="toolsContainer">
          <Tools />
        </div>
      </div>
    </div>
  );
}

export default Profile;
