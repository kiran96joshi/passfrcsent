'use client';
export default function ExamToolbar({
  index,
  total,
  percent,
  sidebarOpen,
  toggleSidebar,
  goPrev,
  goNext,
}: {
  index: number;
  total: number;
  percent: number;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  return (
    <header className="border-b flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-20">
      {/* back */}
      <button onClick={goPrev} className="p-1 disabled:opacity-40" disabled={index === 0}>
        ←
      </button>

      {/* centre */}
      <div className="flex items-center gap-3 text-sm select-none">
        <span>
          Question {index + 1} / {total}
        </span>
        <span className="text-gray-400">•</span>
        <span className="font-semibold">{percent}%</span>
      </div>

      {/* right */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} title="Toggle sidebar" className="text-gray-600 hover:text-gray-800">
          {sidebarOpen ? '◂' : '▸'}
        </button>
        <button onClick={goNext} className="p-1 disabled:opacity-40" disabled={index === total - 1}>
          →
        </button>
      </div>
    </header>
  );
}
