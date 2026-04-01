'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, BarChart3, Search, Bell,
  ArrowUpRight, ArrowDownRight, DollarSign, Building2,
  Activity, PieChart, FileText, RefreshCw
} from 'lucide-react';

// Stock data - in production, this would come from API
const stocks = {
  KTB: {
    name: 'ธนาคารกรุงไทย',
    nameEn: 'Krung Thai Bank',
    price: 35.00,
    change: 0.00,
    changePercent: 0.00,
    pe: 10.25,
    pb: 0.98,
    eps: 3.50,
    marketCap: '490B',
    dividend: 2.85,
    roe: 9.8,
    npl: 2.45,
    sector: 'ธนาคารพาณิชย์',
    high52w: 36.50,
    low52w: 22.10,
    weekChange: 2.94,
    monthChange: 0.72,
    yearChange: 45.83
  },
  BBL: {
    name: 'ธนาคารกรุงเทพ',
    nameEn: 'Bangkok Bank',
    price: 142.50,
    change: 1.50,
    changePercent: 1.06,
    pe: 8.45,
    pb: 0.72,
    eps: 16.87,
    marketCap: '215B',
    dividend: 5.50,
    roe: 8.5,
    npl: 2.12,
    sector: 'ธนาคารพาณิชย์',
    high52w: 155.00,
    low52w: 98.00,
    weekChange: 1.85,
    monthChange: -0.52,
    yearChange: 32.15
  },
  SCB: {
    name: 'ธนาคารไทยพาณิชย์',
    nameEn: 'Siam Commercial Bank',
    price: 108.00,
    change: -0.50,
    changePercent: -0.46,
    pe: 9.12,
    pb: 0.88,
    eps: 11.84,
    marketCap: '380B',
    dividend: 4.00,
    roe: 9.6,
    npl: 2.31,
    sector: 'ธนาคารพาณิชย์',
    high52w: 118.00,
    low52w: 78.50,
    weekChange: -1.20,
    monthChange: 1.45,
    yearChange: 28.45
  },
  KBANK: {
    name: 'ธนาคารกสิกรไทย',
    nameEn: 'Kasikorn Bank',
    price: 158.50,
    change: 2.00,
    changePercent: 1.28,
    pe: 11.20,
    pb: 1.05,
    eps: 14.15,
    marketCap: '285B',
    dividend: 5.80,
    roe: 9.4,
    npl: 2.68,
    sector: 'ธนาคารพาณิชย์',
    high52w: 168.00,
    low52w: 115.00,
    weekChange: 3.15,
    monthChange: 2.10,
    yearChange: 38.75
  }
};

const metrics = [
  { label: 'P/E', key: 'pe', icon: PieChart },
  { label: 'P/B', key: 'pb', icon: BarChart3 },
  { label: 'ROE', key: 'roe', icon: TrendingUp },
  { label: 'NPL', key: 'npl', icon: Activity },
];

export default function DashboardPage() {
  const [selectedStock, setSelectedStock] = useState('KTB');
  const [activeTab, setActiveTab] = useState('overview');

  const stock = stocks[selectedStock as keyof typeof stocks];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">MOD Stock Dashboard</h1>
                <p className="text-sm text-slate-500">Real-time Market Monitor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Search className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stock Selector */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(stocks).map(([symbol, data]) => (
            <button
              key={symbol}
              onClick={() => setSelectedStock(symbol)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedStock === symbol
                  ? 'bg-white border-2 border-blue-500 shadow-lg'
                  : 'bg-white border border-slate-200 hover:shadow'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-primary">{symbol}</span>
                <span className={`text-sm font-medium ${
                  data.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.change >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="text-lg font-bold text-primary">{data.price.toFixed(2)}</div>
              <div className="text-xs text-slate-500 truncate">{data.name}</div>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Price Card */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">{stock.name}</h2>
                  <p className="text-slate-500">{stock.nameEn} • {stock.sector}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">฿{stock.price.toFixed(2)}</div>
                  <div className={`flex items-center justify-end gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="font-medium">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'สัปดาห์', value: `${stock.weekChange >= 0 ? '+' : ''}${stock.weekChange.toFixed(2)}%`, color: stock.weekChange >= 0 ? 'text-green-600' : 'text-red-600' },
                  { label: 'เดือน', value: `${stock.monthChange >= 0 ? '+' : ''}${stock.monthChange.toFixed(2)}%`, color: stock.monthChange >= 0 ? 'text-green-600' : 'text-red-600' },
                  { label: 'ปี', value: `${stock.yearChange >= 0 ? '+' : ''}${stock.yearChange.toFixed(2)}%`, color: stock.yearChange >= 0 ? 'text-green-600' : 'text-red-600' },
                  { label: '52W High', value: `฿${stock.high52w}`, color: 'text-slate-600' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                    <div className={`font-semibold ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((m) => (
                  <div key={m.key} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <m.icon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-500">{m.label}</span>
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {stock[m.key as keyof typeof stock]}
                      {m.key === 'roe' || m.key === 'npl' ? '%' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Financials */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Financial Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Market Cap</span>
                    <span className="font-semibold text-primary">{stock.marketCap}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Dividend Yield</span>
                    <span className="font-semibold text-primary">{stock.dividend}%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">52W Low</span>
                    <span className="font-semibold text-primary">฿{stock.low52w}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">EPS</span>
                    <span className="font-semibold text-primary">฿{stock.eps}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Compare */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Compare Stocks</h3>
              <div className="space-y-3">
                {Object.entries(stocks).map(([symbol, data]) => (
                  <div key={symbol} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-primary">{symbol}</span>
                      <span className="text-sm text-slate-500 ml-2">฿{data.price.toFixed(2)}</span>
                    </div>
                    <span className={`text-sm font-medium ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-lg">
                เปรียบเทียบเต็มรูปแบบ →
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
            >
              <h3 className="font-bold mb-4">Market Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">SET Index</span>
                  <span className="font-semibold">1,450.23</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Change</span>
                  <span className="font-semibold text-green-300">+5.42 (+0.38%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Volume</span>
                  <span className="font-semibold">28.5B</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Value</span>
                  <span className="font-semibold">15.2B</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}