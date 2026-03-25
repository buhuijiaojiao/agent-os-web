import type { StatItem } from "./types";

interface StatCardProps {
  stat: StatItem;
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <div
      className="group relative p-5 rounded-xl bg-card/50 border border-border
                 transition-all duration-300 hover:border-[#4ef2c2]/30 hover:bg-card/70"
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#4ef2c2]/10 text-[#4ef2c2]">
          <Icon className="w-5 h-5" />
        </div>
        {stat.trend && (
          <span className="text-xs text-[#4ef2c2] font-medium">
            {stat.trend}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="text-2xl font-bold tracking-tight text-foreground">
        {stat.value}
      </div>

      {/* Label */}
      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>

      {/* Hover glow */}
      <div className="card-glow" />
    </div>
  );
}
