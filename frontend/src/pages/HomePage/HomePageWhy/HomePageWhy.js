import React from 'react';
import whyicon1 from '../../../assets/images/homepage/icon_why_1.png'
import whyicon2 from '../../../assets/images/homepage/icon_why_2.png'
import whyicon3 from '../../../assets/images/homepage/icon_why_3.png'
import './HomePageWhy.scss'
const HomePageWhy = () => {
  return (
    <section className="why">
      <div className="container">
        <div className="row">
          <div className="why-left col-xl-6 col-lg-6 col-12">
            <div className="why-title-header">
              <h1 className="why-title">TẠI SAO CHỌN CHÚNG TÔI</h1>
              <p className="why-desc">Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu.
                Với những nghệ nhân tâm huyết và đội ngũ tài năng cùng những câu
                chuyện về pizza đầy cảm hứng, 
                chúng tôi đảm bảo cung cấp dịch vụ khách hàng tốt nhất để đáp ứng nhu cầu và mong muốn của khách hàng.</p>
            </div>
            <div className="why-title-item">
              <div className="col-item-srv">
                <div className="service-item-ed">
                  <div className="why-item-icon">
                    <img src={whyicon1} alt="whyicon1" />
                  </div>
                  <div className="why-item-content">
                    <span className="content-title">Giá cả phải chăng</span><br />
                    <span className="content-desc"> Giá cả của bánh pizza của chúng tôi rất cạnh tranh và hợp lý,
                     đảm bảo sự hài lòng của khách hàng khi lựa chọn sản phẩm của chúng tôi.</span>
                  </div>
                </div>
              </div>
              <div className="col-item-srv">
                <div className="service-item-ed">
                  <div className="why-item-icon">
                    <img src={whyicon2} alt="whyicon1" />
                  </div>
                  <div className="why-item-content">
                    <span className="content-title">Hương vị tuyệt hảo</span><br />
                    <span className="content-desc"> Bánh pizza của chúng tôi được làm từ nguyên liệu tươi ngon,
                     đảm bảo cho khách hàng được thưởng thức hương vị tuyệt vời của bánh pizza thật sự</span>
                  </div>
                </div>
              </div>
              <div className="col-item-srv">
                <div className="service-item-ed">
                  <div className="why-item-icon">
                    <img src={whyicon3} alt="whyicon1" />
                  </div>
                  <div className="why-item-content">
                    <span className="content-title">Thời gian giao hàng nhanh</span><br />
                    <span className="content-desc">Chúng tôi cam kết giao hàng nhanh và 
                    đảm bảo độ tươi ngon của bánh pizza khi đến tay khách hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="why-right col-xl-6 col-lg-6 col-12"></div>
        </div>
      </div>
    </section >
  );
};

export default HomePageWhy;