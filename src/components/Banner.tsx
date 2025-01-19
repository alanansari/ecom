
const Banner = () => {
  return (
    <div className="bg-[url('./assets/images/banner-1.jpg')] bg-cover bg-center bg-fixed h-[80vh] w-full justify-center md:items-center p-10 flex flex-col text-white [&>*]:my-2">
        <h2 className="text-4xl font-black drop-shadow-lg">Products for every passion</h2>
        <p className="md:w-1/3">Discover a world of endless possibilities, where every product sparks a new idea or adventure.</p>
        <button className="bg-white text-black font-bold p-2 px-4 rounded-full mt-4 w-fit">Shop Now</button>
    </div>
  )
}

export default Banner