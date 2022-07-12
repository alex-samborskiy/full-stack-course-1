import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth } from "./hooks/useAuth";
import Routes from './routes';
import "./App.css";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Routes />
      </ProvideAuth>
    </div>
  );
}

export default App;
