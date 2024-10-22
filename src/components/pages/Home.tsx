import AboutMe from "./AboutMe";
import Banner from "./Banner";
import Contact from "./Contact";
import Navbar from "./Navbar";
import ShowAllBlogs from "./ShowAllBlogs";
import ShowEducation from "./ShowEducation";
import ShowProjects from "./ShowProjects";

const Home = () => {
  return (
    <div>
       <Navbar></Navbar>
      <section id="home">
        <Banner />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="education">
        <ShowEducation />
      </section>
      <section id="projects">
        <ShowProjects />
      </section>
      <section id="blogs">
        <ShowAllBlogs />
      </section>
      <section id="contact">
       <Contact></Contact>
      </section>
    </div>
  );
};

export default Home;
