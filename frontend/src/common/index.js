export const selectOptions = (array) => {
    const list = [];
    for (let item of array) {
      list.push({
        value: item.id,
        label: item.NAME,
      });
    }
    return list;
  };

export const orderStatus = [
  {
    label: 'Chờ xác nhận',
    value: 'Chờ xác nhận',
},
{
    label: 'Đang chuẩn bị',
    value: 'Đang chuẩn bị',
},
{
    label: 'Đang vận chuyển',
    value: 'Đang vận chuyển',
},
{
    label: 'Giao thành công',
    value: 'Giao thành công',
},
{
    label: 'Đã hủy',
    value: 'Đã hủy',
},
]