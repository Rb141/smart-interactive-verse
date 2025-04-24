import { Line, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const data = [
  { month: 'Jan', issues: 85, resolved: 65, pending: 20 },
  { month: 'Feb', issues: 92, resolved: 78, pending: 14 },
  { month: 'Mar', issues: 110, resolved: 95, pending: 15 },
  { month: 'Apr', issues: 105, resolved: 90, pending: 15 },
  { month: 'May', issues: 125, resolved: 108, pending: 17 },
  { month: 'Jun', issues: 150, resolved: 135, pending: 15 },
  { month: 'Jul', issues: 142, resolved: 128, pending: 14 },
  { month: 'Aug', issues: 168, resolved: 150, pending: 18 },
  { month: 'Sep', issues: 155, resolved: 140, pending: 15 },
  { month: 'Oct', issues: 180, resolved: 165, pending: 15 },
  { month: 'Nov', issues: 195, resolved: 175, pending: 20 },
  { month: 'Dec', issues: 220, resolved: 195, pending: 25 },
];

const categoryData = [
  { name: 'Infrastructure', value: 450, percentage: '28%' },
  { name: 'Public Safety', value: 350, percentage: '22%' },
  { name: 'Environment', value: 300, percentage: '19%' },
  { name: 'Transportation', value: 250, percentage: '16%' },
  { name: 'Education', value: 150, percentage: '9%' },
  { name: 'Healthcare', value: 100, percentage: '6%' },
];

const COLORS = ['#2563eb', '#10b981', '#f97316', '#eab308', '#ec4899', '#8b5cf6'];

const communityLinks = [
  { name: "Local Food Bank", url: "https://foodbank.org", color: "from-orange-400 to-red-500" },
  { name: "Volunteer Center", url: "https://volunteer.org", color: "from-blue-400 to-indigo-500" },
  { name: "Emergency Services", url: "https://emergency.org", color: "from-red-400 to-pink-500" },
];

const charityLinks = [
  { name: "Children's Foundation", url: "https://children.org", color: "from-purple-400 to-pink-500" },
  { name: "Environmental Trust", url: "https://envtrust.org", color: "from-green-400 to-emerald-500" },
  { name: "Animal Welfare", url: "https://animalwelfare.org", color: "from-yellow-400 to-orange-500" },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Issue Resolution Trends</span>
              <div className="text-sm font-normal text-muted-foreground">
                Year 2024
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2,727</div>
                  <div className="text-sm text-muted-foreground">Total Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2,424</div>
                  <div className="text-sm text-muted-foreground">Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">303</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
            <ChartContainer className="h-[300px]" config={{
              issues: { color: '#6366f1' },
              resolved: { color: '#10b981' },
              pending: { color: '#f97316' }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <Line data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b"
                    tickLine={false}
                    axisLine={{ strokeWidth: 1, stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    tickLine={false}
                    axisLine={{ strokeWidth: 1, stroke: '#e2e8f0' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend iconType="circle" />
                  <Line 
                    type="monotone" 
                    dataKey="issues" 
                    name="Total Issues"
                    stroke="var(--color-issues)" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    name="Resolved"
                    stroke="var(--color-resolved)" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    name="Pending"
                    stroke="var(--color-pending)" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </Line>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Issue Categories Distribution</span>
              <div className="text-sm font-normal text-muted-foreground">
                Current Month
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <div className="text-sm">
                    <span className="font-medium">{entry.percentage}</span>
                    <span className="text-muted-foreground ml-1">{entry.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <ChartContainer className="h-[300px]" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    label={({ name, percentage }) => `${name} ${percentage}`}
                    labelLine={false}
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {categoryData.map((entry, index) => (
                      <Pie 
                        key={`cell-${index}`}
                        dataKey="value"
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Community Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {communityLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-lg bg-gradient-to-r ${link.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Charitable Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {charityLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-lg bg-gradient-to-r ${link.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
