'use strict';

/*************************
 * MODULES
 */
// JQUERY
//global.$ = global.jQuery =require('jquery');

//Angular.js Libraries
require("angular");
require("angular-sanitize");
require("angular-aria");
require("angular-messages");
require("angular-animate");
require("angular-material-data-table");

// Angular Material Library
require("angular-material");

// UI ROUTER
require("@uirouter/angularjs");

// UNDERSCORE
global._ = require("lodash");


/*************************
 * APPLICATION
 */
require("./app");
require("./routes/index.routes");
require("./filters/index.filters");
require("./filters/profile.filters");
require("./services/_shared/sharedRequest.services");
require("./services/global.services");
require("./services/index.services");
require("./services/user.services");
require("./services/rooms.services");
require("./services/items.services");
require("./services/projects.services");
require("./directives/sections.directive");
require("./directives/form.directive");
require("./directives/card.directive");
require("./directives/responses.directive");
require("./directives/navigation.directive");
require("./controllers/temp.controllers");              // TEMP
require("./controllers/index.controllers");
require("./controllers/home.controllers");
require("./controllers/profile.controllers");
require("./controllers/progress.controller");
require("./controllers/projects.controller");
require("./controllers/rooms.controller");
require("./controllers/sent.controller");
require("./controllers/haand.controllers");



/* ADMIN */
require("./controllers/admin/listItems.controllers");