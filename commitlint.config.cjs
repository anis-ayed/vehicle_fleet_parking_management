module.exports = {
  rules: {
    "subject-case": [2, "always", ["lower-case", "sentence-case"]],
    "scope-lsc-required": [2, "never"],
  },
  plugins: [
    {
      rules: {
        "scope-lsc-required": ({ type, scope, subject }) => {
          const typeEnum = [
            "Feat",
            "Fix",
            "Hotfix",
            "Chore",
            "Refactor",
            "Docs",
            "Ci",
            "Revert",
            "Test",
          ];
          if (!type || !scope || !subject) {
            return [
              false,
              "Votre message commit est incorrect. Merci de respecter les recommandations. Exemple Feat(VFM-001): your message",
            ];
          }
          if (!typeEnum.includes(type)) {
            return [
              false,
              `Your type should be : ${typeEnum.join(", ")}. Example Feat(VFM-001): your message`,
            ];
          }
          if (!subject) {
            return [
              false,
              "Subject of your commit is required. Example Feat(VFM-001): your subject message",
            ];
          }
          return [
            /^VFM-\d+$/.test(scope),
            "Your scope should contain (VFM-{number of jira ticket}). Example Feat(VFM-001): your message",
          ];
        },
      },
    },
  ],
};
