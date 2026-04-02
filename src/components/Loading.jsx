import "../css/Loading.css";
import Logo from "./Logo";

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loader-content">
        <svg className="wiggle-line" viewBox="0 0 100 20">
          <path d="M0 10 Q 25 0, 50 10 T 100 10" />
        </svg>
        <div className="loading-text">
          <Logo />
          <div className="loading">Loading...</div>
        </div>
        <svg className="wiggle-line" viewBox="0 0 100 20">
          <path d="M0 10 Q 25 0, 50 10 T 100 10" />
        </svg>
      </div>
    </div>
  );
}

export default Loading;
