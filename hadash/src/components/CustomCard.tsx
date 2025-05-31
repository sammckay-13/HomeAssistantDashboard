"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdDragIndicator } from "react-icons/md";

interface CustomCardProps {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  valueColor?: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
  onRemove?: () => void;
  isEditMode?: boolean;
}

export default function CustomCard({ 
  id,
  title, 
  value, 
  subtitle, 
  valueColor = "text-slate-700",
  isExpanded = false,
  onExpand,
  onClose,
  onRemove,
  isEditMode = false
}: CustomCardProps) {
  return (
    <>
      <motion.div
        className="h-full"
        style={{ opacity: isExpanded ? 0 : 1 }}
        layoutId={`card-${id}`}
        onClick={!isEditMode ? onExpand : undefined}
        whileHover={!isEditMode ? { scale: 1.02 } : undefined}
        whileTap={!isEditMode ? { scale: 0.98 } : undefined}
      >
        <Card className={`h-full ${!isEditMode ? 'hover:shadow-lg cursor-pointer' : ''} transition-shadow relative`}>
          {isEditMode && (
            <>
              <div className="absolute top-2 left-2 z-10">
                <MdDragIndicator className="text-slate-400 text-lg cursor-move" />
              </div>
              <button
                onClick={onRemove}
                className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
              >
                <MdClose className="text-sm" />
              </button>
            </>
          )}
          <CardHeader className={isEditMode ? "pt-8" : ""}>
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
              className="fixed inset-0 bg-black/60 z-[9999]"
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl max-h-[90vh] overflow-auto pointer-events-auto mx-auto"
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
                    <div className={`text-4xl font-bold ${valueColor} mb-4`}>
                      {value.includes('\n') ? (
                        <div className="space-y-2">
                          {value.split('\n').map((line, index) => (
                            <div key={index} className="text-lg">{line}</div>
                          ))}
                        </div>
                      ) : (
                        value
                      )}
                    </div>
                    <p className="text-lg text-slate-600 mb-6">
                      {subtitle}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-slate-700">
                        Detailed information and controls for {title.toLowerCase()} would appear here.
                        This expanded view provides more space for additional data, charts, and interactive elements.
                      </p>
                    </div>
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