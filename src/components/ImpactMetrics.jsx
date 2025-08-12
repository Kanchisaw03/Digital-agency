import StatsCard from './StatsCard';

const stats = [
  { label: 'Increase in Calls', value: 356, suffix: '%', color: 'from-primary-blue to-primary-green' },
  { label: 'Website Actions', value: 312, suffix: '%', color: 'from-primary-green to-primary-violet' },
  { label: 'Fraud Attempts Tackled', value: 6500, suffix: '+', color: 'from-primary-violet to-primary-blue' },
];

export default function ImpactMetrics() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-dark">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">Our Impact</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
        {stats.map((s, i) => (
          <StatsCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} color={s.color} index={i} />
        ))}
      </div>
    </div>
  );
} 