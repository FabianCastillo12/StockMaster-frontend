import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

export function Chart({ type, data, index, categories, colors, valueFormatter }) {
  const formatValue = valueFormatter || ((value) => value.toString());

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey={categories[0]}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${formatValue(value)}`}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`hsl(var(--${colors[index % colors.length]}))`}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => formatValue(Number(value))}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip 
          formatter={(value) => formatValue(Number(value))}
        />
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={`hsl(var(--${colors[index % colors.length]}))`}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}