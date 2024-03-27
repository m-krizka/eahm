import React from 'react';
import { NavLink } from 'react-router-dom';

import NavAccordion from '../components/navigation/NavAccordion';

export default function generateNavItems(tablesArray) {
  const output = [];
  tablesArray.forEach((table) => {
    if (Object.prototype.hasOwnProperty.call(table, 'navGroup')) {
      if (Object.prototype.hasOwnProperty.call(output[output.length - 1], 'navGroup')) {
        output[output.length - 1].items.push({ header: table.header, key: table.url });
      } else {
        output.push({
          navGroup: table.navGroup,
          items: [{ header: table.header, key: table.url }],
        });
      }
    } else {
      output.push(<NavLink key={table.id} to={`/${table.url}`} activeClassName="sidebar-active">{table.header}</NavLink>);
    }
  });

  output.forEach((item, i) => {
    if (Object.prototype.hasOwnProperty.call(item, 'navGroup')) {
      output[i] = <NavAccordion key={item.navGroup} name={item.navGroup} items={item.items} />;
    }
  });

  return output;
}
