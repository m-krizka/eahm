import React from 'react';
import { NavLink } from 'react-router-dom';

function NavVertical() {
  return (
    <div className="left-side-menu">
      <div className="logo-wrapper">
        <div className="outer-logo">
          <div className="middle-logo">
            <a href="/"><i className="far fa-paper-plane logo-plane" /></a>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

function SideBar() {
  return (
    <div className="sidebar">
      <div className="logo-wrapper">
        <div className="outer-logo">
          <div className="middle-logo">
            <a href="/"><i className="far fa-paper-plane logo-plane" /></a>
          </div>
        </div>
      </div>
      <div className="sidebar-header">Manage</div>

      <NavLink to="/maxweights" activeClassName="sidebar-active">Maximum Weights</NavLink>
      <NavLink to="/dataset" activeClassName="sidebar-active">Dataset 2</NavLink>

      <div className="sidebar-header">Account</div>
      <a href="/">Profile</a>
    </div>
  );
}

export default NavVertical;
