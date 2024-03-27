# Routing
The dashboard is wrapped in the ```PrivateRoute.js``` component, which renders only if a user is succesfully authenticated (via a JWT token in the localStorage). If the token is not found, a user is redirected to the login page.

Table routes are rendered dynamically from the ```_tables.js``` config file and use the following structure:

```/:dataset-name/:status``` - renders a list of records with a given status

```/:dataset-name/:add``` - renders a Create form

```/:dataset-name/draft/:recordID``` - renders an Edit form for a given record (only available for drafts)

```/:dataset-name/history``` - renders a change log with any status changes and their timestamps (currently work-in-progress)


# Tables

**Default Table** displays a traditional-style table.
**Collapsible Table** displays a table with expandable row which displays mappings to other records.
**Sub-Table** is not rendered individually, but as a part of Collapsible Table. It displays one-to-many relationships between a record and any records attached to it (typically aircraft registrations).

All table-related components are located in the _table_ folder. _actionButtons_ and _tableComponents_ folders contain components that are shared by both Default Table, Collapsible Table and SubTable. _helpers_ contains various helper methods such as ones for dynamic generation of table columns or formatting table cells.

```
.
├── SubTableList.js
├── TableList.js
├── TableListCollapsible.js
├── actionButtons
│   ├── ActionsPanel.js
│   ├── ActivateButton.js
│   ├── DeactivateButton.js
│   ├── DeleteButton.js
│   ├── EditButton.js
│   ├── EditLink.js
│   └── SubActionsPanel.js
├── helpers
│   ├── formatTableCell.js
│   ├── generateSubTableColumns.js
│   ├── generateTableColumns.js
│   └── orderSubtableRow.js
└── tableComponents
    ├── ActivePointers.js
    ├── ModalDelete.js
    ├── ModalMappingAdd.js
    ├── ModalMappingEdit.js
    ├── ModalRecordRow.js
    ├── ModalStatusSet.js
    ├── NoDataPlaceholder.js
    ├── NoMappingsPlaceholder.js
    ├── StatusLabel.js
    ├── SubTableLoader.js
    ├── SubTableModalGroup.js
    └── TableLoader.js
```
## Shared Components
### Action Buttons
Action buttons are displayed in the last column of a table. They are rendered based on the status of a given record:
Draft: Activate, Edit, Delete
Active: Deactivate
Inactive: no buttons are rendered (deleting previously active records is not enabled)

### Modals
Modals are triggered for all status-setting operations and ask user to confirm a requested operation. For nested tables, they also serve as wrappers for add/edit forms. Additionally, a confirmation modal is also triggered when a user is attempting to leave a form where some changes have been done.

