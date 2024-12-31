import { PackageIcon } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center transform transition-transform duration-300">
        <PackageIcon size={32} className="text-primary-foreground animate-bounce mt-3" /> 
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          StockMaster
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestión de inventario inteligente
        </p>
      </div>
    </div>
  );
}