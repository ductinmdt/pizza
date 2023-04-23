module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orgs",
      [
        {
          NAME: "Nova Square",
          DESC: "Nova Square Company",
          ABB: "NS",
          LOGO_NAME: "ns.png",
          NOTE: "note",
          CREATED_BY: 1,
          MODIFIED_BY: 1,
          is_deleted: false,
          CREATED_DATE: new Date(),
          MODIFIED_DATE: new Date(),
        },
        {
          NAME: "Stem Square",
          DESC: "Stem Square Company",
          ABB: "SS",
          LOGO_NAME: "ss.png",
          NOTE: "note",
          CREATED_BY: 2,
          MODIFIED_BY: 2,
          is_deleted: false,
          CREATED_DATE: new Date(),
          MODIFIED_DATE: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orgs", null, {})
  },
}
