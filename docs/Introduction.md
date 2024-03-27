## Available Commands
1. ```npm run dev``` - start the dev server with hot reloading enabled
2. ```npm run build client``` - compile client files (production)
3. ```npm run build server``` - compile server files (production)
4. ```gulp deploy -m <commit-message>``` - build client and server files, commit and push to Heroku and BitBucket repositories

eahm uses webpack for bundling modules. ```webpack.config.js``` specifies rules for bundling client side modules with .js, .jsx, .css and .scss format.  and the injection into the ```index.html``` file. ```webpack.server-config.js``` bundles all server .js files into ```server.bundle.js```.

# Table Configuration
The application currently support two different types of tables: **Default Table** and **Collapsible Table**. The Collapsible Table supports expandable rows that show one-to-many relationships between a record and any attached aircraft registrations. Every table has an attached form which can support fields of 7 different types.
A configuration file ```_tables.js``` is used which specifies all the information required to render a table and its attached form:
```javascript
...
  {
    id: 1,
    type: 'defaultTable',
    header: 'Fleet Identifiers',
    url: 'fleet-identifiers',
    schemaName: 'FleetIdentifiers',
    fields: [
      {
        fieldName: 'Aircraft Type',
        fieldKey: 'aircraftType',
        fieldType: 'aircraftSelect',
        required: true,
        defaultValue: '',
      },
      
      ...
      
      {
        fieldName: 'Remarks',
        fieldKey: 'remarks',
        fieldType: 'string',
        required: true,
        defaultValue: '',
      },
    ],
  },
...
```
In addition to rendering React components, ```_tables.js``` specs also define API routes and handlers and the database model on the backend.