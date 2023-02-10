import { Route, Routes } from "react-router-dom";
import Terms from "./components/terms-of-use/Terms";
import PrivacyPolicy from "./components/privacy-policy/Privacy";
import Myreports from "./components/my-reports/Myreport";
import Footer from "./components/footer/Footer";
import ReportsData from "./components/reports-data/Reports-data";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import DeveloperSetting from "./components/developers-setting/Developersetting";
import Reportsucessful from "./components/report-sucessful/Reportsucessful";
import Api from "./components/api/Api";
import Report from "./components/report/Report";
// import "animate.css/animate.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

AOS.init();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<Terms />} />
      <Route path="/my-reports" element={<Myreports />} />
      <Route path="/reports-data" element={<ReportsData />} />
      <Route path="/developers-setting" element={<DeveloperSetting />} />
      <Route path="/report-sucessful" element={<Reportsucessful />} />
      <Route path="/api" element={<Api />} />
      <Route path="/report" element={<Report />} />

    </Routes>
  );
}

export default App;
