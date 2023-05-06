function ButtonRefresh() {
  function pageRefhesh() {
    window.location.reload();
  }
  return (
    <>
      <button className="fontSizeButton3" onClick={pageRefhesh}>
        Cargar Ganadores
      </button>
    </>
  );
}

export default ButtonRefresh;
