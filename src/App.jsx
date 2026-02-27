import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Label
} from "recharts";

const App = () => {
  const data = useMemo(() => {
    // Deutsche mark (DEM/USD)
    // Source: https://www.bundesbank.de/dynamic/action/en/statistics/time-series-databases/time-series-databases/759784/759784?listId=www_sdks_b01011_1
    const rawDataDEM = [
      { year: 1948, dem: 3.3333 }, { year: 1949, dem: 3.5833 }, { year: 1950, dem: 4.2000 },
      { year: 1951, dem: 4.2000 }, { year: 1952, dem: 4.2000 }, { year: 1953, dem: 4.2000 },
      { year: 1954, dem: 4.1993 }, { year: 1955, dem: 4.2107 }, { year: 1956, dem: 4.2027 },
      { year: 1957, dem: 4.2012 }, { year: 1958, dem: 4.1919 }, { year: 1959, dem: 4.1791 },
      { year: 1960, dem: 4.1704 }, { year: 1961, dem: 4.0221 }, { year: 1962, dem: 3.9978 },
      { year: 1963, dem: 3.9864 }, { year: 1964, dem: 3.9748 }, { year: 1965, dem: 3.9943 },
      { year: 1966, dem: 3.9982 }, { year: 1967, dem: 3.9866 }, { year: 1968, dem: 3.9923 },
      { year: 1969, dem: 3.9244 }, { year: 1970, dem: 3.6463 }, { year: 1971, dem: 3.4795 },
      { year: 1972, dem: 3.1889 }, { year: 1973, dem: 2.6590 }, { year: 1974, dem: 2.5897 },
      { year: 1975, dem: 2.4631 }, { year: 1976, dem: 2.5173 }, { year: 1977, dem: 2.3217 },
      { year: 1978, dem: 2.0084 }, { year: 1979, dem: 1.8330 }, { year: 1980, dem: 1.8158 },
      { year: 1981, dem: 2.2610 }, { year: 1982, dem: 2.4287 }, { year: 1983, dem: 2.5552 },
      { year: 1984, dem: 2.8456 }, { year: 1985, dem: 2.9424 }, { year: 1986, dem: 2.1708 },
      { year: 1987, dem: 1.7982 }, { year: 1988, dem: 1.7584 }, { year: 1989, dem: 1.8813 },
      { year: 1990, dem: 1.6161 }, { year: 1991, dem: 1.6612 }, { year: 1992, dem: 1.5595 },
      { year: 1993, dem: 1.6544 }, { year: 1994, dem: 1.6218 }, { year: 1995, dem: 1.4338 },
      { year: 1996, dem: 1.5037 }, { year: 1997, dem: 1.7348 }, { year: 1998, dem: 1.7592 }
    ];

    // Synthectic serie (USD per EUR)
    const demToEurParity = 1.95583; 
    const synthetic = rawDataDEM.map(item => ({
      year: item.year,
      rate: parseFloat((demToEurParity / item.dem).toFixed(4)),
      type: "Synthetic (1.95583 / DEM-USD rate)"
    }));

    // Real data from Euro Era
    // Source: https://www.macrotrends.net/2548/euro-dollar-exchange-rate-historical-chart
    const euroAverages = [
      { year: 1999, rate: 1.0658 }, { year: 2000, rate: 0.9236 }, { year: 2001, rate: 0.8956 },
      { year: 2002, rate: 0.9456 }, { year: 2003, rate: 1.1312 }, { year: 2004, rate: 1.2439 },
      { year: 2005, rate: 1.2441 }, { year: 2006, rate: 1.2556 }, { year: 2007, rate: 1.3705 },
      { year: 2008, rate: 1.4708 }, { year: 2009, rate: 1.3948 }, { year: 2010, rate: 1.3257 },
      { year: 2011, rate: 1.3920 }, { year: 2012, rate: 1.2848 }, { year: 2013, rate: 1.3281 },
      { year: 2014, rate: 1.3285 }, { year: 2015, rate: 1.1095 }, { year: 2016, rate: 1.1069 },
      { year: 2017, rate: 1.1297 }, { year: 2018, rate: 1.1810 }, { year: 2019, rate: 1.1195 },
      { year: 2020, rate: 1.1422 }, { year: 2021, rate: 1.1827 }, { year: 2022, rate: 1.0530 },
      { year: 2023, rate: 1.0813 }, { year: 2024, rate: 1.0824 }, { year: 2025, rate: 1.1300 },
      { year: 2026, rate: 1.1780 }
    ].map(item => ({ ...item, type: "Real (ECB annual average)" }));

    return [...synthetic, ...euroAverages];
  }, []);
    // [variable]: recalculates the data only if variable changes.
    // Since it's an empty array, it will only calculate once when the component mounts.

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-5 border border-slate-300 shadow-xl rounded-lg">
          <p className="font-bold text-slate-900 text-base">{`Fiscal year: ${label}`}</p>
          <div className="h-px bg-slate-200 my-2" />
          <p className="text-blue-900 font-bold text-base">{`Rate: ${payload[0].value.toFixed(4)} EUR/USD`}</p>
          <p className="text-slate-600 text-xs mt-1 italic">{payload[0].payload.type}</p>
        </div>
      );
    }
    return null;
  };

  const startYear = 1950;
  const endYear = 2025;
  const yearsTicks = [];
  for (let year = startYear; year <= endYear; year += 5) {
      yearsTicks.push(year);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900 leading-normal flex justify-center">
      <div className="w-full max-w-[98%] bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden">
        
        <header className="bg-slate-900 p-9 text-white">
          <div className="flex items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                Consolidated historical series of the Euro-Dollar exchange rate
              </h1>
              <p className="text-slate-300 text-base md:text-lg max-w-full leading-relaxed">
                Integrated long-term exchange rate analysis. Synthetic data (1948-1998) via Deutsche Mark and 
                real data (1999-2026) based on Deutsche Bundesbank Eurosystem annual averages.
              </p>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-9">
          <div className="h-[520px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8" 
                  ticks={yearsTicks}
                  tickMargin={10}
                  fontSize={14}
                  tickLine={true} 
                  axisLine={true}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={14} 
                  tickMargin={10}
                  tickLine={true} 
                  axisLine={true}
                  domain={[0.4, 1.7]}
                  tickFormatter={(val) => `$${val.toFixed(2)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Methodological areas */}
                <ReferenceArea x1={1948} x2={1949} fill="#e2e8f0" fillOpacity={0.8}>
                  <Label value="JEIA" position="top" fill="#1e293b" fontSize={14} offset={15} />
                </ReferenceArea>
                <ReferenceArea x1={1949} x2={1953} fill="#cbd5e1" fillOpacity={0.7}>
                  <Label value="BdL" position="top" fill="#1e293b" fontSize={14} offset={15} />
                </ReferenceArea>
                <ReferenceArea x1={1953} x2={1998} fill="#f1f5f9" fillOpacity={0.8}>
                   <Label value="FRANKFURT" position="top" fill="#1e293b" fontSize={14} offset={15} />
                </ReferenceArea>

                {/* Temporal frameworks */}
                <ReferenceLine x={1985} stroke="#b91c1c" strokeDasharray="4 4" strokeWidth={2}>
                  <Label value="PLAZA ACCORD" position="insideTopLeft" fill="#b91c1c" fontSize={14} fontWeight="bold" dx={5} dy={10}/>
                </ReferenceLine>

                <ReferenceLine x={1999} stroke="#0369a1" strokeWidth={2.5}>
                  <Label value="EURO ERA START" position="insideBottomRight" fill="#0369a1" fontSize={14} fontWeight="bold" dx={-5} dy={-10}  />
                </ReferenceLine>

                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#000000" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        
          {/* Methodology details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 border-t border-slate-300 pt-10 text-base">
            <div className="space-y-4 bg-slate-50 p-8 rounded-xl border border-slate-300 shadow-sm">
              <h3 className="text-sm font-bold text-sky-700 uppercase tracking-widest flex items-center gap-3">
                <span className="w-3 h-3 bg-slate-600 rounded-full"></span>
                Pre-Euro methodology (1948-1998)
              </h3>
              <p className="text-slate-800 text-sm md:text-base leading-relaxed text-justify">
                The synthetic series uses the Deutsche Mark (DEM) as the European anchor. Until 1949, it relies on the fixed rate of the Joint Export-Import Agency (JEIA) (DEM 1 = USD 0.30). From 1949 to 1953, it follows the Bank deutscher Länder (BdL) rates. Between 1953 and 1998, the official Frankfurt Stock Exchange quotation is used. The entire series was converted using the irrevocable parity of <strong>1.95583 DEM/EUR</strong>.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 p-8 rounded-xl border border-slate-300 shadow-sm">
              <h3 className="text-sm font-bold text-sky-700 uppercase tracking-widest flex items-center gap-3">
                <span className="w-3 h-3 bg-sky-600 rounded-full"></span>
                Common Euro era (1999-2026)
              </h3>
              <p className="text-slate-800 text-sm md:text-base leading-relaxed text-justify">
                It uses the reference rates published by the European Central Bank (ECB). Values represent the arithmetic average of daily quotes for each fiscal year.
              </p>
            </div>
          </div>
        </div>

        <footer className="bg-slate-100 p-8 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Updated February 26, 2026 • Sources: Deutsche Bundesbank & European Central Bank 
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;