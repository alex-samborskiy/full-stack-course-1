import List from "./Components/List";
// import Hooks from "./Components/Hooks";
import LoginForm from "./Components/LoginForm";
import { ProvideAuth } from "./hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <LoginForm />
        <List />
      </ProvideAuth>
      {/*<Hooks />*/}
    </div>
  );
}

export default App;
