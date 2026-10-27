import TaskForm from './components/TaskForm';
import Banner from "./components/Banner";
import Menu from   "./components/Menu";
import PhotoGallery from "./components/PhotoGallery";
import './App.css'


function App() {

  return (
      <div>
          <h1>Task manager</h1>
          <Menu />
          <Banner />
          <p>aplikacja React</p>

          <PhotoGallery />
          <TaskForm/>
      </div>
  );
}

export default App
