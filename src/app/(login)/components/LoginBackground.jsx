export function LoginBackground() {
    return (
      <>
        {/* Main gradient background with darker colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-violet-200 to-sky-300 dark:from-gray-950 dark:via-blue-950/60 dark:to-gray-900" />
        
        {/* Animated gradient overlay with increased opacity */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 animate-gradient" />
        
        {/* Pattern overlay with increased opacity */}
        <div className="absolute inset-0 bg-[url('/inventory-pattern.svg')] opacity-[0.1] dark:opacity-[0.15]" />
        
        {/* Grid pattern with stronger visibility */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-slate-400 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-800 opacity-30 dark:opacity-40" />
          
          {/* Glowing orbs effect with increased opacity */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl animate-blob" />
            <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-secondary/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          </div>
        </div>
      </>
    );
  }