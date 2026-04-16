import Person from "./Person";

function Home() {
  return (
    <>
      <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center" />
        <Person />
      </div>
    </>
  );
}

export default Home;
