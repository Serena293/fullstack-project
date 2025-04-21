import LoginForm from "./LoginForm";
import CalendarComponent from "../sharedcomponents/CalendarComponet";

const LoginPage = () => {

  return (
    <section className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-7 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <CalendarComponent />
            </div>
          </div>
        </div>
        
        <div className="col-md-5 mb-5">
          <div className="card shadow" >
            <div className="card-body">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row justify-content-center ">
        <div className="col-md-10">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h2 className="mb-3">Welcome to PlanApp!</h2>
              {/* <p className="lead">
                Your ultimate productivity playground where organizing tasks becomes unexpectedly fun!
              </p> */}
              <p>
                🌈 Create colorful digital sticky notes for your tasks<br />
                👥 Connect with friends and colleagues in your network<br />
                💬 Chat and collaborate on shared tasks<br />
                🗓️ Never miss deadlines with our visual calendar<br />
                {/* 🎯 Turn productivity into a game with achievement badges */}
              </p>
              <p className="text-muted">
                Join our community of organized fun-seekers today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;