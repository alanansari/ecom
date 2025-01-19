import searchLogo from '../../assets/icons/search.svg'

const SearchBar = () => {
  return (
    <div className='flex gap-2 border-2 border-black w-full p-2 rounded-full'>
        <input
            type='text'
            placeholder='Search for products'
            className='bg-transparent focus:outline-none w-full'
        />
        <img src={searchLogo} alt='search' className='h-5 w-5' />
    </div>
  )
}

export default SearchBar