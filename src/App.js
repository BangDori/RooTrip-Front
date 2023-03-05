import Index from './pages/Index';


const App = () => {
  console.log(process.env.REACT_APP_MAP_API_TOKEN);
  return <Index />;
};

export default App;
