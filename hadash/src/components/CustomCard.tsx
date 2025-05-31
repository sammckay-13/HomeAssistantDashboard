"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface CustomCardProps {
  title: string;
  value: string;
  subtitle: string;
  valueColor?: string;
  colSpan?: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
}

export default function CustomCard({ 
  title, 
  value, 
  subtitle, 
  valueColor = "text-slate-700",
  colSpan = "col-span-1",
  isExpanded = false,
  onExpand,
  onClose
}: CustomCardProps) {
  return (
    <>
      <motion.div
        className={`${colSpan} ${isExpanded ? 'opacity-0 pointer-events-none' : ''}`}
        layoutId={`card-${title}`}
        onClick={onExpand}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-2xl font-semibold text-black">
              {title}
            </div>
          </CardHeader>
          <CardContent>
            <motion.div 
              layoutId={`value-${title}`}
              className={`text-2xl font-semibold ${valueColor}`}
            >
              {value.includes('\n') ? (
                <div className="space-y-1">
                  {value.split('\n').map((line, index) => (
                    <div key={index} className="text-sm">{line}</div>
                  ))}
                </div>
              ) : (
                value
              )}
            </motion.div>
            <motion.p 
              layoutId={`subtitle-${title}`}
              className="text-sm text-slate-600"
            >
              {subtitle}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
            >
              <motion.div
                layoutId={`card-${title}`}
                className="w-full max-w-2xl pointer-events-auto"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <Card className="shadow-2xl bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-semibold text-black">
                        {title}
                      </div>
                      <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      layoutId={`value-${title}`}
                      className={`text-4xl font-bold ${valueColor} mb-4`}
                    >
                      {value.includes('\n') ? (
                        <div className="space-y-2">
                          {value.split('\n').map((line, index) => (
                            <div key={index} className="text-lg">{line}</div>
                          ))}
                        </div>
                      ) : (
                        value
                      )}
                    </motion.div>
                    <motion.p 
                      layoutId={`subtitle-${title}`}
                      className="text-lg text-slate-600 mb-6"
                    >
                      {subtitle}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-slate-50 p-4 rounded-lg"
                    >
                      <p className="text-slate-700">
                        Detailed information and controls for {title.toLowerCase()} would appear here.
                        This expanded view provides more space for additional data, charts, and interactive elements.
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}