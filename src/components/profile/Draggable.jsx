const Draggable = ({ dragStartHandler = () => {}, dropHandler = () => {}, children }) => (
  <div draggable="true" onDragStart={dragStartHandler} onDragOver={e => e.preventDefault()} onDrop={dropHandler}>
    {children}
  </div>
);

export default Draggable;
