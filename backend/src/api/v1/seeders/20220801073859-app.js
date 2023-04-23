module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "apps",
      [
        {
          NAME: "Education",
          DESC: "Education Program",
          ICON_NAME: "edu.png",
          MODULE_ID_DEFAULT: 1,
          TYPE: 1,
          INDEX: 1,
          URL: "stemsquare.vn",
          NOTE: "note",
          CREATED_BY: 1,
          MODIFIED_BY: 1,
          is_deleted: false,
          CREATED_DATE: new Date(),
          MODIFIED_DATE: new Date(),
        },
        {
          NAME: "HR",
          DESC: "Human Resource",
          ICON_NAME: "hr.jpg",
          MODULE_ID_DEFAULT: 2,
          TYPE: 1,
          INDEX: 1,
          URL: "hr.novasquare.vn",
          NOTE: "note",
          CREATED_BY: 1,
          MODIFIED_BY: 1,
          is_deleted: false,
          CREATED_DATE: new Date(),
          MODIFIED_DATE: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("apps", null, {})
  },
}
