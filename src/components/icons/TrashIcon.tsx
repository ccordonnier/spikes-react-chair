const TrashIcon = ({ width = 24, height = 24, mouseOver=false, fill = "#3aa39f", hover="#a2a3b1"}) => {
  return (
    <div className=''>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 30 30">
        <path fill={mouseOver?hover:fill} d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
      </svg>
    </div>
  );
};

export default TrashIcon;