import React, { useMemo } from 'react';
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
} from 'recharts';

const App = () => {
  const data = useMemo(() => {
    // 1. Dados Históricos do Marco Alemão (DEM/USD)
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

    // Cálculo da série sintética (USD por EUR)
    const demToEurParity = 1.95583; 
    const synthetic = rawDataDEM.map(item => ({
      year: item.year,
      rate: parseFloat((demToEurParity / item.dem).toFixed(5)),
      type: 'Sintético (DEM/1.95583)'
    }));

    // 2. Dados Reais da Era Euro (Médias Anuais fornecidas)
    const euroAverages = [
      { year: 1999, rate: 1.0654 }, { year: 2000, rate: 0.9232 }, { year: 2001, rate: 0.8959 },
      { year: 2002, rate: 0.9463 }, { year: 2003, rate: 1.1324 }, { year: 2004, rate: 1.2438 },
      { year: 2005, rate: 1.2441 }, { year: 2006, rate: 1.2568 }, { year: 2007, rate: 1.3712 },
      { year: 2008, rate: 1.4712 }, { year: 2009, rate: 1.3948 }, { year: 2010, rate: 1.3262 },
      { year: 2011, rate: 1.3925 }, { year: 2012, rate: 1.2858 }, { year: 2013, rate: 1.3285 },
      { year: 2014, rate: 1.3283 }, { year: 2015, rate: 1.1096 }, { year: 2016, rate: 1.1069 },
      { year: 2017, rate: 1.1300 }, { year: 2018, rate: 1.1809 }, { year: 2019, rate: 1.1200 },
      { year: 2020, rate: 1.1421 }, { year: 2021, rate: 1.1830 }, { year: 2022, rate: 1.0538 },
      { year: 2023, rate: 1.0827 }, { year: 2024, rate: 1.0823 }, { year: 2025, rate: 1.1276 },
      { year: 2026, rate: 1.1779 }
    ].map(item => ({ ...item, type: 'Real (Média Anual BCE)' }));

    return [...synthetic, ...euroAverages];
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 shadow-xl rounded-lg">
          <p className="font-bold text-slate-800 text-sm">{`Ano Fiscal: ${label}`}</p>
          <div className="h-px bg-slate-100 my-2" />
          <p className="text-blue-800 font-semibold">{`Taxa: ${payload[0].value.toFixed(4)} EUR/USD`}</p>
          <p className="text-slate-400 text-[10px] mt-1 italic">{payload[0].payload.type}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 font-sans text-slate-900 leading-normal">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        <header className="bg-slate-900 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">
                Série histórica consolidada EUR/USD
              </h1>
              <p className="text-slate-400 text-sm max-w-4xl">
                Análise cambial de longo prazo integrada. Dados sintéticos (1948–1998) via Marco Alemão 
                e dados reais (1999–2026) baseados em médias anuais do Banco Central Europeu.
              </p>
            </div>
            
            <div className="text-right text-[10px] text-slate-500 uppercase tracking-widest">
              {/*Confidencial • */}FGV Diretoria Internacional
            </div>
            
          </div>
        </header>

        <div className="p-8">
          <div className="h-[520px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  interval={4}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[0.4, 1.7]}
                  tickFormatter={(val) => `$${val.toFixed(2)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Áreas Metodológicas */}
                <ReferenceArea x1={1948} x2={1949} fill="#f8fafc" fillOpacity={0.6}>
                  <Label value="JEIA" position="top" fill="#64748b" fontSize={9} offset={12} />
                </ReferenceArea>
                <ReferenceArea x1={1949} x2={1953} fill="#f1f5f9" fillOpacity={0.4}>
                  <Label value="BdL" position="top" fill="#64748b" fontSize={9} offset={12} />
                </ReferenceArea>
                <ReferenceArea x1={1953} x2={1998} fill="#f8fafc" fillOpacity={0.2}>
                   <Label value="FRANKFURT" position="top" fill="#64748b" fontSize={9} offset={12} />
                </ReferenceArea>

                {/* Marcos Temporais */}
                <ReferenceLine x={1985} stroke="#ef4444" strokeDasharray="3 3">
                  <Label value="PLAZA ACCORD" position="insideTopLeft" fill="#ef4444" fontSize={9} fontWeight="bold" />
                </ReferenceLine>

                <ReferenceLine x={1999} stroke="#0ea5e9" strokeWidth={2}>
                  <Label value="INÍCIO ERA EURO" position="insideBottomRight" fill="#0ea5e9" fontSize={9} fontWeight="bold" dy={0} />
                </ReferenceLine>

                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#0f172a" 
                  strokeWidth={2.5} 
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-slate-100 pt-8 text-sm">
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                Metodologia Pré-Euro (1948–1998)
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                A série sintética utiliza o Marco Alemão (DEM) como âncora europeia. Até 1949, baseia-se na taxa fixa da Joint Export Import Agency (JEIA) (DEM 1 = USD 0.30). De 1949 a 1953, seguem as taxas do Bank deutscher Länder (BdL). Entre 1953 e 1998, utiliza-se a cotação oficial da Bolsa de Frankfurt. Toda a série foi convertida pela paridade irrevogável de <strong>1,95583 DEM/EUR</strong>.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                Era Comum do Euro (1999–2026)
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Utiliza as taxas de referência publicadas pelo Banco Central Europeu (BCE). Os valores representam a média aritmética das cotações diárias de cada ano fiscal, permitindo a análise de tendências estruturais e ciclos de volatilidade sistêmica sem o ruído do mercado spot diário.
              </p>
            </div>
          </div>
        </div>

        <footer className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Série Consolidada • Atualizado em 26 de fevereiro de 2026 • Fonte: Bundesbank / BCE
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;