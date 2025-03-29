import NotesList from "./components/NotesList";
import Layout from "./components/Layout";

function App() {


  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <NotesList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
