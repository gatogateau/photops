import React from "react";
import "./Navbar.css";

// //log out bind functions
// this.logout = this.logout.bind(this);
// //logout function
// logout() {
//     this.setState({
//      isLoading: true,
//     });
//     const obj = getFromStorage('the_main_app');
//     if (obj && obj.token) {
//       const { token } = obj;
//       //very token
//       fetch('/api/account/logout?token=' + token)
//       .then(res => res.json())
//       .then(json => {
//         if (json.success) {
//           this.setState({
//             token: '',
//             isLoading: false
//           });
//         } else {
//           this.setState({
//             isLoading: false,
//           });
//         }
//       });
// }

const Navbar = props => (
      <div>
      <ul className="nav nav-pills nav-justified">
          <li><a href="/">Photo-Ops Assassin</a></li>
          <li><button onClick={this.logout}>Sign Out</button></li>
      </ul>
  </div>
);

export default Navbar;