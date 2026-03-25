import Link from "next/link";
import { MessageSquare, Terminal, Bot, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { activityTypeConfig, type ActivityItem, type ActivityType } from "./types";

// 图标映射（单独定义，避免循环依赖）
const activityIcons: Record<ActivityType, React.ComponentType<{ className?: string }>> = {
  chat: MessageSquare,
  task: Terminal,
  agent: Bot,
};

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">暂无最近活动</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.map((activity) => {
        const config = activityTypeConfig[activity.type];
        const Icon = activityIcons[activity.type];

        return (
          <Link
            key={activity.id}
            href={activity.href}
            className={cn(
              "group flex items-center gap-4 p-4 rounded-xl",
              "bg-card/30 border border-border/50",
              "transition-all duration-200",
              "hover:bg-card/50 hover:border-border"
            )}
          >
            {/* Type Icon */}
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                "bg-muted/50"
              )}
            >
              <Icon className={cn("w-4 h-4", config.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {config.label}
                </span>
              </div>
              <div className="text-sm font-medium text-foreground truncate mt-0.5">
                {activity.title}
              </div>
              {activity.description && (
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {activity.description}
                </div>
              )}
            </div>

            {/* Time */}
            <div className="text-xs text-muted-foreground shrink-0">
              {activity.time}
            </div>

            {/* Arrow */}
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
          </Link>
        );
      })}
    </div>
  );
}
