import SimplifyForm from "@/components/SimplifyForm";
import { Accessibility, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <Accessibility className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AccessAI</h1>
            <p className="text-xs text-muted-foreground">
              Making text easier to understand
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simplify Any Text,{" "}
            <span className="text-primary">Instantly</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Paste complex text — legal documents, medical instructions, technical
            guides — and get a clear, easy-to-read version powered by AI.
          </p>
        </div>

        <SimplifyForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          Built with <Heart className="h-3.5 w-3.5 text-destructive inline" /> for accessibility
        </div>
      </footer>
    </div>
  );
};

export default Index;
