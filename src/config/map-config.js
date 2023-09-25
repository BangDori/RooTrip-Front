const MAP_API_TOKEN = process.env.REACT_APP_MAP_API_TOKEN;
const MAP_API_STYLE = process.env.REACT_APP_MAP_API_STYLE;

const initialViewState = {
  longitude: 131.1,
  latitude: 36.4395,
  zoom: 5.5, // Default
};

const ZoomRange = {
  minZoom: 5.5,
  maxZoom: 10,
};

export { MAP_API_TOKEN, MAP_API_STYLE, initialViewState, ZoomRange };
