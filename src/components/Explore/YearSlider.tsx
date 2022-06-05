import Slider from '@mui/material/Slider';
import { StyledEngineProvider } from '@mui/material/styles';
import { toNumber } from "neo4j-driver-core"
import "../../styles/explore.css";

interface YearSliderData {
    year: string;
    handleYearChange: EventListener;
}

const YearSlider: React.FC<YearSliderData> = ({ year, handleYearChange }) => {
    const marks = [
        {
          value: 1960,
          label: '1960',
        },
        {
          value: 1970,
          label: '1970',
        },
        {
          value: 1980,
          label: '1980',
        },
        {
          value: 1990,
          label: '1990',
        },
        {
            value: 2000,
            label: '2000',
        },
        {
            value: 2010,
            label: '2010',
        },
        {
            value: 2020,
            label: '2020',
          }
    ];

  return (
    <div className="slider-box graph-control">
                <h4 className="slider-title">Coverage <br/>Years</h4>
            <StyledEngineProvider injectFirst>
                    <Slider
                    style={{ width: "90%", marginRight:"5px" }}
                    defaultValue={2020}
                    min={1960}
                    max={2020}
                    value={toNumber(year)}
                    aria-label="Year Slider"
                    valueLabelDisplay="auto"
                    onChange={handleYearChange} 
                    marks={marks}
                    />
                </StyledEngineProvider>
            </div>
  )
}

export default YearSlider