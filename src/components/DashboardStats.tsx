
import { Bar, Line, Pie } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

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
      <Card>
        <CardHeader>
          <CardTitle>Issue Resolution Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{
            issues: { color: '#2563eb' },
            resolved: { color: '#10b981' },
            pending: { color: '#f97316' }
          }}>
            <Line
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <Line type="monotone" dataKey="issues" stroke="var(--color-issues)" />
              <Line type="monotone" dataKey="resolved" stroke="var(--color-resolved)" />
              <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" />
            </Line>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Issue Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{
            data: { color: '#2563eb' }
          }}>
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
            />
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
