import React from "react";
import "./IntroPage.scss";
import { NavLink } from "react-router-dom";
import BreadCrumb from "../../components/UserHomePage/Main/BreadCrumb";
const IntroPage = () => {
  return (
    <div className="intropage">
      <div className="container">
        <BreadCrumb title="Giới thiệu" />

        <div className="row">
          <p>
            PanPie là chuỗi cửa hàng bán bánh pizza với hệ thống trên toàn quốc.
            Các chi nhánh của PanPie được thiết kế theo phong cách hiện đại, với
            không gian thoải mái, rộng rãi và sáng tạo, tạo ra một không gian ấm
            cúng và thân thiện với khách hàng.
            <br />
            PanPie có một menu đa dạng với nhiều loại bánh pizza, từ các loại
            pizza cổ điển đến các loại pizza sáng tạo. Điểm đặc biệt của PanPie
            là cách chế biến bánh pizza của họ, sử dụng công nghệ làm bánh thủ
            công, cùng với những nguyên liệu tươi ngon nhất. Điều này giúp bánh
            pizza của PanPie có vị ngon và hương vị đặc trưng riêng, khác biệt
            so với các cửa hàng pizza khác.
            <br />
            <br />
            Bên cạnh đó, PanPie cũng cung cấp các loại nước uống và đồ ăn kèm
            như salad, khoai tây chiên và bánh ngọt. Các sản phẩm này được chế
            biến và bày trí đẹp mắt, tạo ra một bữa ăn pizza hoàn hảo cho khách
            hàng.
            <br />
            <br />
            Ngoài ra, PanPie cũng chú trọng đến việc phục vụ khách hàng với chất
            lượng cao nhất. Các nhân viên của PanPie được đào tạo để cung cấp
            dịch vụ tốt nhất cho khách hàng, giúp tạo ra một trải nghiệm tuyệt
            vời cho những người đến thưởng thức bánh pizza.
            <br />
            <br />
            Với không gian thiết kế đẹp mắt, menu đa dạng và các sản phẩm chất
            lượng cao, PanPie là một lựa chọn tuyệt vời cho những người yêu
            thích bánh pizza.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
