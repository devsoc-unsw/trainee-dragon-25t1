export const generateFloorBar = (mapRef: any) => {
  const floorBar = new window.Mazemap.ZLevelBarControl({
    className: 'custom-zlevel-bar',
    autoUpdate: true,
    maxHeight: 300,
    activeColor: '#6a00cb',
  });
  mapRef.current.addControl(floorBar, 'bottom-right');

  function onResize() {
    const height = mapRef.current.getCanvas().clientHeight;
    const maxHeight = height / 2 - 50; // 50 pixels account for margins and spacing
    floorBar.setMaxHeight(maxHeight);
  }

  mapRef.current.on('resize', onResize);

  onResize();
};
