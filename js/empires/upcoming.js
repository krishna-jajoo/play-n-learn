// Realms that are planned but not built yet. They show on the world map as "coming soon" with their floor plan.
// When a realm is built, give it its own file (like python.js) with `worlds`, and remove it from here.
(function (root) {
  const soon = (e) => root.QUEST.empire(Object.assign({ worlds: [] }, e));
})(typeof window !== "undefined" ? window : globalThis);
