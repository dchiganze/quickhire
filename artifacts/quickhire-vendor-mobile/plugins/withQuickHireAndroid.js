const { withGradleProperties } = require("expo/config-plugins");

function setGradleProperty(properties, key, value) {
  const existing = properties.find(
    (property) => property.type === "property" && property.key === key,
  );

  if (existing) {
    existing.value = value;
  } else {
    properties.push({ type: "property", key, value });
  }
}

module.exports = function withQuickHireAndroid(config) {
  return withGradleProperties(config, (configWithProperties) => {
    const properties = configWithProperties.modResults;

    setGradleProperty(
      properties,
      "android.enableMinifyInReleaseBuilds",
      "true",
    );
    setGradleProperty(
      properties,
      "android.enableShrinkResourcesInReleaseBuilds",
      "true",
    );
    setGradleProperty(properties, "edgeToEdgeEnabled", "true");

    configWithProperties.modResults = properties.filter(
      (property) =>
        !(
          property.type === "property" &&
          property.key === "expo.edgeToEdgeEnabled"
        ),
    );

    return configWithProperties;
  });
};