import React from 'react';
import imgnews1 from '../../../assets/images/homepage/news/untitled-1.jpg'
import imgnews2 from '../../../assets/images/homepage/news/untitled-2.jpg'
import imgnews3 from '../../../assets/images/homepage/news/untitled-3.jpg'
import './HomePageNews.scss'
const HomePageNews = () => {
  return (
    <div className="home-page-news">
      <div className="container">
        <div className="news-title">
          <h1>TIN TỨC NỔI BẬT</h1>
        </div>
        <div className="row">
          <div className="col-md-4 col-12">
            <div className="card" >
              <img src={imgnews1} className="card-img-top" alt="imgnews1" />
              <div className="card-body">
                <h4 className="card-title">Cách thưởng thức Pizza chuẩn phong cách người Việt
                </h4>
                <p className="card-text">Nhắc đến ẩm thực của Italy, người ta sẽ nghĩ ngay đến những lát Pizza thơm ngon, nóng hổi. Nhưng cũng ít ai tìm hiểu kỹ về sự ra đời của chiếc bánh Pizza...</p>
                <a href="#" className="stretched-link"></a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card" >
              <img src={imgnews2} className="card-img-top" alt="imgnews2" />
              <div className="card-body">
                <h4 className="card-title">Cách để làm Pizza đơn giản tại nhà</h4>
                <p className="card-text">Cách làm đế bánh Pizza dưới đây của Dạy Làm Bánh Á Âu (DLBAAu) sẽ giúp bạn chinh phục món bánh lừng danh thế giới này tại nhà, bạn có tin không? Bắt tay vào bếp thực hiện...</p>
                <a href="#" className="stretched-link"></a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card" >
              <img src={imgnews3} className="card-img-top" alt="imgnews3" />
              <div className="card-body">
                <h4 className="card-title">Tiêu chuẩn cho Pizza phong vị Ý đích thực tại Việt Nam?</h4>
                <p className="card-text">Quá nhiều tiệm pizza tại Việt Nam khiến cho việc đi tìm một pizza mang phong vị Ý đích thực không phải chuyện ra đường gặp ngay...</p>
                <a href="#" className="stretched-link"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageNews;