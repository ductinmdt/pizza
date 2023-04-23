module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user_status",
      [
        {
          NAME: "INITIAL",
          DESC: "User mới tạo, cần kiểm tra",
          NOTE: "note",
          CREATED_BY: 1,
          MODIFIED_BY: 1,
          is_deleted: false,
          CREATED_DATE: new Date(),
          MODIFIED_DATE: new Date(),
        },
        {
          NAME: "REQUEST_INFO",
          DESC: "Yêu cầu nhập thông tin đầy đủ",
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
    return queryInterface.bulkDelete("user_status", null, {})
  },
}
