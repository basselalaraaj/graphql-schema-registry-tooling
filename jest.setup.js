module.exports = function () {
  process.env = {
    ...process.env,
    REGISTRY_URL: "http://graphql-registry",
    REGISTRY_SERVICE_NAME: "cart",
    REGISTRY_SERVICE_URL: "http://cart",
  };
};
