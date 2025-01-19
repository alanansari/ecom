import './App.css'
import AllProducts from './components/AllProducts'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Nav'
import PopularCategories from './components/Popular'

function App() {

  return (
    <div className='p-0 m-0 w-[100vw] box-border mt-12'>
      <Navbar />
      <Banner />
      <PopularCategories />
      <AllProducts />
      <Footer />
    </div>
  )
}

export default App
