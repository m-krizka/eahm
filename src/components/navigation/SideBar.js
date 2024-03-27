import React from 'react';

import { tables } from '../../config/_tables';

import generateNavItems from '../../_helpers/generateNavItems';

export default function SideBar() {
  const NavItems = generateNavItems(tables);
  return (
    <div className="left-side-menu">
      <div className="logo-wrapper">
        <div className="outer-logo">
          <div className="middle-logo">
            <a href="/"><i className="far fa-paper-plane logo-plane" /></a>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="logo-wrapper">
          <div className="outer-logo">
            <div className="middle-logo">
              <a href="/">
                <i className="far fa-paper-plane logo-plane-dashboard" />
                &nbsp;eAHM
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-header">Manage</div>
        {NavItems}
        <div className="sidebar-header">Account</div>
        <a href="#">Profile</a> {/* eslint-disable-line */}
        <div className="sidebar-header">About</div>
        <a
          href="https://airlinedata.gitbook.io/eahm/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
      </div>
    </div>
  );
}
