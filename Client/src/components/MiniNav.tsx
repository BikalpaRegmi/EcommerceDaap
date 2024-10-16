import { Link } from "react-router-dom";

const MiniNav = () => {
  return (
      <div className="bg-green-700 text-white flex justify-around">
          <Link to={'/'}>
              
              All
          </Link>
      <Link to={"/Category/?category=Electronics and Jwellerys"}>
        Electronics and Jwellerys
      </Link>
      <Link to={"/Category/?category=Fashion and Design"}>
        Fashion and Design
      </Link>

      <Link to={"/Category/?category=Toys and Gaming"}>Toys and Gaming</Link>
      
      <Link to={'/History'}>Order History</Link>
      
    </div>
  );
}

export default MiniNav
