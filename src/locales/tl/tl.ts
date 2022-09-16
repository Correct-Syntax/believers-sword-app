const isNightlyBuild = process.env.VUE_APP_NIGHTLY_BUILD === "true";

export default {
    believers_sword: isNightlyBuild ? "Sandata ng Mananampalataya Dev Test" : "Sandata ng Mananampalataya",
};
