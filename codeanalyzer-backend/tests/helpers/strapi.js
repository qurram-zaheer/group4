const Strapi = require("@strapi/strapi");

let instance;

async function setupStrapi() {
  if (!instance) {
    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.server
      .use(instance.server.router.routes()) // populate KOA routes
      .use(instance.server.router.allowedMethods()); // populate KOA methods

    await instance.server.mount();
  }
  return instance;
}

module.exports = {
  setupStrapi
};