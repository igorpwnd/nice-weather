import './styles.css';


const Loader = () => <div className='loader w-screen h-screen bg-[#00000061] fixed z-[9] left-0 top-0'>
  <div className="spinner-wrapper">
    <div className="spinner">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  </div>
</div>

export default Loader