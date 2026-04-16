import { motion } from "framer-motion";
import { Link2, Chrome, Hospital, ChevronRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ConnectionItem {
  id: string;
  name: string;
  description: string;
  icon: typeof Hospital;
  iconBg: string;
  status: "available" | "connected" | "coming-soon";
}

const connections: ConnectionItem[] = [
  {
    id: "ehr",
    name: "Connect to EHR",
    description: "Sync with your hospital's electronic health records",
    icon: Hospital,
    iconBg: "bg-blue-500",
    status: "available",
  },
  {
    id: "neurobrowser",
    name: "NeuroBrowser Extension",
    description: "Track screen time triggers from your browser",
    icon: Chrome,
    iconBg: "bg-purple-500",
    status: "coming-soon",
  },
];

const ConnectionsCard = () => {
  const handlePress = (item: ConnectionItem) => {
    if (item.status === "coming-soon") {
      toast("Coming soon!", { description: `${item.name} will be available in a future update.` });
    } else if (item.status === "available") {
      toast("Coming soon!", { description: "EHR integration will be available in a future update." });
    }
  };

  return (
    <div className="space-y-2">
      {connections.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.id}
            onClick={() => handlePress(item)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
                {item.status === "connected" && (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                )}
                {item.status === "coming-soon" && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Soon
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default ConnectionsCard;
