import React from 'react'
import Banner from '../Components/Home-banner/Banner';
import SmallerBanner from '../Components/Home-banner/Smaller-Banner';
import Category from '../Components/HomeComponents/Category';
import SaleBanner from '../Components/HomeComponents/SaleBanner';
import DiscountItems from '../Components/HomeComponents/Discount-Items';
import ProductCarousel from '../Components/HomeComponents/BannerProductsCarousel';
import ShowProductsBanner from '../Components/HomeComponents/showProductsBanner';

const Home = () => {
  return (
    <div>
      <Banner/>
      <SmallerBanner/>
      <Category/>
      <ShowProductsBanner/>
      <ProductCarousel/>
      <DiscountItems/>
      <SaleBanner/>
    </div>
  )
}

export default Home
