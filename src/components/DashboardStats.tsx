
import { Line, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { motion } from 'framer-motion';

const data = [
  { month: 'Jan', issues: 65, resolved: 45, pending: 20 },
  { month: 'Feb', issues: 59, resolved: 40, pending: 19 },
  { month: 'Mar', issues: 80, resolved: 55, pending: 25 },
  { month: 'Apr', issues: 81, resolved: 60, pending: 21 },
  { month: 'May', issues: 56, resolved: 45, pending: 11 },
  { month: 'Jun', issues: 55, resolved: 48, pending: 7 },
];

const categoryData = [
  { name: 'Infrastructure', value: 400 },
  { name: 'Environment', value: 300 },
  { name: 'Public Safety', value: 300 },
  { name: 'Transportation', value: 200 },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Issue Resolution Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{
              issues: { color: '#2563eb' },
              resolved: { color: '#10b981' },
              pending: { color: '#f97316' }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <Line data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="issues" 
                    stroke="var(--color-issues)" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="var(--color-resolved)" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="var(--color-pending)" 
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
            <CardTitle>Issue Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{
              data: { color: '#2563eb' }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <Pie 
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="var(--color-data)"
                  label
                  animationBegin={0}
                  animationDuration={1500}
                >
                </Pie>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
