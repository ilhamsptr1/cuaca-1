import { Container, createTheme, ThemeProvider, Box, Typography, Button, TextField } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "./features/fetchDataSlice";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
const date = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdayId = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const App = () => {
  const { loading, data, error } = useSelector((state) => state.weatherApi);
  const dispatch = useDispatch();

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("Language");
    return savedLanguage ? JSON.parse(savedLanguage) : "id";
  });
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem("City");
    return savedCity ? JSON.parse(savedCity) : "cairo";
  });
  const [inputValue, setInputValue] = useState("");

  const day = language === "id" ? weekdayId[date.getDay()] : weekday[date.getDay()];
  const dateNow = language === "id" ? date.toLocaleDateString("id-ID") : date.toLocaleDateString();

  useEffect(() => {
    dispatch(fetchApi({ city, lang: language }));
  }, [city, dispatch, language]);

  const handleSearch = () => {
    if (inputValue.trim() === "") return;
    setCity(inputValue.trim());
    setInputValue("");
  };

  const cityName = data.name || "";
  const temp = data.main?.temp || 0;
  const temp_min = data.main?.temp_min || 0;
  const temp_max = data.main?.temp_max || 0;
  const icon = data.weather?.[0]?.icon || "";
  const description = data.weather?.[0]?.description || "";

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="sky-background">
          {/* Elemen 3D */}
          <div className="sun"></div>
          <div className="moon"></div>
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          
          {/* Shooting Stars */}
          <div className="shooting-star"></div>
          <div className="shooting-star-2"></div>
          <div className="shooting-star-3"></div>
          
          {/* Burung */}
          <div className="bird-container bird-container--one">
            <div className="bird bird--one"></div>
          </div>
          <div className="bird-container bird-container--two">
            <div className="bird bird--two"></div>
          </div>
          <div className="bird-container bird-container--three">
            <div className="bird bird--three"></div>
          </div>
          <div className="bird-container bird-container--four">
            <div className="bird bird--four"></div>
          </div>
          
          {/* Balon Udara */}
          <div className="balloon">
            <div className="balloon-body"></div>
            <div className="balloon-basket"></div>
          </div>
          
          {/* Awan 3D */}
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
          <div className="cloud cloud-5"></div>
          <div className="cloud cloud-6"></div>
          <div className="cloud cloud-7"></div>
          <div className="cloud cloud-8"></div>
          
          {/* Gunung */}
          <div className="mountain mountain-1"></div>
          <div className="mountain mountain-2"></div>
          <div className="mountain mountain-3"></div>
          
          <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
            <Box component="div" className="content-container" sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Box component="div" className="card" sx={{ width: "100%", background: "rgb(28 52 91 / 36%)", color: "#fff", padding: "15px", borderRadius: "15px", boxShadow: "0 11px 1px rgba(0,0,0,0.05)", maxHeight: "75vh", overflow: "auto" }}>
                <Box component="div" className="input-container" flexDirection={{ xs: "column", sm: "row" }} gap={{ xs: "0", sm: "10px" }} sx={{ display: "flex" }}>
                  <TextField
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "35px",
                        color: "#fff",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff",
                      },
                    }}
                    fullWidth
                    color="primary"
                    variant="standard"
                    placeholder={language === "id" ? "Cari kota (dalam bahasa Inggris)" : "Search for a city (in English)"}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button variant="outlined" sx={{ textTransform: "capitalize", color: "#fff" }} onClick={handleSearch}>
                    {language === "id" ? "Cari" : "search"}
                  </Button>
                </Box>
                {loading ? (
                  <Box component="div" className="loader" sx={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>
                    <ClipLoader color="#fff" size={50} />
                  </Box>
                ) : error ? (
                  <Box component="div" className="loader" sx={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {language === "id" ? "Nama kota tidak valid, coba nama lain" : "invalid city name, try another name"}
                    </Typography>
                  </Box>
                ) : (
                  <Box component="div" className="content">
                    <Box component="div" className="city&time" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "end" }} sx={{ display: "flex", justifyContent: "space-between", gap: "20px", padding: "0 10px" }}>
                      <Typography variant="h2" sx={{ fontWeight: "500" }}>
                        {cityName}
                      </Typography>
                      <Typography variant="h5">{`${day} ${dateNow}`}</Typography>
                    </Box>
                    <hr style={{ marginBottom: "10px" }} />
                    <Box component="div" className="degree&cloudIcon" flexDirection={{ xs: "column", sm: "row" }} sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: "20px" }}>
                      <Box component="div" className="degree&description">
                        <Box component="div" className="temp" sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: "10px" }}>
                          <Typography variant="h1" className="main-temp">
                            {Math.round(temp)}
                          </Typography>
                          <Typography variant="h6" sx={{ alignSelf: "flex-start", marginInline: "-20px" }}>
                            °C
                          </Typography>
                          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
                        </Box>

                        <Typography variant="h6" className="main-temp">
                          {description}
                        </Typography>

                        <Box component="div" className="min&max" sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Typography variant="h6" className="min-temp" sx={{ fontWeight: "300" }}>
                            {language === "id" ? "Min" : "Min"}: {Math.floor(temp_min)}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "300", alignSelf: "flex-start", marginTop: "3px", marginInline: "-4px", fontSize: "10px" }}>
                            °C
                          </Typography>
                          <Box component="span">|</Box>
                          <Typography variant="h6" className="max-temp" sx={{ fontWeight: "300" }}>
                            {language === "id" ? "Max" : "Max"}: {Math.ceil(temp_max)}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "300", alignSelf: "flex-start", marginTop: "3px", marginInline: "-4px", fontSize: "10px" }}>
                            °C
                          </Typography>
                        </Box>
                      </Box>
                      <CloudIcon sx={{ fontSize: "200px" }} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box component="div" className="change-language" sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <Typography variant="body2" sx={{ color: "#fff", opacity: 0.7 }}>
                  @copyright ilham saputra 2026
                </Typography>
                <Button variant="text" sx={{ color: "#fff", textTransform: "capitalize" }} onClick={() => setLanguage(language === "id" ? "en" : "id")}>
                  {language === "id" ? "English" : "Indonesia"}
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;